import { useEffect, useRef, type ReactNode } from 'react'

export type SortDirection = 'ascending' | 'descending'

export type TableColumn<T> = {
  id: string
  header: ReactNode
  cell: (row: T) => ReactNode
  numeric?: boolean
  sortable?: boolean
}

export type TableProps<T> = {
  caption: string
  columns: readonly TableColumn<T>[]
  rows: readonly T[]
  getRowId: (row: T) => string
  getRowLabel?: (row: T) => string
  sort?: { columnId: string; direction: SortDirection }
  onSort?: (columnId: string, direction: SortDirection) => void
  selectedRowIds?: readonly string[]
  onSelectionChange?: (rowIds: string[]) => void
  loading?: boolean
  error?: ReactNode
  emptyMessage?: ReactNode
  toolbar?: ReactNode
  className?: string
}

export function Table<T>({
  caption,
  columns,
  rows,
  getRowId,
  getRowLabel = getRowId,
  sort,
  onSort,
  selectedRowIds = [],
  onSelectionChange,
  loading = false,
  error,
  emptyMessage = 'No data available.',
  toolbar,
  className = '',
}: TableProps<T>) {
  const selectAllRef = useRef<HTMLInputElement>(null)
  const selectable = Boolean(onSelectionChange)
  const visibleRowIds = rows.map(getRowId)
  const selectedVisibleCount = visibleRowIds.filter((id) => selectedRowIds.includes(id)).length
  const allVisibleRowsSelected =
    visibleRowIds.length > 0 && selectedVisibleCount === visibleRowIds.length
  const someVisibleRowsSelected = selectedVisibleCount > 0 && !allVisibleRowsSelected

  useEffect(() => {
    if (selectAllRef.current) selectAllRef.current.indeterminate = someVisibleRowsSelected
  }, [someVisibleRowsSelected])

  const toggleRow = (rowId: string) => {
    onSelectionChange?.(
      selectedRowIds.includes(rowId)
        ? selectedRowIds.filter((id) => id !== rowId)
        : [...selectedRowIds, rowId],
    )
  }

  const toggleVisibleRows = () => {
    const visibleIds = new Set(visibleRowIds)
    onSelectionChange?.(
      allVisibleRowsSelected
        ? selectedRowIds.filter((id) => !visibleIds.has(id))
        : [...new Set([...selectedRowIds, ...visibleRowIds])],
    )
  }

  const availabilityMessage = loading
    ? 'Loading data…'
    : error
      ? error
      : rows.length === 0
        ? emptyMessage
        : null

  return (
    <section className={className} aria-busy={loading || undefined}>
      {toolbar && (
        <div className="mb-space-3 flex flex-wrap items-end justify-between gap-space-3">
          {toolbar}
        </div>
      )}

      <div className="overflow-hidden rounded-shape-lg border border-table-border">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-body-sm text-text-primary">
            <caption className="sr-only">{caption}</caption>
            <thead className="bg-table-header-background text-label-sm font-semibold text-text-secondary">
              <tr>
                {selectable && (
                  <th
                    scope="col"
                    className="h-control-height-small w-12 border-b border-table-border px-space-3"
                  >
                    <input
                      ref={selectAllRef}
                      type="checkbox"
                      aria-label="Select all visible rows"
                      checked={allVisibleRowsSelected}
                      onChange={toggleVisibleRows}
                      className="size-4 accent-action-primary-background-default"
                    />
                  </th>
                )}

                {columns.map((column) => {
                  const activeSort = sort?.columnId === column.id
                  const canSort = Boolean(column.sortable && onSort)

                  return (
                    <th
                      key={column.id}
                      scope="col"
                      aria-sort={activeSort ? sort.direction : undefined}
                      className={`h-control-height-small border-b border-table-border px-space-3 whitespace-nowrap ${column.numeric ? 'text-right' : ''}`}
                    >
                      {canSort ? (
                        <button
                          type="button"
                          className="font-inherit inline-flex min-h-control-height-small items-center gap-space-1 rounded-shape-sm outline-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus-ring focus-visible:outline-solid"
                          onClick={() =>
                            onSort?.(
                              column.id,
                              activeSort && sort.direction === 'ascending'
                                ? 'descending'
                                : 'ascending',
                            )
                          }
                        >
                          {column.header}
                          {activeSort && (
                            <span aria-hidden="true">
                              {sort.direction === 'ascending' ? '↑' : '↓'}
                            </span>
                          )}
                        </button>
                      ) : (
                        column.header
                      )}
                    </th>
                  )
                })}
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => {
                const rowId = getRowId(row)
                const isSelected = selectedRowIds.includes(rowId)

                return (
                  <tr
                    key={rowId}
                    className={`${isSelected ? 'bg-table-row-selected' : 'bg-table-row-background'} hover:bg-table-row-hover`}
                  >
                    {selectable && (
                      <td className="border-b border-table-border px-space-3 py-space-3">
                        <input
                          type="checkbox"
                          aria-label={`Select ${getRowLabel(row)}`}
                          checked={isSelected}
                          onChange={() => toggleRow(rowId)}
                          className="size-4 accent-action-primary-background-default"
                        />
                      </td>
                    )}

                    {columns.map((column) => (
                      <td
                        key={column.id}
                        className={`border-b border-table-border px-space-3 py-space-3 ${column.numeric ? 'text-right tabular-nums' : ''}`}
                      >
                        {column.cell(row)}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {availabilityMessage && (
          <div
            className="bg-table-row-background px-space-6 py-space-6 text-center text-body-sm text-text-secondary"
            role={error && !loading ? 'alert' : 'status'}
          >
            {availabilityMessage}
          </div>
        )}
      </div>
    </section>
  )
}
