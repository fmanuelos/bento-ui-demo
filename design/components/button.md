# Button

## Status

Contract complete.

## Intent

Buttons trigger an immediate action. Use one primary button for the most important action in a region; use secondary, outline, or ghost buttons for supporting actions.

## Anatomy

1. Optional leading or trailing icon
2. Visible label, except for icon-only controls

## Variants

- **Primary:** Cobalt action background with inverse text; used for the main commitment.
- **Secondary:** Tinted cobalt background with dark cobalt text for a prominent supporting action.
- **Outline:** Transparent background with a visible neutral edge for an alternative action.
- **Ghost:** Transparent background without an edge for utilities and low-emphasis actions.
- **Destructive:** Danger background for actions involving removal or irreversible loss.

## Sizes

| Size        | Height                       | Horizontal padding | Typography | Icon | Gap               | Use                                       |
| ----------- | ---------------------------- | ------------------ | ---------- | ---- | ----------------- | ----------------------------------------- |
| Tiny        | `control-height-tiny`        | `spacing.space-2`  | `label-sm` | 16px | `spacing.space-1` | Dense inline and table utilities          |
| Small       | `control-height-small`       | `spacing.space-3`  | `label-md` | 16px | `spacing.space-2` | Toolbars, filters, and compact forms      |
| Medium      | `control-height-medium`      | `spacing.space-3`  | `label-md` | 20px | `spacing.space-2` | Default application and form action       |
| Large       | `control-height-large`       | `spacing.space-4`  | `label-lg` | 20px | `spacing.space-2` | Important standalone or onboarding CTA    |
| Extra-large | `control-height-extra-large` | `spacing.space-6`  | `label-lg` | 24px | `spacing.space-3` | One major public-facing or hero CTA group |

Medium is the default when no size is specified. Buttons use `rounded.md` at
every size. Because height is fixed, component-token `padding` means horizontal
padding; vertical space is derived by centering the line box and icon within the
fixed height.

Icon-only presentation is independent of size. A square icon-only button uses
the selected size's height for both dimensions and requires a programmatically
determinable name. It can be combined with any canonical size and semantic color
variant. Tiny and small visual controls remain subject to the minimum
interactive-target rules below.

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
Loading presentation follows the
[`progress-indicator contract`](progress.md); a compact spinner supplements rather
than replaces the action label or busy state.

## Behavior

One completed activation produces one action. Loading prevents duplicate actions.
When an action opens or closes another component, focus follows that component's
contract. A destructive label states the action rather than relying on color.
Buttons trigger actions; controls whose purpose is navigation use the platform's
navigation semantic instead.

## Responsive behavior

Use tiny buttons only in dense, pointer-oriented tables and inline utilities.
Small aligns buttons with compact fields, menu items, tabs, and toolbar controls.
Medium is the standard application, form, and dialog size and is the minimum
visual height when touch is expected. Large is for an important standalone or
onboarding action, not every form submission. Extra-large is optional and limited
to one major CTA in a landing-page hero or comparable public conversion area.

Tiny and small controls either provide a non-overlapping 44px interactive area or
promote to medium when touch is expected. Do not use size to replace the semantic
hierarchy expressed by the button variant.

## Accessibility

Use visible text whenever space permits. An icon-only button has a
programmatically determinable name that communicates the action. Name, role,
pressed or expanded state, availability, and busy status are exposed to assistive
technology. Activation is possible without pointer input.

At 200% zoom and with increased text spacing, labels may wrap only when the
resulting button can grow without clipping; otherwise use a shorter visible label
that preserves the action's meaning. Invisible target expansion must not overlap
an adjacent action's target.

### Web adapter

Use a native `button` where possible. Enter and Space activate it. Toggle buttons
expose `aria-pressed`; controls that reveal content expose the appropriate
expanded and controlled relationships. An icon-only button may use visible text,
`aria-label`, or `aria-labelledby`. Use a link, not a button, for navigation.

## Example

Use one primary action and a secondary, outline, or ghost alternative in a
decision area. Use destructive only when the outcome involves removal or loss.
