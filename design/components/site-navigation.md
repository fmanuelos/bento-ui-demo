# Public-site navigation

## Status

Contract complete.

## Intent

Public-site navigation communicates identity, current location, primary
destinations, and the main conversion or account action without competing with
page content. It serves public commercial, marketing, and informational pages.
Use the [`Navigation Shell contract`](navigation.md) for authenticated dashboard
workspaces.

When destinations do not fit inline, preserve them through the shared
[`Disclosure contract`](disclosure.md). A modal temporary presentation also
follows the [`Dialog contract`](modal.md).

## Anatomy and variants

1. Brand destination
2. Primary navigation region
3. Current destination indicator
4. Optional primary action
5. Optional utility actions
6. Optional responsive disclosure trigger and destination region

- **Inline navigation:** Displays primary destinations when labels, brand, and
  actions coexist comfortably.
- **Disclosure navigation:** Reveals the same destinations in ordinary flow or a
  layered non-modal surface.
- **Modal navigation:** Uses a temporary dialog or drawer when a non-modal
  disclosure cannot preserve comfortable targets and workspace access; an
  edge-attached presentation follows the [`Drawer contract`](drawer.md).
- **Sticky navigation:** May remain at the viewport edge when it does not obscure
  focus, headings, anchors, or enlarged content.

Destination names, order, and current-location meaning remain consistent across
presentations.

## Sizes and semantic token mapping

Use `navigation-topbar-background` and `navigation-topbar-border` for a standard
bounded header, with `text-primary` and `text-secondary` for brand and
destinations. Current location uses `background-accent` and `text-accent` or
another documented non-color indicator. Primary and utility actions follow their
Button or Link mappings.

Treat `topbar-height` as a normal minimum, not a fixed clipping boundary. Use
Public Site page-padding tokens for alignment and the appropriate container token
for content width. No separate frontmatter component entry is required while
Public-site Navigation composes topbar, action, and navigation-item roles.

## States

Support default, hover when available, focus, current, disclosure collapsed or
expanded, sticky, and temporary-modal states. Current location remains visible
with focus and is never represented as a primary action. Disabled destinations
are avoided; omit an unavailable destination or provide an operable explanation.

Opening temporary navigation preserves the current destination and does not
reorder links. Route changes close a temporary presentation when appropriate and
place focus according to navigation behavior. Content loading does not move or
collapse navigation unexpectedly.

## Behavior

Brand and destination activation navigate rather than trigger an in-place action.
The brand normally leads to the public-site home. Use one primary action when a
conversion or account task is important; do not style the current destination as
that action.

When space becomes constrained, retain brand and the primary action when
possible, move secondary utilities into an accessible overflow pattern, and
replace the destination list with a Disclosure before labels overlap or clip.
Never hide primary destinations without an equivalent control.

Opening an inline or layered Disclosure leaves focus on its trigger. Modal
navigation follows Dialog or Drawer for initial focus, containment, Escape,
backdrop behavior, and restoration. Navigation remains stable while page content
loads or responsive composition changes.

## Responsive behavior

Transform based on available space, label length, zoom, and input capability
rather than device detection alone. Inline navigation appears only while every
essential region retains useful space. Labels and actions wrap only when that
does not create an ambiguous multi-row destination order; otherwise use the
disclosure presentation.

At 200% zoom, brand, trigger, current location, and primary action remain
reachable without horizontal page scrolling. Longer translations do not cause
silent destination removal. Logical ordering and alignment support right-to-left
direction, while directional icons mirror only when their meaning depends on
direction.

## Accessibility

Expose the primary navigation region, brand destination, destination names,
current location, disclosure state, and utility purpose. When more than one
navigation landmark exists, give each a distinct programmatic name. Current
location uses a non-color visual cue and a programmatic current state.

All destinations and actions are operable without pointer input and have visible
focus. A disclosed or modal presentation preserves meaningful reading and focus
order. Sticky content does not cover focused controls or anchor destinations.
High-contrast modes retain boundaries, current state, and focus. Reduced motion
removes header and menu transitions without delaying access.

### Web adapter

Use a header and named navigation landmark with links for destinations. Mark the
current destination with `aria-current="page"` or the more precise supported
value. The disclosure trigger uses a native button with its expanded and
controlled relationship. Modal temporary navigation follows the Dialog or Drawer
web adapter.

Use logical layout properties and preserve DOM order rather than visually
reordering destinations. A skip link or equivalent route lets keyboard users move
past repeated navigation to the main content.

## Example

A public product site displays its brand, Product, Pricing, and Resources links,
plus one “Start free” action. When translated labels no longer fit, the links move
behind a labelled navigation Disclosure while the brand and primary action remain
available.
