# Data grid

## Status

Contract complete.

## Intent

A data grid is an interactive composite for efficient navigation, selection, and
editing of tabular data. Use a static data table when managed cell focus and grid
commands are unnecessary.
Focus, active cell, selection, disabled or unavailable targets, and dynamic data
changes follow the shared collection model in DESIGN.md.

## Anatomy and variants

1. Accessible grid name or caption
2. Column and optional row headers
3. Focusable cells or one focusable control per navigable cell
4. Optional selection, sorting, editing, and row actions
5. Optional [`Pagination`](pagination.md) or virtualization controls

Read-only, selectable, and editable grids are separate variants. Do not add grid
behavior solely to reduce the page's tab stops.

Use the table header, row, hover, selected, and boundary roles for shared visual
structure. Focus, validation, and action states use their corresponding semantic
roles.

## States

Support focused cell, selected row or cell, sorted column, editing, invalid edit,
loading, empty, partial, stale, and error states as relevant. Focus and selection
remain independent. A state change never removes the only focused element without
placing focus at the nearest logical location.
Loading presentation follows the [`progress-indicator contract`](progress.md).
Empty and unavailable results follow the [`empty-state contract`](empty-state.md)
without joining managed grid navigation.

## Behavior

Only one grid navigation target participates in the surrounding page sequence at
a time. Directional commands move among cells; entering edit or action mode gives
the cell's content its native input behavior, and leaving that mode restores grid
navigation. Sorting and filtering preserve focus and selection when their records
remain available.

Virtualization preserves row and column position, exposes the available extent,
and does not make off-screen content appear absent. Every drag or resize action
has a non-drag alternative.

Pagination follows the [`Pagination contract`](pagination.md) and preserves the
managed focus, selection, edit, and result context defined here.

## Responsive behavior

Prioritize essential columns before introducing horizontal scrolling. Preserve
the managed navigation model when scrolling, pinning, or hiding columns. If the
grid transforms into records or a detail view, the alternate presentation retains
the same information and actions.

## Accessibility

Expose the grid name, dimensions, headers, focused cell, selection, sorting,
expanded rows, edit state, and validation state programmatically. Announce
material data-loading and result-count changes without repeatedly announcing
ordinary cell navigation.

### Web adapter

Use the ARIA grid pattern only when the managed keyboard behavior is implemented.
Expose grid, row, column-header, row-header, and grid-cell relationships; maintain
one managed tab stop; and provide documented commands for entering and leaving
cell interaction. Prefer native table semantics when these behaviors are absent.

## Example

Use a data grid for a large project list whose users navigate cells, select
multiple rows, edit owners inline, and perform keyboard-accessible bulk actions.
