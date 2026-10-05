import { Button } from './Button'

export type FlowStep = {
  id: string
  label: string
  status: 'current' | 'completed' | 'available' | 'blocked' | 'skipped'
  description?: string
  onActivate?: () => void
}
export type FlowStepNavigationProps = {
  label: string
  steps: readonly FlowStep[]
  busy?: boolean
}

/** The workflow supplies eligibility; this block never infers completion from position. */
export function FlowStepNavigation({ label, steps, busy = false }: FlowStepNavigationProps) {
  return (
    <nav aria-label={label}>
      <ol className="m-0 flex list-none flex-wrap gap-scale-3 p-0">
        {steps.map((step, index) => (
          <li
            key={step.id}
            aria-current={step.status === 'current' ? 'step' : undefined}
            className="max-w-full min-w-0 rounded-shape-md border border-border-secondary p-scale-3 break-words"
          >
            {step.onActivate && step.status !== 'blocked' && step.status !== 'current' ? (
              <Button type="button" variant="link" disabled={busy} onClick={step.onActivate}>
                {index + 1}. {step.label}
              </Button>
            ) : (
              <span className="font-semibold text-text-primary">
                {index + 1}. {step.label}
              </span>
            )}
            <span className="block text-body-sm text-text-secondary">
              {step.status === 'current'
                ? 'Current step'
                : step.status.charAt(0).toUpperCase() + step.status.slice(1)}
            </span>
            {step.description && (
              <span className="block max-w-container-narrow text-body-sm text-text-secondary">
                {step.description}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
