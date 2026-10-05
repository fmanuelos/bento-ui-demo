import assert from 'node:assert/strict'
import test from 'node:test'
import {
  checkoutQuote,
  checkoutReducer as reduce,
  initialCheckout,
} from '../src/examples/checkout-model.ts'

const review = (context = 'download') => reduce(initialCheckout(context), { type: 'review' })
const ready = (context = 'download') =>
  reduce(review(context), { type: 'acknowledge', value: true })
const submitted = (context = 'download') => reduce(ready(context), { type: 'submit' })
const result = (state, outcome) =>
  reduce(state, { type: 'payment-result', attempt: state.attempt, outcome })
const checked = (state, outcome) => {
  const checking = reduce(state, { type: 'check' })
  return reduce(checking, {
    type: 'check-result',
    attempt: checking.attempt,
    checkSequence: checking.checkSequence,
    outcome,
  })
}

test('fictional prices reconcile in integer cents with distinct renewal totals', () => {
  assert.equal(checkoutQuote('download', 2).total, 4840)
  assert.equal(checkoutQuote('subscription', 1).total, 3300)
  assert.equal(checkoutQuote('subscription', 1).renewalTotal, 3960)
  for (const context of ['download', 'subscription'])
    for (const quantity of [1, 2, 3])
      for (const revision of [1, 2, 3]) {
        const quote = checkoutQuote(context, quantity, revision)
        assert.equal(quote.total, quote.subtotal - quote.discount + quote.tax)
        assert.ok([quote.total, quote.tax, quote.subtotal].every(Number.isInteger))
        assert.equal(quote.subtotal, quote.unitAmount * quantity)
      }
  for (const quantity of [0, -1, 4, 1.5, NaN])
    assert.throws(() => checkoutQuote('download', quantity))
})

test('submission requires review, acknowledgement, and a current available quote', () => {
  for (const state of [
    initialCheckout('download'),
    review(),
    reduce(ready(), { type: 'availability', availability: 'stale' }),
    reduce(ready(), { type: 'availability', availability: 'unavailable' }),
  ])
    assert.equal(reduce(state, { type: 'submit' }), state)
  assert.equal(reduce(ready(), { type: 'submit' }).phase, 'pending')
})

test('quantity correction and quote changes invalidate prior acknowledgement', () => {
  const edited = reduce(ready('subscription'), { type: 'edit' })
  assert.equal(edited.acknowledged, false)
  const changed = reduce(edited, { type: 'quantity', quantity: 3 })
  assert.equal(changed.quote.total, 9900)
  const refreshed = reduce(ready(), { type: 'refresh' })
  assert.equal(refreshed.acknowledged, false)
  assert.equal(refreshed.quote.unitAmount, 2800)
  assert.equal(reduce(refreshed, { type: 'submit' }), refreshed)
})

test('submission captures the quote and locks duplicate and correction actions', () => {
  const state = submitted()
  assert.notEqual(state.request.quote, state.quote)
  assert.deepEqual(state.request.quote, state.quote)
  for (const action of [
    { type: 'submit' },
    { type: 'edit' },
    { type: 'refresh' },
    { type: 'quantity', quantity: 3 },
    { type: 'availability', availability: 'stale' },
    { type: 'acknowledge', value: true },
  ])
    assert.equal(reduce(state, action), state)
})

test('decline requires renewed review and creates a distinct later attempt', () => {
  const first = submitted()
  const declined = result(first, 'declined')
  assert.equal(declined.quote.quantity, 1)
  assert.equal(reduce(declined, { type: 'submit' }), declined)
  const second = reduce(
    reduce(reduce(declined, { type: 'review' }), { type: 'acknowledge', value: true }),
    { type: 'submit' },
  )
  assert.equal(second.attempt, 2)
  assert.notEqual(second.request.id, first.request.id)
  assert.equal(reduce(second, { type: 'payment-result', attempt: 1, outcome: 'success' }), second)
})

test('provider return alone never establishes success; verified cancellation permits review', () => {
  const verification = result(submitted(), 'verification')
  assert.equal(reduce(verification, { type: 'submit' }), verification)
  const returned = reduce(verification, { type: 'verify' })
  assert.equal(returned.phase, 'unknown')
  assert.equal(returned.receipt, undefined)
  const cancelled = reduce(verification, { type: 'cancel-verification' })
  assert.equal(cancelled.phase, 'cancelled')
  assert.equal(reduce(cancelled, { type: 'review' }).acknowledged, false)
})

test('unknown results cannot retry, and unresolved checks preserve the existing attempt', () => {
  const unknown = result(submitted(), 'unknown')
  for (const type of ['submit', 'review', 'edit', 'refresh'])
    assert.equal(reduce(unknown, { type }), unknown)
  const unresolved = checked(unknown, 'unresolved')
  assert.equal(unresolved.phase, 'unknown')
  assert.equal(unresolved.request.id, unknown.request.id)
  const complete = checked(unresolved, 'confirmed')
  assert.equal(complete.phase, 'complete')
  assert.equal(complete.attempt, 1)
  assert.equal(reduce(complete, { type: 'submit' }), complete)
})

test('confirmed unpaid recovery permits a deliberate new review', () => {
  const unpaid = checked(result(submitted(), 'unknown'), 'unpaid')
  assert.equal(unpaid.phase, 'declined')
  assert.equal(unpaid.receipt, undefined)
  assert.equal(reduce(unpaid, { type: 'review' }).phase, 'review')
})

test('paid but undelivered orders never charge again or regress to unpaid', () => {
  const paid = result(submitted('subscription'), 'fulfillment-pending')
  assert.ok(paid.receipt)
  assert.equal(reduce(paid, { type: 'submit' }), paid)
  assert.equal(checked(paid, 'unpaid').phase, 'paid')
  const complete = checked(paid, 'confirmed')
  assert.equal(complete.receipt, paid.receipt)
  assert.equal(complete.request.id, paid.request.id)
  assert.equal(complete.phase, 'complete')
})

test('duplicate and superseded reconciliation responses cannot resolve a later check', () => {
  const first = reduce(result(submitted(), 'unknown'), { type: 'check' })
  assert.equal(reduce(first, { type: 'check' }), first)
  const resolved = reduce(first, {
    type: 'check-result',
    attempt: 1,
    checkSequence: 1,
    outcome: 'unresolved',
  })
  const second = reduce(resolved, { type: 'check' })
  assert.equal(second.checkSequence, 2)
  assert.equal(
    reduce(second, { type: 'check-result', attempt: 1, checkSequence: 1, outcome: 'confirmed' }),
    second,
  )
  assert.equal(
    reduce(second, { type: 'check-result', attempt: 0, checkSequence: 2, outcome: 'confirmed' }),
    second,
  )
})
