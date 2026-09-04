# Table

## Status

Specified; no reusable React component exists.

## Intent

Tables support comparison and scanning across repeated records. Do not replace a
relational dataset with decorative cards by default.

## Anatomy and variants

1. Optional caption and toolbar
2. Header row
3. Data rows
4. Optional selection and row actions
5. Optional pagination

Use `table-header-background`, `table-row-background`, `table-row-hover`,
`table-row-selected`, and `table-border`. Compact density is allowed for large
desktop datasets.

## States

Hover indicates scan assistance or an available row interaction; selected means
actual selection. Sorting, selection, pagination, and row actions require visible
focus and explicit state.

## Responsive behavior

Prefer, in order: column prioritization, contained horizontal scrolling, stacked
records, or a dedicated detail view. Do not compress every desktop column.

## Accessibility

Use native table elements for tabular data. Indicate sortable state with
`aria-sort`; label selection controls and row actions; keep numeric columns
consistently aligned.

## Example

Use a table for projects with owner, status, due date, and predictable row actions.
