# Navigation

## Status

Contract complete for the navigation-shell pattern.

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
location must remain clear without color alone. Disabled navigation is avoided;
if a destination is unavailable, either omit it or provide an explanation that
remains operable.

## Behavior

Navigation activation changes location rather than triggering an in-place action.
Collapsed and temporary forms preserve the same destination names, order, and
current-location meaning. Opening temporary navigation moves focus according to
the dialog or disclosure pattern; closing restores focus to its trigger.

## Responsive behavior

Replace the persistent sidebar with temporary navigation when it cannot coexist
comfortably with the workspace, normally in the compact range. Do not squeeze it
beside a narrow workspace. Longer translations may trigger the transformation
earlier.

## Accessibility

Expose navigation regions, destination names, current location, and expanded
state programmatically. Collapsed items retain an accessible label and a visible
text alternative on focus or request. Keyboard and reading order follow the
meaningful visual order.

### Web adapter

Use named navigation landmarks where more than one region exists. Mark the
current destination with `aria-current`. If temporary navigation behaves as a
modal, follow the dialog contract; if it behaves as a disclosure, expose the
trigger's expanded relationship.

## Example

Use the sidebar for primary application destinations and the top bar for account,
help, notifications, and global search.
