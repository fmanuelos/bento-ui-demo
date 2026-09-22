# Data display

## Intent

Data-display patterns help people inspect, compare, interpret, and act on
information while preserving relationships and making availability, scope, and
freshness explicit.

## Use when

Use this pattern for relational tables, interactive grids, charts, metrics, and
collections whose meaning depends on comparison, ordering, filtering, selection,
or freshness.

Use a data table for relational reading when ordinary page controls can own any
sorting, filtering, pagination, selection, or row actions. Use a data grid only
when managed cell navigation, range selection, or inline editing is necessary.

## Do not use when

Do not use a data grid solely because a table is large or visually dense. Do not
use a chart when exact row-and-column comparison is the primary task. Do not use
a collection component for prose, unrelated card content, or a layout that only
happens to align in rows and columns.

## Representation selection

Choose the representation from the user's comparison or action rather than from
the available component inventory:

- Use a metric or [`Metric Overview`](../blocks/metric-overview.md) when a small
  number of values provides orientation and supports the next task.
- Use a [`Data table`](../components/table.md) when exact relational values and
  ordinary page interaction are primary.
- Use a [`Data grid`](../components/data-grid.md) when the task requires managed
  two-dimensional navigation, cell editing, or range selection.
- Use a [`Chart`](../components/chart.md) when visual encoding materially improves
  understanding of a trend, comparison, distribution, composition, or
  relationship.

These choices may coexist when they answer different questions, but one does not
become the default companion for another. Do not add a chart to every metric
collection, add a table only to reproduce visible labels, or use a visual
overview to conceal unavailable exact values. When several representations
describe the same dataset, keep their scope, filters, freshness, formatting, and
state consistent.

## Participating components and related patterns

[`Data table`](../components/table.md),
[`Data grid`](../components/data-grid.md), [`Chart`](../components/chart.md),
[`Card`](../components/card.md),
[`Pagination`](../components/pagination.md),
[`Empty state`](../blocks/empty-state.md), and
[`Status badge`](../components/status-badge.md) retain their bounded contracts.
Filters and row actions use their appropriate form and action components.

Apply [asynchronous feedback](async-feedback.md) to retrieval and refresh,
[destructive actions](destructive-actions.md) to consequential row or bulk
operations, [search, filtering, and results](search-filtering-and-results.md) when
criteria refine the displayed dataset,
[selection and bulk actions](selection-and-bulk-actions.md) when records receive
a grouped operation, and
[responsive density](responsive-density.md) to transformations.

## States and sequence

Distinguish initial loading, refreshing, current, partial, stale, offline,
permission denied, no data yet, no results, filtered empty, failed, and outcome
unknown states as applicable. Do not present placeholders as real metrics or
selectable rows.

An initial load may use the skeleton presentation defined by
[asynchronous feedback](async-feedback.md) when the final data structure is
predictable. Skeleton values and rows are not records: they do not contribute to
counts, sorting, pagination, selection, active-item state, or collection
position. Keep stable headings, labels, filters, and other safe controls visible
when possible. Show empty, unavailable, or failed content only after the request
resolves to that state.

- Headers, labels, units, source, scope, and freshness remain associated with the
  displayed values.
- Sorting, filtering, pagination, and selection expose their current state and
  preserve focus.
- Known totals use exact locale-aware values. Unknown or estimated totals are
  identified as such and do not produce false page counts or completion claims.
- A filter or sort change follows a documented pagination rule. When it resets to
  the beginning, preserve the query and move only the result context required by
  that rule.
- Focus, active item, and selection remain distinct. Refresh, sorting, filtering,
  pagination, insertion, and removal retain them when their targets remain
  available.
- Selection beyond the visible page communicates its scope. “Select all” never
  silently changes between the visible page and the complete result set.
- Ignore a stale response rather than allowing it to replace a newer query,
  result set, selection, focus, or scroll position.
- Charts use consistent categorical assignments within one analytical context
  and add labels, shapes, patterns, or line styles for essential distinctions.
- Essential chart meaning has a text summary or another accessible description.
- A chart and its summary resolve from the same authoritative data and do not
  disagree about filters, units, missing values, precision, or freshness.
