import { type ReactNode } from 'react'

export type FieldStatus = 'default' | 'success' | 'warning' | 'invalid'
export type CanonicalFieldSize = 'small' | 'medium'
export type FieldSize = CanonicalFieldSize

export type FieldFrameProps = {
  id: string
  label: string
  hint?: string
  description?: string
  helperText?: string
  error?: string
  status?: FieldStatus
  required?: boolean
  busy?: boolean
  children: ReactNode
}

const statusTextClasses: Record<FieldStatus, string> = {
  default: 'text-text-secondary',
  success: 'text-text-success',
  warning: 'text-text-warning',
  invalid: 'text-text-danger',
}

export function FieldFrame({
  id,
  label,
  hint,
  description,
  helperText,
  error,
  status = error ? 'invalid' : 'default',
  required,
  busy = false,
  children,
}: FieldFrameProps) {
  const messageStatus = error ? 'invalid' : status

  return (
    <div
      className="grid gap-space-2 text-label-md font-semibold text-text-primary"
      aria-busy={busy || undefined}
    >
      <label className="flex items-baseline justify-between gap-space-4" htmlFor={id}>
        <span>
          {label}
          {required && (
            <span className="ml-space-1 text-text-danger" aria-hidden="true">
              *
            </span>
          )}
        </span>
        {hint && (
          <span id={`${id}-hint`} className="text-body-xs font-normal text-text-secondary">
            {hint}
          </span>
        )}
      </label>
      {description && (
        <p id={`${id}-description`} className="m-0 text-body-xs font-normal text-text-secondary">
          {description}
        </p>
      )}
      {children}
      {helperText && (
        <p id={`${id}-helper`} className="m-0 text-body-xs font-normal text-text-secondary">
          {helperText}
        </p>
      )}
      {error && (
        <p
          id={`${id}-message`}
          role="alert"
          className={`m-0 text-body-xs font-normal ${statusTextClasses[messageStatus]}`}
        >
          {error}
        </p>
      )}
    </div>
  )
}
