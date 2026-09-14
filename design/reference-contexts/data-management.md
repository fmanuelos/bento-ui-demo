# Data management

**Mode:** Dashboard  
**Primary audience:** A recurring user who searches, compares, selects, and acts
on a large record set.

## Scenario and outcome

The fictional Projects view contains 4,286 records. A user filters by owner and
health, sorts by last update, reviews exact values, selects several projects, and
archives eligible records. The experience must preserve query, focus, selection,
and result context across asynchronous changes and responsive transformations.

Representative columns include project name, owner, health, next milestone,
budget, last update, and available actions. Values include long names, missing
optional data, similar project names, multiple currencies, and statuses that
cannot be distinguished by color alone.

## Template structure

1. Navigation shell, bypass route, page title, result summary, and primary action.
2. Search, filters, sort, column controls, and clear-all action grouped by purpose.
3. Data table for reading and row actions, or data grid only when managed cell
   navigation, editing, or range selection is truly required.
4. Selection summary and bulk actions that appear without shifting focus or
   obscuring the table heading.
5. Pagination and freshness information associated with the result set.
6. Empty, loading, failure, and recovery content within the data region.
7. Optional drawer or page detail that preserves return context.

## Participating system contracts

- Functional patterns: [data display](../patterns/data-display.md),
  [asynchronous feedback](../patterns/async-feedback.md),
  [destructive actions](../patterns/destructive-actions.md), and
  [responsive density](../patterns/responsive-density.md).
- Components: [Data table](../components/table.md),
  [Data grid](../components/data-grid.md), [Pagination](../components/pagination.md),
  [Combobox](../components/combobox.md), [Listbox](../components/listbox.md),
  [Status badge](../components/status-badge.md),
  [Empty state](../components/empty-state.md), [Button](../components/button.md),
  [Button Group](../components/button-group.md),
  [Drawer and sheet](../components/drawer.md), and
  [Toast](../components/toast.md).
- Perceptual patterns: compact comparison rhythm, aligned quantitative data,
  persistent column relationships, visible selection, and quiet structural edges.

## Required states and transitions

- Initial loading, background refresh, partial data, stale data, offline,
  permission-denied, no data, no results, and failure have distinct presentations.
- Filtering or sorting updates the result summary and preserves focus in the
  initiating control unless a recovery task requires movement.
- Selection remains distinct from focus and active-item state. Filtering,
  pagination, refresh, and removal retain valid selections and explain selections
  that leave the current page or become unavailable.
- Pagination preserves filters, sort, selection, and the user's position in the
  result workflow.
- Row and bulk actions remain available to keyboard and touch users; hover does not
  reveal the only route to an action.
- Opening a detail surface records the originating record and restores useful
  focus and scroll context when the user returns.

## Context-specific stress conditions

- Test 0, 1, 25, 4,286, and an unknown total count.
- Use duplicate visible names, a 120-character project name, empty optional values,
  negative and large quantities, and at least three locale-specific date and
  currency formats.
- Apply multiple filters that produce no results, then clear one filter while a
  refresh completes out of order.
- Select records across pages, remove one selected record asynchronously, and deny
  permission for another selected record.
- At narrow widths, test column prioritization, contained horizontal scrolling,
  stacked records, and detail-page transformation; choose the form that best
  preserves the specific data relationships.
- At 200% zoom, keep search, filters, result count, bulk actions, table headings,
  pagination, and recovery reachable in logical order.

## Acceptance outcomes

- Users can identify current filters, sort, selection count, result count, and data
  freshness without reconstructing state from color or position.
- Exact values and row actions remain accessible when columns are hidden or the
  presentation transforms.
- No asynchronous response silently resets a newer query, valid selection, focus,
  or scroll context.
- A data grid is used only when its managed interaction is necessary; a visually
  dense table is not mislabeled as a grid.
- Bulk destructive work follows the destructive-action reference context and
  reports partial success without treating all records as one outcome.
