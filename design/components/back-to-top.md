# Back to top

## Status

Contract complete.

## Intent

Back to top is an optional floating in-page navigation aid for long pages. It
supplements the initial bypass route, landmarks, headings, and platform
navigation rather than replacing them.

## Anatomy

1. Upward-direction indicator
2. Visible destination label

Mount the control after primary content so its document order remains meaningful.
Its link is fixed to the viewport and becomes available only as the user
approaches the bottom of the page. Use no more than one Back-to-Top control per
page. Do not use an icon-only presentation; the indicator supplements the visible
label.

## Size and semantic token mapping

Use `surface-raised`, `border-secondary`, `text-link`, `label-md`, `shape-md`, the
global focus roles, and at least the minimum interactive target. Do not introduce
a dedicated token family or adopt primary-button styling. Because the control
temporarily overlaps the page, it follows the floating-surface depth guidance.

## States

Support default, hover when available, focus, and active states. Back to top has
no disabled state. It is unavailable near the top and middle of the page and
available when the remaining scroll distance is less than or equal to
`revealOffset`. The default offset is 320px. Omit it on pages without at least
200px of scrollable distance. Visibility changes do not move focus or require
announcement.

## Behavior

Activation returns the page to its named top destination and moves navigation
focus to that destination. Do not move only the viewport while leaving focus on
an off-screen control. The web presentation moves smoothly and becomes immediate
when reduced motion is requested.

Reveal and conceal the link with an opacity transition and a small block-axis
translation. Complete the transition within 200ms without bounce. Remove the
transition and transform when reduced motion is requested. While unavailable,
the link is not exposed to pointer, keyboard, or assistive-technology interaction.

## Responsive behavior

Use fixed logical block-end and inline-end placement with mobile, tablet, and
desktop page-padding tokens. Add system safe-area insets to those offsets. Keep
the visible label at narrow widths and under text enlargement.

The control remains in the same viewport corner while the footer enters and does
not move above it. Page layouts should reserve that corner from important footer
content and other floating controls. Keep Back to top below blocking overlays and
notifications in the layer order.

## Accessibility

Use the visible label “Back to top”. The indicator is decorative. Preserve a
visible focus treatment, a meaningful focus order, and the minimum interactive
target. Do not add a redundant `aria-label` or a live-region announcement.

### Web adapter

Use a native anchor whose fragment identifies a stable destination in the same
document. The destination is the start of `main`, its page heading, or the named
top of the page and must accept programmatic focus. Account for sticky headers
with logical scroll margin. Calculate visibility from the document's remaining
scroll distance. Use one passive scroll listener, batch measurements with
`requestAnimationFrame`, and recalculate after viewport or document-size changes.
Keep the fixed link in a meaningful DOM position.

## Example

A long report mounts “Back to top” after its final section. The fixed link appears
as the remaining scroll distance enters its reveal threshold and stays in the
viewport corner over the footer. Activation returns focus and the viewport to the
report title.
