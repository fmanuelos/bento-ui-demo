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
    <label className="grid gap-2 text-sm font-bold text-primary dark:text-white" htmlFor={inputId}>
      <span className="flex items-baseline justify-between gap-4">
        {label}
        {hint && <span className="text-xs font-normal text-muted dark:text-dark-muted">{hint}</span>}
      </span>
      <input
        id={inputId}
        aria-describedby={helperText || error ? messageId : undefined}
        aria-invalid={Boolean(error)}
        className={[
          'h-12 w-full rounded-md border bg-surface px-4 text-sm font-normal text-primary outline-none transition',
          'placeholder:text-muted/60 dark:bg-dark-surface dark:text-white dark:placeholder:text-dark-muted/60',
          'focus:border-coral focus:ring-3 focus:ring-coral/20',
          error ? 'border-coral' : 'border-line dark:border-dark-line',
          className,
        ].join(' ')}
        {...props}
      />
      {(error || helperText) && (
        <span
          id={messageId}
          className={`text-xs font-normal ${error ? 'text-coral' : 'text-muted dark:text-dark-muted'}`}
        >
          {error ?? helperText}
        </span>
      )}
    </label>
  )
}
