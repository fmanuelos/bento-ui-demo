# Button

## Status

Contract complete.

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

| Size     | Height                     | Horizontal padding | Typography | Use                                      |
| -------- | -------------------------- | ------------------ | ---------- | ---------------------------------------- |
| Compact  | `control-height-sm`        | `spacing.sm`       | `label-sm` | Dense desktop utilities                  |
| Standard | `control-height-lg`        | `spacing.md`       | `label-md` | Forms, primary flows, and touch contexts |
| Icon     | `control-height-lg` square | None               | Inherited  | Icon-only action                         |

Buttons use `rounded.md`. Because height is fixed, component-token `padding`
means horizontal padding.

## States

| State           | Support                          | Contract                                                                                                            |
| --------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Default         | Required                         | Presents the variant's action hierarchy.                                                                            |
| Hover           | Required when hover is available | Enhances affordance but does not reveal otherwise unavailable content.                                              |
| Focus           | Required                         | Remains visible when combined with pressed, expanded, loading, or destructive states.                               |
| Active          | Required                         | Appears only while activation is in progress.                                                                       |
| Loading or busy | Optional                         | Preserves the label or an equivalent status, prevents repeated activation, and does not imply completion.           |
| Disabled        | Optional                         | Is identifiable, unavailable to activation, and not used when a reason or recovery action must remain discoverable. |
| Pressed         | Toggle buttons only              | Exposes the on/off state without changing the control's accessible name.                                            |
| Expanded        | Menu or disclosure buttons only  | Exposes whether the controlled content is open.                                                                     |

Visual states use the matching `action-*` and `focus-ring` tokens. Shared state
precedence is defined in [`DESIGN.md`](../../DESIGN.md#shared-state-model).

## Behavior

One completed activation produces one action. Loading prevents duplicate actions.
When an action opens or closes another component, focus follows that component's
contract. A destructive label states the action rather than relying on color.
Buttons trigger actions; controls whose purpose is navigation use the platform's
navigation semantic instead.

## Responsive behavior

Use compact buttons only in pointer-oriented toolbars and repeated utilities. Use
standard or icon size when touch is expected.

## Accessibility

Use visible text whenever space permits. An icon-only button has a
programmatically determinable name that communicates the action. Name, role,
pressed or expanded state, availability, and busy status are exposed to assistive
technology. Activation is possible without pointer input.

### Web adapter

Use a native `button` where possible. Enter and Space activate it. Toggle buttons
expose `aria-pressed`; controls that reveal content expose the appropriate
expanded and controlled relationships. An icon-only button may use visible text,
`aria-label`, or `aria-labelledby`. Use a link, not a button, for navigation.

## Example

Use one primary action and a secondary or tertiary alternative in a decision
area. Use destructive only when the outcome involves removal or loss.
