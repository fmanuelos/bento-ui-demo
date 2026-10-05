import assert from 'node:assert/strict'
import test from 'node:test'
import { FileUploadController } from '../src/components/file-upload-model.ts'
import {
  validCalendarDate,
  validateDate,
  formatCalendarDate,
} from '../src/components/date-input-model.ts'
import {
  initialJourney,
  journeyReducer,
  saveJourney,
  restoreJourney,
} from '../src/examples/journey-model.ts'
import { initialSetup, setupReducer } from '../src/examples/setup-model.ts'

const constraints = {
  maxFiles: 2,
  maxBytes: 8,
  accept: [{ extension: '.txt', mime: 'text/plain' }],
}
const file = (name = 'sample.txt', text = 'hello', type = 'text/plain') =>
  new File([text], name, { type, lastModified: 1 })
const deferred = () => {
  let resolve, reject
  const promise = new Promise((yes, no) => {
    resolve = yes
    reject = no
  })
  return { promise, resolve, reject }
}

test('selection reports type, empty, size, duplicate and count rejection independently', () => {
  const controller = new FileUploadController(constraints)
  controller.select([
    file(),
    file(),
    file('empty.txt', ''),
    file('large.txt', '123456789'),
    file('wrong.pdf'),
    file('mismatch.txt', 'x', 'image/png'),
    file('second.txt'),
    file('third.txt'),
  ])
  assert.deepEqual(
    controller.snapshot().map((item) => item.status),
    [
      'selected',
      'rejected',
      'rejected',
      'rejected',
      'rejected',
      'rejected',
      'selected',
      'rejected',
    ],
  )
  controller.remove(controller.snapshot()[0].id)
  controller.select([file('new.txt', 'x', '')])
  assert.equal(controller.snapshot().at(-1).status, 'selected')
})
test('upload locks duplicate starts and ignores invalid or decreasing progress', async () => {
  const controller = new FileUploadController(constraints)
  controller.select([file()])
  const id = controller.snapshot()[0].id
  const gate = deferred()
  let count = 0
  let progress
  const transport = (_file, { onProgress }) => {
    count++
    progress = onProgress
    return gate.promise
  }
  const upload = controller.start(id, transport)
  await controller.start(id, transport)
  assert.equal(count, 1)
  progress(4, 8)
  progress(2, 8)
  progress(1, 0)
  progress(NaN, 8)
  assert.equal(controller.snapshot()[0].progress, 50)
  gate.resolve({ receipt: 'sample-receipt' })
  await upload
  assert.equal(controller.snapshot()[0].status, 'uploaded')
  progress(7, 8)
  assert.equal(controller.snapshot()[0].progress, undefined)
})
test('cancel then retry cannot be completed by a late previous response', async () => {
  const controller = new FileUploadController(constraints)
  controller.select([file()])
  const id = controller.snapshot()[0].id
  const first = deferred()
  let signal
  const previous = controller.start(id, (_file, options) => {
    signal = options.signal
    return first.promise
  })
  controller.cancel(id)
  assert.ok(signal.aborted)
  assert.equal(controller.snapshot()[0].status, 'cancelled')
  const second = deferred()
  const retry = controller.start(id, () => second.promise)
  first.resolve({ receipt: 'old' })
  await previous
  assert.equal(controller.snapshot()[0].status, 'uploading')
  second.resolve({ receipt: 'new' })
  await retry
  assert.equal(controller.snapshot()[0].receipt, 'new')
})
test('removal and disposal invalidate callbacks; failed uploads can retry', async () => {
  const controller = new FileUploadController(constraints)
  controller.select([file()])
  const id = controller.snapshot()[0].id
  await controller.start(id, async () => {
    throw new Error('denied')
  })
  assert.equal(controller.snapshot()[0].status, 'failed')
  const gate = deferred()
  const retry = controller.start(id, () => gate.promise)
  controller.remove(id)
  gate.resolve({ receipt: 'late' })
  await retry
  assert.equal(controller.snapshot().length, 0)
  controller.select([file()])
  const next = controller.snapshot()[0].id
  const last = deferred()
  const pending = controller.start(next, () => last.promise)
  controller.dispose()
  last.reject(new Error('late'))
  await pending
  assert.equal(controller.snapshot()[0].status, 'cancelled')
})
test('upload completion requires a transport receipt', async () => {
  const controller = new FileUploadController(constraints)
  controller.select([file()])
  await controller.start(controller.snapshot()[0].id, async () => ({ receipt: '' }))
  assert.equal(controller.snapshot()[0].status, 'failed')
})
test('calendar dates validate leap years without rollover or ambiguous formats', () => {
  for (const value of ['2000-02-29', '2028-02-29', '0001-01-01', '9999-12-31'])
    assert.ok(validCalendarDate(value))
  for (const value of [
    '1900-02-29',
    '2026-02-29',
    '2026-04-31',
    '2026-13-01',
    '2026-01-00',
    '0000-01-01',
    '10/05/2026',
    '2026-1-1',
  ])
    assert.equal(validCalendarDate(value), false)
})
test('date bounds are inclusive; required, incomplete and invalid constraints are distinct', () => {
  const bounds = { min: '2026-10-01', max: '2027-12-31' }
  assert.equal(validateDate(bounds.min, bounds), undefined)
  assert.equal(validateDate(bounds.max, bounds), undefined)
  assert.ok(validateDate('2026-09-30', bounds))
  assert.ok(validateDate('2028-01-01', bounds))
  assert.equal(validateDate(''), undefined)
  assert.ok(validateDate('', { required: true }))
  assert.ok(validateDate('', { badInput: true }))
  assert.ok(validateDate('2026-10-05', { min: 'invalid' }))
  assert.ok(validateDate('2026-10-05', { min: '2027-01-01', max: '2026-01-01' }))
  assert.equal(formatCalendarDate('2026-10-05', 'en-US'), 'October 5, 2026')
  assert.equal(formatCalendarDate('2026-10-05', 'en-GB'), '5 October 2026')
})
function serviceReview() {
  let state = initialJourney('application', true)
  state = journeyReducer(state, { type: 'edit', field: 'name', value: 'Sample' })
  state = journeyReducer(state, { type: 'next' })
  const invalid = journeyReducer(state, { type: 'next' })
  assert.ok(invalid.errors.startDate)
  assert.ok(invalid.errors.attachments)
  state = journeyReducer(state, { type: 'date', value: '2026-11-15', badInput: false })
  state = journeyReducer(state, { type: 'attachments', ready: true })
  return journeyReducer(state, { type: 'next' })
}
test('service submission revalidates attachment readiness and date', () => {
  const state = serviceReview()
  assert.equal(state.step, 2)
  assert.equal(journeyReducer(state, { type: 'submit' }).status, 'pending')
  const invalid = journeyReducer({ ...state, attachmentsReady: false }, { type: 'submit' })
  assert.equal(invalid.step, 1)
  assert.ok(invalid.errors.attachments)
  assert.ok(journeyReducer({ ...state, dateBadInput: true }, { type: 'submit' }).errors.startDate)
})
test('v2 drafts retain dates but never restore attachment readiness or file content', () => {
  const raw = saveJourney(serviceReview(), 'service', 1000)
  assert.equal(JSON.parse(raw).version, 2)
  assert.equal(raw.includes('attachmentsReady'), false)
  const state = restoreJourney(raw, 'application', 'service', 1001)
  assert.equal(state.values.startDate, '2026-11-15')
  assert.equal(state.attachmentsReady, false)
  assert.equal(state.step, 1)
})
test('v1 service drafts migrate to empty dates and force renewed details', () => {
  const draft = JSON.parse(saveJourney(serviceReview(), 'service', 1000))
  draft.version = 1
  delete draft.values.startDate
  const state = restoreJourney(JSON.stringify(draft), 'application', 'service', 1001)
  assert.equal(state.values.startDate, '')
  assert.equal(state.step, 1)
})
test('project planning dates do not schedule provisioning and invalid dates block review', () => {
  let state = setupReducer(initialSetup, { type: 'edit', field: 'name', value: 'Project' })
  state = setupReducer(state, { type: 'date', value: '2026-02-30', badInput: false })
  assert.equal(setupReducer(state, { type: 'review' }).phase, 'configure')
  state = setupReducer(state, { type: 'date', value: '2026-11-15', badInput: false })
  const pending = setupReducer(setupReducer(state, { type: 'review' }), { type: 'start' })
  assert.equal(pending.phase, 'pending')
  assert.equal(pending.targetDate, '2026-11-15')
  assert.equal(setupReducer(pending, { type: 'date', value: '', badInput: false }), pending)
})
