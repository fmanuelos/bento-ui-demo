import { forwardRef, useId, type InputHTMLAttributes } from 'react'
import { FieldFrame, type FieldSize, type FieldStatus } from './internal/Field'
import { getFieldDescriptionIds } from './internal/fieldA11y'
import { fieldControlBase, fieldStatusClasses } from './internal/fieldStyles'
import { resolveFieldSize } from './internal/fieldSizes'

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
    size = 'medium',
    variant = 'default',
    className = '',
    required,
    ...props
  },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const canonicalSize = resolveFieldSize(size)
  const describedBy = getFieldDescriptionIds(inputId, {
    hint,
    description: helperText,
    error,
  })

  return (
    <FieldFrame
      id={inputId}
      label={label}
      hint={hint}
      description={helperText}
      error={error}
      status={status}
      required={required}
    >
      <input
        ref={ref}
        id={inputId}
        required={required}
        aria-describedby={describedBy}
        aria-errormessage={error ? `${inputId}-message` : undefined}
        aria-invalid={Boolean(error) || status === 'invalid'}
        className={[
          fieldControlBase,
          canonicalSize === 'small'
            ? 'h-control-height-small px-space-2'
            : 'h-control-height-medium',
          variant === 'search' ? 'bg-surface-secondary' : '',
          fieldStatusClasses[error ? 'invalid' : status],
          className,
        ].join(' ')}
        {...props}
      />
    </FieldFrame>
  )
})
