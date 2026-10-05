import assert from 'node:assert/strict'
import test from 'node:test'
import {
  initialJourney,
  journeyReducer as reduce,
  restoreJourney,
  saveJourney,
} from '../src/examples/journey-model.ts'
const edit = (state, field, value) => reduce(state, { type: 'edit', field, value })
const next = (state) => reduce(state, { type: 'next' })
function reviewed(kind = 'application') {
  return next(next(edit(initialJourney(kind), 'name', 'Example person')))
}
test('required input blocks Continue and later-step direct activation', () => {
  const empty = initialJourney('application')
  assert.equal(next(empty).step, 0)
  assert.ok(next(empty).errors.name)
  assert.equal(reduce(empty, { type: 'go', step: 2 }), empty)
})
test('optional preferences can be explicitly skipped without implying a value', () => {
  let state = next(edit(initialJourney('onboarding'), 'name', 'Example'))
  state = edit(state, 'preference', 'Example topic')
  state = reduce(state, { type: 'skip' })
  assert.equal(state.step, 2)
  assert.equal(state.skipped, true)
  assert.equal(state.values.preference, '')
})
test('changing applicant branch clears dependent data and invalidates review', () => {
  let state = next(edit(initialJourney('application'), 'name', 'Example'))
  state = edit(state, 'audience', 'organization')
  assert.ok(next(state).errors.organization)
  state = next(edit(state, 'organization', 'Example team'))
  state = reduce(state, { type: 'go', step: 1 })
  state = edit(state, 'audience', 'individual')
  assert.equal(state.values.organization, '')
  assert.equal(state.reached, 1)
  assert.equal(reduce(state, { type: 'go', step: 2 }).step, 1)
})
test('pending commitment rejects duplicate submission, navigation, and edits', () => {
  const state = reduce(reviewed(), { type: 'submit' })
  assert.equal(state.status, 'pending')
  for (const action of [
    { type: 'submit' },
    { type: 'go', step: 0 },
    { type: 'edit', field: 'name', value: 'Changed' },
  ])
    assert.equal(reduce(state, action), state)
})
test('unknown result blocks resubmission until reconciliation', () => {
  const state = reduce(reduce(reviewed(), { type: 'submit' }), {
    type: 'resolve',
    outcome: 'unknown',
  })
  assert.equal(reduce(state, { type: 'submit' }), state)
  assert.equal(reduce(state, { type: 'reconcile' }).status, 'complete')
})
test('failure preserves values and allows a deliberate retry; stale results are ignored', () => {
  const initial = reviewed()
  assert.equal(reduce(initial, { type: 'resolve', outcome: 'success' }), initial)
  const failed = reduce(reduce(initial, { type: 'submit' }), { type: 'resolve', outcome: 'failed' })
  assert.deepEqual(failed.values, initial.values)
  assert.equal(reduce(failed, { type: 'submit' }).status, 'pending')
})
test('draft restoration validates context, expiry, schema, and prerequisites', () => {
  const now = 1000
  const raw = saveJourney(reviewed(), 'membership', now)
  assert.equal(restoreJourney(raw, 'application', 'membership', now + 1).step, 2)
  assert.equal(restoreJourney(raw, 'application', 'service', now + 1), null)
  assert.equal(restoreJourney(raw, 'application', 'membership', now + 3600001), null)
  assert.equal(restoreJourney('{broken', 'application', 'membership', now), null)
  const draft = JSON.parse(raw)
  draft.values.name = ''
  draft.status = 'complete'
  const restored = restoreJourney(JSON.stringify(draft), 'application', 'membership', now + 1)
  assert.equal(restored.step, 0)
  assert.equal(restored.status, 'editing')
  draft.values.name = 45
  assert.equal(restoreJourney(JSON.stringify(draft), 'application', 'membership', now + 1), null)
})
