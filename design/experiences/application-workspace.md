# Application Workspace

## Status

Draft. This contract establishes Application Workspace as the canonical mode for
authenticated, recurring, operational, administrative, and data-intensive work.

## Intent

Application Workspace helps returning users orient quickly, move among related
destinations, inspect and compare information, complete recurring tasks, and
recover from interruption or failure without losing context or work.

## Use when

Use Application Workspace for an application environment with persistent or
temporary workspace navigation, related task destinations, records, settings,
operational tools, administrative controls, or analytical data. Authentication
is common but not sufficient by itself; the defining characteristic is recurring
work across a coherent application context.

## Do not use when

Use [Public Site](public-site.md) when public discovery, comprehension, or reading
is primary. Use [Focused Flow](focused-flow.md) when one bounded outcome should
temporarily suppress unrelated workspace choices.

Do not use Application Workspace merely because a page contains cards, metrics,
tables, or authenticated content. A dashboard is one possible workspace page or
template, not the name of this mode.

## Audience and outcomes

Users may be customers, operators, publishers, analysts, administrators, or
support staff. They can:

- Identify their workspace, location, role context, and work requiring attention.
- Move among authorized destinations without losing meaningful task context.
- Scan, compare, filter, select, and act on information reliably.
- Distinguish freshness, status, feedback, permission, and failure.
- Resume or recover from interruption without silent data loss.

## Experience variants

Candidate variants include Customer Portal, Operations Workspace, Publishing
Workspace, Analytics Workspace, Admin Console, and Support Workspace. These
labels classify recurring environments. They do not create separate visual
systems or domain-specific components.

A workspace may contain several product domains. For example, Customer Portal
may contain Account, Identity & Access, Billing, Analytics, and Help & Support.

## Navigation model

Use the [`Navigation shell`](../patterns/navigation-shell.md) for stable access to
primary workspace destinations. Preserve workspace identity, current location,
primary task access, and global utilities when navigation transforms between
persistent, collapsed, and temporary presentations.

Use Breadcrumb for canonical hierarchy, Tabs for local views, and Pagination for
result sets; none replaces global workspace navigation. Selected navigation
communicates location rather than action priority.

When entering a Focused Flow, retain the origin and return context required by
the task. Resolve unsaved work before navigation commits. Permission changes do
not silently redirect to an unrelated authorized destination.

## Layout and density

Use workspace padding, efficient grouping, compact controls where appropriate,
tables, filters, and fluid primary data regions. Give the main task or analysis
surface width before secondary summaries or inspectors. Density supports
scanning and repeated work without reducing readable text indiscriminately.

Persistent navigation is conditional on available space, label length, zoom,
and task width. Use temporary navigation when the shell and primary content
cannot coexist comfortably. A 12-column grid is a composition aid for complex
desktop layouts, not a requirement for every workspace page.

Use `workspace-padding-*` for mode-specific page padding and
`container-workspace` for the normal data-heavy workspace width. These names
describe the layout family without limiting Application Workspace to dashboard
pages.

## Content hierarchy

Lead with location, page purpose, material status or freshness, and the primary
task. Group related controls and data without turning every region into a card.
Keep filters, result context, selection scope, row actions, and recovery near the
information they affect.

Operational terminology is specific and stable. Distinguish persistent entity
status from feedback about an event. Do not allow visual prominence to imply
permission, selection, freshness, or urgency that the underlying state does not
have.

## Action hierarchy

Apply [`Action hierarchy and emphasis`](../patterns/action-hierarchy-and-emphasis.md)
within each decision region. A page may contain several decision regions, but
each has at most one primary action. Global creation, local editing, row actions,
bulk operations, utilities, and navigation remain distinguishable.

Keep row and item actions available to keyboard and touch users rather than
revealing them only on hover. Bulk actions communicate exact selection scope and
consequences before commitment.

## Task continuity and states

Preserve applicable query, filter, sort, pagination, selection, expanded detail,
scroll, and return context across navigation, refresh, responsive transformation,
and recoverable failure. Forms and editors define saving, drafts, conflicts,
discard, and restoration through
[`Task continuity and unsaved work`](../patterns/task-continuity.md).

Distinguish initial loading, background refresh, stale data, partial failure,
empty data, no results, offline state, missing permission, changed access, and
unknown outcomes. Keep successful regions usable when an independent region
fails. Do not expose placeholders as real data or interactive records.

## Templates, pages, and domains

Workspace templates define recurring structures such as overview, collection,
record detail, editor, settings, or administrative pages. A dashboard is an
overview template centered on metrics, summaries, status, or attention; other
workspace templates must not be labeled dashboards solely because they are
authenticated.

Product pages supply real records, actions, permissions, domain terminology, and
business rules. Templates may be reused across domains only when the user goal,
interaction model, state behavior, and accessibility outcomes remain equivalent.

## Responsive and localization behavior

Mobile and constrained layouts use temporary navigation and prioritize the
primary task. Toolbars, filters, forms, and panels stack or wrap while preserving
the primary action and complete context. Tables prioritize essential columns,
then use contained horizontal scrolling, stacked records, or detail views without
losing actions, focus, or selection.

Support long labels, dense but valid data, locale-aware formats, bidirectional
layout, and writing systems with different metrics. User-controlled navigation
collapse remains distinct from presentation forced by available space. Layout
changes do not move focus without a task reason.

## Accessibility

Provide a bypass route past repeated navigation, distinct names for multiple
navigation regions, programmatic current location, visible focus, complete
keyboard operation, and comfortable touch targets. Persistent, temporary, and
modal navigation follow the focus and background-interaction behavior of their
actual component contracts.

Tables, data grids, charts, filters, statuses, and selections remain
understandable without color, hover, or visual position. The workspace survives
200% text enlargement, increased text spacing, high contrast, forced colors,
reduced motion, partial data failure, and responsive transformation without
losing task context.

## Participating components and related patterns

Common component dependencies include Breadcrumb, Tabs, Button and Button Group,
Form controls, Card, Data Table, Data Grid, Pagination, Status Badge, Alert,
Progress, Dialog, Drawer, and Popover. Common blocks include Application
Navigation, Empty State, Page Header, Section Header, Metric Overview, Form
Section, and Results Toolbar.

Apply Navigation shell, Data display, Search filtering and results, Selection and
bulk actions, Forms and validation, Task continuity and unsaved work,
Asynchronous feedback, Destructive actions, Action hierarchy and emphasis, and
Responsive density according to the task.

## Validation scenarios

Apply the shared baseline and relevant scenarios in
[`VALIDATION.md`](../VALIDATION.md), especially
[`Application Workspace`](../VALIDATION.md#application-workspace),
[`Dashboard overview`](../VALIDATION.md#dashboard-overview),
[`Data management`](../VALIDATION.md#data-management),
[`Form workflow`](../VALIDATION.md#form-workflow),
[`Destructive workflow`](../VALIDATION.md#destructive-workflow), and
[`Block composition and reflow`](../VALIDATION.md#block-composition-and-reflow).
Apply
[`Experience classification and mode transitions`](../VALIDATION.md#experience-classification-and-mode-transitions)
when a task enters or returns from another mode.
Treat Dashboard overview as a page-level scenario within Application Workspace.
Include direct entry, Back and Forward, navigation transformation, partial
failure, stale and oversized data, query and selection restoration, unsaved
work, session expiry, permission loss, 200% text, 60% expansion, RTL, themes,
keyboard-only operation, and screen-reader announcements.
