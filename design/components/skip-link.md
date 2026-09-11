# Skip link

## Status

Contract complete for bypass navigation to named page regions.

## Intent

Skip link provides a direct route past repeated content to primary content or
another useful named region. It reduces repetitive keyboard and switch-control
navigation without replacing landmarks, headings, or ordinary navigation.

## Anatomy and variants

1. Visible destination label
2. Named destination

- **Focus-revealed:** Default presentation, visually concealed until focused.
- **Persistent:** Optional presentation when the route should remain visible to
  everyone.

The first route targets primary content. Additional routes are optional when
they materially shorten navigation to other available regions.

## Sizes and semantic token mapping

Use `action-primary-*`, `label-md`, `shape-md`, the global focus roles, and at
least the minimum interactive target. The link appears above sticky content and
does not introduce a dedicated token family.

## States

Support concealed, focus, and active states, plus hover when the link is visible.
The persistent variant also has a visible default state. Skip link has no
disabled state. Do not render a route whose destination is hidden, inert, or
otherwise unavailable.

## Behavior

The primary-content route is the first focusable element in a page composition
with repeated regions. Keyboard focus reveals a focus-revealed link without
changing layout. Activation moves the viewport and navigation focus to the named
destination. Use purpose-based labels such as “Skip to main content” or “Skip to
primary navigation,” not labels based only on visual position.

## Responsive behavior

The link uses logical placement, remains visible above sticky regions when
focused, and accommodates zoom, text enlargement, text spacing, and longer
translations without clipping. Concealment and reveal do not rely on motion;
transitions are removed when reduced motion is requested.

## Accessibility

Expose a native navigation destination with visible text and a visible focus
treatment. Preserve meaningful source order and ensure the target can receive
programmatic focus. Do not hide the link with `display: none` or `visibility:
hidden`, and do not give it a negative tab order. Provide one primary-content route per page
composition and keep target names unique.

### Web adapter

Use a native anchor whose fragment identifies a stable element in the same
document. The primary route targets the page's single `main` landmark. Make the
destination programmatically focusable with `tabindex="-1"` when it is not
naturally focusable, and move DOM focus there after activation. Place bypass
links before repeated header and navigation regions. Keep the link in the DOM
while visually concealing it off-screen until focus, and layer it above sticky
or fixed shell content.

## Example

An application shell begins with “Skip to main content.” Pressing Tab reveals
the link; activating it moves the viewport and focus to the shell's `main`
landmark. A second route to primary navigation appears only when that navigation
is currently rendered and available.
