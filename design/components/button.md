# Button

## Status

Contract complete.

## Intent

Buttons trigger an immediate action. Use one primary button for the most important
action in a region; use secondary, outline, or ghost buttons for supporting
actions. Relationships among actions follow the
[`Action hierarchy and emphasis pattern`](../patterns/action-hierarchy-and-emphasis.md).

## Anatomy

1. Optional leading or trailing icon
2. Visible label, except for icon-only controls

## Variants

- **Primary:** Cobalt action background with inverse text; used for the main commitment.
- **Secondary:** Tinted cobalt background with dark cobalt text for a prominent supporting action.
- **Outline:** Transparent background with a visible neutral edge for an alternative action.
- **Ghost:** Transparent background without an edge for utilities and low-emphasis actions.
- **Destructive:** Danger background for actions involving removal or irreversible loss.
- **Link:** Transparent, underlined treatment using link color roles for a
  low-emphasis action. It remains a Button and never represents navigation.

## Sizes

| Size        | Height                       | Horizontal padding | Typography | Icon              | Gap               | Use                                       |
| ----------- | ---------------------------- | ------------------ | ---------- | ----------------- | ----------------- | ----------------------------------------- |
| Tiny        | `control-height-tiny`        | `spacing.scale-2`  | `label-sm` | `spacing.scale-4` | `spacing.scale-1` | Dense inline and table utilities          |
| Small       | `control-height-small`       | `spacing.scale-3`  | `label-md` | `spacing.scale-4` | `spacing.scale-2` | Toolbars, filters, and compact forms      |
| Medium      | `control-height-medium`      | `spacing.scale-3`  | `label-md` | `spacing.scale-5` | `spacing.scale-2` | Default application and form action       |
| Large       | `control-height-large`       | `spacing.scale-4`  | `label-lg` | `spacing.scale-5` | `spacing.scale-2` | Important standalone or onboarding CTA    |
| Extra-large | `control-height-extra-large` | `spacing.scale-6`  | `label-lg` | `spacing.scale-6` | `spacing.scale-3` | One major public-facing or hero CTA group |

Medium is the default when no size is specified. Buttons use `rounded.shape-md` at
every size. Because height is fixed, component-token `padding` means horizontal
padding; vertical space is derived by centering the line box and icon within the
fixed height.

Icon-only presentation is independent of size. A square icon-only button uses
the selected size's height for both dimensions and requires a programmatically
determinable name. It can be combined with any canonical size and semantic color
variant. Tiny and small visual controls remain subject to the minimum
interactive-target rules below.

Icon-only sizing is reserved for controls whose visible content is a graphical
icon. Do not use icon-only presentation solely to make a text label square.
Compact text controls retain the selected size's label typography and line
height. They may use a minimum inline size equal to the selected control height
and grow horizontally when the label requires more space. Icon-size tokens apply
only to graphical icons, not text content.

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

The Link variant uses `action-link-default`, `action-link-hover`,
`action-link-active`, and `action-link-disabled`. The visited role does not apply
to Button because an action has no destination history. Link Button supports the
same sizes and behavioral states as other Button variants and is not an inline
prose substitute for the [`Link`](link.md) component.

## Behavior

One completed activation produces one action. Loading prevents duplicate actions.
When an action opens or closes another component, focus follows that component's
contract. A destructive label states the action rather than relying on color.
Buttons trigger actions; controls whose purpose is navigation use the platform's
navigation semantic instead. Choose the Link variant only when a genuine action
needs a quiet, text-like presentation, such as clearing optional filters or
revealing supplementary controls.

When an action saves, retries, restores, discards, or commits edited work, its
version and persistence meaning follows the
[`Task continuity and unsaved work pattern`](../patterns/task-continuity.md).
Button continues to own activation, action labelling, and its busy state.

## Responsive behavior

Use tiny buttons only in dense, pointer-oriented tables and inline utilities.
Small aligns buttons with compact fields, menu items, tabs, and toolbar controls.
Medium is the standard application, form, and dialog size and is the minimum
visual height when touch is expected. Large is for an important standalone or
onboarding action, not every form submission. Extra-large is optional and limited
to one major CTA in a public-site hero or comparable public conversion area.

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
The Link visual variant still renders a native `button`; it does not accept
`href`, `to`, or destination behavior.

## Example

Use one primary action and a secondary, outline, or ghost alternative in a
decision region. The region, priority, and behavior through state changes follow
the [`Action hierarchy and emphasis pattern`](../patterns/action-hierarchy-and-emphasis.md).
Related independent actions follow the
[`Button Group`](button-group.md) contract. Use destructive only when the outcome
involves removal or loss. A filter region may use a Link Button labelled “Clear
filters” when the action should remain available without competing with the main
commitment.
