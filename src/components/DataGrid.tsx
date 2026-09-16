import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { Pagination, type PaginationProps } from './Pagination'

const selectionColumnId = '__bento-row-selection__'

type ActiveCell = {
  rowId: string | null
  columnId: string
}

export type DataGridSortDirection = 'ascending' | 'descending'

export type DataGridPaginationProps = Pick<
  PaginationProps,
  | 'page'
  | 'pageCount'
  | 'onPageChange'
  | 'siblingCount'
  | 'showPageNumbers'
  | 'label'
  | 'disabled'
  | 'hasNextPage'
  | 'summary'
  | 'className'
> & {
  pageSize: number
  totalRowCount?: number
}

export type DataGridColumn<T> = {
  id: string
  header: ReactNode
  cell: (row: T) => ReactNode
  edit?: (row: T, finish: () => void) => ReactNode
  numeric?: boolean
  sortable?: boolean
}

export type DataGridProps<T> = {
  label: string
  columns: readonly DataGridColumn<T>[]
  rows: readonly T[]
  getRowId: (row: T) => string
  getRowLabel?: (row: T) => string
  selectable?: boolean
  selectedRowIds?: readonly string[]
  onSelectionChange?: (rowIds: string[]) => void
  sort?: { columnId: string; direction: DataGridSortDirection }
  onSort?: (columnId: string, direction: DataGridSortDirection) => void
  pagination?: DataGridPaginationProps
  loading?: boolean
  error?: ReactNode
  emptyMessage?: ReactNode
  className?: string
}

