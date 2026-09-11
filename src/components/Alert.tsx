import { useState, type HTMLAttributes, type ReactNode } from 'react'
import { Button } from './Button'

export type AlertVariant = 'success' | 'warning' | 'danger' | 'info'
export type AlertProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  variant?: AlertVariant
  title: ReactNode
  action?: ReactNode
  dismissible?: boolean
  onDismiss?: () => void
  urgent?: boolean
}

const variants: Record<AlertVariant, string> = {
  success:
    'border-feedback-success-border bg-feedback-success-background text-feedback-success-foreground',
  warning:
    'border-feedback-warning-border bg-feedback-warning-background text-feedback-warning-foreground',
  danger:
    'border-feedback-danger-border bg-feedback-danger-background text-feedback-danger-foreground',
  info: 'border-feedback-info-border bg-feedback-info-background text-feedback-info-foreground',
}

const icons: Record<AlertVariant, ReactNode> = {
  success: <path d="m4 10 4 4 8-8" />,
  warning: (
    <>
      <path d="M10 3 2.5 17h15L10 3Z" />
      <path d="M10 8v4m0 2.5v.1" />
    </>
  ),
  danger: (
    <>
      <circle cx="10" cy="10" r="7" />
      <path d="m7.5 7.5 5 5m0-5-5 5" />
    </>
  ),
  info: (
    <>
      <circle cx="10" cy="10" r="7" />
      <path d="M10 9v5m0-8v.1" />
    </>
  ),
}

export function Alert({
  variant = 'info',
  title,
  action,
  dismissible = false,
  onDismiss,
  urgent = false,
  className = '',
  children,
  ...props
}: AlertProps) {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  const dismiss = () => {
    setVisible(false)
    onDismiss?.()
  }

  return (
    <div
      role={urgent ? 'alert' : 'status'}
      className={`flex items-start gap-space-3 rounded-shape-md border p-space-4 ${variants[variant]} ${className}`}
      {...props}
    >
      <svg
        className="mt-0.5 size-5 shrink-0"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {icons[variant]}
      </svg>
      <div className="min-w-0 flex-1">
        <p className="m-0 text-label-md font-semibold">{title}</p>
        {children && <div className="mt-space-1 text-body-sm leading-relaxed">{children}</div>}
        {action && <div className="mt-space-3">{action}</div>}
      </div>
      {dismissible && (
        <Button
          variant="ghost"
          size="tiny"
          iconOnly
          className="-m-space-2 size-8 text-current"
          aria-label={`Dismiss ${typeof title === 'string' ? title : 'alert'}`}
          onClick={dismiss}
        >
          <svg
            className="size-4"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="m4 4 8 8m0-8-8 8" />
          </svg>
        </Button>
      )}
    </div>
  )
}
