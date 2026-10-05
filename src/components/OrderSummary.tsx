import { useId, type ReactNode } from 'react'
import { type HeadingLevel } from './PageHeader'

export type OrderSummaryProps = {
  title: string
  headingLevel?: HeadingLevel
  currency: string
  availability: 'current' | 'stale' | 'unavailable'
  notice: string
  items: readonly {
    id: string
    name: string
    quantity: string
    unitPrice: string
    lineTotal: string
  }[]
  charges: readonly { id: string; label: string; amount: string }[]
  total: { label: string; amount: string }
  recurring?: ReactNode
  corrections?: ReactNode
}

/** Display only. The consumer owns quote authority, money arithmetic, and commitment. */
export function OrderSummary({
  title,
  headingLevel = 2,
  currency,
  availability,
  notice,
  items,
  charges,
  total,
  recurring,
  corrections,
}: OrderSummaryProps) {
  const id = useId()
  const Heading = `h${headingLevel}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  return (
    <section
      aria-labelledby={id}
      className="space-y-scale-4 rounded-shape-md border border-border-secondary p-scale-4 break-words"
    >
      <Heading id={id} className="m-0 text-heading-md font-semibold">
        {title}
      </Heading>
      <p className="m-0 text-body-sm text-text-secondary">Currency: {currency}</p>
      <p className="m-0">{notice}</p>
      {availability === 'stale' && (
        <p className="m-0 font-semibold">Previous quote — refresh and review before paying.</p>
      )}
      {availability === 'unavailable' || !items.length ? (
        <p className="m-0">No payable order is available.</p>
      ) : (
        <>
          <ul className="m-0 list-none space-y-scale-4 p-0">
            {items.map((item) => (
              <li
                key={item.id}
                className="space-y-scale-2 border-b border-border-secondary pb-scale-4"
              >
                <p className="m-0 font-semibold">{item.name}</p>
                <dl className="m-0 grid gap-scale-2">
                  {[
                    ['Quantity', item.quantity],
                    ['Unit price', item.unitPrice],
                    ['Line total', item.lineTotal],
                  ].map(([label, value]) => (
                    <div key={label} className="flex flex-wrap justify-between gap-x-scale-4">
                      <dt>{label}</dt>
                      <dd className="m-0">
                        <bdi>{value}</bdi>
                      </dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>
          <dl className="m-0 space-y-scale-3">
            {charges.map((charge) => (
              <div key={charge.id} className="flex flex-wrap justify-between gap-x-scale-4">
                <dt>{charge.label}</dt>
                <dd className="m-0">
                  <bdi>{charge.amount}</bdi>
                </dd>
              </div>
            ))}
            <div className="flex flex-wrap justify-between gap-x-scale-4 border-t border-border-secondary pt-scale-3 font-semibold">
              <dt>{total.label}</dt>
              <dd className="m-0">
                <bdi>{total.amount}</bdi>
              </dd>
            </div>
          </dl>
          {recurring && <div className="space-y-scale-2 text-body-sm">{recurring}</div>}
        </>
      )}
      {corrections}
    </section>
  )
}
