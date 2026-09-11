import { type HTMLAttributes, type ReactNode } from 'react'

export type CardProps = HTMLAttributes<HTMLElement> & {
  compact?: boolean
  heading?: ReactNode
  footer?: ReactNode
  as?: 'article' | 'section'
}

export function Card({
  compact = false,
  heading,
  footer,
  as: Element = 'section',
  className = '',
  children,
  ...props
}: CardProps) {
  return (
    <Element
      className={`${compact ? 'rounded-shape-md p-space-4' : 'rounded-shape-lg p-space-6'} border border-border-secondary bg-surface-primary text-text-primary ${className}`}
      {...props}
    >
      {heading && <header className="mb-space-4">{heading}</header>}
      {children}
      {footer && (
        <footer className="mt-space-4 border-t border-border-secondary pt-space-4">{footer}</footer>
      )}
    </Element>
  )
}

export type StatCardProps = Omit<CardProps, 'heading'> & {
  label: string
  value: ReactNode
  metadata?: ReactNode
}

export function StatCard({ label, value, metadata, ...props }: StatCardProps) {
  return (
    <Card compact {...props}>
      <p className="m-0 text-label-sm font-semibold text-text-secondary">{label}</p>
      <p className="mt-space-2 mb-0 text-data-lg font-bold text-text-primary tabular-nums">
        {value}
      </p>
      {metadata && <div className="mt-space-2 text-body-xs text-text-secondary">{metadata}</div>}
    </Card>
  )
}
