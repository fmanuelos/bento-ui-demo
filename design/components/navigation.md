# Navigation

## Status

Specified. The demo includes inline top navigation; no reusable sidebar or top-bar
component exists.

## Intent

Navigation communicates location and access to destinations. Selected navigation
is a location state, not a primary action.

## Anatomy and variants

- **Sidebar:** Application destinations on `navigation-sidebar-background`.
- **Collapsed sidebar:** Icon-led destinations at `sidebar-collapsed` width.
- **Top bar:** Global utilities on `navigation-topbar-background` with its border.

Sidebar items use the navigation foreground, hover, and selected tokens. The
desktop shell uses `sidebar-expanded`, `sidebar-collapsed`, and `topbar-height`.

## States

Support default, hover, focus, current, and expanded or collapsed states. Current
location must remain clear without color alone.

## Responsive behavior

Replace the persistent sidebar with temporary navigation below the large
breakpoint. Do not squeeze it beside a narrow workspace.

## Accessibility

Use landmarks and accessible names. Mark the current destination with
`aria-current`; collapsed items retain visible tooltips or another accessible
label. Keyboard order follows visual order.

## Example

Use the sidebar for primary application destinations and the top bar for account,
help, notifications, and global search.
