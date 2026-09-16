# Link

## Status

Contract complete for navigation to a destination.

## Intent

Link moves to a resource, route, file, or named location. Use it when activation
changes the current destination or exposes a destination through platform link
behavior. Use Button for an immediate action that does not navigate, including
when that Button uses the Link visual variant.

## Anatomy and variants

1. Visible destination label
2. Optional leading or trailing decorative icon
3. Optional platform-provided destination metadata

- **Inline:** Underlined destination within prose or another reading context.
- **Standalone:** Independently placed destination with link color, underline,
  and room for an optional icon.
- **Navigation:** Contextual destination whose containing navigation component
  owns layout, current-state treatment, and emphasis.
- **Button-presented:** Destination whose visual hierarchy uses an approved
  Button style recipe while retaining Link semantics and behavior.

Icons supplement a destination label. Do not use an icon alone unless the
destination has a programmatically determinable name and the surrounding
context makes its purpose unambiguous.

## Sizes and semantic token mapping

Inline and standalone links use `action-link-default`, `action-link-hover`,
`action-link-active`, and `action-link-visited` with the global focus roles.
Their typography normally inherits the surrounding text. Standalone links may
use label typography when presented as an independent control.

Navigation links compose the containing navigation component's foreground,
current-state, spacing, shape, and target-size roles. Button-presented links
compose an approved Button color and size mapping without inheriting Button
semantics, loading, pressed, expanded, or disabled behavior.

Underlining is the default non-color distinction for inline and standalone
links. A navigation or Button-presented link may omit it when placement, shape,
current-state treatment, and established context provide an equally clear
affordance. No dedicated Link frontmatter family is required because the
semantic `action-link-*` roles and composed component mappings already express
the supported presentations.

## States

Links support default, hover when available, focus, active, and visited states.
A link identifying the current destination exposes a current state without
becoming selected or disabled. Visited styling applies to destination links
only and may be omitted from application navigation when revealing visit history
would be confusing or inappropriate.

Disabled, loading, busy, pressed, expanded, selected, error, and validation
states do not belong to the base Link contract. When a destination is
unavailable, omit the link or render explanatory non-interactive text. Do not
leave an `href` on a link that claims to be disabled.

## Behavior

Activation follows ordinary platform navigation. Preserve browser history,
destination preview, copying, opening in a new context, downloads, and other
link capabilities supported by the destination. Internal routing may intercept
activation for client-side navigation only when modified clicks, external
destinations, downloads, and browser history retain their expected behavior.

Same-document links identify stable targets. When a component promises focus
movement in addition to viewport movement, as Skip Link and Back to Top do, its
specialized contract owns that behavior. A base Link does not move focus after
ordinary page or route navigation.

External destinations open in the current context by default. Opening a new
context is an explicit product decision and is communicated when it would be
unexpected. Downloads identify the file or download outcome when the destination
label alone is insufficient.

## Responsive, overflow, and localization behavior

Link labels wrap rather than clip. Inline links remain part of text reflow;
standalone and navigation links preserve clear target boundaries at high zoom
and with increased text spacing. Do not truncate a label when doing so makes the
destination ambiguous. Icons and text retain logical order in right-to-left
presentation, and directional icons mirror when their meaning requires it.

Touch presentations provide an adequate non-overlapping target. A link embedded
in prose may use the line box supplied by its reading context; independently
placed links use at least `touch-target-min` when touch activation is expected.

## Accessibility

Expose the link role, destination, accessible name, current state when relevant,
and visible focus. The accessible name identifies the destination or outcome
rather than using vague text such as “click here.” Do not rely on color alone to
distinguish inline links from surrounding text.

Keyboard activation follows platform Link behavior. High-contrast presentation
preserves the text, underline or equivalent affordance, current state, and focus
indicator. Reduced motion removes nonessential transitions and smooth movement
without delaying navigation.

### Web adapter

Use an anchor with a valid `href`. Use a routing library's Link component only
when it ultimately exposes anchor semantics and preserves native modified-click
and history behavior. Use fragment identifiers for same-document destinations,
the `download` attribute for genuine downloads, and `aria-current` for the
current route or page when applicable.

Do not use `role="link"` on a Button or simulate a link with click handlers on
generic elements. Button-presented links remain anchors and may consume the same
visual style recipe as Button. Conversely, `Button variant="link"` remains a
native `button` and does not accept `href` or routing properties.

## Example

An article uses an inline “Accessibility guidance” link to navigate to related
documentation. A public-site hero uses a Button-presented “Start free” link to
open registration. A filter panel uses `Button variant="link"` for “Clear
filters” because clearing the current values is an action, not a destination.
