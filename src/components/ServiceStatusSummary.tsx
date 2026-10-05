import { useId } from 'react'
import { StatusBadge, type StatusBadgeVariant } from './StatusBadge'
import { type HeadingLevel } from './PageHeader'

export type ServiceCondition = 'operational' | 'degraded' | 'outage' | 'maintenance' | 'unknown'
const labels: Record<ServiceCondition, string> = {
  operational: 'Operational',
  degraded: 'Degraded performance',
  outage: 'Service disruption',
  maintenance: 'Maintenance',
  unknown: 'Status unknown',
}
const variants: Record<ServiceCondition, StatusBadgeVariant> = {
  operational: 'positive',
  degraded: 'warning',
  outage: 'negative',
  maintenance: 'info',
  unknown: 'neutral',
}
export type ServiceStatusSummaryProps = {
  title: string
  scope: string
  freshness: string
  summary: string
  services: readonly { id: string; name: string; condition: ServiceCondition; detail?: string }[]
  emptyMessage: string
  headingLevel?: HeadingLevel
}

/** The product supplies coverage, freshness, and aggregation; absence never means healthy. */
export function ServiceStatusSummary({
  title,
  scope,
  freshness,
  summary,
  services,
  emptyMessage,
  headingLevel = 2,
}: ServiceStatusSummaryProps) {
  const id = useId()
  const Heading = `h${headingLevel}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  return (
    <section aria-labelledby={id} className="space-y-scale-4">
      <Heading id={id} className="m-0 text-heading-md font-semibold break-words">
        {title}
      </Heading>
      <p className="m-0">{scope}</p>
      <p className="m-0 text-text-secondary">{freshness}</p>
      <p className="m-0 font-semibold">{summary}</p>
      {services.length ? (
        <ul className="m-0 list-none space-y-scale-3 p-0">
          {services.map((service) => (
            <li
              key={service.id}
              className="space-y-scale-2 rounded-shape-md border border-border-secondary p-scale-4 break-words"
            >
              <p className="m-0 font-semibold">{service.name}</p>
              <StatusBadge variant={variants[service.condition]}>
                {labels[service.condition]}
              </StatusBadge>
              {service.detail && <p className="m-0 text-text-secondary">{service.detail}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p className="m-0">{emptyMessage}</p>
      )}
    </section>
  )
}
