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
          aria-describedby={description || error ? `${inputId}-message` : undefined}
          aria-invalid={Boolean(error)}
          className="peer sr-only"
        />
        <span
          className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-sm border-2 border-border-strong bg-surface-primary text-action-primary-foreground peer-checked:border-action-primary-background-default peer-checked:bg-action-primary-background-default peer-indeterminate:border-action-primary-background-default peer-indeterminate:bg-action-primary-background-default peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-focus-ring peer-disabled:cursor-not-allowed peer-disabled:border-border-disabled peer-disabled:bg-background-disabled peer-checked:[&>svg]:block"
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
          {(description || error) && (
            <span
              id={`${inputId}-message`}
              className={`text-body-xs ${error ? 'text-text-danger' : 'text-text-secondary'}`}
            >
              {error ?? description}
            </span>
          )}
        </span>
      </label>
    </div>
  )
})
