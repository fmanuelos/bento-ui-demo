import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Alert,
  AlertDialog,
  Button,
  CompletionSummary,
  FormSection,
  Input,
  Link,
  Modal,
  PageHeader,
  SectionHeader,
  Select,
  SkipLink,
} from '../components'
import {
  validateCredentials,
  simulatedOutcome,
  type AuthErrors,
  type AuthKind,
  type AuthScenario,
} from './auth-model'

export function AuthReferencePage({ kind }: { kind: AuthKind }) {
  const location = useLocation()
  return (
    <AuthReference
      key={`${kind}-${location.search}`}
      kind={kind}
      context={new URLSearchParams(location.search).get('context')}
    />
  )
}

function AuthReference({ kind, context }: { kind: AuthKind; context: string | null }) {
  const registration = kind === 'registration'
  const renewal = !registration && context === 'reauthentication'
  const invitation = registration && context === 'invitation'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [reveal, setReveal] = useState(false)
  const [errors, setErrors] = useState<AuthErrors>({})
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'editing' | 'invalid' | 'pending' | 'failed' | 'complete'>(
    'editing',
  )
  const [scenario, setScenario] = useState<AuthScenario>('success')
  const [verificationRequired, setVerificationRequired] = useState(false)
  const [exitTarget, setExitTarget] = useState<string | null>(null)
  const [recoveryOpen, setRecoveryOpen] = useState(false)
  const [recoverySent, setRecoverySent] = useState(false)
  const [dark, setDark] = useState(() => localStorage.getItem('bento-ui-admin-theme') === 'dark')
  const [largeText, setLargeText] = useState(false)
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr')
  const summaryRef = useRef<HTMLDivElement>(null)
  const resultRef = useRef<HTMLHeadingElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const locked = useRef(false)
  const leaving = useRef(false)
  const pending = status === 'pending'
  const complete = status === 'complete'
  const dirty = registration && !complete && Boolean(email || password)
  const title = registration ? 'Create your account' : renewal ? 'Sign in to continue' : 'Sign in'

  useEffect(() => {
    if (!largeText) return
    const root = document.documentElement
    const computed = getComputedStyle(root)
    const roles = Array.from(computed).filter(
      (name) => name.startsWith('--text-') && !name.slice(7).includes('--'),
    )
    const original = roles.map(
      (name) => [name, root.style.getPropertyValue(name), computed.getPropertyValue(name)] as const,
    )
    for (const [name, , value] of original) root.style.setProperty(name, `calc(${value} * 2)`)
    return () => {
      for (const [name, value] of original) {
        if (value) root.style.setProperty(name, value)
        else root.style.removeProperty(name)
      }
    }
  }, [largeText])
  useEffect(() => {
    document.title = `${title} — Bento UI reference`
  }, [title])
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('bento-ui-admin-theme', dark ? 'dark' : 'light')
  }, [dark])
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    [],
  )
  useEffect(() => {
    if (status === 'invalid' || status === 'failed') summaryRef.current?.focus()
    if (status === 'complete') resultRef.current?.focus()
  }, [status, errors])
  useEffect(() => {
    if (!dirty) return
    const beforeUnload = (event: BeforeUnloadEvent) => {
      if (!leaving.current) {
        event.preventDefault()
        event.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', beforeUnload)
    return () => window.removeEventListener('beforeunload', beforeUnload)
  }, [dirty])

  function requestExit(event: MouseEvent<HTMLAnchorElement>, target: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0)
      return
    event.preventDefault()
    if (dirty) setExitTarget(target)
    else window.location.assign(target)
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (locked.current || complete) return
    const nextErrors = validateCredentials(kind, email, password)
    setErrors(nextErrors)
    setMessage('')
    if (Object.keys(nextErrors).length) {
      setStatus('invalid')
      return
    }
    locked.current = true
    setStatus('pending')
    timer.current = setTimeout(() => {
      const outcome = simulatedOutcome(kind, scenario)
      locked.current = false
      if (outcome.status === 'failed') {
        setMessage(outcome.message)
        setStatus('failed')
      } else {
        setVerificationRequired(outcome.verificationRequired)
        setPassword('')
        setReveal(false)
        setStatus('complete')
      }
    }, 900)
  }

  const fields = (
    <>
      <Input
        id="account-email"
        name="username"
        label="Email address"
        type="email"
        autoComplete="username"
        autoCapitalize="none"
        spellCheck={false}
        required
        readOnly={pending}
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
        error={errors.email}
        announceError={false}
      />
      <Input
        id="account-password"
        name="password"
        label="Password"
        type={reveal ? 'text' : 'password'}
        autoComplete={registration ? 'new-password' : 'current-password'}
        required
        readOnly={pending}
        helperText={
          registration
            ? 'Use at least 12 characters for this example. You can paste a password.'
            : undefined
        }
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
        error={errors.password}
        announceError={false}
      />
      <Button
        variant="ghost"
        className="justify-self-start"
        aria-controls="account-password"
        aria-pressed={reveal}
        onClick={() => setReveal((value) => !value)}
      >
        {reveal ? 'Hide password' : 'Show password'}
      </Button>
    </>
  )

  return (
    <div dir={direction} className="min-h-screen bg-background-secondary text-text-primary">
      <SkipLink targetId="auth-content">Skip to account task</SkipLink>
      <aside
        aria-label="Reference preview controls"
        className="border-b border-border-secondary bg-surface-primary px-page-padding-mobile py-scale-4 sm:px-page-padding-tablet"
      >
        <div className="mx-auto flex max-w-container-page flex-wrap items-end gap-scale-4 [&>div]:max-w-full [&>div]:min-w-0">
          <div className="min-w-0 basis-full md:flex-1 md:basis-0">
            <p className="m-0 text-label-sm font-semibold">Bento UI · Reference preview</p>
            <p className="mt-scale-1 mb-0 text-body-sm text-text-secondary">
              Simulated outcomes. Use sample details; no account is created and no email is sent.
              Entries stay in memory until you leave or reload.
            </p>
          </div>
          <Select
            label="Submission outcome"
            value={scenario}
            disabled={pending || complete}
            onChange={(event) => setScenario(event.currentTarget.value as AuthScenario)}
            options={[
              { value: 'success', label: 'Success' },
              { value: 'rejected', label: 'Rejected details' },
              { value: 'unavailable', label: 'Service unavailable' },
              ...(registration ? [{ value: 'verification', label: 'Verification required' }] : []),
            ]}
          />
          <Select
            label="Reading direction"
            value={direction}
            onChange={(event) => setDirection(event.currentTarget.value as 'ltr' | 'rtl')}
            options={[
              { value: 'ltr', label: 'Left to right' },
              { value: 'rtl', label: 'Right to left' },
            ]}
          />
          <Button
            variant="outline"
            aria-pressed={largeText}
            onClick={() => setLargeText((value) => !value)}
          >
            200% text
          </Button>
          <Button variant="outline" aria-pressed={dark} onClick={() => setDark((value) => !value)}>
            Dark theme
          </Button>
        </div>
      </aside>
      <div className="mx-auto max-w-container-narrow px-page-padding-mobile py-scale-8 sm:px-page-padding-tablet">
        <div className="mb-scale-6 flex flex-wrap items-center justify-between gap-scale-3 text-body-sm">
          <span className="font-semibold">Bento</span>
          <Link href="/docs/templates" onClick={(event) => requestExit(event, '/docs/templates')}>
            Exit to templates
          </Link>
        </div>
        <main
          id="auth-content"
          tabIndex={-1}
          className="space-y-scale-6 rounded-shape-lg border border-border-secondary bg-surface-primary p-scale-5 sm:p-scale-8"
        >
          {!complete ? (
            <>
              <PageHeader
                title={title}
                headingRef={titleRef}
                headingTabIndex={-1}
                description={
                  registration
                    ? invitation
                      ? 'Accept your invitation to the Example team by creating an account.'
                      : 'Set up your account to get started.'
                    : renewal
                      ? 'Your session expired. Sign in again to return to your report.'
                      : 'Use your account details to continue.'
                }
              />
              {registration && (
                <section aria-labelledby="requirements-heading">
                  <SectionHeader
                    title="Before you begin"
                    headingId="requirements-heading"
                    description="Both fields are required. Keep access to this email address for account verification and recovery."
                  />
                </section>
              )}
              <form
                noValidate
                aria-label={registration ? 'Create account' : 'Sign in'}
                onSubmit={submit}
                className="grid gap-scale-5"
              >
                {(status === 'invalid' || status === 'failed') && (
                  <div
                    ref={summaryRef}
                    tabIndex={-1}
                    role="region"
                    aria-labelledby="account-error-title"
                  >
                    <Alert
                      variant="danger"
                      role="presentation"
                      title={
                        <span id="account-error-title">
                          {status === 'invalid' ? 'Check your details' : 'Unable to continue'}
                        </span>
                      }
                    >
                      {message && <p className="m-0">{message}</p>}
                      {Object.keys(errors).length > 0 && (
                        <ul className="m-0 list-disc ps-scale-5">
                          {Object.entries(errors).map(([field, error]) => (
                            <li key={field}>
                              <Link
                                href={`#account-${field}`}
                                onClick={(event) => {
                                  event.preventDefault()
                                  document.getElementById(`account-${field}`)?.focus()
                                }}
                              >
                                {error}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </Alert>
                  </div>
                )}
                {registration ? (
                  <FormSection title="Account details">{fields}</FormSection>
                ) : (
                  fields
                )}
                <p role="status" className="m-0 text-body-sm text-text-secondary">
                  {pending ? (registration ? 'Creating your account…' : 'Signing in…') : ''}
                </p>
                <Button
                  type="submit"
                  loading={pending}
                  loadingLabel={registration ? 'Creating account' : 'Signing in'}
                  className="w-full whitespace-normal"
                >
                  {registration ? 'Create account' : 'Sign in'}
                </Button>
                {!registration && (
                  <Button
                    variant="link"
                    disabled={pending}
                    onClick={() => {
                      setRecoverySent(false)
                      setRecoveryOpen(true)
                    }}
                  >
                    Forgot your password?
                  </Button>
                )}
              </form>
              <p className="m-0 text-body-sm text-text-secondary">
                {registration ? 'Already have an account? ' : 'New to Bento? '}
                <Link
                  href={registration ? '/examples/authentication' : '/examples/registration'}
                  onClick={(event) =>
                    requestExit(
                      event,
                      registration ? '/examples/authentication' : '/examples/registration',
                    )
                  }
                >
                  {registration ? 'Sign in' : 'Create an account'}
                </Link>
              </p>
            </>
          ) : registration ? (
            <CompletionSummary
              headingLevel={1}
              headingRef={resultRef}
              headingTabIndex={-1}
              title={
                verificationRequired
                  ? 'Account created — verify your email'
                  : 'Your account is ready'
              }
              description={
                verificationRequired
                  ? 'Your account was created, but access is waiting for email verification.'
                  : 'Your account has been created and you can now sign in.'
              }
              details={[{ id: 'email', label: 'Account email', value: email.trim() }]}
              nextSteps={
                verificationRequired
                  ? 'Follow the verification link sent to your email before signing in. Contact support if you cannot access that address.'
                  : 'Use your email address and password on the sign-in page.'
              }
              actions={<Link href="/examples/authentication">Continue to sign in</Link>}
            />
          ) : (
            <>
              <PageHeader
                title={renewal ? 'Your report is ready' : 'Welcome to your workspace'}
                headingRef={resultRef}
                headingTabIndex={-1}
                description={
                  renewal
                    ? 'Your session is renewed and you have returned to your report.'
                    : 'You are signed in.'
                }
              />
              <Link href="/docs/templates">Return to templates</Link>
            </>
          )}
        </main>
        {complete && (
          <Button
            variant="outline"
            className="mt-scale-5"
            onClick={() => {
              setEmail('')
              setPassword('')
              setErrors({})
              setMessage('')
              setStatus('editing')
              requestAnimationFrame(() => titleRef.current?.focus())
            }}
          >
            Start another preview
          </Button>
        )}
      </div>
      <AlertDialog
        open={exitTarget !== null}
        onClose={() => setExitTarget(null)}
        title="Leave account creation?"
        description="Your entered details will be discarded. You can keep editing instead."
        confirmLabel="Discard and leave"
        cancelLabel="Keep editing"
        onConfirm={() => {
          if (timer.current) clearTimeout(timer.current)
          locked.current = false
          leaving.current = true
          window.location.assign(exitTarget ?? '/docs/templates')
        }}
      />
      <Modal
        open={recoveryOpen}
        onClose={() => setRecoveryOpen(false)}
        title="Reset your password"
        description="Use your account email to request recovery instructions."
      >
        {recoverySent ? (
          <p role="status">
            If an account matches that address, follow its recovery instructions to reset your
            password.
          </p>
        ) : (
          <form
            className="grid gap-scale-4"
            onSubmit={(event) => {
              event.preventDefault()
              setRecoverySent(true)
            }}
          >
            <Input
              label="Recovery email"
              name="recovery-email"
              type="email"
              autoComplete="email"
              required
              defaultValue={email}
            />
            <Button type="submit">Send recovery link</Button>
          </form>
        )}
      </Modal>
    </div>
  )
}
