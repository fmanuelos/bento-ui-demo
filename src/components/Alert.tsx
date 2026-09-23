import { useState, type HTMLAttributes, type ReactNode } from 'react'
import {
  CheckIcon,
  CloseIcon,
  DangerCircleIcon,
  InfoCircleIcon,
  WarningTriangleIcon,
} from './icons'
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

const icons = {
  success: CheckIcon,
  warning: WarningTriangleIcon,
  danger: DangerCircleIcon,
  info: InfoCircleIcon,
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
  const VariantIcon = icons[variant]

  return (
    <div
      role={urgent ? 'alert' : 'status'}
      className={`flex items-start gap-scale-3 rounded-shape-md border p-scale-4 ${variants[variant]} ${className}`}
      {...props}
    >
      <VariantIcon className="mt-0.5 shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="m-0 text-label-md font-semibold">{title}</p>
        {children && <div className="mt-scale-1 text-body-sm leading-relaxed">{children}</div>}
        {action && <div className="mt-scale-3">{action}</div>}
      </div>
      {dismissible && (
        <Button
          variant="ghost"
          size="tiny"
          iconOnly
          className="-m-scale-2 size-8 text-current"
          aria-label={`Dismiss ${typeof title === 'string' ? title : 'alert'}`}
          onClick={dismiss}
        >
          <CloseIcon size="sm" />
        </Button>
      )}
    </div>
  )
}
