# Table

## Status

Contract complete.

## Purpose

**Best for simple presentation, reports, and small datasets.**

A table organizes related values into rows and columns so people can read,
compare, and understand them. Its primary job is presentation. A table may still
include sorting, filtering, pagination, selection controls, or row actions, but
those controls remain independent elements in the normal page tab order.

Use a [`Data grid`](data-grid.md) when the primary job is managing records with
spreadsheet-like keyboard navigation, inline cell editing, cell-range selection,
or comparable two-dimensional interaction.

Dataset size alone does not determine the component. A large read-only report can
remain a table, and a small editable matrix can require a data grid.

## Use when

- People mainly read, scan, or compare values.
- The content is a report, summary, directory, invoice, or results list.
- Any sorting, filtering, selection, or row actions can work as ordinary page
  controls.
- Cells do not need managed arrow-key navigation or an edit mode.

## Do not use when

- Arrow keys must move focus between cells.
- People need to edit several cells without leaving the grid.
- The experience requires cell-range selection, copy-and-paste across cells, or
  other spreadsheet-like behavior.
- The information is not relational. Use a list, cards, or another suitable
  pattern instead.

## Anatomy and variants

1. Optional caption
2. Header row
3. Data rows
4. Optional footer or summary
5. Optional independent controls for sorting, filtering, selection, pagination,
   and row actions

Supported variants are read-only, sortable, selectable, and actionable. Adding
one of these behaviors does not by itself turn a table into a data grid.

## States and semantic tokens

Support hover, selected, sorted, loading, empty, partial, stale, and error states
when relevant. Hover only helps scanning or signals an available row action;
selection represents an actual user choice.

Use `table-header-background`, `table-row-background`, `table-row-hover`,
`table-row-selected`, and `table-border`. Focus, validation, and action states use
their corresponding shared semantic roles.

Loading follows the [`Progress contract`](progress.md) and
[`Asynchronous feedback pattern`](../patterns/async-feedback.md). Predictable
initial content may use skeleton rows, but those placeholders are not data rows,
do not participate in table semantics, and cannot be selected, sorted, counted,
or paginated. Empty and unavailable results follow the
[`Empty state contract`](../blocks/empty-state.md) inside the table region and are not
represented as data rows. Preserve headers and usable data during refresh rather
than returning the table to skeleton rows.

## Behavior

Sorting communicates the active column and direction. Filtering and pagination
preserve table context. Selection uses an explicit control instead of making the
whole row ambiguous. If an update removes the focused row, move focus to the
nearest logical control.

When search, filters, sorting, counts, or pagination form a query-refinement
workflow, their coordination follows the
[`Search, filtering, and results pattern`](../patterns/search-filtering-and-results.md).
The table continues to own only the relational presentation and its bounded
interactive states.

When selected records can persist beyond the visible rows or receive a grouped
operation, scope, identity, action availability, and recovery follow the
[`Selection and bulk actions pattern`](../patterns/selection-and-bulk-actions.md).

Pagination follows the [`Pagination contract`](pagination.md).

## Responsive behavior and localization

Prefer, in order: prioritizing essential columns, contained horizontal scrolling,
stacked records, or a dedicated detail view. Do not compress every desktop
column until the content becomes unreadable.

Allow headers, values, and actions to grow for translated text. Keep numeric
columns consistently aligned according to locale, and provide access to every
essential value without relying on truncation.

## Accessibility

Expose the caption, headers, row and column relationships, sort state, selection
controls, and row actions programmatically. Reading order follows the meaningful
column order. All interactive elements have visible focus and descriptive labels.

The table uses ordinary page keyboard behavior: Tab moves between interactive
controls, while non-interactive cells do not become tab stops. Touch targets,
contrast, and high-contrast presentation follow the shared requirements in
[`DESIGN.md`](../../DESIGN.md#components). Tables do not introduce motion beyond
shared state transitions.

### Web adapter

Use native `table`, `caption`, `thead`, `tbody`, `tr`, `th`, and `td` elements.
Associate headers with cells, use `aria-sort` on the active sortable header, and
label selection controls and row actions with their record context.

Do not apply the ARIA grid pattern unless the managed focus and keyboard behavior
defined by the [`Data grid`](data-grid.md) contract is implemented.

## Example

Use a table for a customer report with name, plan, status, and monthly fee.
Readers scan and compare the values. They may sort by fee or open a customer from
a row action, but they do not navigate between cells with arrow keys or edit
values inline.
