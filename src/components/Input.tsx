import { forwardRef, useId, type InputHTMLAttributes } from 'react'
import { FieldFrame, type FieldSize, type FieldStatus } from './internal/Field'
import { fieldControlBase, fieldStatusClasses } from './internal/fieldStyles'

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label: string
  hint?: string
  helperText?: string
  error?: string
  status?: FieldStatus
  size?: FieldSize
  variant?: 'default' | 'search'
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    id,
    label,
    hint,
    helperText,
    error,
    status = error ? 'invalid' : 'default',
    size = 'standard',
    variant = 'default',
    className = '',
    required,
    ...props
  },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const messageId = `${inputId}-message`

  return (
    <FieldFrame
      id={inputId}
      label={label}
      hint={hint}
      helperText={helperText}
      error={error}
      status={status}
      required={required}
    >
      <input
        ref={ref}
        id={inputId}
        required={required}
        aria-describedby={helperText || error ? messageId : undefined}
        aria-errormessage={error ? messageId : undefined}
        aria-invalid={Boolean(error) || status === 'invalid'}
        className={[
          fieldControlBase,
          size === 'compact' ? 'h-control-height-md px-sm' : 'h-control-height-lg',
          variant === 'search' ? 'bg-surface-secondary' : '',
          fieldStatusClasses[error ? 'invalid' : status],
          className,
        ].join(' ')}
        {...props}
      />
    </FieldFrame>
  )
})
