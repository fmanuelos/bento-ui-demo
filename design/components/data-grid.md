# Data grid

## Status

Contract complete.

## Purpose

**Best for managing many records and spreadsheet-like tasks.**

A data grid is an interactive composite for working across rows and columns. Its
primary job is record management: people can navigate cells as one coordinated
control and may select, edit, or act on data without leaving the grid.

Use a [`Table`](table.md) when people mainly need to read or compare values and
ordinary page controls are sufficient for sorting, filtering, pagination,
selection, or row actions.

When external search, filters, sorting, counts, or pagination refine the grid's
dataset, their coordination follows the
[`Search, filtering, and results pattern`](../patterns/search-filtering-and-results.md).
The grid continues to own managed cell navigation and editing.

Multi-record selection and grouped operations follow the
[`Selection and bulk actions pattern`](../patterns/selection-and-bulk-actions.md)
for scope, persistence, commitment, and recovery. The grid continues to own its
selection controls, bounded cell-range interaction, active cell, and managed
keyboard behavior.

Record count alone does not determine the component. What makes this a data grid
is its managed two-dimensional interaction, not its visual density or number of
rows.

## Use when

- Arrow keys need to move between cells.
- People edit values inline or move through several editable cells.
- The workflow includes multi-row or cell-range selection, bulk actions, or
  spreadsheet-like operations.
- Treating the grid as one page tab stop makes a complex data-management task
  easier to operate.

## Do not use when

- People mainly read, scan, or compare values.
- Sorting, filtering, pagination, selection, and row actions can remain ordinary
  page controls.
- The only reason is a large dataset, compact density, or a desire to reduce the
  number of page tab stops.
- The team cannot implement and test the complete managed-focus keyboard model.

## Anatomy and variants

1. Accessible grid name or caption
2. Column headers and optional row headers
3. One active cell and one managed page tab stop
4. Optional interactive cell content entered through edit or action mode
5. Optional selection, controlled sorting, editing, bulk actions, and row actions
6. Optional [`Pagination`](pagination.md) or virtualization controls

Supported variants are read-only navigable, selectable, and editable. Use either
roving focus on cells or cell descendants, or a focusable grid with an active
descendant. Do not mix these focus strategies during ordinary navigation.

Selectable grids use the shared visual indicator from the
[`Checkbox contract`](checkbox.md). Row indicators expose checked or unchecked
state, and the visible-set summary additionally exposes indeterminate when only
some visible rows are selected. Reusing the indicator does not change the grid's
managed-focus model.

