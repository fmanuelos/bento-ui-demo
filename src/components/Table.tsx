import { type ReactNode } from 'react'

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
  sort,
  onSort,
  selectedRowIds,
  onSelectionChange,
  loading = false,
  error,
  emptyMessage = 'No data available.',
  toolbar,
  className = '',
}: TableProps<T>) {
  const selectable = Boolean(onSelectionChange)
  const selected = selectedRowIds ?? []
  const toggle = (id: string) => onSelectionChange?.(selected.includes(id) ? selected.filter((entry) => entry !== id) : [...selected, id])
  const toggleAll = () => onSelectionChange?.(selected.length === rows.length ? [] : rows.map(getRowId))

  return (
    <section className={className} aria-busy={loading || undefined}>
      {toolbar && <div className="mb-md flex flex-wrap items-center justify-between gap-md">{toolbar}</div>}
      <div className="overflow-x-auto rounded-lg border border-table-border">
        <table className="w-full border-collapse text-left text-body-sm text-text-primary">
          <caption className="sr-only">{caption}</caption>
          <thead className="bg-table-header-background text-label-sm font-semibold text-text-secondary">
            <tr>
              {selectable && <th scope="col" className="h-control-height-md w-12 border-b border-table-border px-md"><input type="checkbox" aria-label="Select all rows" checked={rows.length > 0 && selected.length === rows.length} onChange={toggleAll} className="size-4 accent-action-primary-background-default" /></th>}
              {columns.map((column) => {
                const activeSort = sort?.columnId === column.id
                return <th key={column.id} scope="col" aria-sort={activeSort ? sort.direction : undefined} className={`h-control-height-md whitespace-nowrap border-b border-table-border px-md ${column.numeric ? 'text-right' : ''}`}>{column.sortable ? <button type="button" className="inline-flex min-h-control-height-md items-center gap-xs rounded-sm font-inherit outline-none focus-visible:outline-3 focus-visible:outline-focus-ring" onClick={() => onSort?.(column.id, activeSort && sort.direction === 'ascending' ? 'descending' : 'ascending')}>{column.header}{activeSort && <span aria-hidden="true">{sort.direction === 'ascending' ? '↑' : '↓'}</span>}</button> : column.header}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const rowId = getRowId(row)
              const isSelected = selected.includes(rowId)
              return <tr key={rowId} className={`${isSelected ? 'bg-table-row-selected' : 'bg-table-row-background'} hover:bg-table-row-hover`}>
                {selectable && <td className="border-b border-table-border px-md py-md"><input type="checkbox" aria-label={`Select row ${rowId}`} checked={isSelected} onChange={() => toggle(rowId)} className="size-4 accent-action-primary-background-default" /></td>}
                {columns.map((column) => <td key={column.id} className={`border-b border-table-border px-md py-md ${column.numeric ? 'text-right tabular-nums' : ''}`}>{column.cell(row)}</td>)}
              </tr>
            })}
            {!loading && rows.length === 0 && <tr><td colSpan={columns.length + (selectable ? 1 : 0)} className="px-xl py-2xl text-center text-text-secondary">{error ?? emptyMessage}</td></tr>}
            {loading && <tr><td colSpan={columns.length + (selectable ? 1 : 0)} className="px-xl py-2xl text-center text-text-secondary">Loading data…</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  )
}
