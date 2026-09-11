import { type HTMLAttributes, type ReactNode } from 'react'
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
  const safeCount = pageCount === undefined ? undefined : Math.max(1, pageCount)
  const current =
    safeCount === undefined ? Math.max(1, page) : Math.min(safeCount, Math.max(1, page))
  const canGoNext = hasNextPage ?? (safeCount === undefined || current < safeCount)
  const go = (next: number) => {
    if (
      !disabled &&
      next !== current &&
      next >= 1 &&
      (safeCount === undefined || next <= safeCount)
    ) {
      onPageChange(next)
    }
  }

  return (
    <nav
      aria-label={label}
      className={`flex flex-wrap items-center gap-space-2 ${className}`}
      {...props}
    >
      <Button
        variant="outline"
        size="small"
        disabled={disabled || current === 1}
        onClick={() => go(current - 1)}
        aria-label="Previous page"
      >
        Previous
      </Button>
      {summary && <span className="mr-space-2 text-body-sm text-text-secondary">{summary}</span>}
      {showPageNumbers && safeCount !== undefined ? (
        <ol className="m-0 flex list-none items-center gap-space-1 p-0">
          {pageItems(current, safeCount, siblingCount).map((item) =>
            typeof item === 'number' ? (
              <li key={item}>
                <Button
                  variant={item === current ? 'secondary' : 'ghost'}
                  size="small"
                  iconOnly
                  disabled={disabled}
                  aria-label={`Page ${item}`}
                  aria-current={item === current ? 'page' : undefined}
                  onClick={() => go(item)}
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
        <span className="text-body-sm text-text-secondary" aria-live="polite">
          Page {current}
          {safeCount === undefined ? '' : ` of ${safeCount}`}
        </span>
      )}
      <Button
        variant="outline"
        size="small"
        disabled={disabled || !canGoNext}
        onClick={() => go(current + 1)}
        aria-label="Next page"
      >
        Next
      </Button>
    </nav>
  )
}
