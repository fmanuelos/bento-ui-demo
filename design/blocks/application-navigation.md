# Application Navigation block

## Status

Draft while representative Application Workspace implementations validate the
composition boundary with the Navigation Shell experience pattern.

## Intent

Application Navigation arranges persistent and temporary workspace destinations,
identity, global utilities, and a bypass route around the primary task. It
communicates location without presenting navigation as an in-place action.

## Use when

Use this block for authenticated, administrative, operational, analytical, or
other recurring workspaces where primary destinations persist across related
pages. Apply the
[`Navigation Shell pattern`](../patterns/navigation-shell.md) when destination
changes must preserve, interrupt, restore, or recover task context.

## Do not use when

Use [`Public-site Navigation`](public-site-navigation.md) for public-facing site
destinations. Use [`Breadcrumb`](../components/breadcrumb.md) for canonical
hierarchy, [`Tabs`](../components/tabs.md) for local peer views, and
[`Pagination`](../components/pagination.md) for result pages. Do not use the block
as workflow steps, browser history, or a container for unrelated page content.

## Anatomy

1. Skip route to primary content
2. Workspace or product identity
3. Primary destination region
4. Current destination indicator
5. Optional destination status or count
6. Optional global utility region
7. Optional collapse or temporary-navigation trigger
8. Primary-content boundary supplied by the containing template

## Variants

- **Persistent sidebar and top bar:** Destinations and global utilities coexist
  with a sufficiently wide workspace.
- **Collapsed sidebar:** Destination labels remain available on focus or request
  while the workspace receives more width.
- **Temporary navigation:** A Disclosure, Dialog, or Drawer presents destinations
  when persistent navigation would compete with the task.

User-controlled collapse remains distinct from temporary presentation forced by
available space. Destination identity, order, and current-location meaning remain
stable across variants.

## Participating components and related patterns

Destinations use [`Link`](../components/link.md); global actions use
[`Button`](../components/button.md) or
[`Button Group`](../components/button-group.md). Optional counts use
[`Status Badge`](../components/status-badge.md). [`Skip link`](../components/skip-link.md)
provides the bypass route. Temporary presentation follows
[`Disclosure`](../components/disclosure.md),
[`Dialog`](../components/modal.md), or [`Drawer`](../components/drawer.md).

The [`Navigation Shell pattern`](../patterns/navigation-shell.md) owns route-state
sequence, persistence, interruption, authentication recovery, and restoration.
[`Task continuity`](../patterns/task-continuity.md),
[`Responsive density`](../patterns/responsive-density.md), and
[`Asynchronous feedback`](../patterns/async-feedback.md) apply as relevant.

## Content requirements

Destination labels use stable, purpose-led names rather than visual position.
Global utilities distinguish account, help, search, notifications, and other
actions from destinations. Badges or counts supplement rather than replace a
destination name.

Unavailable destinations are omitted or retain an operable explanation; they do
not appear as unexplained disabled navigation. Collapsed presentation never makes
icon recognition the only way to identify a destination.

## Layout and semantic token mapping

Sidebar variants use `navigation-sidebar-background` and the related foreground,
hover, and selected roles. The top bar uses `navigation-topbar-background` and
`navigation-topbar-border`. Persistent dimensions use `sidebar-expanded`,
`sidebar-collapsed`, and `topbar-height` as normal constraints rather than fixed
clipping boundaries.

Use Application Workspace padding and container roles for the task surface. The
block retains one clear boundary between repeated navigation and primary content
and introduces no dedicated token family.

## States and behavior

The block may be persistent, collapsed, temporarily hidden, opening, open, or
closing. Individual destination, action, disclosure, and modal states remain
owned by their components. Current location remains distinguishable from focus
and from a primary action.

Navigation activation changes location. Opening temporary navigation follows its
chosen component's focus model, and closing restores the trigger or logical
continuation. The block does not commit route changes, resolve unsaved work, or
restore query state; those sequences belong to the Navigation Shell and Task
Continuity patterns.

## Responsive and localization behavior

Use persistent navigation only while it coexists comfortably with the primary
task. Collapse or replace it when labels, translation, zoom, or available space
would compete with the workspace. Do not squeeze a persistent sidebar beside a
narrow task surface.

Long labels wrap or receive a complete presentation on focus or request. Support
60% text expansion, 200% zoom, increased text spacing, right-to-left direction,
locale-aware counts, and touch input without removing destinations or reducing
essential targets.

## Accessibility

Navigation regions have distinct names when more than one exists. Expose each
destination's name and current state, plus collapse or expanded state where
applicable. Repeated regions before primary content provide a working bypass
route. Source, reading, and focus order remain meaningful in every variant.

Temporary modal navigation contains focus and prevents background interaction;
non-modal Disclosure does neither. Both retain visible focus and predictable
dismissal. High-contrast modes preserve boundaries and selected state. Reduced
motion removes transformation animation without changing navigation state.

### Web adapter

Use named navigation landmarks and native anchors for destinations. Mark the
current destination with the appropriate `aria-current` value. The primary Skip
Link precedes repeated shell content and targets the page's single `main`
landmark, moving DOM focus as well as the viewport.

Collapsed links retain accessible names and a visible text alternative on focus
or request. A Disclosure trigger exposes its expanded relationship. Modal
temporary navigation follows the Dialog or Drawer adapter, including inertness,
focus containment, Escape, and restoration.

## Representative example

An administrative workspace uses a persistent sidebar for Projects, Reports, and
Settings and a top bar for search, help, notifications, and account access. At a
constrained width the same ordered destinations move into a labelled temporary
Drawer while a Skip Link continues to target the primary task.

## Validation scenarios

Apply the shared matrix and the checks in
[`Dashboard overview`](../VALIDATION.md#dashboard-overview),
[`Data management`](../VALIDATION.md#data-management), and
[`Block composition`](../VALIDATION.md#block-composition-and-reflow). Include
persistent, collapsed, temporary, direct-entry, current-route, long-label, RTL,
200% zoom, high-contrast, reduced-motion, bypass, modal-focus, unsaved-work,
session-expiry, and permission-loss cases with the Navigation Shell pattern.
