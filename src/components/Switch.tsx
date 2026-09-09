import { forwardRef, useId, type InputHTMLAttributes } from 'react'

export type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string
  description?: string
  error?: string
  busy?: boolean
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { id, label, description, error, busy = false, className = '', disabled, ...props },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className={className}>
      <label
        className="flex min-h-touch-target-min cursor-pointer items-center justify-between gap-lg"
        htmlFor={inputId}
      >
        <span className="grid gap-xs text-body-sm text-text-primary">
          <span className="font-semibold">{label}</span>
          {(description || error) && (
            <span
              id={`${inputId}-message`}
              className={`text-body-xs ${error ? 'text-text-danger' : 'text-text-secondary'}`}
            >
              {error ?? description}
            </span>
          )}
        </span>
        <input
          {...props}
          ref={ref}
          id={inputId}
          type="checkbox"
          role="switch"
          disabled={disabled || busy}
          aria-busy={busy || undefined}
          aria-describedby={description || error ? `${inputId}-message` : undefined}
          aria-invalid={Boolean(error)}
          className="peer sr-only"
        />
        <span
          className="relative h-xl w-control-height-lg shrink-0 rounded-full border-2 border-border-strong bg-background-tertiary transition peer-checked:border-action-primary-background-default peer-checked:bg-action-primary-background-default peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-focus-ring peer-disabled:border-border-disabled peer-disabled:bg-background-disabled after:absolute after:top-xxs after:left-xxs after:size-lg after:rounded-full after:bg-surface-primary after:transition-transform peer-checked:after:translate-x-5"
          aria-hidden="true"
        />
      </label>
    </div>
  )
})
