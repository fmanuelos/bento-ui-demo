import { useId, type ReactNode } from 'react'
import { type HeadingLevel } from './PageHeader'

export type ComparisonPlan = {
  id: string
  name: string
  price: string
  basis: string
  attributes: readonly { id: string; label: string; value: string }[]
  action?: ReactNode
  unavailableReason?: string
}
export type PlanComparisonProps = {
  title: string
  headingLevel?: HeadingLevel
  context: ReactNode
  plans: readonly ComparisonPlan[]
  qualifications: ReactNode
  controls?: ReactNode
  feedback?: ReactNode
}

/** Offer-summary presentation. Prices and eligibility are authoritative consumer inputs. */
export function PlanComparison({
  title,
  headingLevel = 2,
  context,
  plans,
  qualifications,
  controls,
  feedback,
}: PlanComparisonProps) {
  const id = useId()
  const Heading = `h${headingLevel}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  return (
    <section aria-labelledby={id} className="space-y-scale-5">
      <Heading id={id} className="m-0 text-heading-md font-semibold break-words text-text-primary">
        {title}
      </Heading>
      <div className="text-text-secondary">{context}</div>
      {controls}
      {feedback}
      <ul className="m-0 grid list-none gap-scale-5 p-0 md:grid-cols-2">
        {plans.map((plan) => (
          <li
            key={plan.id}
            className="min-w-0 space-y-scale-4 rounded-shape-lg border border-border-secondary bg-surface-primary p-scale-5"
          >
            <p className="m-0 text-heading-sm font-semibold break-words text-text-primary">
              {plan.name}
            </p>
            <p className="m-0">
              <strong className="text-heading-md text-text-primary">{plan.price}</strong>
              <span className="block text-body-sm text-text-secondary">{plan.basis}</span>
            </p>
            <dl className="m-0 space-y-scale-3">
              {plan.attributes.map((attribute) => (
                <div key={attribute.id}>
                  <dt className="font-semibold text-text-primary">{attribute.label}</dt>
                  <dd className="m-0 break-words text-text-secondary">{attribute.value}</dd>
                </div>
              ))}
            </dl>
            {plan.unavailableReason ? (
              <p className="text-text-secondary">{plan.unavailableReason}</p>
            ) : (
              <div className="min-w-0 [&_button]:h-auto [&_button]:min-h-control-height-medium [&_button]:max-w-full [&_button]:py-scale-2 [&_button]:whitespace-normal">
                {plan.action}
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="text-body-sm text-text-secondary">{qualifications}</div>
    </section>
  )
}
