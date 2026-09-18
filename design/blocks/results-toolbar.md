# Results Toolbar block

## Status

Draft until representative Application Workspace implementations validate immediate and
staged filtering, changing result and selection scope, responsive control
movement, asynchronous refresh, and assistive-technology output.

## Intent

A Results Toolbar arranges the controls and context used to search, refine,
sort, refresh, select, and act on one results region. It keeps the applied query,
result scope, and available operations understandable without absorbing the
workflow behavior owned by search, data-display, selection, and asynchronous
patterns.

The block owns the local relationship and responsive arrangement of query
controls, result context, and actions. Each control and the associated results
surface retain their own semantics and state.

## Use when

Use a Results Toolbar in an Application Workspace when a table, data grid, list,
or other results region needs two or more of search, filters, applied-criteria
summary, sort, view choice, refresh, result count, selection context, or scoped
actions.

## Do not use when

Do not use a Results Toolbar for a single field whose scope is already clear, a
site-wide search destination, a form's field actions, or a generic row of page
actions. Use [`Page Header`](page-header.md) for page-wide context and actions,
and keep row actions with their record.

The toolbar does not define the applied-query model, result retrieval, bulk
selection, destructive confirmation, or data presentation. Those responsibilities
remain with the applicable experience patterns and result component.

## Anatomy

1. Required programmatic name or association with the results region
2. Optional primary search control
3. Optional filter controls or trigger
4. Optional applied-criteria summary and individual removal
5. Optional result count and scope description
6. Optional sort, view, density, or other presentation controls
7. Optional freshness context and refresh action
8. Optional selection count and bulk-action region
9. Optional supporting result action

At least two functional regions are required; otherwise use the participating
component directly. The logical order is query entry and refinement, applied
criteria, result context, presentation controls, freshness, then selection and
other actions. A product may position result context first visually when it does
not change reading or task order.

## Variants

- **Inline:** Keeps eligible controls and context in one wrapping toolbar when
  every region retains a useful width.
- **Stacked:** Separates primary query controls from result context and actions
  while preserving one named relationship to the results.
- **Condensed:** Keeps primary search, applied-filter indication, result scope,
  and a route to all remaining controls visible; lower-priority controls move
  into a named temporary surface.
- **Selection:** Replaces only the declared action region with explicit selection
  scope and eligible bulk actions while the query and result relationship remain
  available.

Variants change arrangement and visible control density, not query meaning,
selection scope, or available capabilities. Condensed controls must not become
undiscoverable icon-only actions.

## Participating components and related patterns

Text search may use [`Input`](../components/input.md) or
[`Input Group`](../components/input-group.md). Filters and sort use the applicable
Select, Combobox, Checkbox, Radio, Dropdown, Popover, or Button contracts.
Related independent actions may use
[`Button Group`](../components/button-group.md). A temporary filter surface may
use [`Drawer`](../components/drawer.md). Results may use
[`Table`](../components/table.md), [`Data Grid`](../components/data-grid.md), or
another suitable component.

Apply [`Search, filtering, and results`](../patterns/search-filtering-and-results.md)
to the applied query, [`Data display`](../patterns/data-display.md) to result
meaning and freshness, [`Selection and bulk actions`](../patterns/selection-and-bulk-actions.md)
to selected scope and grouped operations,
[`Asynchronous feedback`](../patterns/async-feedback.md) to retrieval and refresh,
[`Action hierarchy and emphasis`](../patterns/action-hierarchy-and-emphasis.md) to
competing actions, and [`Responsive density`](../patterns/responsive-density.md)
to transformation.

## Content requirements

Name the query scope persistently, such as “Search customers.” Filter and sort
labels state their criterion, and their values use the same terminology as the
applied summary. Placeholder text and icons do not replace labels.

The result count states exact, estimated, or unknown scope honestly and remains
associated with the applied query. Distinguish dataset emptiness from no results.
Loading placeholders are not results and never contribute to the count.

Applied filters remain visible in their controls or an equivalent summary.
Individual removal identifies the criterion. “Clear all” states its scope and
does not remove fixed constraints, unrelated presentation choices, or selection
unless the owning pattern explicitly requires it.

Selection context names the exact selected scope: visible records, selected
records across pages, or the complete current query. Bulk actions describe the
operation and eligibility. Refresh content identifies meaningful freshness when
it affects decisions; an icon alone is insufficient when purpose is ambiguous.

## Layout and semantic token mapping

