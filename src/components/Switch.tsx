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
  const describedBy = [description ? `${inputId}-description` : '', error ? `${inputId}-error` : '']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={className}>
      <label
        className="flex min-h-touch-target-min cursor-pointer items-center justify-between gap-space-4"
        htmlFor={inputId}
      >
        <span className="grid gap-space-1 text-body-sm text-text-primary">
          <span className="font-semibold">{label}</span>
          {description && (
            <span id={`${inputId}-description`} className="text-body-xs text-text-secondary">
              {description}
            </span>
          )}
          {error && (
            <span id={`${inputId}-error`} className="text-body-xs text-text-danger">
              {error}
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
          aria-describedby={describedBy || undefined}
          aria-errormessage={error ? `${inputId}-error` : undefined}
          aria-invalid={Boolean(error)}
          className="peer sr-only"
        />
        <span
          className="relative h-space-6 w-control-height-medium shrink-0 rounded-shape-full border-2 border-border-strong bg-background-tertiary transition peer-checked:border-action-primary-background-default peer-checked:bg-action-primary-background-default peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus-ring peer-focus-visible:outline-solid peer-disabled:border-border-disabled peer-disabled:bg-background-disabled after:absolute after:top-space-1 after:left-space-1 after:size-space-4 after:rounded-shape-full after:bg-surface-primary after:transition-transform peer-checked:after:translate-x-5"
          aria-hidden="true"
        />
      </label>
    </div>
  )
})
