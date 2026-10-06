import { ReferenceAppearanceControls } from './ReferenceAppearanceControls'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useLocation } from 'react-router-dom'
import {
  AlertDialog,
  Button,
  CompletionSummary,
  FlowStepNavigation,
  FormSection,
  Input,
  DateInput,
  FileUpload,
  useFileUploads,
  Link,
  PageHeader,
  ReviewSummary,
  Select,
  SkipLink,
} from '../components'
import { attachmentConstraints, simulateUpload, failUpload } from './upload-demo'
import { formatCalendarDate } from '../components/date-input-model'
import {
  initialJourney,
  journeyReducer,
  restoreJourney,
  saveJourney,
  type JourneyAction,
  type JourneyKind,
} from './journey-model'

export function JourneyReferencePage({ kind }: { kind: JourneyKind }) {
  const location = useLocation()
  const requested = new URLSearchParams(location.search).get('context')
  const context =
    kind === 'onboarding'
      ? requested === 'invited'
        ? 'invited'
        : 'individual'
      : requested === 'service'
        ? 'service'
        : 'membership'
  return <JourneyReference key={`${kind}-${context}`} kind={kind} context={context} />
}
function JourneyReference({ kind, context }: { kind: JourneyKind; context: string }) {
  const service = kind === 'application' && context === 'service'
  const [uploadFailure, setUploadFailure] = useState(false)
  const uploads = useFileUploads(attachmentConstraints, uploadFailure ? failUpload : simulateUpload)
  const attachmentsReady =
    uploads.items.length > 0 && uploads.items.every((item) => item.status === 'uploaded')
  const key = `bento-example-${kind}-${context}`
  const [storedState, setState] = useState(() => initialJourney(kind, service))
  const state = {
    ...storedState,
    attachmentsReady,
    reached: service && !attachmentsReady ? Math.min(storedState.reached, 1) : storedState.reached,
  }
  const [draft, setDraft] = useState(() => {
    try {
      return restoreJourney(sessionStorage.getItem(key), kind, context, Date.now())
    } catch {
      return null
    }
  })
  const [saved, setSaved] = useState('')
  const [notice, setNotice] = useState('')
  const [noticeSnapshot, setNoticeSnapshot] = useState<string | null>(null)
  const [outcome, setOutcome] = useState<'success' | 'failed' | 'unknown'>('success')
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr')
  const [exitOpen, setExitOpen] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const resultRef = useRef<HTMLHeadingElement>(null)
  const errorsRef = useRef<HTMLDivElement>(null)
  const exitRef = useRef<HTMLButtonElement>(null)
  const leaving = useRef(false)
  const blocked = ['pending', 'unknown', 'complete'].includes(state.status)
  const signature = JSON.stringify({
    values: state.values,
    step: state.step,
    skipped: state.skipped,
  })
  const dirty =
    state.status !== 'complete' &&
    (uploads.items.length > 0 ||
      (signature !== saved &&
        (state.step > 0 ||
          state.skipped ||
          JSON.stringify(state.values) !== JSON.stringify(initialJourney(kind, service).values))))
  const onboarding = kind === 'onboarding'
  const title = onboarding
    ? 'Set up your profile'
    : context === 'service'
      ? 'Apply for a service'
      : 'Apply for membership'
  const steps = ['Your details', onboarding ? 'Preferences' : 'Application details', 'Review']
  const dispatch = (action: JourneyAction) =>
    setState((previous) =>
      journeyReducer({ ...previous, attachmentsReady, reached: state.reached }, action),
    )
  useEffect(() => {
    document.title = `${title} — Bento UI reference`
  }, [title])
  useEffect(() => {
    headingRef.current?.focus()
  }, [state.step])
  useEffect(() => {
    if (Object.keys(state.errors).length) errorsRef.current?.focus()
  }, [state.errors])
  useEffect(() => {
    if (state.status === 'complete') {
      resultRef.current?.focus()
      try {
        sessionStorage.removeItem(key)
      } catch {
        /* The confirmed result remains visible if storage is unavailable. */
      }
    }
  }, [state.status, key])
  useEffect(() => {
    if (state.status !== 'pending') return
    const timer = setTimeout(
      () => setState((previous) => journeyReducer(previous, { type: 'resolve', outcome })),
      900,
    )
    return () => clearTimeout(timer)
  }, [state.status, outcome])
  useEffect(() => {
    if (!dirty && state.status !== 'pending' && state.status !== 'unknown') return
    const handler = (event: BeforeUnloadEvent) => {
      if (!leaving.current) {
        event.preventDefault()
        event.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [dirty, state.status])
  function showNotice(message: string, snapshot: string | null = null) {
    setNotice(message)
    setNoticeSnapshot(snapshot)
  }
  function saveDraft(now: number) {
    if (state.status === 'failed') dispatch({ type: 'go', step: state.step })
    try {
      sessionStorage.setItem(key, saveJourney(state, context, now))
      setSaved(signature)
      setDraft(null)
      showNotice(
        service
          ? 'Sample draft saved for one hour. Files and upload receipts are not saved; reselect and upload them after restoring.'
          : 'Sample draft saved in this tab for one hour. It is not stored on a server.',
        signature,
      )
    } catch {
      showNotice('The sample draft could not be saved. Your entered values remain here.')
    }
  }
  function submit(event: FormEvent) {
    event.preventDefault()
    dispatch({ type: state.step === 2 ? 'submit' : 'next' })
  }
  function exit() {
    if (dirty || state.status === 'pending' || state.status === 'unknown') setExitOpen(true)
    else {
      leaving.current = true
      window.location.assign('/docs/templates')
    }
  }
  const correction = (step: number, label: string) => (
    <Button
      type="button"
      variant="link"
      disabled={blocked}
      onClick={() => dispatch({ type: 'go', step })}
    >
      {label}
    </Button>
  )
  return (
    <div
      dir={direction}
      className="min-h-screen bg-background-primary text-text-primary [&_button]:h-auto [&_button]:min-h-control-height-medium [&_button]:max-w-full [&_button]:py-scale-2 [&_button]:whitespace-normal"
    >
      <SkipLink targetId="journey-content">Skip to task</SkipLink>
      <aside
        aria-label="Reference preview controls"
        className="border-b border-border-secondary bg-surface-secondary p-scale-4"
      >
        <div className="mx-auto grid max-w-container-page gap-scale-3">
          <p className="m-0 text-body-sm">
            Reference preview · Use sample values. No account, application, or message is created.
            Explicitly saved drafts remain in this browser tab for one hour.
            {service &&
              ' Uploads are simulated locally. Files are never sent or saved; use sample documents. Date bounds are fixed demo dates.'}
          </p>
          <div className="flex flex-wrap gap-scale-4">
            <ReferenceAppearanceControls />
            {service && (
              <Select
                label="Upload scenario"
                value={uploadFailure ? 'failed' : 'success'}
                disabled={blocked || uploads.items.some((item) => item.status === 'uploading')}
                onChange={(event) => setUploadFailure(event.target.value === 'failed')}
                options={[
                  { value: 'success', label: 'Success' },
                  { value: 'failed', label: 'Failure' },
                ]}
              />
            )}
            <Select
              label="Simulated submission outcome"
              value={outcome}
              disabled={blocked}
              onChange={(event) => setOutcome(event.target.value as typeof outcome)}
              options={[
                { value: 'success', label: 'Success' },
                { value: 'failed', label: 'Service failure' },
                { value: 'unknown', label: 'Unknown result' },
              ]}
            />
            <Select
              label="Reading direction"
              value={direction}
              onChange={(event) => setDirection(event.target.value as 'ltr' | 'rtl')}
              options={[
                { value: 'ltr', label: 'Left to right' },
                { value: 'rtl', label: 'Right to left' },
              ]}
            />
            <Link
              href={
                onboarding
                  ? `/examples/account-onboarding?context=${context === 'invited' ? 'individual' : 'invited'}`
                  : `/examples/application-submission?context=${context === 'service' ? 'membership' : 'service'}`
              }
            >
              Open{' '}
              {onboarding
                ? context === 'invited'
                  ? 'individual'
                  : 'invited-user'
                : context === 'service'
                  ? 'membership'
                  : 'service'}{' '}
              context
            </Link>
          </div>
        </div>
      </aside>
      <main
        id="journey-content"
        className="mx-auto max-w-container-readable space-y-scale-6 px-page-padding-mobile py-scale-8 sm:px-page-padding-tablet"
      >
        <div className="flex flex-wrap items-center justify-between gap-scale-3">
          <span className="font-semibold">Bento examples</span>
          <Button ref={exitRef} variant="link" onClick={exit}>
            Exit to templates
          </Button>
        </div>
        <PageHeader
          title={title}
          description={
            onboarding
              ? context === 'invited'
                ? 'Complete a profile for the Example team. This preview does not validate an invitation.'
                : 'Choose how your sample profile appears.'
              : 'Review a sample application before submitting it. A receipt does not mean approval.'
          }
        />
        {draft && state.status !== 'complete' && (
          <section
            aria-label="Saved sample draft"
            className="space-y-scale-3 rounded-shape-md border border-border-secondary p-scale-4"
          >
            <p>
              A saved sample draft is available for this context. Resuming replaces values currently
              entered here.
            </p>
            <Button
              disabled={blocked}
              onClick={() => {
                let restored = null
                try {
                  restored = restoreJourney(sessionStorage.getItem(key), kind, context, Date.now())
                } catch {
                  /* Storage may have become unavailable. */
                }
                if (!restored) {
                  setDraft(null)
                  showNotice(
                    'This draft expired or is unavailable. Your current entries are unchanged.',
                  )
                  return
                }
                uploads.reset()
                setState(restored)
                requestAnimationFrame(() => headingRef.current?.focus())
                setSaved(
                  JSON.stringify({
                    values: restored.values,
                    step: restored.step,
                    skipped: restored.skipped,
                  }),
                )
                setDraft(null)
                showNotice(
                  service
                    ? 'Draft restored. Review the date and reselect/upload your supporting document; no files were restored.'
                    : 'Sample draft restored. Review the values before continuing.',
                  JSON.stringify({
                    values: restored.values,
                    step: restored.step,
                    skipped: restored.skipped,
                  }),
                )
              }}
            >
              Resume saved draft
            </Button>
            <Button
              variant="outline"
              disabled={blocked}
              onClick={() => {
                try {
                  sessionStorage.removeItem(key)
                  setDraft(null)
                } catch {
                  showNotice('The saved draft could not be removed.')
                }
              }}
            >
              Discard saved sample draft
            </Button>
          </section>
        )}
        {state.status === 'complete' ? (
          <CompletionSummary
            headingRef={resultRef}
            headingTabIndex={-1}
            title={onboarding ? 'Profile setup complete' : 'Application received'}
            description={
              onboarding
                ? 'The simulated profile is ready. No real profile was changed.'
                : 'The simulated submission has a receipt and is awaiting review. No real application was sent.'
            }
            details={[
              {
                id: 'reference',
                label: 'Sample reference',
                value: onboarding ? 'PROFILE-EXAMPLE' : 'APPLICATION-EXAMPLE',
              },
            ]}
            nextSteps={
              onboarding
                ? 'You can return to the template catalog.'
                : 'A real product supplies review timing and a way to retrieve this receipt.'
            }
            actions={<Link href="/docs/templates">Return to templates</Link>}
          />
        ) : (
          <>
            <FlowStepNavigation
              label="Task steps"
              busy={blocked}
              steps={steps.map((label, index) => ({
                id: String(index),
                label,
                status:
                  index === state.step
                    ? 'current'
                    : index === 1 && state.skipped
                      ? 'skipped'
                      : index < state.step
                        ? 'completed'
                        : index <= state.reached
                          ? 'available'
                          : 'blocked',
                description:
                  index === 1 && onboarding ? 'Optional; you can skip this step.' : undefined,
                onActivate:
                  index <= state.reached ? () => dispatch({ type: 'go', step: index }) : undefined,
              }))}
            />
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="text-heading-lg font-semibold break-words"
            >
              {steps[state.step]}
            </h2>
            {Object.keys(state.errors).length > 0 && (
              <div
                ref={errorsRef}
                role="region"
                aria-labelledby="journey-error-heading"
                tabIndex={-1}
                className="rounded-shape-md border border-border-danger p-scale-4"
              >
                <p id="journey-error-heading" className="font-semibold">
                  Check the following fields
                </p>
                <ul>
                  {Object.entries(state.errors).map(([field, error]) => (
                    <li key={field}>
                      <Link
                        href={`#journey-${field}`}
                        onClick={(event) => {
                          event.preventDefault()
                          document.getElementById(`journey-${field}`)?.focus()
                        }}
                      >
                        {error}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <form
              aria-label={title}
              noValidate
              onSubmit={submit}
              className="grid grid-cols-1 gap-scale-5"
            >
              {state.step === 0 && (
                <FormSection title="Profile details">
                  <Input
                    id="journey-name"
                    label="Sample display name"
                    required
                    maxLength={200}
                    value={state.values.name}
                    error={state.errors.name}
                    announceError={false}
                    onChange={(event) =>
                      dispatch({ type: 'edit', field: 'name', value: event.target.value })
                    }
                  />
                </FormSection>
              )}
              {state.step === 1 && (
                <FormSection title={onboarding ? 'Optional preferences' : 'Applicant details'}>
                  {onboarding ? (
                    <Input
                      label="Preferred topic (optional)"
                      maxLength={200}
                      value={state.values.preference}
                      onChange={(event) =>
                        dispatch({ type: 'edit', field: 'preference', value: event.target.value })
                      }
                    />
                  ) : (
                    <>
                      {service && (
                        <>
                          <DateInput
                            id="journey-startDate"
                            label="Preferred service start date"
                            required
                            value={state.values.startDate}
                            min="2026-10-01"
                            max="2027-12-31"
                            error={state.errors.startDate}
                            announceError={false}
                            onValueChange={(value, badInput) =>
                              dispatch({ type: 'date', value, badInput })
                            }
                            helperText="Sample dates: October 1, 2026 through December 31, 2027. This is a preference, not a confirmed appointment."
                          />
                          <FileUpload
                            id="journey-attachments"
                            label="Supporting documents"
                            required
                            constraints={attachmentConstraints}
                            {...uploads}
                            error={state.errors.attachments}
                            announceError={false}
                            description="At least one completed upload is required. Local simulation only; removing a file detaches it from this sample application."
                          />
                        </>
                      )}
                      <Select
                        label="Applying as"
                        value={state.values.audience}
                        helperText="Changing applicant type clears the organization name and requires renewed review."
                        onChange={(event) =>
                          dispatch({ type: 'edit', field: 'audience', value: event.target.value })
                        }
                        options={[
                          { value: 'individual', label: 'Individual' },
                          { value: 'organization', label: 'Organization' },
                        ]}
                      />
                      {state.values.audience === 'organization' && (
                        <Input
                          id="journey-organization"
                          label="Organization name"
                          required
                          maxLength={200}
                          value={state.values.organization}
                          error={state.errors.organization}
                          announceError={false}
                          onChange={(event) =>
                            dispatch({
                              type: 'edit',
                              field: 'organization',
                              value: event.target.value,
                            })
                          }
                        />
                      )}
                    </>
                  )}
                </FormSection>
              )}
              {state.step === 2 && (
                <ReviewSummary
                  title="Check your information"
                  headingLevel={3}
                  groups={[
                    {
                      id: 'profile',
                      title: 'Profile',
                      values: [{ id: 'name', label: 'Display name', value: state.values.name }],
                      correction: correction(0, 'Change profile details'),
                    },
                    {
                      id: 'details',
                      title: onboarding ? 'Preferences' : 'Applicant',
                      values: onboarding
                        ? [
                            {
                              id: 'preference',
                              label: 'Preferred topic',
                              value:
                                state.values.preference ||
                                (state.skipped ? 'Skipped' : 'Not provided'),
                            },
                          ]
                        : [
                            ...(service
                              ? [
                                  {
                                    id: 'date',
                                    label: 'Preferred start date',
                                    value: formatCalendarDate(state.values.startDate),
                                  },
                                  {
                                    id: 'attachments',
                                    label: 'Supporting documents',
                                    value: uploads.items
                                      .map((item) => `${item.name} (${item.status})`)
                                      .join(', '),
                                  },
                                ]
                              : []),
                            {
                              id: 'audience',
                              label: 'Applicant type',
                              value: state.values.audience,
                            },
                            {
                              id: 'organization',
                              label: 'Organization',
                              value: state.values.organization || 'Not applicable',
                            },
                          ],
                      correction: correction(
                        1,
                        onboarding ? 'Change preferences' : 'Change applicant details',
                      ),
                    },
                  ]}
                  consequences={
                    onboarding
                      ? 'Finishing confirms only this simulated profile setup.'
                      : 'Submitting produces a sample receipt. It does not imply approval or send information to a service.'
                  }
                />
              )}
              <div role="status" className="text-body-md text-text-secondary">
                {state.status === 'pending'
                  ? 'Submitting the sample…'
                  : state.status === 'failed'
                    ? 'The service simulation failed. Your values are retained; you can retry.'
                    : state.status === 'unknown'
                      ? 'The outcome is unknown. Check the result before attempting another submission.'
                      : noticeSnapshot && signature !== noticeSnapshot
                        ? 'Changes since your last saved draft are unsaved.'
                        : notice}
              </div>
              {state.status === 'unknown' ? (
                <Button
                  type="button"
                  className="justify-self-start"
                  onClick={() => dispatch({ type: 'reconcile' })}
                >
                  Check simulated result
                </Button>
              ) : (
                <div className="flex flex-wrap gap-scale-3">
                  <Button type="submit" disabled={blocked}>
                    {state.step === 2
                      ? onboarding
                        ? 'Finish setup'
                        : 'Submit application'
                      : 'Continue'}
                  </Button>
                  {state.step > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      disabled={blocked}
                      onClick={() => dispatch({ type: 'go', step: state.step - 1 })}
                    >
                      Back
                    </Button>
                  )}
                  {onboarding && state.step === 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => dispatch({ type: 'skip' })}
                    >
                      Skip preferences
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    disabled={blocked}
                    onClick={() => saveDraft(Date.now())}
                  >
                    Save sample draft
                  </Button>
                </div>
              )}
            </form>
          </>
        )}
      </main>
      <AlertDialog
        open={exitOpen}
        onClose={() => setExitOpen(false)}
        returnFocusRef={exitRef}
        title="Leave this sample task?"
        description="Unsaved entries will be lost. An explicitly saved draft remains available in this tab until it expires. Leaving does not prove an unknown submission was cancelled."
        confirmLabel="Leave task"
        cancelLabel="Keep editing"
        onConfirm={() => {
          leaving.current = true
          window.location.assign('/docs/templates')
        }}
      />
    </div>
  )
}
