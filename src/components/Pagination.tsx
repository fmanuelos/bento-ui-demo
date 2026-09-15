import { useLayoutEffect, useRef, type HTMLAttributes, type ReactNode } from 'react'
import { Button } from './Button'

export type PaginationProps = Omit<HTMLAttributes<HTMLElement>, 'onChange'> & {
  page: number
  pageCount?: number
  onPageChange: (page: number) => void
  siblingCount?: number
  showPageNumbers?: boolean
  label?: string
  disabled?: boolean
  hasNextPage?: boolean
  summary?: ReactNode
}

type PageItem = number | 'ellipsis-start' | 'ellipsis-end'

function pageItems(page: number, pageCount: number, siblings: number): PageItem[] {
  if (pageCount <= siblings * 2 + 5)
    return Array.from({ length: pageCount }, (_, index) => index + 1)
  const start = Math.max(2, page - siblings)
  const end = Math.min(pageCount - 1, page + siblings)
  const items: PageItem[] = [1]
  if (start > 2) items.push('ellipsis-start')
  for (let value = start; value <= end; value += 1) items.push(value)
  if (end < pageCount - 1) items.push('ellipsis-end')
  items.push(pageCount)
  return items
}

export function Pagination({
  page,
  pageCount,
  onPageChange,
  siblingCount = 1,
  showPageNumbers = true,
  label = 'Pagination',
  disabled = false,
  hasNextPage,
  summary,
  className = '',
  ...props
}: PaginationProps) {
  const navigationRef = useRef<HTMLElement>(null)
  const pendingFocus = useRef<string | null>(null)
  const safeCount = pageCount === undefined ? undefined : Math.max(1, pageCount)
  const current =
    safeCount === undefined ? Math.max(1, page) : Math.min(safeCount, Math.max(1, page))
  const canGoNext = hasNextPage ?? (safeCount === undefined || current < safeCount)
  const go = (next: number, focusTarget: string) => {
    if (
      !disabled &&
      next !== current &&
      next >= 1 &&
      (safeCount === undefined || next <= safeCount)
    ) {
      pendingFocus.current = focusTarget
      onPageChange(next)
    }
  }

  useLayoutEffect(() => {
    if (!pendingFocus.current) return

    const preferred = navigationRef.current?.querySelector<HTMLButtonElement>(
      `[data-pagination-control="${pendingFocus.current}"]`,
    )
    const currentPage = navigationRef.current?.querySelector<HTMLButtonElement>(
      `[data-pagination-control="page-${current}"]`,
    )
    const fallback = navigationRef.current?.querySelector<HTMLButtonElement>(
      `[data-pagination-control="${current > 1 ? 'previous' : 'next'}"]`,
    )
    const target =
      preferred && !preferred.disabled
        ? preferred
        : currentPage && !currentPage.disabled
          ? currentPage
          : fallback && !fallback.disabled
            ? fallback
            : null

    target?.focus()
    pendingFocus.current = null
  }, [current])

  return (
    <nav
      ref={navigationRef}
      aria-label={label}
      className={`flex flex-wrap items-center gap-space-2 ${className}`}
      {...props}
    >
      <Button
        variant="outline"
        size="medium"
        disabled={disabled || current === 1}
        onClick={() => go(current - 1, 'previous')}
        aria-label="Previous page"
        data-pagination-control="previous"
      >
        Previous
      </Button>
      {summary && (
        <span
          role="status"
          aria-atomic="true"
          className="mr-space-2 text-body-sm text-text-secondary"
        >
          {summary}
        </span>
      )}
      {showPageNumbers && safeCount !== undefined ? (
        <ol className="m-0 flex list-none items-center gap-space-1 p-0">
          {pageItems(current, safeCount, siblingCount).map((item) =>
            typeof item === 'number' ? (
              <li key={item}>
                <Button
                  variant={item === current ? 'secondary' : 'ghost'}
                  size="medium"
                  className="min-w-touch-target-min"
                  disabled={disabled}
                  aria-label={`Page ${item}`}
                  aria-current={item === current ? 'page' : undefined}
                  onClick={() => go(item, `page-${item}`)}
                  data-pagination-control={`page-${item}`}
                >
                  {item}
                </Button>
              </li>
            ) : (
              <li key={item} aria-hidden="true" className="px-space-1 text-text-tertiary">
                …
              </li>
            ),
          )}
        </ol>
      ) : (
        <span role="status" aria-atomic="true" className="text-body-sm text-text-secondary">
          Page {current}
          {safeCount === undefined ? '' : ` of ${safeCount}`}
        </span>
      )}
      <Button
        variant="outline"
        size="medium"
        disabled={disabled || !canGoNext}
        onClick={() => go(current + 1, 'next')}
        aria-label="Next page"
        data-pagination-control="next"
      >
        Next
      </Button>
    </nav>
  )
}
