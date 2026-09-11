# Tooltip

## Status

Contract complete for a non-interactive text tooltip.

## Intent

A tooltip provides brief supplemental text for a labelled or icon-only control.
It helps explain unfamiliar actions or reveal a short nonessential value. It does
not contain interactive content, replace a visible label when one fits, carry
essential instructions, or provide the only access to important truncated text.

A tooltip follows the shared [`overlay contract`](overlay.md).

## Anatomy and variants

1. Described trigger or anchor
2. Compact raised surface
3. Brief plain-text description
4. Optional visual pointer toward the anchor

Tooltips may describe controls or static content. Both variants use the same
non-interactive behavior. Rich formatting, headings, links, buttons, forms, and
multi-step explanations require a popover or dialog instead.

## Sizes and semantic token mapping

Keep the surface compact while allowing text to wrap to a readable short line
length. Use `surface-inverse` with `text-inverse`, `label-sm`, `rounded.shape-md`, and
`spacing.space-2`. Use a quiet inverse boundary when needed for high-contrast
separation. The surface occupies the tooltip layer defined in DESIGN.md.

No frontmatter entry is required until the tooltip presentation needs an
independent machine-readable mapping rather than this composition of existing
roles.

## States

Support hidden, pending, visible, repositioning, and dismissed states. A short
show delay may reduce accidental pointer activation. Keyboard focus does not wait
for a delay that makes the description difficult to discover. Once visible, the
tooltip remains available while the pointer is over the trigger or tooltip and
while the trigger retains focus.

Disabled controls that cannot receive focus do not rely on a tooltip to explain
unavailability. Place any required explanation in persistent text or on a
focusable surrounding control.

## Behavior

Pointer hover and keyboard focus reveal the same description. Escape dismisses a
visible tooltip without moving focus. Pointer exit and focus leaving the trigger
and tooltip boundary dismiss it after any brief grace period needed to cross the
gap. Repeated hover or focus does not recreate or reannounce unchanged content.

Only one tooltip is normally visible within an interaction region. Moving among
adjacent controls may reduce the subsequent delay without flashing overlapping
surfaces. The tooltip never intercepts activation intended for its trigger.

## Responsive behavior

Follow Overlay placement and viewport-fit rules. Wrap brief text rather than
clipping it, but replace long or structured content with a popover or persistent
description. At high zoom, the tooltip and trigger remain reachable without
causing two-dimensional page scrolling.

Do not depend on hover on touch-only devices. Essential descriptions remain
persistent or available through an explicit disclosure. If a platform exposes a
tooltip on long press, that gesture must not prevent the control's primary action
or become its only accessible path.

## Accessibility

The tooltip text programmatically describes its trigger. It does not replace the
trigger's accessible name: an icon-only control still has an action-oriented name
when the tooltip is absent. Tooltip content is included once in the accessibility
tree while visible or through a stable description relationship supported by the
platform.

Focus remains on the trigger. The description does not announce repeatedly after
unrelated renders. High-contrast modes preserve the tooltip edge and text.
Reduced motion removes fades or movement without delaying visibility.

### Web adapter

Expose the surface with `role="tooltip"` and connect it to the trigger with
`aria-describedby` when visible or when the implementation maintains a stable
description node. Do not use `aria-label` to replace visible trigger text merely
to attach a tooltip. The tooltip itself is not focusable and contains no
interactive descendants.

Use pointer and focus events rather than a hover-only CSS treatment so Escape,
focus persistence, delayed opening, and dismissal can satisfy the contract.

## Example

An icon-only button named “Archive project” shows the same words in a tooltip on
hover or focus. The button retains its accessible name even when the tooltip is
hidden or unavailable.
