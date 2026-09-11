import { type HTMLAttributes, type ReactNode } from 'react'

export type StatusBadgeVariant = 'positive' | 'warning' | 'negative' | 'info' | 'neutral'
export type StatusBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: StatusBadgeVariant
  icon?: ReactNode
  children: ReactNode
}

const variants: Record<StatusBadgeVariant, string> = {
  positive:
    'border-status-positive-border bg-status-positive-background text-status-positive-foreground',
  warning:
    'border-status-warning-border bg-status-warning-background text-status-warning-foreground',
  negative:
    'border-status-negative-border bg-status-negative-background text-status-negative-foreground',
  info: 'border-status-info-border bg-status-info-background text-status-info-foreground',
  neutral:
    'border-status-neutral-border bg-status-neutral-background text-status-neutral-foreground',
}

export function StatusBadge({
  variant = 'neutral',
  icon,
  className = '',
  children,
  ...props
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-space-1 rounded-shape-full border px-space-2 py-space-1 text-label-sm font-semibold ${variants[variant]} ${className}`}
      {...props}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
    </span>
  )
}
