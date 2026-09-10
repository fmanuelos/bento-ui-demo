import { useId, useState, type KeyboardEvent, type ReactNode } from 'react'

export type DataGridColumn<T> = {
  id: string
  header: ReactNode
  cell: (row: T) => ReactNode
  edit?: (row: T, finish: () => void) => ReactNode
  numeric?: boolean
}

export type DataGridProps<T> = {
  label: string
  columns: readonly DataGridColumn<T>[]
  rows: readonly T[]
  getRowId: (row: T) => string
  selectable?: boolean
  selectedRowIds?: readonly string[]
  onSelectionChange?: (rowIds: string[]) => void
  loading?: boolean
  emptyMessage?: ReactNode
  className?: string
}

export function DataGrid<T>({
  label,
  columns,
  rows,
  getRowId,
  selectable = false,
  selectedRowIds = [],
  onSelectionChange,
  loading = false,
  emptyMessage = 'No data available.',
  className = '',
}: DataGridProps<T>) {
  const gridId = useId()
  const [focusCell, setFocusCell] = useState({ row: 0, column: 0 })
  const [editingCell, setEditingCell] = useState<string | null>(null)
  const focus = (row: number, column: number) => {
    const next = {
      row: Math.max(0, Math.min(row, rows.length - 1)),
      column: Math.max(0, Math.min(column, columns.length - 1)),
    }
    setFocusCell(next)
    queueMicrotask(() =>
      document.getElementById(`${gridId}-cell-${next.row}-${next.column}`)?.focus(),
    )
  }

  const handleKeyDown = (
    event: KeyboardEvent<HTMLTableCellElement>,
    rowIndex: number,
    columnIndex: number,
    rowId: string,
    column: DataGridColumn<T>,
  ) => {
    const cellId = `${rowId}-${column.id}`
    if (editingCell === cellId) {
      if (event.key === 'Escape') {
        event.preventDefault()
        setEditingCell(null)
        focus(rowIndex, columnIndex)
      }
      return
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      focus(rowIndex, columnIndex + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      focus(rowIndex, columnIndex - 1)
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      focus(rowIndex + 1, columnIndex)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      focus(rowIndex - 1, columnIndex)
    } else if (event.key === 'Home') {
      event.preventDefault()
      focus(rowIndex, 0)
    } else if (event.key === 'End') {
      event.preventDefault()
      focus(rowIndex, columns.length - 1)
    } else if (event.key === 'Enter' && column.edit) {
      event.preventDefault()
      setEditingCell(cellId)
    } else if (event.key === ' ' && selectable) {
      event.preventDefault()
      onSelectionChange?.(
        selectedRowIds.includes(rowId)
          ? selectedRowIds.filter((id) => id !== rowId)
          : [...selectedRowIds, rowId],
      )
    }
  }

  return (
    <div
      className={`overflow-x-auto rounded-lg border border-table-border ${className}`}
      aria-busy={loading || undefined}
    >
      <table
        role="grid"
        aria-label={label}
        aria-rowcount={rows.length + 1}
        aria-colcount={columns.length}
        aria-multiselectable={selectable || undefined}
        className="w-full border-collapse text-left text-body-sm text-text-primary"
      >
        <thead className="bg-table-header-background text-label-sm font-semibold text-text-secondary">
          <tr role="row">
            {columns.map((column, index) => (
              <th
                key={column.id}
                role="columnheader"
                aria-colindex={index + 1}
                className={`h-control-height-small border-b border-table-border px-space-3 ${column.numeric ? 'text-right' : ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => {
            const rowId = getRowId(row)
            const selected = selectedRowIds.includes(rowId)
            return (
              <tr
                key={rowId}
                role="row"
                aria-rowindex={rowIndex + 2}
                aria-selected={selectable ? selected : undefined}
                className={selected ? 'bg-table-row-selected' : 'bg-table-row-background'}
              >
                {columns.map((column, columnIndex) => {
                  const cellId = `${rowId}-${column.id}`
                  const editing = editingCell === cellId
                  return (
                    <td
                      key={column.id}
                      id={`${gridId}-cell-${rowIndex}-${columnIndex}`}
                      role="gridcell"
                      aria-colindex={columnIndex + 1}
                      tabIndex={
                        focusCell.row === rowIndex && focusCell.column === columnIndex ? 0 : -1
                      }
                      onFocus={() => setFocusCell({ row: rowIndex, column: columnIndex })}
                      onDoubleClick={() => column.edit && setEditingCell(cellId)}
                      onKeyDown={(event) =>
                        handleKeyDown(event, rowIndex, columnIndex, rowId, column)
                      }
                      className={`border-b border-table-border px-space-3 py-space-3 outline-none focus-visible:ring-3 focus-visible:ring-focus-ring focus-visible:ring-inset ${column.numeric ? 'text-right tabular-nums' : ''}`}
                    >
                      {editing && column.edit
                        ? column.edit(row, () => {
                            setEditingCell(null)
                            focus(rowIndex, columnIndex)
                          })
                        : column.cell(row)}
                    </td>
                  )
                })}
              </tr>
            )
          })}
          {!loading && rows.length === 0 && (
            <tr role="row">
              <td
                role="gridcell"
                colSpan={columns.length}
                className="px-space-6 py-space-8 text-center text-text-secondary"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
          {loading && (
            <tr role="row">
              <td
                role="gridcell"
                colSpan={columns.length}
                className="px-space-6 py-space-8 text-center text-text-secondary"
              >
                Loading data…
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
