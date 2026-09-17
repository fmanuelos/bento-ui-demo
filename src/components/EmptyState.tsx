import { type HTMLAttributes, type ReactNode } from 'react'

export type EmptyStateVariant = 'no-data' | 'no-results' | 'filtered' | 'unavailable' | 'error'
export type EmptyStateProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  title: ReactNode
  description: ReactNode
  icon?: ReactNode
  primaryAction?: ReactNode
  secondaryAction?: ReactNode
  variant?: EmptyStateVariant
  size?: 'compact' | 'spacious'
  announce?: boolean
}

export function EmptyState({
  title,
  description,
  icon,
  primaryAction,
  secondaryAction,
  variant = 'no-data',
  size = 'compact',
  announce = false,
  className = '',
  ...props
}: EmptyStateProps) {
  const feedback =
    variant === 'error'
      ? 'border border-feedback-danger-border bg-feedback-danger-background'
      : variant === 'unavailable'
        ? 'border border-feedback-warning-border bg-feedback-warning-background'
        : ''

  return (
    <div
      role={announce ? (variant === 'error' ? 'alert' : 'status') : undefined}
      className={`grid justify-items-center rounded-shape-lg text-center ${size === 'spacious' ? 'gap-scale-4 p-scale-8 sm:p-scale-12' : 'gap-scale-3 p-scale-4'} ${feedback} ${className}`}
      {...props}
    >
      {icon && (
        <span
          className="grid size-10 place-items-center rounded-shape-full bg-background-tertiary text-text-accent [&_svg]:size-5"
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <div className="grid max-w-container-readable gap-scale-1">
        <h3 className="m-0 text-heading-sm font-semibold text-text-primary">{title}</h3>
        <div className="text-body-sm leading-relaxed text-text-secondary">{description}</div>
      </div>
      {(primaryAction || secondaryAction) && (
        <div className="flex flex-wrap justify-center gap-scale-2">
          {primaryAction}
          {secondaryAction}
        </div>
      )}
    </div>
  )
}
