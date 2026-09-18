import {
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { ChevronEndIcon } from '../icons'
import { Button } from './Button'
import { linkStyles } from './interactiveStyles'
import { OverlaySurface, type OverlayPlacement } from './internal/Overlay'

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
  overflowGroupLabel?: string
  overflowPlacement?: OverlayPlacement
  getOverflowAccessibleLabel?: (hiddenCount: number, expanded: boolean) => string
}

const defaultSeparator = <ChevronEndIcon size="small" />

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

function defaultOverflowLabel(hiddenCount: number, expanded: boolean) {
  const levels = `${hiddenCount} parent ${hiddenCount === 1 ? 'page' : 'pages'}`
  return expanded ? `Hide ${levels}` : `Show ${levels}`
}

function nextFocusableAfter(element: HTMLElement | null) {
  if (!element) return null
  const focusable = Array.from(document.querySelectorAll<HTMLElement>(focusableSelector)).filter(
    (candidate) =>
      candidate.getClientRects().length > 0 &&
      candidate.getAttribute('aria-hidden') !== 'true' &&
      !candidate.closest('[inert]'),
  )
  const index = focusable.indexOf(element)
  return index >= 0 ? (focusable[index + 1] ?? null) : null
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
  overflowGroupLabel = 'Parent pages',
  overflowPlacement = 'bottom-start',
  getOverflowAccessibleLabel = defaultOverflowLabel,
  className = '',
  ...props
}: BreadcrumbProps) {
  const popupId = useId()
  const anchorRef = useRef<HTMLSpanElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const surfaceRef = useRef<HTMLDivElement>(null)
  const popupLinkRefs = useRef<Array<HTMLAnchorElement | null>>([])
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded)
  const isExpanded = expanded ?? internalExpanded
  const visibleLimit = Number.isFinite(maxItems) ? Math.max(4, Math.floor(maxItems)) : items.length
  const shouldCollapse = items.length > visibleLimit
  const trailingCount = Math.max(2, visibleLimit - 2)
  const hiddenEnd = Math.max(1, items.length - trailingCount)
  const hiddenItems = shouldCollapse ? items.slice(1, hiddenEnd) : []
  const trailingItems = shouldCollapse ? items.slice(hiddenEnd) : items.slice(1)

  const setExpanded = (next: boolean) => {
    if (expanded === undefined) setInternalExpanded(next)
    onExpandedChange?.(next)
  }

  useEffect(() => {
    if (!isExpanded) return
    let cancelled = false
    queueMicrotask(() => {
      if (cancelled) return
      const firstLink = popupLinkRefs.current.find((link) => link?.isConnected)
      ;(firstLink ?? surfaceRef.current)?.focus()
    })
    return () => {
      cancelled = true
    }
  }, [isExpanded])

  if (items.length < 2) return null

  const itemContent = (item: BreadcrumbItem, index: number) => {
    const current = index === items.length - 1
    const content = (
      <>
        {item.icon && (
          <span className="grid size-scale-4 shrink-0 place-items-center" aria-hidden="true">
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
          className={linkStyles({
            variant: current ? 'navigation' : 'inline',
            className: [
              'inline-flex min-h-touch-target-min min-w-0 items-center gap-scale-1 rounded-shape-sm',
              current ? 'font-semibold text-text-primary' : '',
            ].join(' '),
          })}
        >
          {content}
        </a>
      )
    }

    return (
      <span
        aria-current={current ? 'page' : undefined}
        className={[
          'inline-flex min-h-touch-target-min min-w-0 items-center gap-scale-1',
          current ? 'font-semibold text-text-primary' : 'text-text-secondary',
        ].join(' ')}
      >
        {content}
      </span>
    )
  }

  const trailItem = (item: BreadcrumbItem, index: number) => (
    <li key={index} className="flex max-w-full min-w-0 items-center gap-scale-2">
      <span className="grid shrink-0 place-items-center text-text-tertiary" aria-hidden="true">
        {separator}
      </span>
      {itemContent(item, index)}
    </li>
  )

  const handlePopupKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return
    const availableLinks = popupLinkRefs.current.filter((link): link is HTMLAnchorElement =>
      Boolean(link?.isConnected),
    )
    const activeElement = document.activeElement
    const firstLink = availableLinks[0]
    const lastLink = availableLinks.at(-1)

    if (event.shiftKey && (activeElement === firstLink || activeElement === surfaceRef.current)) {
      event.preventDefault()
      setExpanded(false)
      queueMicrotask(() => triggerRef.current?.focus())
      return
    }

    if (!event.shiftKey && (activeElement === lastLink || availableLinks.length === 0)) {
      event.preventDefault()
      const nextTarget = nextFocusableAfter(triggerRef.current)
      setExpanded(false)
      queueMicrotask(() => (nextTarget ?? triggerRef.current)?.focus())
    }
  }

  return (
    <nav aria-label={label} className={className} {...props}>
      <ol className="m-0 flex max-w-full list-none flex-wrap items-center gap-x-scale-2 p-0 text-label-md">
        <li className="flex max-w-full min-w-0 items-center">{itemContent(items[0], 0)}</li>
        {shouldCollapse && (
          <li className="flex items-center gap-scale-2">
            <span
              className="grid shrink-0 place-items-center text-text-tertiary"
              aria-hidden="true"
            >
              {separator}
            </span>
            <span ref={anchorRef} className="inline-flex">
              <Button
                ref={triggerRef}
                variant="ghost"
                size="medium"
                aria-expanded={isExpanded}
                aria-controls={popupId}
                aria-label={getOverflowAccessibleLabel(hiddenItems.length, isExpanded)}
                onClick={() => setExpanded(!isExpanded)}
                className="h-auto min-h-touch-target-min px-scale-2"
              >
                <span aria-hidden="true">{overflowLabel}</span>
              </Button>
              <OverlaySurface
                ref={surfaceRef}
                id={popupId}
                role="group"
                aria-label={overflowGroupLabel}
                tabIndex={-1}
                open={isExpanded}
                anchorRef={anchorRef}
                placement={overflowPlacement}
                restoreFocus
                onDismiss={() => setExpanded(false)}
                onKeyDown={handlePopupKeyDown}
                className="w-max max-w-[min(20rem,calc(100vw-1rem))] min-w-48"
              >
                <ol className="m-0 grid list-none gap-scale-1 p-0">
                  {hiddenItems.map((item, index) => (
                    <li key={index}>
                      {item.href ? (
                        <a
                          ref={(element) => {
                            popupLinkRefs.current[index] = element
                          }}
                          href={item.href}
                          onClick={() => setExpanded(false)}
                          className={linkStyles({
                            variant: 'inline',
                            className:
                              'flex min-h-touch-target-min items-center gap-scale-2 rounded-shape-md px-scale-3 py-scale-2 text-label-md hover:bg-action-ghost-background-hover',
                          })}
                        >
                          {item.icon && (
                            <span
                              className="grid size-scale-4 shrink-0 place-items-center"
                              aria-hidden="true"
                            >
                              {item.icon}
                            </span>
                          )}
                          <span className="break-words">{item.label}</span>
                        </a>
                      ) : (
                        <span className="flex items-center gap-scale-2 px-scale-3 py-scale-2 text-label-md text-text-secondary">
                          {item.icon && (
                            <span
                              className="grid size-scale-4 shrink-0 place-items-center"
                              aria-hidden="true"
                            >
                              {item.icon}
                            </span>
                          )}
                          <span className="break-words">{item.label}</span>
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </OverlaySurface>
            </span>
          </li>
        )}
        {trailingItems.map((item, offset) => {
          const index = shouldCollapse ? hiddenEnd + offset : offset + 1
          return trailItem(item, index)
        })}
      </ol>
    </nav>
  )
}
