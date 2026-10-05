# Record Detail template

## Status

Draft. Article-record inspection and support-case inspection define the initial
scope. Interactive references, live permission changes, and behavioral validation
remain outstanding.

## Intent

Help people understand one record, its current state and history, and the actions
they can take while retaining a meaningful path back to related work.

## Use when

Use for an article record and a support case with stable identity, attributes,
status, relevant history, and authorized actions. Local disclosures or sections
may organize detail without turning this into an editing workspace.

## Do not use when

Use [Record Collection](record-collection.md) for browsing many records and
[Settings](settings.md) for configuration. Rich authoring, multi-record analysis,
and a bounded approval or submission journey require different contracts.

## Classification

- Primary mode: [Application Workspace](../experiences/application-workspace.md).
- Applicable candidate variants: Publishing Workspace; Support Workspace; Admin Console.
- Domains: domain-neutral; representative uses cover Publishing and Help & Support.
- Audience: authorized record readers and operators.
- Excluded scope: public articles and full content editing.

## Regions and hierarchy

1. Workspace navigation and collection or parent return context.
2. [Page Header](../blocks/page-header.md) with record identity, status, and primary action.
3. Scoped availability, freshness, or operation feedback when applicable.
4. [Record Details](../blocks/record-details.md) with essential attributes first.
5. Optional [Activity History](../blocks/activity-history.md).
6. Optional [Related Content](../blocks/related-content.md) and supporting resources.

Keep identity and essential status available before deferred supporting regions.
Omit history or related resources when they do not advance the record's purpose.

## Participating contracts

Apply [Application Navigation](../blocks/application-navigation.md),
[Breadcrumb](../components/breadcrumb.md), [Status Badge](../components/status-badge.md),
[Tabs](../components/tabs.md) only for peer panels,
[Data display](../patterns/data-display.md),
[Action hierarchy](../patterns/action-hierarchy-and-emphasis.md),
[Asynchronous feedback](../patterns/async-feedback.md),
[Destructive actions](../patterns/destructive-actions.md), and
[Task continuity](../patterns/task-continuity.md).

## Actions and permissions

Distinguish navigation to editing from a mutation or destructive commitment.
Expose only authorized information and provide an understandable reason or safe
alternative when an action is unavailable. Recheck record version and permission
at commitment. An earlier loaded status does not authorize a later action.
Do not use a disabled action to reveal restricted record existence.

## States, sequence, and continuity

Support initial loading, available, unavailable, restricted, deleted, stale,
partial supporting-region failure, pending action, failed action, and unknown
outcome. Product policy decides whether missing and unauthorized records may be
distinguished. Failure of history must not erase usable authorized attributes.

Refresh without stealing focus or silently overwriting user work. Prevent late
responses for a previous record from populating a new record destination. On
access loss, remove restricted content and provide a safe destination. On deletion,
explain the result and return to a valid parent rather than an unrelated record.
Preserve permitted collection query and return position; a direct deep link must
also provide a meaningful parent destination. Reconcile unknown mutation outcomes
before offering a retry that could repeat an action.

## Content and data requirements

Provide stable identity, meaningful title, status meaning, attribute labels,
source freshness, and authorized action eligibility. Display missing, redacted,
and not-applicable data distinctly when disclosure is permitted. Attribute
history events to accurate actors and timestamps without inventing unavailable
information. Exercise long identifiers, absent optional sections, large histories,
and records with identical display names.

## Responsive and localization behavior

Prioritize identity, status, essential details, and actions in that reading order.
Move optional supporting regions below primary detail on narrow screens. Wrap
labels and actions; do not rely on a permanently visible side inspector. Support
localized dates and numbers, mixed-direction identifiers, RTL, 200% text, expanded
labels, and scrolling histories without page-level overflow.

## Accessibility

Provide one page heading, meaningful section headings, landmarks, and a bypass.
Associate attribute labels with values using appropriate semantics. Status must
not depend on color. Announce action outcomes once and move focus deliberately
after a removed record or completed navigation. Refreshing history must not steal
focus. Preserve keyboard access to every action, visible focus, touch targets,
theme contrast, forced colors, and reduced-motion behavior.

## Product instantiation

Supply the record schema, routes, parent fallback, history visibility, freshness
rules, authorization, version checks, retention, and safe action recovery.
Specify the boundary between detail and editing. Article and support-case uses
share identity, detail, history, and actions; their real lifecycle rules remain
consumer-owned.

## Reference pages and validation

Plan article and case references reached both from a collection and directly.
Exercise long and missing attributes, partial history failure, stale state,
permission changes, deletion, failed actions, and return after collection changes.
These references are not implemented.

Apply [Application Workspace](../verification/workflows.md#application-workspace),
[Record inspection and history](../verification/workflows.md#record-inspection-and-history),
[Template conformance](../verification/stress-tests.md#template-conformance), and
[baseline validation](../verification/baseline.md). Record actual environments,
state coverage, accessibility results, and remaining integration work.
