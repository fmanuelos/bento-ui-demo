import { type HTMLAttributes, type ReactNode } from 'react'

export type CardProps = HTMLAttributes<HTMLElement> & {
  compact?: boolean
  heading?: ReactNode
  footer?: ReactNode
  as?: 'article' | 'section'
}

export function Card({ compact = false, heading, footer, as: Element = 'section', className = '', children, ...props }: CardProps) {
  return (
    <Element className={`${compact ? 'rounded-md p-lg' : 'rounded-lg p-xl'} border border-border-secondary bg-surface-primary text-text-primary ${className}`} {...props}>
      {heading && <header className="mb-lg">{heading}</header>}
      {children}
      {footer && <footer className="mt-lg border-t border-border-secondary pt-lg">{footer}</footer>}
    </Element>
  )
}

export type StatCardProps = Omit<CardProps, 'heading'> & { label: string; value: ReactNode; metadata?: ReactNode }

export function StatCard({ label, value, metadata, ...props }: StatCardProps) {
  return <Card compact {...props}><p className="m-0 text-label-sm font-semibold text-text-secondary">{label}</p><p className="mb-0 mt-sm text-data-lg font-bold tabular-nums text-text-primary">{value}</p>{metadata && <div className="mt-sm text-body-xs text-text-secondary">{metadata}</div>}</Card>
}
