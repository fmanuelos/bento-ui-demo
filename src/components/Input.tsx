import { useId, type InputHTMLAttributes } from 'react'

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label: string
  hint?: string
  helperText?: string
  error?: string
}

export function Input({
  id,
  label,
  hint,
  helperText,
  error,
  className = '',
  ...props
}: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const messageId = `${inputId}-message`

  return (
    <label className="grid gap-sm text-label-md font-semibold text-text-primary" htmlFor={inputId}>
      <span className="flex items-baseline justify-between gap-4">
        {label}
        {hint && <span className="text-body-xs font-normal text-text-secondary">{hint}</span>}
      </span>
      <input
        id={inputId}
        aria-describedby={helperText || error ? messageId : undefined}
        aria-invalid={Boolean(error)}
        className={[
          'h-control-height-lg w-full rounded-md border bg-surface-primary px-md text-body-sm font-normal text-text-primary outline-none transition',
          'placeholder:text-text-tertiary disabled:border-border-disabled disabled:bg-background-disabled disabled:text-text-disabled',
          'focus:border-border-focus focus:ring-3 focus:ring-focus-ring/20',
          error ? 'border-border-danger' : 'border-border-primary',
          className,
        ].join(' ')}
        {...props}
      />
      {(error || helperText) && (
        <span
          id={messageId}
          className={`text-body-xs font-normal ${error ? 'text-text-danger' : 'text-text-secondary'}`}
        >
          {error ?? helperText}
        </span>
      )}
    </label>
  )
}
