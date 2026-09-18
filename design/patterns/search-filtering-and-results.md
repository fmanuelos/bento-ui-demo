# Search, filtering, and results

## Intent

Search and filtering help people express, understand, and revise the criteria for
a page or dataset while preserving a trustworthy relationship between the
applied query and the results it produced.

## Use when

Use this pattern when text search, filters, sorting, result counts, pagination,
or result presentation must work together as one query-refinement workflow. It
applies to directories, management views, reports, content search, and other
collections whose displayed results change in response to user-defined criteria.

Use either immediate application, where an eligible change updates results, or
staged application, where people review draft criteria and apply them explicitly.
Choose one predictable model within a filter region and identify exceptions.

## Do not use when

Do not use this pattern for filtering suggestions inside a
[`Combobox`](../components/combobox.md); that component owns its popup query,
active option, and committed value. When a Combobox supplies one filter value for
a larger dataset, its internal behavior follows the component contract and the
resulting dataset query follows this pattern.

Do not treat site navigation, tabs, or static category destinations as filters
when they represent locations. Use browser or platform find for searching within
the already presented document when product search adds no distinct scope,
ranking, or result model.

## Participating components and related patterns

[`Input`](../components/input.md) or
[`Input Group`](../components/input-group.md) may collect and submit a text query.
Select, Checkbox, Radio group, Combobox, and other form controls may provide
individual criteria. Button and Button Group may apply, reset, or disclose them.
[`Drawer and sheet`](../components/drawer.md) may contain temporary filters.

[`Empty state`](../blocks/empty-state.md),
[`Pagination`](../components/pagination.md),
[`Data table`](../components/table.md), and
[`Data grid`](../components/data-grid.md) present result conditions and data while
retaining their own contracts. Apply [data display](data-display.md) to result
meaning, [asynchronous feedback](async-feedback.md) to retrieval,
[responsive density](responsive-density.md) to transformations, and
[action hierarchy and emphasis](action-hierarchy-and-emphasis.md) to Search,
Apply, Clear, and supporting query actions. Apply
[navigation shell](navigation-shell.md) when query state survives workspace
navigation. Apply
[selection and bulk actions](selection-and-bulk-actions.md) when selected records
persist across query views or receive a grouped operation.

## States and sequence

A query may be unmodified, edited or draft, applying, current, refreshing,
partially available, stale, offline, failed, or complete with no results. The
dataset may independently contain no data. Do not present “no results” before an
eligible query completes or use “no data” when current criteria merely exclude
available records.

- The applied query consists of the effective search terms, filters, sort, scope,
  and page or continuation state. Results and counts always correspond to one
  identifiable applied query.
- Distinguish fixed system constraints, initial defaults, applied user criteria,
  and uncommitted draft criteria whenever the distinction affects what people can
  change or clear.
- Applied criteria remain visible in their controls or an equivalent summary.
  People can remove an individual criterion without rebuilding the rest of the
  query.
- “Clear all” states its scope and clears only the described user-controlled
  criteria. It does not remove authorization, policy, or other fixed constraints
  or silently change unrelated sort and view preferences.
- Immediate application waits for an eligible, settled value according to a
  predictable rule. Staged application leaves the current results associated
  with the applied criteria until the draft is committed.
- One application creates one logical query operation. It may coordinate several
  requests, but every response remains associated with that operation. Disable
  only conflicting actions while it is pending; keep the query and useful
  current results available.
- A newer query supersedes an older query. Ignore late responses, counts, errors,
  and announcements belonging to superseded requests.
- Search, filter, sort, or page-size changes follow a documented pagination rule.
  Resetting to the beginning must not clear the remaining query.
- Result counts identify exact, estimated, or unknown scope honestly. Loading
  placeholders are not results and do not contribute to the count.
- A completed query resolves to results, no results, partial results, or failure.
  Each condition keeps the applied criteria understandable and provides a valid
  next step when one exists.

## Persistence, interruption, and recovery

Preserve the applied query during refresh, no-results, offline, and failed
states. Retry repeats that query without clearing criteria, duplicating unrelated
work, or accepting a superseded response. Preserve useful current results during
refresh when they remain safe to use, and mark stale information when freshness
affects decisions.

Represent user-facing query state in a shareable location when bookmarking,
Back and Forward, direct entry, or returning to results are supported. Restoring
a location restores the corresponding terms, filters, sort, page, result scope,
and useful scroll context without adding duplicate history entries for internal
responsive changes.

Do not place sensitive search terms or private filter values in persistent or
shareable state when that would expose them. When full restoration is unsafe,
restore the destination and disclose which criteria must be entered again.

For staged filters in a temporary surface, Apply commits the complete draft and
Cancel restores the previously applied criteria. Dismissing the surface must not
silently apply or discard changes. In an immediate model, closing the surface
changes only its presentation; already applied criteria remain applied.

## Content and localization

Name the search scope in a persistent label, such as “Search projects,” rather
than relying on a search icon or placeholder. Filter labels describe the
criterion, and option labels describe actual values. Applied summaries use the
same terminology as their controls.

State result counts and no-results conditions in relation to the active scope
when it is not otherwise evident. Suggestions for broadening a query must be
specific and must not imply that clearing filters will reveal data unavailable
because of permission or policy.

Matching, sorting, tokenization, and normalization follow documented product and
locale rules. Names, numbers, dates, units, and option counts use locale-aware
formats. Labels, values, summaries, and actions support expansion, pluralization,
multiple writing systems, and right-to-left presentation without changing query
meaning.

## Responsive behavior

Preserve the primary query, applied-criteria summary, result count, sort, and a
route to all available filters when controls no longer fit inline. Move
lower-priority criteria into an appropriate disclosure, drawer, sheet, or
dedicated page rather than shrinking labels and targets or creating ambiguous
multi-row control groups.

A temporary filter trigger communicates that criteria are applied without using
color alone. The temporary surface preserves draft or applied state according to
the chosen application model and returns focus predictably. Results remain
associated with their applied criteria when the controls move or change density.

At narrow widths and increased text sizes, controls, summaries, counts, errors,
and recovery actions wrap without clipping. An on-screen keyboard does not cover
the query field, applied status, or action required to submit or clear it.

## Accessibility

Every query and filter control has a persistent name, current value, and state.
Related criteria use a named region or group when that relationship improves
understanding. Applied state, removable criteria, result scope, and clear actions
remain understandable without color, icons, position, or hover.

Keep focus on the initiating control after applying a query unless that control
ceases to exist. Do not move focus to results merely because they changed. Offer
a predictable route to the named results region when moving there materially
shortens navigation.

Announce a settled, user-initiated result count or condition once. Immediate
search does not announce every keystroke, intermediate request, or stale
response. Loading, partial, no-results, offline, and failure states follow the
urgency and interruption rules in [asynchronous feedback](async-feedback.md).

Keyboard, touch, pointer, and speech users can reach, modify, apply, remove, and
clear criteria and operate the results. High-contrast presentation preserves
control boundaries, focus, and applied state. Reduced motion removes filter and
result transitions without delaying the query or hiding its completion.

## Validation scenarios

Apply the shared matrix and every search and query check in
[`Data management`](../VALIDATION.md#data-management). Include an empty query,
one and many criteria, fixed constraints, individual removal, scoped clear-all,
immediate and staged application, no data, no results, exact and unknown totals,
slow and out-of-order responses, failure and retry, offline and stale results,
Back and Forward restoration, direct entry, sensitive criteria, a temporary
filter surface, 60% label expansion, 200% text, an on-screen keyboard, RTL, and
multiple locale-specific matching and formatting rules.
