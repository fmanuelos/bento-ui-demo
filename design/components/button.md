# Button

## Status

Implemented in `src/components/Button.tsx`.

## Intent

Buttons trigger an immediate action. Use one primary button for the most important action in a region; use secondary or tertiary buttons for supporting actions.

## Anatomy

1. Optional leading or trailing icon
2. Visible label, except for icon-only controls

## Variants

- **Primary:** Cobalt action background with inverse text; used for the main commitment.
- **Secondary:** Surface background with an outlined edge.
- **Tertiary:** Transparent background for low-emphasis actions.
- **Destructive:** Danger background for actions involving removal or irreversible loss.
- **Icon:** A square control with an accessible name.

## Sizes

| Size | Height | Horizontal padding | Typography | Use |
| --- | --- | --- | --- | --- |
| Compact | `control-height-sm` | `spacing.sm` | `label-sm` | Dense desktop utilities |
| Standard | `control-height-lg` | `spacing.md` | `label-md` | Forms, primary flows, and touch contexts |
| Icon | `control-height-lg` square | None | Inherited | Icon-only action |

Buttons use `rounded.md`. Because height is fixed, component-token `padding`
means horizontal padding.

## States

All buttons have hover, active, disabled, and keyboard-focus states defined by the matching `action-*` and `focus-ring` tokens. Disabled buttons do not respond to pointer or keyboard activation. Loading behavior is not yet part of the component contract.

## Responsive behavior

Use compact buttons only in pointer-oriented toolbars and repeated utilities. Use
standard or icon size when touch is expected.

## Accessibility

Use visible text whenever space permits. Icon-only buttons require an `aria-label`. Never use a button for navigation.

## Example

Use one primary action and a secondary or tertiary alternative in a decision
area. Use destructive only when the outcome involves removal or loss.
