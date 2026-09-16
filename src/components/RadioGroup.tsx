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
  const descriptionId = `${groupId}-description`
  const errorId = `${groupId}-error`
  const describedBy = [description ? descriptionId : '', error ? errorId : '']
    .filter(Boolean)
    .join(' ')

  return (
    <fieldset
      id={groupId}
      disabled={disabled}
      className={`m-0 grid gap-space-3 border-0 p-0 ${className}`}
      aria-describedby={describedBy || undefined}
      aria-errormessage={error ? errorId : undefined}
      aria-invalid={Boolean(error)}
    >
      <legend
        className={`text-label-md font-semibold ${disabled ? 'text-text-disabled' : 'text-text-primary'}`}
      >
        {label}
        {required && (
          <span className="ml-space-1 text-text-danger" aria-hidden="true">
            *
          </span>
        )}
      </legend>
      {description && (
        <p
          id={descriptionId}
          className={`m-0 text-body-xs ${disabled ? 'text-text-disabled' : 'text-text-secondary'}`}
        >
          {description}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="m-0 text-body-xs text-text-danger">
          {error}
        </p>
      )}
      <div
        className={orientation === 'horizontal' ? 'flex flex-wrap gap-space-6' : 'grid gap-space-3'}
      >
        {options.map((option, index) => {
          const optionId = `${groupId}-option-${index}`
          const optionLabelId = `${optionId}-label`
          const optionDescriptionId = `${optionId}-description`
          const optionDisabled = disabled || option.disabled
          const optionLabelledBy = [optionLabelId, props['aria-labelledby']]
            .filter(Boolean)
            .join(' ')
          const optionDescribedBy = [
            props['aria-describedby'],
            option.description ? optionDescriptionId : '',
            error ? errorId : '',
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={`inline-flex min-h-touch-target-min items-start gap-space-3 text-body-sm ${
                optionDisabled
                  ? 'cursor-not-allowed text-text-disabled'
                  : 'cursor-pointer text-text-primary'
              }`}
            >
              <input
                {...props}
                id={optionId}
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
                disabled={optionDisabled}
                aria-labelledby={optionLabelledBy}
                aria-describedby={optionDescribedBy || undefined}
                aria-errormessage={error ? errorId : undefined}
                aria-invalid={Boolean(error)}
                onChange={(event) => onValueChange?.(event.currentTarget.value)}
                className="peer sr-only"
              />
              <span
                className={[
                  'mt-0.5 grid size-5 shrink-0 place-items-center rounded-shape-full border-2 border-border-strong bg-surface-primary',
                  'peer-checked:border-action-primary-background-default',
                  'peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus-ring peer-focus-visible:outline-solid',
                  'peer-disabled:border-border-disabled peer-disabled:bg-background-disabled',
                  'after:size-2.5 after:rounded-shape-full after:bg-transparent',
                  'peer-checked:after:bg-action-primary-background-default',
                ].join(' ')}
                aria-hidden="true"
              />
              <span className="grid gap-space-1">
                <span id={optionLabelId} className="font-semibold">
                  {option.label}
                </span>
                {option.description && (
                  <span
                    id={optionDescriptionId}
                    className={`text-body-xs ${
                      optionDisabled ? 'text-text-disabled' : 'text-text-secondary'
                    }`}
                  >
                    {option.description}
                  </span>
                )}
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
