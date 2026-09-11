import { useId, type InputHTMLAttributes } from 'react'

export type RadioOption = {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export type RadioGroupProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value' | 'defaultValue' | 'onChange'
> & {
  label: string
  description?: string
  error?: string
  options: readonly RadioOption[]
  value?: string
  defaultValue?: string
  orientation?: 'horizontal' | 'vertical'
  onValueChange?: (value: string) => void
}

export function RadioGroup({
  id,
  name,
  label,
  description,
  error,
  options,
  value,
  defaultValue,
  orientation = 'vertical',
  onValueChange,
  required,
  disabled,
  className = '',
  ...props
}: RadioGroupProps) {
  const generatedId = useId()
  const groupId = id ?? generatedId
  const groupName = name ?? groupId
  const describedBy = [description ? `${groupId}-description` : '', error ? `${groupId}-error` : '']
    .filter(Boolean)
    .join(' ')

  return (
    <fieldset
      className={`m-0 grid gap-space-3 border-0 p-0 ${className}`}
      aria-describedby={describedBy || undefined}
      aria-invalid={Boolean(error)}
    >
      <legend className="text-label-md font-semibold text-text-primary">
        {label}
        {required && (
          <span className="ml-space-1 text-text-danger" aria-hidden="true">
            *
          </span>
        )}
      </legend>
      {description && (
        <p id={`${groupId}-description`} className="m-0 text-body-xs text-text-secondary">
          {description}
        </p>
      )}
      {error && (
        <p id={`${groupId}-error`} role="alert" className="m-0 text-body-xs text-text-danger">
          {error}
        </p>
      )}
      <div
        className={orientation === 'horizontal' ? 'flex flex-wrap gap-space-6' : 'grid gap-space-3'}
      >
        {options.map((option, index) => (
          <label
            key={option.value}
            className="inline-flex min-h-touch-target-min cursor-pointer items-start gap-space-3 text-body-sm text-text-primary"
          >
            <input
              {...props}
              type="radio"
              name={groupName}
              value={option.value}
              checked={value !== undefined ? value === option.value : undefined}
              defaultChecked={
                value === undefined
                  ? defaultValue === option.value || (!defaultValue && required && index === 0)
                  : undefined
              }
              required={required}
              disabled={disabled || option.disabled}
              onChange={(event) => onValueChange?.(event.currentTarget.value)}
              className="peer sr-only"
            />
            <span
              className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border-2 border-border-strong bg-surface-primary peer-checked:border-action-primary-background-default peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-focus-ring peer-disabled:border-border-disabled peer-disabled:bg-background-disabled after:size-2.5 after:rounded-full after:bg-transparent peer-checked:after:bg-action-primary-background-default"
              aria-hidden="true"
            />
            <span className="grid gap-space-1">
              <span className="font-semibold">{option.label}</span>
              {option.description && (
                <span className="text-body-xs text-text-secondary">{option.description}</span>
              )}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
