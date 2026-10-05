import assert from 'node:assert/strict'
import test from 'node:test'
import { initialSetup, setupReducer as reduce } from '../src/examples/setup-model.ts'
import { summarizeServiceStatus as summary } from '../src/examples/service-status-model.ts'

const configured = () =>
  reduce(initialSetup, { type: 'edit', field: 'name', value: 'Example resource' })
const pending = () => reduce(reduce(configured(), { type: 'review' }), { type: 'start' })
const resolve = (state, outcome) =>
  reduce(state, { type: 'resolve', outcome, attempt: state.attempt })

test('configuration is validated before review and commitment', () => {
  assert.ok(reduce(initialSetup, { type: 'review' }).error)
  assert.equal(reduce(initialSetup, { type: 'start' }), initialSetup)
  assert.equal(reduce(configured(), { type: 'review' }).phase, 'review')
  assert.ok(reduce({ ...configured(), region: 'invalid' }, { type: 'review' }).error)
  assert.ok(reduce({ ...configured(), name: 'x'.repeat(81) }, { type: 'review' }).error)
})

test('pending work rejects duplicates, correction, and stale outcomes', () => {
  const state = pending()
  for (const action of [
    { type: 'start' },
    { type: 'back' },
    { type: 'edit', field: 'name', value: 'Changed' },
    { type: 'resolve', outcome: 'success', attempt: state.attempt - 1 },
  ])
    assert.equal(reduce(state, action), state)
})

test('failure before creation retains editable configuration', () => {
  const failed = resolve(pending(), 'failure')
  assert.equal(failed.phase, 'failed')
  assert.equal(failed.resourceId, undefined)
  assert.equal(reduce(failed, { type: 'back' }).name, 'Example resource')
  assert.equal(reduce(failed, { type: 'back' }).phase, 'configure')
})

test('partial retries preserve the created resource even when defaults fail again', () => {
  const partial = resolve(pending(), 'partial')
  assert.equal(partial.phase, 'partial')
  assert.ok(partial.resourceId)
  assert.equal(reduce(partial, { type: 'back' }), partial)
  const retry = reduce(partial, { type: 'start' })
  assert.equal(retry.attempt, 2)
  const failed = resolve(retry, 'failure')
  assert.equal(failed.phase, 'partial')
  assert.equal(failed.resourceId, partial.resourceId)
  const complete = resolve(reduce(failed, { type: 'start' }), 'success')
  assert.equal(complete.phase, 'complete')
  assert.equal(complete.resourceId, partial.resourceId)
  assert.equal(reduce(complete, { type: 'start' }), complete)
})

test('unknown outcome blocks resubmission and requires explicit reconciliation', () => {
  const unknown = resolve(pending(), 'unknown')
  assert.equal(unknown.phase, 'unknown')
  assert.equal(reduce(unknown, { type: 'start' }), unknown)
  assert.equal(reduce(unknown, { type: 'back' }), unknown)
  assert.equal(resolve(unknown, 'success'), unknown)
  assert.equal(reduce(unknown, { type: 'reconcile' }).phase, 'complete')
  assert.equal(reduce(initialSetup, { type: 'reconcile' }), initialSetup)
})

test('status never declares stale, missing, or incomplete coverage operational', () => {
  assert.match(summary(['operational'], true, true), /All listed services operational/)
  for (const [conditions, current, complete] of [
    [[], true, true],
    [['operational'], false, true],
    [['operational'], true, false],
    [['unknown', 'operational'], true, true],
  ]) {
    assert.doesNotMatch(summary(conditions, current, complete), /All listed services operational/)
  }
})

test('status retains known impact and qualifies missing service coverage', () => {
  assert.equal(
    summary(['degraded', 'unknown'], true, false),
    'Degraded performance reported. Some service status is unknown.',
  )
  assert.match(summary(['outage', 'degraded'], true, true), /^Service disruption/)
  assert.match(summary(['maintenance', 'operational'], true, true), /^Maintenance/)
})
