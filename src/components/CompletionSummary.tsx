import { useId, type HTMLAttributes, type ReactNode, type Ref } from 'react'
import { type HeadingLevel } from './PageHeader'

export type CompletionSummaryProps = Omit<HTMLAttributes<HTMLElement>, 'title' | 'children'> & {
  title: string
  description: ReactNode
  headingLevel?: HeadingLevel
  headingRef?: Ref<HTMLHeadingElement>
  headingTabIndex?: number
  details?: readonly { id: string; label: string; value: ReactNode }[]
  nextSteps?: ReactNode
  actions?: ReactNode
}

/** Receives a confirmed outcome. No automatic focus, success inference, or live region. */
export function CompletionSummary({
  title,
  description,
  headingLevel = 2,
  headingRef,
  headingTabIndex,
  details,
  nextSteps,
  actions,
  id,
  className = '',
  ...props
}: CompletionSummaryProps) {
  const generatedId = useId()
  const headingId = `${id ?? generatedId}-heading`
  const Heading = `h${headingLevel}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`min-w-0 space-y-scale-5 ${className}`}
      {...props}
    >
      <Heading
        id={headingId}
        ref={headingRef}
        tabIndex={headingTabIndex}
        className="m-0 text-heading-lg font-semibold break-words text-text-primary"
      >
        {title}
      </Heading>
      <div className="text-body-md leading-relaxed text-text-secondary">{description}</div>
      {details && details.length > 0 && (
        <dl className="m-0 grid gap-scale-3">
          {details.map((detail) => (
            <div key={detail.id} className="min-w-0">
              <dt className="text-label-sm font-semibold text-text-primary">{detail.label}</dt>
              <dd className="m-0 mt-scale-1 text-body-md break-words text-text-secondary">
                {detail.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
      {nextSteps && (
        <div className="text-body-md leading-relaxed text-text-secondary">{nextSteps}</div>
      )}
      {actions && <div className="flex flex-wrap gap-scale-3">{actions}</div>}
    </section>
  )
}
