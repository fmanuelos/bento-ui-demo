# Navigation shell

## Intent

The navigation shell communicates location and gives stable access to primary
workspace destinations while preserving task and workspace priority.

## Use when

Use this pattern for authenticated or task-oriented application navigation that
persists across related destinations or transforms between persistent, collapsed,
and temporary forms.

## Do not use when

Use [`Public-site navigation`](../components/site-navigation.md) for public-facing
site destinations. Use Breadcrumb for canonical hierarchy, Tabs for local views,
Pagination for result pages, and Skip link or Back to top for page movement. Do
not use the shell to represent workflow steps, browser history, or actions.

## Participating components and related patterns

The [`Navigation shell`](../components/navigation.md) component contract owns the
bounded navigation regions. [`Skip link`](../components/skip-link.md) provides a
bypass route. Temporary presentation follows either
[`Disclosure`](../components/disclosure.md) or the
[`Dialog and modal`](../components/modal.md) contract without inventing another
focus model.

Apply [responsive density](responsive-density.md) when the shell transforms,
[asynchronous feedback](async-feedback.md) when destination content loads, and
[task continuity and unsaved work](task-continuity.md) when leaving may interrupt
or discard work. Forms and validation continues to own field validity, and
destructive actions applies to an explicit discard decision.

## States and sequence

The shell may be persistent, user-collapsed, temporarily hidden, opening, open,
or closing. Its destinations may be default, current, unavailable, or contain an
independent status indicator. Presentation state does not change destination
identity or current-location meaning.

- Destination names, order, and current-location meaning remain consistent
  across presentations.
- Current location uses a non-color indicator and is exposed programmatically.
- Global utilities are separated from destination navigation.
- Collapsing navigation does not remove accessible names or make icon knowledge a
  prerequisite.
- Navigation does not move merely because content loads or the viewport changes.
- Opening and closing temporary navigation preserve a predictable focus location.
- A direct or restored destination produces the same location meaning as
  navigating there through the shell.
- Browser Back and Forward restore the documented destination and applicable
  workspace context rather than creating duplicate navigation entries during
  responsive transformation.

## Persistence, interruption, and recovery

Preserve applicable query, filter, sort, selection, expanded detail, scroll, and
return context when moving between destinations or restoring browser history.
Product-specific state may use a durable route or session state, but restoration
must not expose stale or unauthorized information as current.

When leaving may discard meaningful work, the task-continuity policy resolves
before navigation commits. Cancelling that decision returns to the original task
and focus context. Explicit discard follows the destructive-actions pattern.

If authentication expires, retain the intended destination while task continuity
owns any safely recoverable work. After reauthentication, verify access and the
authoritative version before restoring the destination and task. Permission loss
or a missing destination provides an understandable alternative without silently
selecting an unrelated location.

## Content and localization

Destination labels use stable, purpose-led names rather than visual position.
Utility labels distinguish account, help, search, notifications, and other
actions from destinations. Badges or counts supplement rather than replace a
destination name.

Labels support expansion, locale-aware counts, and right-to-left order. Icons
mirror only when their meaning depends on direction. Truncation never removes the
only access to a destination's complete name.

## Responsive behavior

Use persistent navigation when it coexists comfortably with the primary task.
Collapse or replace it when labels, localization, zoom, or available space would
compete with the workspace. The system ranges are defaults, not device detection.

A transformed shell preserves destination order, current location, accessible
names, utilities, and a route to primary content. User-controlled collapse
remains distinct from a temporary presentation forced by available space. A
viewport change does not open, close, or move focus into navigation without a
task reason.

## Accessibility

Navigation regions have distinct names when more than one exists. Repeated
regions before primary content provide a working bypass route. Current location,
expanded state, and unavailable destinations are conveyed without color alone.

Temporary modal navigation contains focus and prevents background interaction;
non-modal disclosure navigation does neither. Both models support predictable
keyboard operation, dismissal, and focus restoration through their component
contracts. Touch targets, visible focus, and complete labels remain usable at
increased text size and in high contrast. Motion used during transformation is
reduced without changing navigation state.

## Validation scenarios

Apply the shared matrix and the navigation checks in
[`Public landing`](../VALIDATION.md#public-landing),
[`Public content`](../VALIDATION.md#public-content), and
[`Dashboard overview`](../VALIDATION.md#dashboard-overview), selecting the
public-site or application-navigation contract as appropriate. Include direct
entry, Back and Forward, temporary navigation, user collapse, viewport changes,
long labels, 60% expansion, RTL, loading destinations, unsaved work, session
expiry, permission loss, bypass navigation, and focus restoration.
