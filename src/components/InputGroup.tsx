import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
} from 'react'
import { Button, type ButtonProps } from './Button'
import { FieldFrame, type FieldSize, type FieldStatus } from './internal/Field'
import { getFieldDescriptionIds } from './internal/fieldA11y'
import { fieldStatusClasses } from './internal/fieldStyles'
import { type SelectOption } from './Select'

export type InputGroupSelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'aria-label' | 'children' | 'size'
> & {
  label: string
  options: readonly SelectOption[]
}

export type InputGroupActionProps = Omit<ButtonProps, 'children' | 'iconOnly' | 'size'> & {
  label: ReactNode
}

export type InputGroupProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'size'> & {
  label: string
  hint?: string
  helperText?: string
  error?: string
  status?: FieldStatus
  size?: FieldSize
  leadingAddon?: ReactNode
  trailingAddon?: ReactNode
  select?: InputGroupSelectProps
  action?: InputGroupActionProps
  busy?: boolean
  className?: string
  inputClassName?: string
}

export const InputGroup = forwardRef<HTMLInputElement, InputGroupProps>(function InputGroup(
  {
    id,
    label,
    hint,
    helperText,
    error,
    status = error ? 'invalid' : 'default',
    size = 'medium',
    leadingAddon,
    trailingAddon,
    select,
    action,
    busy = action?.loading ?? false,
    className = '',
    inputClassName = '',
    required,
    disabled,
    readOnly,
    'aria-describedby': externalDescription,
    'aria-errormessage': externalErrorMessage,
    'aria-invalid': externalInvalid,
    ...inputProps
  },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const fieldDescription = getFieldDescriptionIds(inputId, {
    description: helperText,
    error,
    hint,
  })
  const describedBy = [externalDescription, fieldDescription].filter(Boolean).join(' ') || undefined
  const resolvedStatus = error ? 'invalid' : status
  const controlHeight = size === 'small' ? 'h-control-height-small' : 'h-control-height-medium'
  const controlPadding = size === 'small' ? 'px-space-2' : 'px-space-3'
  const addonIconSize = size === 'small' ? '[&_svg]:size-space-4' : '[&_svg]:size-space-5'
  const inputRadius = [
    leadingAddon === undefined ? 'rounded-s-shape-md' : 'rounded-s-none',
    trailingAddon === undefined && !select && !action ? 'rounded-e-shape-md' : 'rounded-e-none',
  ].join(' ')

  const addonClasses = [
    'flex shrink-0 items-center justify-center bg-surface-secondary font-normal text-text-secondary',
    controlHeight,
    controlPadding,
    addonIconSize,
  ].join(' ')

  let selectNode: ReactNode
  if (select) {
    const {
      label: selectLabel,
      options,
      className: selectClassName = '',
      disabled: selectDisabled,
      ...selectProps
    } = select
    selectNode = (
      <span className={`relative flex shrink-0 ${action ? '' : 'rounded-e-shape-md'}`}>
        <select
          aria-label={selectLabel}
          disabled={selectDisabled ?? disabled}
          className={[
            'min-w-24 appearance-none border-0 border-s border-border-primary bg-surface-primary pr-9 pl-space-3 text-body-sm font-normal text-text-primary outline-none',
            'focus-visible:relative focus-visible:z-10 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus-ring focus-visible:outline-solid',
            'disabled:cursor-not-allowed disabled:bg-background-disabled disabled:text-text-disabled',
            controlHeight,
            action ? '' : 'rounded-e-shape-md',
            selectClassName,
          ].join(' ')}
          {...selectProps}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute top-1/2 right-space-3 size-4 -translate-y-1/2 text-text-secondary"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path d="m4 6 4 4 4-4" />
        </svg>
      </span>
    )
  }

  let actionNode: ReactNode
  if (action) {
    const { label: actionLabel, className: actionClassName = '', ...actionProps } = action
    actionNode = (
      <Button
        size={size}
        className={`relative z-0 !h-auto shrink-0 !rounded-s-none !rounded-e-shape-md !border-y-0 !border-e-0 focus-visible:z-20 ${actionClassName}`}
        {...actionProps}
      >
        {actionLabel}
      </Button>
    )
  }

  return (
    <div className={className}>
      <FieldFrame
        id={inputId}
        label={label}
        hint={hint}
        description={helperText}
        error={error}
        status={resolvedStatus}
        required={required}
        busy={busy}
      >
        <div
          className={[
            'flex min-w-0 items-stretch rounded-shape-md border bg-surface-primary transition duration-200',
            fieldStatusClasses[resolvedStatus],
          ].join(' ')}
        >
          {leadingAddon !== undefined && (
            <span
              className={`${addonClasses} rounded-s-shape-md border-e border-border-primary`}
              aria-hidden="true"
            >
              {leadingAddon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            aria-describedby={describedBy}
            aria-errormessage={externalErrorMessage ?? (error ? `${inputId}-message` : undefined)}
            aria-invalid={(externalInvalid ?? Boolean(error)) || resolvedStatus === 'invalid'}
            className={[
              'min-w-0 flex-1 border-0 bg-transparent text-body-sm font-normal text-text-primary outline-none',
              'placeholder:text-text-placeholder read-only:bg-surface-sunken',
              'focus-visible:relative focus-visible:z-10 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus-ring focus-visible:outline-solid',
              'disabled:cursor-not-allowed disabled:bg-background-disabled disabled:text-text-disabled',
              controlHeight,
              controlPadding,
              inputRadius,
              inputClassName,
            ].join(' ')}
            {...inputProps}
          />
          {trailingAddon !== undefined && (
            <span
              className={`${addonClasses} border-s border-border-primary ${select || action ? '' : 'rounded-e-shape-md'}`}
              aria-hidden="true"
            >
              {trailingAddon}
            </span>
          )}
          {selectNode}
          {actionNode}
        </div>
      </FieldFrame>
    </div>
  )
})
