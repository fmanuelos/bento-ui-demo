import { useId, type ReactNode } from 'react'
import { type HeadingLevel } from './PageHeader'

export type ReviewGroup = {
  id: string
  title: string
  values: readonly { id: string; label: string; value: ReactNode }[]
  correction?: ReactNode
}
export type ReviewSummaryProps = {
  title: string
  headingLevel?: HeadingLevel
  groups: readonly ReviewGroup[]
  consequences?: ReactNode
  feedback?: ReactNode
}

export function ReviewSummary({
  title,
  headingLevel = 2,
  groups,
  consequences,
  feedback,
}: ReviewSummaryProps) {
  const id = useId()
  const Heading = `h${headingLevel}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  return (
    <section aria-labelledby={id} className="space-y-scale-5">
      <Heading id={id} className="m-0 text-heading-md font-semibold break-words text-text-primary">
        {title}
      </Heading>
      {groups.map((group) => (
        <div
          key={group.id}
          role="group"
          aria-labelledby={`${id}-${group.id}`}
          className="space-y-scale-2 border-b border-border-secondary pb-scale-4"
        >
          <p id={`${id}-${group.id}`} className="m-0 font-semibold text-text-primary">
            {group.title}
          </p>
          <dl className="m-0 space-y-scale-2">
            {group.values.map((value) => (
              <div key={value.id} className="min-w-0">
                <dt className="text-label-sm font-semibold text-text-primary">{value.label}</dt>
                <dd className="m-0 break-words text-text-secondary">{value.value}</dd>
              </div>
            ))}
          </dl>
          {group.correction}
        </div>
      ))}
      {consequences && <div className="text-body-md text-text-secondary">{consequences}</div>}
      {feedback}
    </section>
  )
}
