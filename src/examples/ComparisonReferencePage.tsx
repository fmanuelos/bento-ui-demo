import { ReferenceAppearanceControls } from './ReferenceAppearanceControls'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Button,
  Link,
  PageHeader,
  PlanComparison,
  Select,
  SiteNavigation,
  SkipLink,
} from '../components'

export function ComparisonReferencePage() {
  const location = useLocation()
  const service = new URLSearchParams(location.search).get('context') === 'services'
  const [basis, setBasis] = useState('monthly')
  const [scenario, setScenario] = useState('available')
  const [selection, setSelection] = useState('')
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr')
  const names = service ? ['Essentials service', 'Guided service'] : ['Starter', 'Team']
  useEffect(() => {
    document.title = `${service ? 'Service comparison' : 'Plan comparison'} — Bento UI reference`
  }, [service])
  return (
    <div dir={direction} className="min-h-screen bg-background-primary text-text-primary">
      <SkipLink targetId="comparison-content">Skip to comparison</SkipLink>
      <aside
        aria-label="Reference preview controls"
        className="space-y-scale-3 border-b border-border-secondary bg-surface-secondary p-scale-4"
      >
        <p className="m-0 text-body-sm">
          Reference preview · Fictional USD offers. Selection creates no purchase or subscription.
        </p>
        <div className="flex flex-wrap gap-scale-4">
          <ReferenceAppearanceControls />
          <Select
            label="Offer scenario"
            value={scenario}
            onChange={(event) => {
              setScenario(event.target.value)
              setSelection('')
            }}
            options={[
              { value: 'available', label: 'Available' },
              { value: 'loading', label: 'Loading' },
              { value: 'partial', label: 'One offer unavailable' },
              { value: 'stale', label: 'Stale prices' },
            ]}
          />
          <Select
            label="Reading direction"
            value={direction}
            onChange={(event) => setDirection(event.target.value as 'ltr' | 'rtl')}
            options={[
              { value: 'ltr', label: 'Left to right' },
              { value: 'rtl', label: 'Right to left' },
            ]}
          />
          <Link href={`/examples/comparison?context=${service ? 'plans' : 'services'}`}>
            Open {service ? 'subscription plans' : 'service packages'} context
          </Link>
        </div>
      </aside>
      <SiteNavigation
        brand="Bento examples"
        brandHref="/docs/templates"
        items={[
          { label: 'Comparison', href: '#comparison-content' },
          { label: 'Template catalog', href: '/docs/templates' },
        ]}
      />
      <main
        id="comparison-content"
        className="mx-auto max-w-container-page space-y-scale-8 px-page-padding-mobile py-scale-8 sm:px-page-padding-tablet lg:px-page-padding-desktop"
      >
        <PageHeader
          title={service ? 'Compare service packages' : 'Compare subscription plans'}
          description="Compare the same capabilities on the same billing basis before choosing a next step."
        />
        <Select
          label="Billing basis"
          value={basis}
          onChange={(event) => {
            setBasis(event.target.value)
            setSelection('')
          }}
          options={[
            { value: 'monthly', label: 'Monthly' },
            { value: 'annual', label: 'Annual' },
          ]}
        />
        {scenario === 'loading' ? (
          <p role="status">Loading sample offers… Prices are not yet available.</p>
        ) : (
          <PlanComparison
            title="Available offers"
            context={`Both offers use ${basis} billing in USD.`}
            plans={names.map((name, index) => ({
              id: String(index),
              name,
              price: new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              }).format((service ? 60 : 12) * (index + 1) * (basis === 'annual' ? 10 : 1)),
              basis: basis === 'annual' ? 'Total charged annually' : 'Total charged monthly',
              attributes: [
                {
                  id: 'seats',
                  label: service ? 'Sessions per month' : 'Included seats',
                  value: String(index + 1),
                },
                {
                  id: 'support',
                  label: 'Support',
                  value: index ? 'Priority email' : 'Standard email',
                },
              ],
              unavailableReason:
                scenario === 'stale'
                  ? 'Price is stale. Refresh offers before choosing.'
                  : scenario === 'partial' && index === 1
                    ? 'This offer is unavailable. The other offer remains available.'
                    : undefined,
              action: (
                <Button
                  onClick={() =>
                    setSelection(
                      `${name} selected for ${basis} billing. This is a preview only; no checkout is implemented.`,
                    )
                  }
                >
                  Choose {name}
                </Button>
              ),
            }))}
            qualifications="All prices and capabilities are fictional examples. No taxes, additional fees, eligibility, or real payment terms are represented."
            feedback={
              scenario === 'stale' ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    setScenario('available')
                    setSelection('')
                  }}
                >
                  Refresh sample offers
                </Button>
              ) : undefined
            }
          />
        )}
        <p role="status">{selection}</p>
      </main>
      <footer className="border-t border-border-secondary p-scale-5 text-body-sm">
        <Link href="/docs/templates/comparison">Read the Comparison contract</Link>
      </footer>
    </div>
  )
}
