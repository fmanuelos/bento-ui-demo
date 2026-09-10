import { type ReactNode } from 'react'

export type FieldStatus = 'default' | 'success' | 'warning' | 'invalid'
export type CanonicalFieldSize = 'small' | 'medium'
/** @deprecated Use small or medium. */
export type LegacyFieldSize = 'compact' | 'standard'
export type FieldSize = CanonicalFieldSize | LegacyFieldSize

export type FieldFrameProps = {
  id: string
  label: string
  hint?: string
  helperText?: string
  error?: string
  status?: FieldStatus
  required?: boolean
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
  helperText,
  error,
  status = error ? 'invalid' : 'default',
  required,
  children,
}: FieldFrameProps) {
  const message = error ?? helperText
  const messageStatus = error ? 'invalid' : status

  return (
    <div className="grid gap-space-2 text-label-md font-semibold text-text-primary">
      <label className="flex items-baseline justify-between gap-space-4" htmlFor={id}>
        <span>
          {label}
          {required && (
            <span className="ml-space-1 text-text-danger" aria-hidden="true">
              *
            </span>
          )}
        </span>
        {hint && <span className="text-body-xs font-normal text-text-secondary">{hint}</span>}
      </label>
      {children}
      {message && (
        <p
          id={`${id}-message`}
          className={`m-0 text-body-xs font-normal ${statusTextClasses[messageStatus]}`}
        >
          {message}
        </p>
      )}
    </div>
  )
}
