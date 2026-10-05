import { useId, type HTMLAttributes, type ReactNode } from 'react'
import { type HeadingLevel } from './PageHeader'

export type SectionHeaderProps = Omit<HTMLAttributes<HTMLElement>, 'title' | 'children'> & {
  title: string
  headingId?: string
  headingLevel?: HeadingLevel
  description?: ReactNode
  eyebrow?: ReactNode
  metadata?: ReactNode
  actions?: ReactNode
  layout?: 'stacked' | 'inline' | 'centered'
}

export function SectionHeader({
  title,
  headingId,
  headingLevel = 2,
  description,
  eyebrow,
  metadata,
  actions,
  layout = 'stacked',
  className = '',
  ...props
}: SectionHeaderProps) {
  const generatedId = useId()
  const Heading = `h${headingLevel}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  return (
    <header
      className={`min-w-0 ${layout === 'inline' ? 'flex flex-wrap items-start justify-between gap-scale-4' : 'space-y-scale-3'} ${layout === 'centered' ? 'text-center' : ''} ${className}`}
      {...props}
    >
      <div className="min-w-0 space-y-scale-2">
        {eyebrow && <p className="m-0 text-label-sm text-text-secondary">{eyebrow}</p>}
        <Heading
          id={headingId ?? generatedId}
          className="m-0 text-heading-md font-semibold break-words text-text-primary"
        >
          {title}
        </Heading>
        {description && (
          <div className="max-w-container-readable text-body-md leading-relaxed text-text-secondary">
            {description}
          </div>
        )}
        {metadata && <div className="text-body-sm text-text-secondary">{metadata}</div>}
      </div>
      {actions && (
        <div
          className={`flex flex-wrap gap-scale-3 ${layout === 'centered' ? 'justify-center' : ''}`}
        >
          {actions}
        </div>
      )}
    </header>
  )
}
