import { forwardRef, useEffect, useId, useRef, type InputHTMLAttributes } from 'react'

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string
  description?: string
  error?: string
  indeterminate?: boolean
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { id, label, description, error, indeterminate = false, className = '', ...props },
  forwardedRef,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const internalRef = useRef<HTMLInputElement>(null)
  const describedBy = [description ? `${inputId}-description` : '', error ? `${inputId}-error` : '']
    .filter(Boolean)
    .join(' ')

  useEffect(() => {
    if (internalRef.current) internalRef.current.indeterminate = indeterminate
  }, [indeterminate])

  const setRef = (element: HTMLInputElement | null) => {
    internalRef.current = element
    if (typeof forwardedRef === 'function') forwardedRef(element)
    else if (forwardedRef) forwardedRef.current = element
  }

  return (
    <div className={className}>
      <label
        className="inline-flex min-h-touch-target-min cursor-pointer items-start gap-space-3 text-body-sm text-text-primary"
        htmlFor={inputId}
      >
        <input
          {...props}
          ref={setRef}
          id={inputId}
          type="checkbox"
          aria-describedby={describedBy || undefined}
          aria-errormessage={error ? `${inputId}-error` : undefined}
          aria-invalid={Boolean(error)}
          className="peer sr-only"
        />
        <span
          className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-shape-sm border-2 border-border-strong bg-surface-primary text-action-primary-foreground peer-checked:border-action-primary-background-default peer-checked:bg-action-primary-background-default peer-indeterminate:border-action-primary-background-default peer-indeterminate:bg-action-primary-background-default peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus-ring peer-focus-visible:outline-solid peer-disabled:cursor-not-allowed peer-disabled:border-border-disabled peer-disabled:bg-background-disabled peer-checked:[&>svg]:block"
          aria-hidden="true"
        >
          {indeterminate ? (
            <span className="h-0.5 w-2.5 bg-current" />
          ) : (
            <svg
              className="hidden size-3.5"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path d="m3 8 3 3 7-7" />
            </svg>
          )}
        </span>
        <span className="grid gap-space-1">
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
      </label>
    </div>
  )
})
