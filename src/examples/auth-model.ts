export type AuthKind = 'authentication' | 'registration'
export type AuthScenario = 'success' | 'rejected' | 'unavailable' | 'verification'
export type AuthErrors = Partial<Record<'email' | 'password', string>>

export function validateCredentials(kind: AuthKind, email: string, password: string): AuthErrors {
  const errors: AuthErrors = {}
  if (!email.trim()) errors.email = 'Enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errors.email = 'Enter an email address such as alex@example.com.'
  if (!password) errors.password = 'Enter your password.'
  else if (kind === 'registration' && password.length < 12)
    errors.password = 'Use at least 12 characters for this example.'
  return errors
}

export function simulatedOutcome(kind: AuthKind, scenario: AuthScenario) {
  if (scenario === 'unavailable')
    return {
      status: 'failed' as const,
      message: 'The service is unavailable. Your entries are still here. Try again.',
    }
  if (scenario === 'rejected')
    return {
      status: 'failed' as const,
      message:
        kind === 'authentication'
          ? 'We could not sign you in with those details. Check your entries or reset your password.'
          : 'We could not create an account with those details. Check your entries or use the sign-in page to recover access.',
    }
  return {
    status: 'complete' as const,
    verificationRequired: kind === 'registration' && scenario === 'verification',
  }
}
