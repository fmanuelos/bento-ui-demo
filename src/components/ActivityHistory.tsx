import { useId, type ReactNode } from 'react'
import { type HeadingLevel } from './PageHeader'

export type ActivityEvent = {
  id: string
  description: string
  timestamp?: { dateTime: string; label: string }
  actor?: string
  detail?: ReactNode
}
export type ActivityHistoryProps = {
  title: string
  ordering: string
  coverage?: ReactNode
  events: readonly ActivityEvent[]
  emptyMessage: string
  headingLevel?: HeadingLevel
}

export function ActivityHistory({
  title,
  ordering,
  coverage,
  events,
  emptyMessage,
  headingLevel = 2,
}: ActivityHistoryProps) {
  const id = useId()
  const Heading = `h${headingLevel}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  return (
    <section aria-labelledby={id} className="space-y-scale-4">
      <Heading id={id} className="m-0 text-heading-md font-semibold break-words">
        {title}
      </Heading>
      <p className="m-0 text-text-secondary">{ordering}</p>
      {coverage && <div className="text-text-secondary">{coverage}</div>}
      {events.length ? (
        <ol className="m-0 list-decimal space-y-scale-5 ps-scale-6">
          {events.map((event) => (
            <li key={event.id} className="space-y-scale-2 break-words">
              <p className="m-0 font-semibold">{event.description}</p>
              <p className="m-0 text-body-sm text-text-secondary">
                {event.timestamp ? (
                  <time dateTime={event.timestamp.dateTime}>{event.timestamp.label}</time>
                ) : (
                  'Time unknown'
                )}
                {event.actor && <> · {event.actor}</>}
              </p>
              {event.detail}
            </li>
          ))}
        </ol>
      ) : (
        <p className="m-0">{emptyMessage}</p>
      )}
    </section>
  )
}
