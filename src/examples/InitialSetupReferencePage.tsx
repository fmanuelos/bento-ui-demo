import { useEffect, useReducer, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  AlertDialog,
  Button,
  CompletionSummary,
  FlowStepNavigation,
  FormSection,
  Input,
  DateInput,
  Link,
  PageHeader,
  Progress,
  ReviewSummary,
  Select,
} from '../components'
import { formatCalendarDate, validateDate } from '../components/date-input-model'
import { BatchReferenceFrame } from './BatchReferenceFrame'
import { initialSetup, setupReducer, type SetupOutcome } from './setup-model'

export function InitialSetupReferencePage() {
  const location = useLocation()
  const project = new URLSearchParams(location.search).get('context') === 'project'
  return <Setup key={project ? 'project' : 'organization'} project={project} />
}

function Setup({ project }: { project: boolean }) {
  const [state, dispatch] = useReducer(setupReducer, initialSetup)
  const [outcome, setOutcome] = useState<SetupOutcome>('success')
  const [leaving, setLeaving] = useState(false)
  const heading = useRef<HTMLHeadingElement>(null)
  const errors = useRef<HTMLDivElement>(null)
  const exitButton = useRef<HTMLButtonElement>(null)
  const navigate = useNavigate()
  const kind = project ? 'project' : 'organization'
  const dirty =
    state.phase !== 'complete' &&
    (!!state.name || !!state.targetDate || state.phase !== 'configure')
  useEffect(() => {
    if (state.phase !== 'pending') return
    const timer = window.setTimeout(
      () => dispatch({ type: 'resolve', attempt: state.attempt, outcome }),
      900,
    )
    return () => window.clearTimeout(timer)
  }, [state.phase, state.attempt, outcome])
  useEffect(() => {
    if (state.phase !== 'pending') heading.current?.focus()
  }, [state.phase])
  useEffect(() => {
    if (state.error) errors.current?.focus()
  }, [state.error])
  useEffect(() => {
    if (!dirty) return
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])
  const titles = {
    configure: `Configure your ${kind}`,
    review: 'Review setup',
    pending: 'Setting up',
    failed: 'Setup did not start',
    partial: 'Resource created; defaults incomplete',
    unknown: 'Setup outcome unknown',
    complete: 'Setup complete',
  }
  return (
    <BatchReferenceFrame
      title={`${kind} setup`}
      note="Simulated provisioning only. Nothing is created remotely. State lives in memory; reload or leaving resets this preview. Browser departure warnings are best effort."
      controls={
        <>
          <Select
            label="Setup outcome"
            value={outcome}
            disabled={
              state.phase === 'pending' || state.phase === 'unknown' || state.phase === 'complete'
            }
            onChange={(event) => setOutcome(event.target.value as SetupOutcome)}
            options={[
              { value: 'success', label: 'Successful setup' },
              { value: 'failure', label: 'Failure before creation / retry failure' },
              { value: 'partial', label: 'Created, defaults failed' },
              { value: 'unknown', label: 'Unknown response' },
            ]}
          />
          <Link href={`/examples/initial-setup?context=${project ? 'organization' : 'project'}`}>
            Open {project ? 'organization' : 'project'} context
          </Link>
        </>
      }
    >
      <PageHeader
        title={`Set up a new ${kind}`}
        description="Choose the initial configuration, review it, then create the resource and apply its defaults."
      />
      <FlowStepNavigation
        label="Setup steps"
        busy={state.phase === 'pending'}
        steps={[
          {
            id: 'configure',
            label: 'Configuration',
            status: state.phase === 'configure' ? 'current' : 'completed',
            onActivate: state.phase === 'review' ? () => dispatch({ type: 'back' }) : undefined,
          },
          {
            id: 'review',
            label: 'Review',
            status:
              state.phase === 'configure'
                ? 'blocked'
                : state.phase === 'review'
                  ? 'current'
                  : 'completed',
          },
          {
            id: 'result',
            label: 'Provisioning result',
            status: ['configure', 'review'].includes(state.phase) ? 'blocked' : 'current',
          },
        ]}
      />
      <h2 ref={heading} tabIndex={-1} className="m-0 text-heading-lg font-semibold break-words">
        {titles[state.phase]}
      </h2>
      {state.phase === 'configure' && (
        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault()
            dispatch({ type: 'review' })
          }}
          className="space-y-scale-5"
        >
          {state.error && (
            <div
              ref={errors}
              tabIndex={-1}
              role="region"
              aria-label="Correct setup details"
              className="space-y-scale-2"
            >
              <p>{state.error}</p>
              <Link
                href={
                  validateDate(state.targetDate ?? '', {
                    min: '2026-10-01',
                    max: '2027-12-31',
                    badInput: state.dateBadInput,
                  })
                    ? '#setup-target-date'
                    : '#setup-name'
                }
              >
                Check configuration
              </Link>
            </div>
          )}
          <FormSection
            title="Initial configuration"
            description="This preview offers two fictional hosting regions."
          >
            <Input
              id="setup-name"
              label={`${project ? 'Project' : 'Organization'} name`}
              maxLength={80}
              value={state.name}
              required
              error={
                state.error && !state.name.trim()
                  ? 'A name is required (maximum 80 characters).'
                  : undefined
              }
              announceError={false}
              onChange={(event) =>
                dispatch({ type: 'edit', field: 'name', value: event.target.value })
              }
            />
            {project && (
              <DateInput
                id="setup-target-date"
                label="Target launch date (optional)"
                value={state.targetDate ?? ''}
                min="2026-10-01"
                max="2027-12-31"
                error={
                  state.error
                    ? validateDate(state.targetDate ?? '', {
                        min: '2026-10-01',
                        max: '2027-12-31',
                        badInput: state.dateBadInput,
                      })
                    : undefined
                }
                announceError={false}
                helperText="Planning date only; provisioning still starts immediately. Sample bounds: October 1, 2026 to December 31, 2027."
                onValueChange={(value, badInput) => dispatch({ type: 'date', value, badInput })}
              />
            )}
            <Select
              label="Hosting region"
              value={state.region}
              options={[
                { value: 'us', label: 'United States' },
                { value: 'eu', label: 'European Union' },
              ]}
              onChange={(event) =>
                dispatch({ type: 'edit', field: 'region', value: event.target.value })
              }
            />
          </FormSection>
          <Button type="submit">Review configuration</Button>
        </form>
      )}
      {state.phase === 'review' && (
        <>
          <ReviewSummary
            title="Configuration to create"
            groups={[
              {
                id: 'resource',
                title: `New ${kind}`,
                values: [
                  { id: 'name', label: 'Name', value: state.name },
                  ...(project
                    ? [
                        {
                          id: 'target-date',
                          label: 'Target launch date (planning only)',
                          value: formatCalendarDate(state.targetDate ?? ''),
                        },
                      ]
                    : []),
                  {
                    id: 'region',
                    label: 'Hosting region',
                    value: state.region === 'us' ? 'United States' : 'European Union',
                  },
                ],
                correction: (
                  <Button variant="outline" onClick={() => dispatch({ type: 'back' })}>
                    Edit configuration
                  </Button>
                ),
              },
            ]}
            consequences="Create applies the reviewed configuration. After creation, a retry only applies unfinished defaults. This preview provides no rollback."
          />
          <Button onClick={() => dispatch({ type: 'start' })}>Create {kind}</Button>
        </>
      )}
      <div role="status" aria-live="polite">
        {state.phase === 'pending'
          ? state.resourceId
            ? 'Retrying unfinished defaults on the existing resource…'
            : 'Creating resource and applying defaults…'
          : ''}
      </div>
      {state.phase === 'pending' && <Progress label="Provisioning" />}
      {state.phase === 'failed' && (
        <>
          <p>No resource was created. Your configuration is preserved.</p>
          <div className="flex flex-wrap gap-scale-3">
            <Button onClick={() => dispatch({ type: 'start' })}>Retry setup</Button>
            <Button variant="outline" onClick={() => dispatch({ type: 'back' })}>
              Edit configuration
            </Button>
          </div>
        </>
      )}
      {state.phase === 'partial' && (
        <>
          <p>
            Resource <bdi>{state.resourceId}</bdi> exists, but its defaults are incomplete.
            Configuration is locked. Retrying reuses this resource; it cannot create a duplicate.
          </p>
          <Button onClick={() => dispatch({ type: 'start' })}>Retry unfinished defaults</Button>
        </>
      )}
      {state.phase === 'unknown' && (
        <>
          <p>
            The response was lost. Creation may have succeeded. Do not submit again. Checking the
            result below simulates confirmation of success.
          </p>
          <Button onClick={() => dispatch({ type: 'reconcile' })}>Check simulated result</Button>
        </>
      )}
      {state.phase === 'complete' && (
        <CompletionSummary
          title="Resource ready"
          description="The simulated resource exists and its defaults are applied. No real organization or project was created."
          details={[
            { id: 'resource', label: 'Preview resource ID', value: state.resourceId },
            { id: 'name', label: 'Name', value: state.name },
          ]}
          nextSteps={
            <Link href="/docs/templates/initial-setup">Read the Initial Setup contract</Link>
          }
        />
      )}
      <Button
        ref={exitButton}
        variant="outline"
        onClick={() => (dirty ? setLeaving(true) : navigate('/docs/templates'))}
      >
        Leave setup
      </Button>
      <AlertDialog
        open={leaving}
        onClose={() => setLeaving(false)}
        onConfirm={() => navigate('/docs/templates')}
        returnFocusRef={exitButton}
        title="Leave this setup preview?"
        description="Unsaved configuration and simulated results will be lost. Leaving is not a rollback of work already created in a real product."
        confirmLabel="Leave preview"
        cancelLabel="Keep working"
      />
    </BatchReferenceFrame>
  )
}