Use Application Workspace container, page-padding, grid-gutter, density, and
control roles from [`DESIGN.md`](../../DESIGN.md#application-workspace-mode). Use existing surface, border,
text, status, field, action, and focus roles. The toolbar may use a quiet boundary
or surface when separation from results improves scope.

Allocate useful width to the primary query before utility controls. Group
controls by function and use shared spacing rather than equal distribution.
Wrapping is intentional: preserve group relationships and avoid isolated labels
or actions on a line whose scope is unclear.

The Selection variant may use established selected or informative surface roles
when text and structure also communicate the state. Do not add Results
Toolbar-specific colors, heights, sticky offsets, spacing, or breakpoints.

## States and behavior

The toolbar reflects, but does not independently own, unmodified, draft,
applying, current, refreshing, partial, stale, offline, failed, no-results, and
selected conditions. Its visible controls and summaries always correspond to a
known applied or explicitly staged query.

Immediate and staged filters follow the search pattern. Newer queries supersede
older ones; late responses cannot reset controls, results, counts, focus,
selection, or scroll. Refresh preserves useful current results when safe and
distinguishes stale data from unavailable data.

Entering Selection presentation preserves the applied query and result scope.
Changing filters, pagination, or refresh follows the selection pattern rather
than silently expanding or discarding selected records. A bulk operation uses an
immutable selection snapshot and reports mixed eligibility or partial outcomes.

Disabled controls expose a reason when users need it. One activation creates at
most one operation. Failed or unknown outcomes retain query and selection
context and provide a safe retry or verification path.

## Responsive and localization behavior

Transform based on control and content needs, not only page ranges. Preserve the
primary query, applied-filter indication, result scope, and a route to every
available filter and essential action. Move lower-priority controls to a named
Drawer, Popover, or dedicated filter view before shrinking targets or clipping
labels.

An immediate filter keeps its applied state when moved. A staged temporary
surface preserves its draft separately and makes Apply and Cancel outcomes
explicit. Focus returns to the invoking control when the surface closes.

Support 60% label expansion, 200% text, increased spacing, unbroken valid values,
multiple writing systems, locale-aware counts and values, and right-to-left
direction. Groups wrap without reversing source or action priority. An on-screen
keyboard leaves the query, applied state, and submit or clear route available.

## Accessibility

Give the toolbar or its control groups a programmatic name that identifies the
results they affect. Every control has a persistent name, value, state, and
scope. Applied criteria, result count, freshness, selection, and bulk eligibility
remain understandable without color, icons, position, or hover.

Keyboard order follows the query workflow and remains predictable across
variants. Applying a query does not move focus to results automatically; provide
a discoverable route to the named results region when helpful. Opening and
closing temporary controls follows their component focus contract.

Announce settled, user-initiated count or condition changes once according to
the search and asynchronous patterns. Do not announce every keystroke,
intermediate response, background refresh, or visual rearrangement. Forced
colors preserve controls, boundaries, focus, applied state, and selection scope.
Reduced motion removes toolbar and result transitions without delaying updates.

### Web adapter

Use a labelled `form` with search semantics when the toolbar submits a query,
or a labelled grouping or toolbar only when its controls match the corresponding
native or ARIA interaction model. Do not add `role="toolbar"` to a generic group
unless the required keyboard behavior and user expectation are intentionally
provided.

Associate status and count output with the results region using stable IDs and
appropriate descriptive or live-region relationships. Native inputs, labels,
buttons, and selects retain their semantics. Temporary filter content must have
one exposed instance; hidden desktop or mobile duplicates cannot remain
focusable or submit duplicate values.

## Representative example

A customer-management table has a Results Toolbar with “Search customers,” a
Status filter, an applied-filter summary, “128 customers,” a last-updated label,
Refresh, and Sort controls. Selecting three rows changes the trailing action
region to “3 customers selected” with Export and Deactivate actions; search,
filter scope, and count remain available.

At narrow widths Search and result scope remain visible. Filters and Sort move
into a labelled Drawer whose trigger states that one filter is applied. Closing
an uncommitted staged filter draft restores the applied values and focus to the
trigger.

## Validation scenarios

Validate the Results Toolbar with:

- Inline, Stacked, Condensed, and Selection presentations
- Search only plus one control, typical control sets, and the supported boundary
- Empty and long queries, one and many filters, and fixed constraints
- Immediate and staged application, individual removal, and scoped clear-all
- Exact, estimated, unknown, zero, singular, and large localized result counts
- Initial loading, refresh, stale, offline, partial, failed, retry, and no results
- Out-of-order responses and query, pagination, and selection changes
- Visible, cross-page, and whole-query selection with mixed eligibility
- Transformations around every content-driven breakpoint and on-screen keyboard
- 60% expansion, 200% text, multiple locales and writing systems, and RTL
- Keyboard, touch, speech, screen reader, forced colors, and reduced motion

Apply [`Data management`](../VALIDATION.md#data-management),
[`Action hierarchy`](../VALIDATION.md#action-hierarchy-and-emphasis), and
[`Block composition and reflow`](../VALIDATION.md#block-composition-and-reflow).
The block is ready for shared use when the applied query, result scope,
selection, and available operations remain trustworthy through reflow,
asynchronous change, and recovery.
