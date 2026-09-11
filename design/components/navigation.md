# Navigation

## Status

Contract complete for the navigation-shell pattern.

## Intent

Navigation communicates location and access to destinations. Selected navigation
is a location state, not a primary action.
Temporary modal navigation follows the shared
[`dialog contract`](modal.md); a non-modal disclosure retains focus on its
trigger and follows the [`Disclosure contract`](disclosure.md) without adopting
dialog behavior. Public-facing headers and destination navigation follow the
separate [`Public-site Navigation contract`](site-navigation.md).

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

Use temporary sidebar navigation in the mobile and tablet ranges. Desktop and
wide layouts may use persistent navigation when it coexists comfortably with the
dashboard. Do not squeeze it beside a narrow dashboard. Longer translations,
zoom, or a constrained container may trigger the temporary form earlier.

Public site navigation keeps primary destinations available through an
accessible disclosure whenever inline links do not fit and follows the
[`Public-site Navigation contract`](site-navigation.md). Hiding the links without
an equivalent control is not a responsive transformation.

## Accessibility

Expose navigation regions, destination names, current location, and expanded
state programmatically. Collapsed items retain an accessible label and a visible
text alternative on focus or request. A brief label presentation follows the
[`tooltip contract`](tooltip.md); the tooltip supplements rather than creates the
destination's accessible name. Keyboard and reading order follow the meaningful
visual order.

Application shells provide a route past repeated top-bar and navigation content
to the primary content. A route to primary navigation is optional when it
materially shortens navigation through other repeated regions; name that route by
purpose rather than visual position. Do not expose a route to hidden, inert, or
closed temporary navigation.

### Web adapter

Use named navigation landmarks where more than one region exists. Mark the
current destination with `aria-current`. If temporary navigation behaves as a
modal, follow the dialog contract; if it behaves as a disclosure, expose the
trigger's expanded relationship.

Place bypass links before the shell header so the main-content link is the first
focusable element. Use a native anchor with a stable fragment identifier that
targets the page's single `main` landmark. Activation moves DOM focus as well as
the viewport; make the target programmatically focusable with `tabindex="-1"`
when required. The link is either persistently visible or revealed when it
receives focus, is not removed with `display: none` or `visibility: hidden`, and
appears above sticky shell content. If responsive navigation has multiple DOM
representations, keep identifiers unique and render an optional primary-navigation
bypass route only when its target is available.

## Example

Use the sidebar for primary application destinations and the top bar for account,
help, notifications, and global search.
