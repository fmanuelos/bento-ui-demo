import { useId, useState, type HTMLAttributes, type ReactNode } from 'react'
import { Button } from './Button'

export type BreadcrumbItem = {
  label: ReactNode
  href?: string
  icon?: ReactNode
}

export type BreadcrumbProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  items: readonly BreadcrumbItem[]
  label?: string
  separator?: ReactNode
  maxItems?: number
  expanded?: boolean
  defaultExpanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  overflowLabel?: ReactNode
  getOverflowAccessibleLabel?: (hiddenCount: number, expanded: boolean) => string
}

const defaultSeparator = (
  <svg
    className="size-space-4 rtl:rotate-180"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 3 5 5-5 5" />
  </svg>
)

function defaultOverflowLabel(hiddenCount: number, expanded: boolean) {
  const levels = `${hiddenCount} parent ${hiddenCount === 1 ? 'page' : 'pages'}`
  return expanded ? `Hide ${levels}` : `Show ${levels}`
}

export function Breadcrumb({
  items,
  label = 'Breadcrumb',
  separator = defaultSeparator,
  maxItems = 5,
  expanded,
  defaultExpanded = false,
  onExpandedChange,
  overflowLabel = '…',
  getOverflowAccessibleLabel = defaultOverflowLabel,
  className = '',
  ...props
}: BreadcrumbProps) {
  const disclosureId = useId()
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded)
  const isExpanded = expanded ?? internalExpanded
  const visibleLimit = Number.isFinite(maxItems) ? Math.max(4, Math.floor(maxItems)) : items.length
  const shouldCollapse = items.length > visibleLimit
  const trailingCount = Math.max(2, visibleLimit - 2)
  const hiddenEnd = Math.max(1, items.length - trailingCount)
  const hiddenItems = shouldCollapse ? items.slice(1, hiddenEnd) : []
  const trailingItems = shouldCollapse ? items.slice(hiddenEnd) : items.slice(1)

  if (items.length < 2) return null

  const setExpanded = (next: boolean) => {
    if (expanded === undefined) setInternalExpanded(next)
    onExpandedChange?.(next)
  }

  const itemContent = (item: BreadcrumbItem, index: number) => {
    const current = index === items.length - 1
    const content = (
      <>
        {item.icon && (
          <span className="grid size-space-4 shrink-0 place-items-center" aria-hidden="true">
            {item.icon}
          </span>
        )}
        <span className="break-words">{item.label}</span>
      </>
    )

    if (item.href) {
      return (
        <a
          href={item.href}
          aria-current={current ? 'page' : undefined}
          className={[
            'inline-flex min-h-touch-target-min min-w-0 items-center gap-space-1 rounded-shape-sm outline-none',
            'focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus-ring focus-visible:outline-solid',
            current
              ? 'font-semibold text-text-primary no-underline'
              : 'text-text-link underline underline-offset-4 visited:text-action-link-visited hover:text-action-link-hover active:text-action-link-active',
          ].join(' ')}
        >
          {content}
        </a>
      )
    }

    return (
      <span
        aria-current={current ? 'page' : undefined}
        className={[
          'inline-flex min-h-touch-target-min min-w-0 items-center gap-space-1',
          current ? 'font-semibold text-text-primary' : 'text-text-secondary',
        ].join(' ')}
      >
        {content}
      </span>
    )
  }

  const trailItem = (item: BreadcrumbItem, index: number) => (
    <li key={index} className="flex max-w-full min-w-0 items-center gap-space-2">
      <span className="grid shrink-0 place-items-center text-text-tertiary" aria-hidden="true">
        {separator}
      </span>
      {itemContent(item, index)}
    </li>
  )

  return (
    <nav aria-label={label} className={className} {...props}>
      <ol className="m-0 flex max-w-full list-none flex-wrap items-center gap-x-space-2 p-0 text-label-md">
        <li className="flex max-w-full min-w-0 items-center">{itemContent(items[0], 0)}</li>
        {shouldCollapse && (
          <li className="flex items-center gap-space-2">
            <span
              className="grid shrink-0 place-items-center text-text-tertiary"
              aria-hidden="true"
            >
              {separator}
            </span>
            <Button
              variant="ghost"
              size="medium"
              aria-expanded={isExpanded}
              aria-controls={hiddenItems
                .map((_, index) => `${disclosureId}-ancestor-${index}`)
                .join(' ')}
              aria-label={getOverflowAccessibleLabel(hiddenItems.length, isExpanded)}
              onClick={() => setExpanded(!isExpanded)}
              className="h-auto min-h-touch-target-min px-space-2"
            >
              <span aria-hidden="true">{overflowLabel}</span>
            </Button>
          </li>
        )}
        {shouldCollapse &&
          hiddenItems.map((item, offset) => {
            const index = offset + 1
            return (
              <li
                id={`${disclosureId}-ancestor-${offset}`}
                key={index}
                hidden={!isExpanded}
                className="flex max-w-full min-w-0 items-center gap-space-2"
              >
                <span
                  className="grid shrink-0 place-items-center text-text-tertiary"
                  aria-hidden="true"
                >
                  {separator}
                </span>
                {itemContent(item, index)}
              </li>
            )
          })}
        {trailingItems.map((item, offset) => {
          const index = shouldCollapse ? hiddenEnd + offset : offset + 1
          return trailItem(item, index)
        })}
      </ol>
    </nav>
  )
}
