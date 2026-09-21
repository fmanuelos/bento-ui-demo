import { forwardRef, useId, type ReactNode, type SelectHTMLAttributes } from 'react'
import { ChevronDownIcon } from '../icons'
import { FieldFrame, type FieldSize, type FieldStatus } from './internal/Field'
import { getFieldDescriptionIds } from './internal/fieldA11y'
import { fieldControlBase, fieldStatusClasses } from './internal/fieldStyles'

export type SelectOption = { value: string; label: string; disabled?: boolean }

export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> & {
  label: string
  hint?: string
  helperText?: string
  error?: string
  status?: FieldStatus
  size?: FieldSize
  options: readonly SelectOption[]
  placeholder?: string
  leadingIcon?: ReactNode
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    id,
    label,
    hint,
    helperText,
    error,
    status = error ? 'invalid' : 'default',
    size = 'medium',
    options,
    placeholder,
    className = '',
    required,
    leadingIcon,
    ...props
  },
  ref,
) {
  const generatedId = useId()
  const selectId = id ?? generatedId
  const describedBy = getFieldDescriptionIds(selectId, {
    hint,
    description: helperText,
    error,
  })

  return (
    <FieldFrame
      id={selectId}
      label={label}
      hint={hint}
      description={helperText}
      error={error}
      status={status}
      required={required}
    >
      <span className="relative block">
        {leadingIcon && (
          <span className="pointer-events-none absolute inset-y-0 left-scale-3 grid place-items-center text-text-secondary">
            {leadingIcon}
          </span>
        )}
        <select
          ref={ref}
          id={selectId}
          required={required}
          aria-describedby={describedBy}
          aria-errormessage={error ? `${selectId}-message` : undefined}
          aria-invalid={Boolean(error) || status === 'invalid'}
          className={[
            fieldControlBase,
            'appearance-none pr-10',
            size === 'small' ? 'h-control-height-small py-0' : 'h-control-height-medium py-0',
            leadingIcon ? 'pl-10' : '',
            placeholder ? "[&:has(option[value='']:checked)]:text-text-placeholder" : '',
            fieldStatusClasses[error ? 'invalid' : status],
            className,
          ].join(' ')}
          {...props}
        >
          {placeholder && (
            <option className="text-text-placeholder" value="" disabled={required}>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              className="text-text-primary"
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          size="sm"
          className="pointer-events-none absolute top-1/2 right-scale-3 size-4 -translate-y-1/2 text-text-secondary"
        />
      </span>
    </FieldFrame>
  )
})
