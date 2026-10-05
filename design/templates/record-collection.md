# Record Collection template

## Status

Draft. Browsing and managing an article library and a support queue define the
initial scope. Interactive reference pages and behavioral validation remain
outstanding; this contract does not establish a real data or authorization service.

## Intent

Help people find, compare, select, and act on a collection of records while
preserving their query and their place when inspecting an individual record.

## Use when

Use for an article library and a support case queue when both have a named
collection, query controls, results, record destinations, and scoped actions.
Choose a table, list, or cards according to the information relationships.

## Do not use when

Use [Record Detail](record-detail.md) to inspect one record. A metrics overview,
content editor, public search destination, or multi-stage processing workflow
needs its own structure. A shared table alone does not establish this template.

## Classification

- Primary mode: [Application Workspace](../experiences/application-workspace.md).
- Applicable candidate variants: Publishing Workspace; Support Workspace; Admin Console.
- Domains: domain-neutral; representative uses cover Publishing and Help & Support.
- Audience: people authorized to browse or manage the collection.
- Excluded scope: public discovery and bounded submission flows.

## Regions and hierarchy

1. Workspace navigation and a bypass to the collection's main content.
2. [Page Header](../blocks/page-header.md) with collection identity and optional creation action.
3. [Results Toolbar](../blocks/results-toolbar.md) with query controls and active criteria.
4. Result count, scoped feedback, and a labelled results region.
5. Records with understandable detail destinations and optional selection controls.
6. Pagination or an explicitly defined incremental-loading control.
7. Optional bulk-action region identifying selection scope and eligibility.

Show [Empty State](../blocks/empty-state.md) within the results region when
appropriate. Omit unused selection and action regions without leaving empty wrappers.

## Participating contracts

Apply [Application Navigation](../blocks/application-navigation.md),
[Table](../components/table.md) or [Data Grid](../components/data-grid.md) only when
its interaction model is needed, [Pagination](../components/pagination.md),
[Search and filtering](../patterns/search-filtering-and-results.md),
[Selection and bulk actions](../patterns/selection-and-bulk-actions.md),
[Data display](../patterns/data-display.md),
[Asynchronous feedback](../patterns/async-feedback.md), and
[Task continuity](../patterns/task-continuity.md). Each retains its owned behavior.

## Actions and permissions

Separate collection creation, record navigation, row actions, and bulk actions.
Name whether selection covers this page, loaded records, or all matching results;
never expand selection silently. Recheck authorization and eligibility at commitment.
Apply [Destructive actions](../patterns/destructive-actions.md) where required.
Explain unavailable actions without revealing restricted record information.

## States, sequence, and continuity

Distinguish initial loading, an empty collection, no query matches, query failure,
partial results, stale results, and lost access. A failed request must not appear
as zero records. Retain usable authorized results during refresh and identify
staleness. Prevent older query responses from replacing newer results.

Preserve safe query, sort, pagination, scroll, and focus context when returning
from detail. Define how query changes invalidate selection and page position.
After deletion or changed eligibility, reconcile selected identities and pagination;
report partial bulk outcomes per affected scope. An unknown operation outcome
requires reconciliation before retry. On access loss, remove unauthorized data
and restore only context the current identity may retain. Offline mutations are
unsupported unless the consumer defines persistence and reconciliation.

## Content and data requirements

Consumers supply stable record identifiers, meaningful display names, field
semantics, ordering, count accuracy, and freshness. Missing values remain distinct
from zero, unavailable, and restricted values. Define page sizes and server limits;
do not imply a complete result set when counts or loading are partial. Exercise
long titles, duplicate display names, missing fields, and mixed record statuses.

## Responsive and localization behavior

Follow workspace density rules. Keep identity and the primary destination
available when lower-priority fields move into detail. Preserve labelled query
controls and selection scope when controls wrap or move into a disclosure. A
scrolling table needs a clear accessible boundary; do not create page-level
horizontal scrolling. Support localized sorting, counts, dates, RTL, 200% text,
and expanded labels without changing the semantic reading order.

## Accessibility

Provide one page heading, named search and results regions, and a workspace
bypass. Use table semantics for tabular relationships and links for destinations.
Avoid nested row controls inside a single clickable container. Name selection
controls by record identity. Announce settled result counts and operation outcomes
without moving focus on each keystroke. Restore focus to the originating record
or a meaningful nearby destination when that record no longer exists. Support
keyboard, touch, screen readers, high contrast, themes, and reduced motion.

## Product instantiation

Supply query serialization, sensitive-query retention policy, source data,
permissions, record routes, supported bulk operations, selection scope, and
return-state ownership. Specify whether query state survives reload; do not put
private search values in URLs by default. The article library and case queue
must preserve the same structural roles despite different fields and actions.

## Reference pages and validation

Plan article-library and support-queue references with long records, empty and
filtered-empty sets, delayed and out-of-order responses, partial bulk failures,
deleted return targets, and changed access. These references are not implemented.

Apply [Application Workspace](../verification/workflows.md#application-workspace),
[Data management](../verification/workflows.md#data-management),
[Template conformance](../verification/stress-tests.md#template-conformance), and
[baseline validation](../verification/baseline.md). Record actual tested states,
environments, assistive-technology results, and outstanding integration checks.