export function DataGrid<T>({
  label,
  columns,
  rows,
  getRowId,
  getRowLabel = getRowId,
  selectable = false,
  selectedRowIds = [],
  onSelectionChange,
  sort,
  onSort,
  pagination,
  loading = false,
  error,
  emptyMessage = 'No data available.',
  className = '',
}: DataGridProps<T>) {
  const gridId = useId()
  const gridHadFocus = useRef(false)
  const selectAllRef = useRef<HTMLInputElement>(null)
  const [activeCell, setActiveCell] = useState<ActiveCell | null>(null)
  const [editingCell, setEditingCell] = useState<string | null>(null)
  const managedColumnIds = [
    ...(selectable ? [selectionColumnId] : []),
    ...columns.map((column) => column.id),
  ]
  const rowIds = rows.map(getRowId)
  const activeCellIsAvailable = Boolean(
    activeCell &&
    rows.length > 0 &&
    (activeCell.rowId === null || rowIds.includes(activeCell.rowId)) &&
    managedColumnIds.includes(activeCell.columnId),
  )
  const effectiveActiveCell = activeCellIsAvailable
    ? activeCell
    : rows[0] && managedColumnIds[0]
      ? { rowId: getRowId(rows[0]), columnId: managedColumnIds[0] }
      : null
  const hasEffectiveActiveCell = Boolean(effectiveActiveCell)
  const selectedVisibleCount = rowIds.filter((rowId) => selectedRowIds.includes(rowId)).length
  const allVisibleRowsSelected = rows.length > 0 && selectedVisibleCount === rows.length
  const someVisibleRowsSelected = selectedVisibleCount > 0 && !allVisibleRowsSelected

  const cellKey = (rowId: string, columnId: string) => `${rowId}\u001f${columnId}`
  const cellDomId = (gridRowIndex: number, columnIndex: number) =>
    `${gridId}-cell-${gridRowIndex}-${columnIndex}`

  const focusCell = (gridRowIndex: number, columnIndex: number) => {
    if (rows.length === 0 || managedColumnIds.length === 0) return

    const nextGridRowIndex = Math.max(0, Math.min(gridRowIndex, rows.length))
    const nextColumnIndex = Math.max(0, Math.min(columnIndex, managedColumnIds.length - 1))
    const next = {
      rowId: nextGridRowIndex === 0 ? null : getRowId(rows[nextGridRowIndex - 1]),
      columnId: managedColumnIds[nextColumnIndex],
    }

    setActiveCell(next)
    queueMicrotask(() =>
      document.getElementById(cellDomId(nextGridRowIndex, nextColumnIndex))?.focus(),
    )
  }

  useEffect(() => {
    if (!activeCell || activeCellIsAvailable || !hasEffectiveActiveCell || !gridHadFocus.current)
      return

    queueMicrotask(() => document.getElementById(`${gridId}-cell-1-0`)?.focus())
  }, [activeCell, activeCellIsAvailable, gridId, hasEffectiveActiveCell])

  useEffect(() => {
    if (selectAllRef.current) selectAllRef.current.indeterminate = someVisibleRowsSelected
  }, [someVisibleRowsSelected])

  const toggleRow = (rowId: string) => {
    if (!selectable || !onSelectionChange) return

    onSelectionChange(
      selectedRowIds.includes(rowId)
        ? selectedRowIds.filter((id) => id !== rowId)
        : [...selectedRowIds, rowId],
    )
  }

  const toggleVisibleRows = () => {
    if (!selectable || !onSelectionChange) return

    const visibleIds = new Set(rowIds)
    onSelectionChange(
      allVisibleRowsSelected
        ? selectedRowIds.filter((rowId) => !visibleIds.has(rowId))
        : [...new Set([...selectedRowIds, ...rowIds])],
    )
  }

  const requestSort = (column: DataGridColumn<T>) => {
    if (!column.sortable || !onSort) return

    const activeSort = sort?.columnId === column.id
    onSort(column.id, activeSort && sort.direction === 'ascending' ? 'descending' : 'ascending')
  }

  const finishEditing = (gridRowIndex: number, columnIndex: number) => {
    setEditingCell(null)
    focusCell(gridRowIndex, columnIndex)
  }

  const handleKeyDown = (
    event: KeyboardEvent<HTMLTableCellElement>,
    gridRowIndex: number,
    columnIndex: number,
    rowId: string | null,
    column?: DataGridColumn<T>,
  ) => {
    const currentCellKey = rowId ? cellKey(rowId, managedColumnIds[columnIndex]) : null

    if (currentCellKey && editingCell === currentCellKey) {
      if (event.key === 'Escape') {
        event.preventDefault()
        finishEditing(gridRowIndex, columnIndex)
      }
      return
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      focusCell(gridRowIndex, columnIndex + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      focusCell(gridRowIndex, columnIndex - 1)
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      focusCell(gridRowIndex + 1, columnIndex)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      focusCell(gridRowIndex - 1, columnIndex)
    } else if (event.key === 'Home' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault()
      focusCell(0, 0)
    } else if (event.key === 'End' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault()
      focusCell(rows.length, managedColumnIds.length - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      focusCell(gridRowIndex, 0)
    } else if (event.key === 'End') {
      event.preventDefault()
      focusCell(gridRowIndex, managedColumnIds.length - 1)
    } else if (
      rowId === null &&
      (event.key === 'Enter' || event.key === ' ') &&
      (column?.sortable || (selectable && columnIndex === 0))
    ) {
      event.preventDefault()
      if (column) requestSort(column)
      else toggleVisibleRows()
    } else if (
      rowId !== null &&
      (event.key === 'Enter' || event.key === 'F2') &&
      column?.edit &&
      currentCellKey
    ) {
      event.preventDefault()
      setEditingCell(currentCellKey)
    } else if (rowId !== null && event.key === ' ' && selectable) {
      event.preventDefault()
      toggleRow(rowId)
    }
  }

  const availabilityMessage = loading
    ? 'Loading data…'
    : error
      ? error
      : rows.length === 0
        ? emptyMessage
        : null
  const statusId = availabilityMessage ? `${gridId}-status` : undefined
  const pageSize = Math.max(1, pagination?.pageSize ?? 1)
  const derivedPageCount =
    pagination?.totalRowCount === undefined
      ? undefined
      : Math.max(1, Math.ceil(pagination.totalRowCount / pageSize))
  const pageCount = pagination?.pageCount ?? derivedPageCount
  const currentPage = pagination
    ? Math.max(1, pageCount === undefined ? pagination.page : Math.min(pageCount, pagination.page))
    : 1
  const rowOffset = pagination ? (currentPage - 1) * pageSize : 0
  const rowCount = pagination
    ? pagination.totalRowCount === undefined
      ? -1
      : pagination.totalRowCount + 1
    : rows.length + 1
  const paginationSummary =
    pagination?.summary ??
    (pagination?.totalRowCount === undefined
      ? undefined
      : rows.length === 0
        ? `0 of ${pagination.totalRowCount}`
        : `${rowOffset + 1}–${Math.min(rowOffset + rows.length, pagination.totalRowCount)} of ${pagination.totalRowCount}`)

  return (
    <div
      className={`overflow-hidden rounded-shape-lg border border-table-border ${className}`}
      aria-busy={loading || undefined}
    >
      <div
        className="overflow-x-auto"
        onFocusCapture={() => {
          gridHadFocus.current = true
        }}
        onBlurCapture={(event) => {
          if (
            event.relatedTarget instanceof Node &&
            !event.currentTarget.contains(event.relatedTarget)
          ) {
            gridHadFocus.current = false
            setEditingCell(null)
          }
        }}
      >
        <table
          role="grid"
          aria-label={label}
          aria-describedby={statusId}
          aria-rowcount={rowCount}
          aria-colcount={managedColumnIds.length}
          aria-multiselectable={selectable || undefined}
          aria-readonly={columns.every((column) => !column.edit) || undefined}
          className="w-full border-collapse text-left text-body-sm text-text-primary"
        >
          <thead className="bg-table-header-background text-label-md font-semibold text-text-secondary">
            <tr role="row">
              {selectable && (
                <th
                  id={cellDomId(0, 0)}
                  role="columnheader"
                  aria-colindex={1}
                  tabIndex={
                    effectiveActiveCell?.rowId === null &&
                    effectiveActiveCell.columnId === selectionColumnId
                      ? 0
                      : -1
                  }
                  onFocus={() => setActiveCell({ rowId: null, columnId: selectionColumnId })}
                  onKeyDown={(event) => handleKeyDown(event, 0, 0, null)}
                  className="h-control-height-medium w-12 border-b border-table-border px-space-3 text-center outline-none focus-visible:ring-3 focus-visible:ring-focus-ring focus-visible:ring-inset"
                >
                  <span className="sr-only">Select</span>
                  <input
                    ref={selectAllRef}
                    type="checkbox"
                    tabIndex={-1}
                    aria-label="Select all visible rows"
                    checked={allVisibleRowsSelected}
                    onKeyDown={(event) => event.stopPropagation()}
                    onChange={() => {
                      toggleVisibleRows()
                      focusCell(0, 0)
                    }}
                    className="size-4 accent-action-primary-background-default"
                  />
                </th>
              )}

              {columns.map((column, index) => {
                const managedColumnIndex = index + (selectable ? 1 : 0)
                const canSort = Boolean(column.sortable && onSort)
                const sortDirection =
                  column.sortable && sort?.columnId === column.id ? sort.direction : undefined

                return (
                  <th
                    key={column.id}
                    id={cellDomId(0, managedColumnIndex)}
                    role="columnheader"
                    aria-colindex={managedColumnIndex + 1}
                    aria-sort={sortDirection}
                    tabIndex={
                      effectiveActiveCell?.rowId === null &&
                      effectiveActiveCell.columnId === column.id
                        ? 0
                        : -1
                    }
                    onFocus={() => setActiveCell({ rowId: null, columnId: column.id })}
                    onKeyDown={(event) => handleKeyDown(event, 0, managedColumnIndex, null, column)}
                    className={`h-control-height-medium border-b border-table-border px-space-3 whitespace-nowrap outline-none focus-visible:ring-3 focus-visible:ring-focus-ring focus-visible:ring-inset ${column.numeric ? 'text-right' : ''}`}
                  >
                    {canSort ? (
                      <button
                        type="button"
                        tabIndex={-1}
                        aria-label={`${typeof column.header === 'string' ? column.header : column.id}, sort ${sortDirection === 'ascending' ? 'descending' : 'ascending'}`}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') event.stopPropagation()
                        }}
                        onClick={() => {
                          requestSort(column)
                          focusCell(0, managedColumnIndex)
                        }}
                        className="font-inherit inline-flex min-h-control-height-medium items-center gap-space-1 rounded-shape-sm outline-none"
                      >
                        {column.header}
                        <span aria-hidden="true">
                          {sortDirection ? (sortDirection === 'ascending' ? '↑' : '↓') : '↕'}
                        </span>
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
            {rows.map((row, rowIndex) => {
              const rowId = getRowId(row)
              const rowSelected = selectedRowIds.includes(rowId)
              const gridRowIndex = rowIndex + 1

              return (
                <tr
                  key={rowId}
                  role="row"
                  aria-rowindex={rowOffset + rowIndex + 2}
                  aria-selected={selectable ? rowSelected : undefined}
                  className={
                    rowSelected
                      ? 'bg-table-row-selected'
                      : 'bg-table-row-background hover:bg-table-row-hover'
                  }
                >
                  {selectable && (
                    <td
                      id={cellDomId(gridRowIndex, 0)}
                      role="gridcell"
                      aria-colindex={1}
                      tabIndex={
                        effectiveActiveCell?.rowId === rowId &&
                        effectiveActiveCell.columnId === selectionColumnId
                          ? 0
                          : -1
                      }
                      onFocus={() => setActiveCell({ rowId, columnId: selectionColumnId })}
                      onClick={() => focusCell(gridRowIndex, 0)}
                      onKeyDown={(event) => handleKeyDown(event, gridRowIndex, 0, rowId)}
                      className="border-b border-table-border px-space-3 py-space-3 text-center outline-none focus-visible:ring-3 focus-visible:ring-focus-ring focus-visible:ring-inset"
                    >
                      <input
                        type="checkbox"
                        tabIndex={-1}
                        aria-label={`Select ${getRowLabel(row)}`}
                        checked={rowSelected}
                        onKeyDown={(event) => event.stopPropagation()}
                        onChange={() => {
                          toggleRow(rowId)
                          focusCell(gridRowIndex, 0)
                        }}
                        className="size-4 accent-action-primary-background-default"
                      />
                    </td>
                  )}

                  {columns.map((column, columnIndex) => {
                    const managedColumnIndex = columnIndex + (selectable ? 1 : 0)
                    const currentCellKey = cellKey(rowId, column.id)
                    const editing = editingCell === currentCellKey

                    return (
                      <td
                        key={column.id}
                        id={cellDomId(gridRowIndex, managedColumnIndex)}
                        role="gridcell"
                        aria-colindex={managedColumnIndex + 1}
                        tabIndex={
                          !editing &&
                          effectiveActiveCell?.rowId === rowId &&
                          effectiveActiveCell.columnId === column.id
                            ? 0
                            : -1
                        }
                        onFocus={() => setActiveCell({ rowId, columnId: column.id })}
                        onClick={() => {
                          if (!editing) focusCell(gridRowIndex, managedColumnIndex)
                        }}
                        onDoubleClick={() => column.edit && setEditingCell(currentCellKey)}
                        onKeyDown={(event) =>
                          handleKeyDown(event, gridRowIndex, managedColumnIndex, rowId, column)
                        }
                        className={`border-b border-table-border px-space-3 py-space-3 outline-none focus-visible:ring-3 focus-visible:ring-focus-ring focus-visible:ring-inset ${column.numeric ? 'text-right tabular-nums' : ''}`}
                      >
                        {editing && column.edit
                          ? column.edit(row, () => finishEditing(gridRowIndex, managedColumnIndex))
                          : column.cell(row)}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {availabilityMessage && (
        <div
          id={statusId}
          className="bg-table-row-background px-space-6 py-space-6 text-center text-body-sm text-text-secondary"
          role={error && !loading ? 'alert' : 'status'}
        >
          {availabilityMessage}
        </div>
      )}

      {pagination && (
        <div className="border-t border-table-border bg-table-row-background px-space-3 py-space-3">
          <Pagination
            page={pagination.page}
            pageCount={pageCount}
            onPageChange={pagination.onPageChange}
            siblingCount={pagination.siblingCount}
            showPageNumbers={pagination.showPageNumbers}
            label={pagination.label ?? `${label} pages`}
            disabled={loading || pagination.disabled}
            hasNextPage={pagination.hasNextPage}
            summary={paginationSummary}
            className={pagination.className}
          />
        </div>
      )}
    </div>
  )
}
