import { forwardRef, useId, useState, type InputEvent, type TextareaHTMLAttributes } from 'react'
import { FieldFrame, type FieldStatus } from './internal/Field'
import { fieldControlBase, fieldStatusClasses } from './internal/fieldStyles'

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  hint?: string
  helperText?: string
  error?: string
  status?: FieldStatus
  autoGrow?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    id,
    label,
    hint,
    helperText,
    error,
    status = error ? 'invalid' : 'default',
    autoGrow = false,
    className = '',
    required,
    maxLength,
    value,
    defaultValue,
    onChange,
    onInput,
    ...props
  },
  ref,
) {
  const generatedId = useId()
  const textareaId = id ?? generatedId
  const [internalCount, setInternalCount] = useState(
    typeof defaultValue === 'string' ? defaultValue.length : 0,
  )
  const count = typeof value === 'string' ? value.length : internalCount
  const messageId = `${textareaId}-message`

  const resize = (event: InputEvent<HTMLTextAreaElement>) => {
    if (autoGrow) {
      event.currentTarget.style.height = 'auto'
      event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`
    }
    onInput?.(event)
  }

  return (
    <FieldFrame
      id={textareaId}
      label={label}
      hint={hint ?? (maxLength && count !== undefined ? `${count}/${maxLength}` : undefined)}
      helperText={helperText}
      error={error}
      status={status}
      required={required}
    >
      <textarea
        ref={ref}
        id={textareaId}
        required={required}
        maxLength={maxLength}
        value={value}
        defaultValue={defaultValue}
        onChange={(event) => {
          setInternalCount(event.currentTarget.value.length)
          onChange?.(event)
        }}
        onInput={resize}
        aria-describedby={helperText || error ? messageId : undefined}
        aria-errormessage={error ? messageId : undefined}
        aria-invalid={Boolean(error) || status === 'invalid'}
        className={[
          fieldControlBase,
          'min-h-28 resize-y py-space-3 leading-relaxed',
          autoGrow ? 'max-h-container-narrow overflow-y-auto' : '',
          fieldStatusClasses[error ? 'invalid' : status],
          className,
        ].join(' ')}
        {...props}
      />
    </FieldFrame>
  )
})