Focus, active cell, selection, and unavailable targets follow the shared
collection model in [`DESIGN.md`](../../DESIGN.md#components).

## States and semantic tokens

Support focused cell, selected row or cell, sorted column, editing, invalid edit,
loading, empty, partial, stale, and error states as relevant. Focus and selection
remain independent. A state change never removes the only focused element without
placing focus at the nearest logical location.

Sorting has an unsorted state and ascending or descending state for the active
column. Only one column exposes a sort direction at a time. The sort state is
controlled by the data owner: activating a sortable header requests the next
direction, and the owner supplies the reordered rows and updated state. Sorting
does not imply selection or move the active cell to a different record.

Use `table-header-background`, `table-row-background`, `table-row-hover`,
`table-row-selected`, and `table-border` for shared visual structure. Focus,
validation, and action states use their corresponding shared semantic roles.

Loading follows the [`Progress contract`](progress.md) and
[`Asynchronous feedback pattern`](../patterns/async-feedback.md). Predictable
initial content may use skeleton rows, but those placeholders remain outside the
grid semantics, dimensions, selection, active-cell state, and managed navigation.
Empty and unavailable results follow the [`Empty state contract`](../blocks/empty-state.md)
without joining the managed grid navigation. A refresh preserves usable rows
instead of returning the grid to skeleton placeholders.

## Behavior

Only one grid tab stop participates in the surrounding page sequence at a time.
Interactive controls inside a cell do not independently join the grid navigation
sequence.

When the selection cell owns managed focus, it draws the grid focus treatment
around the cell and its checkbox indicator does not draw a second focus ring.
Pointer activation of the indicator and Space on the active selection cell make
the same selection change.

Entering edit or action mode gives the active cell's content its native input
behavior. Leaving that mode restores grid navigation. Sorting and filtering
preserve focus and selection when the affected records remain available.

Sortable column headers participate in the same managed navigation model as data
cells; they do not add independent page tab stops. Pointer activation and
keyboard activation request the same sort change. After rows are reordered,
focus remains associated with the same record and column when that record is
still present.

### Keyboard interaction

- Arrow keys move one available cell in their indicated direction without
  wrapping at grid boundaries.
- Home and End move to the first and last available cell in the current row.
- Control+Home and Control+End move to the first and last available cell in the
  grid. Use the platform-equivalent modifier where Control is unavailable.
- Arrow Up from the first data row moves to its column header. On a sortable
  column header, Enter or Space requests the next sort direction.
- When a select-all column header is present, Space selects or clears all visible
  rows without changing selections outside the current result set.
- Enter or F2 enters edit or action mode when the active cell supports it.
- Escape cancels an edit when possible, leaves edit or action mode, and restores
  grid navigation.
- Tab moves among native controls while in edit or action mode. From grid
  navigation, Tab leaves the grid and continues through the surrounding page.
- Space changes selection only when selection is supported and the active cell's
  native control does not use that command.
- Navigation skips disabled or unavailable targets while keeping visible items
  understandable.

Virtualization preserves row and column position, exposes the available extent,
and does not make off-screen content appear absent. Every drag or resize action
has a non-drag alternative. Pagination follows the
[`Pagination contract`](pagination.md) and preserves focus, selection, edit, and
result context.

### Pagination

Pagination is a controlled composition outside the managed cell sequence. The
grid receives the rows for the current page together with the current page, page
size, page-change callback, and optional total row count. When the total is
known, the grid derives the page count when one is not supplied and exposes each
rendered row's position in the complete result set.

A page change keeps focus on the pagination control that initiated it. It does
not automatically clear selection, sort, filters, or edits already committed to
the data owner. Select-all affects only the visible page and preserves selections
on other pages. Loading disables pagination without removing the current usable
rows.

Sorting, filtering, or page-size changes reset or retain the current page by an
explicit product rule. If the current page becomes invalid, move to the nearest
valid page and announce the new result range. The representative customer grid
resets to page 1 after sorting or filtering.

## Responsive behavior and localization

Prioritize essential columns before introducing horizontal scrolling. Preserve
the managed navigation model when scrolling, pinning, or hiding columns. If the
grid transforms into stacked records or a detail view, the alternate presentation
retains the same information and actions.

Allow headers, values, editors, and actions to grow for translated text. Follow
locale conventions for numbers, dates, input, and text direction without changing
the logical keyboard model.

## Accessibility

Expose the grid name, dimensions, headers, focused cell, selection, sorting,
expanded rows, edit state, and validation state programmatically. Announce
material loading and result-count changes without repeatedly announcing ordinary
cell navigation.

Expose the active sort direction on the sorted column header. A sortable header
communicates both its current direction and the action that will request the next
direction; color or icon direction alone is not sufficient.

Keyboard and touch users receive equivalent access to selection, editing, resize,
and bulk actions. Focus remains visible in standard and high-contrast modes.
Reduced-motion preferences apply to any shared state transitions.

### Web adapter

Use the ARIA grid pattern only when the managed keyboard behavior is implemented.
Expose grid, row, column-header, row-header, and grid-cell relationships; maintain
one managed tab stop; and document how people enter and leave cell interaction.

Use `aria-sort="ascending"` or `aria-sort="descending"` only on the active sorted
column header. Sortable headers remain reachable through grid navigation, and
their nested action controls do not become separate page tab stops.

For paginated results with a known total, expose the total grid row count and the
absolute row index of each rendered row rather than restarting positions on every
page. Use an unknown row count when the total is unavailable. The named
pagination navigation remains outside the grid role and exposes the visible
result range.

For virtualized grids, expose the total row and column counts when known and each
rendered row or cell's position in that total. Prefer native table semantics when
these behaviors are absent.

## Example

Use a data grid for a customer-management workspace where people navigate cells
with arrow keys, sort customers by name from the column header, select multiple
customers, change plans inline, and perform bulk actions. Pagination divides the
results into manageable pages while preserving selections between pages. Sorting
and filtering return the pagination to page 1. Those coordinated
interactions—not the number of customers—make it a data grid.
