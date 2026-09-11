# Popover

## Status

Contract complete for a non-modal interactive popover.

## Intent

A popover presents supplemental interactive content near a trigger without
blocking the surrounding task. Use it for brief settings, supporting details, or
a small group of ordinary controls that benefits from spatial connection to its
anchor. Use a [Tooltip](tooltip.md) for brief non-interactive text, an action menu
for commands, a [Disclosure](disclosure.md) for content in ordinary reading flow,
and a [Dialog](modal.md), [Drawer](drawer.md), or page for complex or
consequential work.

Popover follows the shared [`overlay contract`](overlay.md).

## Anatomy and variants

1. Trigger or anchor
2. Raised popup surface
3. Optional title and concise description
4. Supplemental content or controls
5. Optional explicit close action
6. Optional visual relationship indicator

- **Informational popover:** Presents structured supplemental content that is too
  rich for a Tooltip. It may include links but does not exist only to repeat the
  trigger label.
- **Interactive popover:** Contains a small, reversible set of controls. Complex
  validation, multi-step work, or actions that cannot be safely abandoned require
  a Dialog or Drawer.

Popover content uses ordinary document and control semantics. It does not use
menu, listbox, or dialog semantics solely because it floats.

## Sizes and semantic token mapping

Use the `dropdown` surface mapping: `surface-raised`, `text-primary`,
`rounded.shape-md`, and `spacing.space-2`, with a `border-secondary` edge and the raised
popup depth defined in DESIGN.md. Internal sections use the spacing scale and
appropriate text roles. Actions use their existing component mappings.

Constrain the surface to a readable width based on its content rather than a
device class. No separate frontmatter entry is required while Popover shares the
approved dropdown surface mapping.

## States

Support closed, opening, open, busy, error, repositioning, and closing states as
relevant. Opening and closing follow Overlay. Busy content retains its name,
current values, and safe dismissal path. An error remains near the control or
operation it describes and provides recovery when one exists.

If the trigger or anchor disappears, close the popover and restore focus to the
nearest logical continuation when focus was inside. Repositioning never resets
form values, focus, or status.

## Behavior

Activation toggles the popover unless a separate explicit close action is
required. Opening either keeps focus on the trigger or moves it to a purposeful
element inside; each use documents one model. If focus stays on the trigger,
interactive content follows it in a predictable focus order. If focus moves
inside, Escape and explicit dismissal restore it to the trigger.

Escape dismisses the innermost eligible popover. Completed activation outside may
dismiss only when no entered data, selection, or required recovery information
would be lost. A popover that needs unsaved-change confirmation has exceeded this
component's intended complexity and becomes a Dialog or Drawer.

Actions inside the popover do not close it automatically unless completing the
action makes the remaining content unnecessary. Nested popovers are avoided;
when unavoidable, Overlay defines inside boundaries and dismissal order.

## Responsive behavior

Follow Overlay placement, collision, and viewport-fit rules. Text and controls
wrap without clipping. The surface may reposition but retains its content order,
focus, and values. Avoid two-dimensional scrolling inside the popover.

When content or targets no longer fit comfortably, transform the popover into an
inline Disclosure, Drawer, Sheet, or Dialog according to task complexity. The
transformation preserves values, actions, accessible name, and return focus.
Logical placement and alignment support right-to-left direction.

## Accessibility

Expose the trigger name, expanded state, controlled relationship, content name
when needed, and current busy or error state. Focus remains visible and every
control is operable without pointer input. The popover does not trap focus because
it is non-modal.

Supplemental content remains understandable without its visual pointer or
proximity to the trigger. High-contrast modes preserve the surface edge and focus.
Reduced motion removes placement and open or close animation without delaying
availability.

### Web adapter

Use the platform popover mechanism when it satisfies placement, dismissal, focus,
and accessibility requirements. There is no generic ARIA popover role. Use
ordinary document structure, a named region or group when useful, and the native
roles of contained controls. A non-modal dialog role is appropriate only when the
content is genuinely a focused dialog task and follows that contract.

The trigger exposes `aria-expanded` and `aria-controls` when those relationships
accurately represent the implementation. Portalled content retains valid naming,
description, and focus relationships.

## Example

A “Display settings” button opens a popover containing two reversible view
controls. Focus moves to the first control, Escape closes the surface and returns
focus to the button, and narrow touch layouts present the same settings in a
bottom Sheet.
