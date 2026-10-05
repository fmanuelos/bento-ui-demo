import { useId, type HTMLAttributes, type ReactNode, type Ref } from 'react'

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
export type PageHeaderProps = Omit<HTMLAttributes<HTMLElement>, 'title' | 'children'> & {
  title: string
  headingLevel?: HeadingLevel
  headingRef?: Ref<HTMLHeadingElement>
  headingTabIndex?: number
  context?: ReactNode
  description?: ReactNode
  metadata?: ReactNode
  actions?: ReactNode
}

/** Page identity; its consumer owns navigation, asynchronous state, and focus. */
export function PageHeader({
  title,
  headingLevel = 1,
  headingRef,
  headingTabIndex,
  context,
  description,
  metadata,
  actions,
  id,
  className = '',
  ...props
}: PageHeaderProps) {
  const generatedId = useId()
  const headingId = `${id ?? generatedId}-heading`
  const Heading = `h${headingLevel}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  return (
    <header id={id} className={`min-w-0 space-y-scale-3 ${className}`} {...props}>
      {context && <div className="text-body-sm text-text-secondary">{context}</div>}
      <Heading
        id={headingId}
        ref={headingRef}
        tabIndex={headingTabIndex}
        className="m-0 text-heading-xl font-bold tracking-heading-xl break-words text-text-primary"
      >
        {title}
      </Heading>
      {description && (
        <div className="max-w-container-readable text-body-md leading-relaxed text-text-secondary">
          {description}
        </div>
      )}
      {metadata && (
        <div className="flex flex-wrap gap-scale-2 text-body-sm text-text-secondary">
          {metadata}
        </div>
      )}
      {actions && <div className="flex flex-wrap gap-scale-3">{actions}</div>}
    </header>
  )
}