- Inspection state is separate from selection and filtering. Losing pointer
  hover does not remove essential information, and a refresh does not silently
  convert an inspected value into a committed selection or filter.

## Persistence, interruption, and recovery

Preserve useful headers and data during refresh when safe. Query, filters, sort,
page, selection, expanded detail, focus, and useful scroll context survive
background updates and browser navigation according to the task's documented
state model.

Background refresh retains current or explicitly stale data instead of returning
the region to skeleton placeholders. Loading one region does not block successful
regions, and independently loaded regions may resolve without resetting shared
query, selection, focus, or scroll state.

When a selected or focused record disappears, continue from the nearest logical
record or collection control and explain a material context change once. If some
regions fail, keep successful regions usable and place recovery beside the
affected content.

Partial row or bulk outcomes identify what changed, what did not, and what can be
safely retried. Truncation, virtualization, pagination, or refresh never removes
the only access to an essential value or recovery action.

## Content and localization

Headings and labels describe the represented values rather than their visual
position. Missing, zero, not applicable, withheld, and unavailable values remain
distinct. Freshness includes a meaningful time or condition when it affects
decisions.

Names, numbers, dates, times, units, and currency use the active locale. Columns,
legends, labels, and actions accommodate expansion and right-to-left presentation
without reversing chronological, quantitative, or domain-specific meaning.

Chart titles name the measured subject rather than the chart geometry. Axis and
series labels name quantities, categories, and units in domain language. A text
summary states the chart's purpose and material conclusion without attempting to
enumerate every mark.

Skeleton geometry follows the responsive structure rather than imitating exact
localized text lengths or fabricating plausible values. It may simplify or
reflow with the eventual presentation as long as it does not create false data
relationships.

## Responsive behavior

Prioritize columns before using contained horizontal scrolling, stacked records,
or a dedicated detail view. Preserve information, exact values, actions, reading
order, query state, and selection when presentation changes.

For charts, adapt to the chart container and content before relying on global
page ranges. Reduce nonessential tick density, wrap or reposition supporting
labels, or use a valid alternate orientation before allowing labels or marks to
overlap. Do not change the represented measure, aggregation, or time interval
merely to preserve a preferred shape.

Two-dimensional scrolling is acceptable within a named region when the data's
meaning requires it, but the surrounding page must still reflow. Frozen regions,
sticky controls, and bulk actions must not obscure focused content at zoom or
with an on-screen keyboard.

## Accessibility

Expose collection names, headings, relationships, sort state, selection scope,
freshness, and result changes through the applicable component contracts. Keep
focus distinct from hover, selection, current location, and an active grid cell.

Keyboard, touch, and pointer users receive equivalent access to row actions,
detail, sorting, filtering, selection, and recovery. Do not require hover to
discover an action. High-contrast presentation preserves boundaries, focus, and
non-color distinctions; reduced motion does not remove change or refresh status.

Charts expose their name, purpose, scope, units, and material relationships in a
nonvisual form. Inspectable charts provide equivalent keyboard, touch, pointer,
and speech access without placing every dense mark in the page tab sequence.

Decorative skeleton shapes do not participate in table, grid, list, chart, or
other collection semantics and do not enter the focus or managed-navigation
model. Expose the affected region's pending state without announcing each shape.

Announce user-initiated result-count or context changes once without reading the
entire collection again. Routine background refresh remains quiet unless it
changes the current task or invalidates a choice.

## Validation scenarios

Apply the shared matrix and the
[`Dashboard overview`](../VALIDATION.md#dashboard-overview) and
[`Data management`](../VALIDATION.md#data-management) scenarios. Apply
[`Data visualization`](../VALIDATION.md#data-visualization) whenever a chart is
present. Include 0, 1,
25, 4,286, and unknown totals; duplicate and 120-character names; missing and
unavailable values; multiple locales; out-of-order refreshes; selection across
filtering and pagination; partial bulk results; 200% text; and a six-column table
at narrow widths. When an initial skeleton is used, verify that it does not
produce record counts, selectable targets, managed cells, or fake values and
that empty, error, partial, and background-refresh states replace or avoid it
correctly.
