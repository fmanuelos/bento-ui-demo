# Table

## Status

Contract complete for a static data table. Interactive data grids use the
separate [`data-grid contract`](data-grid.md).

## Intent

Tables support comparison and scanning across repeated records. A table is not a
managed-focus composite widget. Do not replace a relational dataset with
decorative cards by default.

## Anatomy and variants

1. Optional caption and toolbar
2. Header row
3. Data rows
4. Optional selection and row actions
5. Optional [`Pagination`](pagination.md)

Use `table-header-background`, `table-row-background`, `table-row-hover`,
`table-row-selected`, and `table-border`. Compact density is allowed for large
desktop datasets.

## States

Hover indicates scan assistance or an available row interaction; selected means
actual selection. Sorting, selection, pagination, and row actions require visible
focus and explicit state. Support loading, empty, partial, error, and stale-data
states where data is dynamic. Loading does not remove headers or erase usable
data, and empty is distinct from failure.
Loading presentation follows the [`progress-indicator contract`](progress.md).
Empty and unavailable results follow the [`empty-state contract`](empty-state.md)
inside the table region without being represented as data rows.

## Behavior

Sorting communicates the active key and direction. Pagination follows the
[`Pagination contract`](pagination.md), preserves table context, and moves focus
only when necessary to continue the task. Selection is
available without selecting the whole row as an ambiguous action. Updating or
removing a focused row places focus at the nearest logical control.

## Responsive behavior

Prefer, in order: column prioritization, contained horizontal scrolling, stacked
records, or a dedicated detail view. Do not compress every desktop column.

## Accessibility

Expose the caption, row and column relationships, headers, sort state, selection
controls, and row actions programmatically. Reading order follows the meaningful
column order. Numeric columns remain consistently aligned, and essential content
has a non-truncated representation.

### Web adapter

Use native table elements for tabular data. Associate headers with cells and use
`aria-sort` on the active sortable header. Label selection controls and row
actions with their record context. Do not apply the ARIA grid pattern unless the
managed-focus behavior in `data-grid.md` is implemented.

## Example

Use a table for projects with owner, status, due date, and predictable row actions.
