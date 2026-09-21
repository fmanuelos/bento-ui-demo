import { forwardRef, useEffect, useId, useRef, type InputHTMLAttributes } from 'react'
import { CheckboxIndicator } from './internal/CheckboxIndicator'

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string
  description?: string
  error?: string
  indeterminate?: boolean
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    id,
    label,
    description,
    error,
    indeterminate = false,
    className = '',
    disabled,
    'aria-describedby': externalDescribedBy,
    'aria-labelledby': externalLabelledBy,
    ...props
  },
  forwardedRef,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const labelId = `${inputId}-label`
  const descriptionId = `${inputId}-description`
  const errorId = `${inputId}-error`
  const internalRef = useRef<HTMLInputElement>(null)
  const labelledBy = [labelId, externalLabelledBy].filter(Boolean).join(' ')
  const describedBy = [externalDescribedBy, description ? descriptionId : '', error ? errorId : '']
    .filter(Boolean)
    .join(' ')

  useEffect(() => {
    if (internalRef.current) internalRef.current.indeterminate = indeterminate
  })

  const setRef = (element: HTMLInputElement | null) => {
    internalRef.current = element
    if (typeof forwardedRef === 'function') forwardedRef(element)
    else if (forwardedRef) forwardedRef.current = element
  }

  return (
    <div className={className}>
      <label
        className={`inline-flex min-h-touch-target-min items-start gap-scale-3 text-body-sm ${
          disabled ? 'cursor-not-allowed text-text-disabled' : 'cursor-pointer text-text-primary'
        }`}
        htmlFor={inputId}
      >
        <input
          {...props}
          ref={setRef}
          id={inputId}
          type="checkbox"
          disabled={disabled}
          aria-labelledby={labelledBy}
          aria-describedby={describedBy || undefined}
          aria-errormessage={error ? errorId : undefined}
          aria-invalid={Boolean(error)}
          className="peer sr-only"
        />
        <CheckboxIndicator peerControlled className="mt-0.5" />
        <span className="grid gap-scale-1">
          <span id={labelId} className="font-semibold">
            {label}
          </span>
          {description && (
            <span
              id={descriptionId}
              className={`text-body-xs ${disabled ? 'text-text-disabled' : 'text-text-secondary'}`}
            >
              {description}
            </span>
          )}
          {error && (
            <span id={errorId} role="alert" className="text-body-xs text-text-danger">
              {error}
            </span>
          )}
        </span>
      </label>
    </div>
  )
})
