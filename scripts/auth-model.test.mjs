import assert from 'node:assert/strict'
import test from 'node:test'
import { validateCredentials, simulatedOutcome } from '../src/examples/auth-model.ts'

test('required and malformed identifiers map to the correct fields', () => {
  assert.deepEqual(Object.keys(validateCredentials('authentication', '', '')), [
    'email',
    'password',
  ])
  assert.ok(validateCredentials('registration', 'alex@', 'long-example-password').email)
  assert.deepEqual(validateCredentials('authentication', ' alex@example.com ', 'x'), {})
})
test('registration policy does not prevent existing users from signing in', () => {
  assert.ok(validateCredentials('registration', 'alex@example.com', 'short').password)
  assert.deepEqual(validateCredentials('authentication', 'alex@example.com', 'short'), {})
  assert.deepEqual(validateCredentials('registration', 'alex@example.com', 'example-pass'), {})
})
test('failure never becomes confirmed completion or exposes a supplied identity', () => {
  for (const kind of ['authentication', 'registration']) {
    for (const scenario of ['rejected', 'unavailable']) {
      const result = simulatedOutcome(kind, scenario)
      assert.equal(result.status, 'failed')
      assert.equal('verificationRequired' in result, false)
    }
  }
})
test('verification-required registration is distinct from an active account', () => {
  assert.deepEqual(simulatedOutcome('registration', 'verification'), {
    status: 'complete',
    verificationRequired: true,
  })
  assert.deepEqual(simulatedOutcome('registration', 'success'), {
    status: 'complete',
    verificationRequired: false,
  })
  assert.deepEqual(simulatedOutcome('authentication', 'verification'), {
    status: 'complete',
    verificationRequired: false,
  })
})
