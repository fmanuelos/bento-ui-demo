# Breadcrumb

## Status

Contract complete for hierarchical location navigation.

## Intent

Breadcrumb communicates the current page's position within a stable information
hierarchy and provides routes to its ancestors. Use it when a person arriving at
a deep page benefits from understanding or moving through that hierarchy. Do not
use it as the only primary navigation, for browser history, for a sequence of
completed steps, or when the hierarchy contains only the current page.

## Anatomy and variants

1. Named breadcrumb navigation region
2. Ordered trail
3. Root and ancestor destinations
4. Decorative separators
5. Current-page item
6. Optional collapsed-ancestor Disclosure

- **Full trail:** Shows every level and is preferred when the trail fits without
  crowding or obscuring the page title.
- **Collapsed trail:** Replaces one contiguous set of intermediate ancestors with
  a labelled Disclosure while preserving access to every omitted destination.

The root may include a decorative home indicator, but it retains a visible text
label. Separators communicate visual direction or division and are not trail
items. Use one Breadcrumb per page.

## Sizes and semantic token mapping

Use `label-md` with `text-secondary` for ancestor context, `text-link` and the
matching `action-link-*` states for navigable destinations, `text-primary` for
the current page, and `text-tertiary` for separators. Use `spacing.space-2`
between items and separators, the global focus roles, and a non-color distinction
between the current item and ancestor links.

The collapsed-ancestor trigger is an in-place disclosure action rather than a
navigation destination. It uses the Ghost Button's `action-ghost-*` foreground,
background, and state roles without adopting link color or underline treatment.
It may display `…` as its compact visible content while retaining a complete
accessible name that communicates whether it will show or hide the omitted
parent pages.

Breadcrumb links preserve at least `touch-target-min` in touch presentations.
Compact visual text must not create overlapping interactive targets. No dedicated
frontmatter component entry or token family is required because Breadcrumb
composes link, text, icon, spacing, and Disclosure roles.

## States

Ancestor links support default, hover when available, focus, active, and visited
states. The current-page item supports current and focus only when it remains a
link. A collapsed trail supports collapsed, expanded, and focus states through
its Disclosure.

Disabled, selected, loading, busy, error, and validation states do not apply to
the trail. Do not present an unavailable ancestor as a disabled link. If an
ancestor is necessary to understand the hierarchy but has no destination, render
it as non-interactive text and keep its distinction from the current page clear.

## Behavior

Ancestor activation navigates to that destination using ordinary platform
navigation. Breadcrumb does not intercept browser history or change hierarchy in
response to hover or focus. The current page is the final item and is normally
not interactive; if product routing requires it to be a link, activation reloads
or restores the canonical current location without implying a separate action.

Use the page's canonical information architecture rather than the visitor's
click path. Labels match the corresponding destination names unless a shorter
label is required for comprehension, and each label remains specific enough to
identify its destination in context.

A collapsed trail omits one contiguous middle range only. Its trigger may use a
visible ellipsis when its accessible name states how many parent levels it will
show or hide. The trigger is visually and semantically an action, not a link.
Expanding it reveals the omitted ancestors in their original order and follows
the Disclosure contract for focus and state.

## Responsive, overflow, and localization behavior

Prefer the full trail while it fits. Under constraint, preserve the root, current
page, and immediate parent; collapse intermediate ancestors before truncating
labels. Do not hide destinations without an equivalent route or use an
unlabelled ellipsis as the only way to recover them.

The current-page label may wrap and is not truncated. Ancestor labels may wrap
when item boundaries remain clear. If an ancestor is visually truncated as a
last resort, its complete label remains available on focus and on request without
relying on hover alone. The trail must not create two-dimensional page scrolling.

Use logical ordering and spacing. In right-to-left presentation, trail order
follows the localized reading direction; directional separator icons mirror,
while non-directional separators do not. Localize labels and the collapsed
trigger, and allow for text expansion, different glyph metrics, 200% zoom, and
increased text spacing.

## Accessibility

Expose the breadcrumb navigation purpose, ordered hierarchy, destination names,
and exactly one current page. Decorative separators and icons are ignored by
assistive technology. The current item remains understandable without color, and
ancestor links remain distinguishable from ordinary text.

Keyboard operation follows ordinary link navigation and the Disclosure contract
when ancestors are collapsed; Breadcrumb does not introduce arrow-key or managed
focus behavior. Every interactive item has visible focus and an adequate touch
target. High-contrast presentation preserves links, focus, and the current-item
distinction. Breadcrumb requires no motion; any collapse or reflow transition is
removed when reduced motion is requested.

### Web adapter

Use a named `nav` landmark containing an ordered list. Use native anchors for
ancestor destinations. Mark the final item with `aria-current="page"`; it may be
plain text or an anchor, and it appears once. Give the landmark a concise name
such as “Breadcrumb.”

Keep separators out of accessible names and the accessibility tree, including
when they are inserted with generated content or icons. A collapsed-ancestor
trigger is a native button with an accessible name such as “Show 2 parent pages”
or “Hide 2 parent pages” and an expanded relationship. Its accessible name does
not collapse to the visible `…`. It reveals list items in the same ordered trail
rather than opening an unrelated navigation landmark.

## Example

A support article displays “Home / Documentation / Guides / Project management /
Move a project,” where the first four items are links and “Move a project” is the
current page. At a narrow width it displays “Home / … / Project management / Move
a project.” The ellipsis button has the accessible name “Show 2 parent pages.”
Activating it reveals “Documentation” and “Guides” in their original hierarchical
order without moving focus.
