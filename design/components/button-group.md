# Button Group

## Status

Contract complete.

## Intent

A Button Group arranges a small set of related, independent actions so their
relationship and action hierarchy are clear. Every item remains a Button with its
own action, state, and accessible name.

Use a [`Radio group`](radio.md) when exactly one value is selected, [`Tabs`](tabs.md)
when choices switch peer views, and a toolbar pattern when a persistent set of
controls requires managed directional-key navigation. A main action combined with
a disclosure trigger is a split button and is outside this contract.

## Anatomy

1. Optional visible or programmatic group label
2. Two or more [`Button`](button.md) components, rendered as direct children when
   the group is connected
3. Optional overflow action that opens a documented
   [`dropdown pattern`](dropdown.md)

The group has no decorative container by default. A group label is included only
when the relationship or purpose would otherwise be unclear.

## Variants and sizes

- **Separated horizontal:** Default presentation. Actions follow the interface's
  logical reading order on one line while they fit.
- **Separated vertical:** Actions are stacked when a horizontal arrangement would
  clip, crowd, or obscure their labels.
- **Separated responsive:** Begins horizontal and may wrap or become vertical
  according to container fit, content length, zoom, and input needs rather than a
  device name alone.
- **Connected horizontal:** Places outline Buttons in one non-wrapping row. The
  first and last actions in logical reading order receive the outer inline-start
  and inline-end corners; interior corners are square.
- **Connected vertical:** Places outline Buttons in one column. The first and last
  actions receive the outer block-start and block-end corners; interior corners
  are square.

All buttons in one group use the same canonical Button size. Medium is the
default. Small is permitted for compact Dashboard toolbars and filters when each
control still satisfies the Button target-size requirements. Large and
extra-large groups are reserved for the Public Site contexts already allowed by
Button.

Use two or three visible actions in ordinary decision areas. When more actions
are necessary, keep the essential actions visible and move lower-priority
actions into one clearly named overflow control. Do not conceal an action whose
immediate visibility is necessary for safety, recovery, or task completion.

A separated group contains at most one primary Button. Supporting actions use
secondary, outline, or ghost treatment according to their hierarchy. Destructive
actions follow the
[`destructive-actions pattern`](../patterns/destructive-actions.md) and remain
secondary to a safe alternative until the final commitment step.

Every Button in a connected group uses the same canonical size and the outline
variant. Adjacent borders form one continuous visual boundary with a single
divider between actions. Connected groups do not contain primary, secondary,
ghost, or destructive treatments; use a separated group when action hierarchy
requires those variants.

Visual connection does not introduce selection or compound-control semantics.
Segmented selection and split-button behavior remain outside this contract.

## States

The group itself does not introduce hover, active, pressed, selected, loading,
or disabled states. Each contained Button exposes and resolves its own applicable
states under the Button contract and the shared state model in
[`DESIGN.md`](../../DESIGN.md#shared-state-model).

Loading or disabling one action does not disable the group or its other actions
unless the underlying workflow independently makes those actions unavailable. An
empty group is invalid and is not rendered. If only one action remains, render it
as an ordinary Button without Button Group semantics.

Focus is always represented on the focused Button and remains visible when that
button is loading, pressed, expanded, destructive, or otherwise stateful. In a
connected group, the focused Button and its focus indicator render above adjacent
Buttons. Hover, active, loading, disabled, and focus presentations remain
individual to each Button; overlapping boundaries must not conceal any state.

A group container must not clip focus indicators or use clipping to construct a
connected outer shape. Loading or disabling an individual connected Button does
not merge its state with adjacent actions.

## Semantic token mapping

Contained actions inherit their colors, typography, height, padding, icons, and
state mappings from Button. A separated group uses `spacing.space-2` as its
default logical row and column gap. A spacious Public Site action group may use
`spacing.space-3` when that separation supports the surrounding composition.

A connected group uses `spacing.space-0` between actions,
`rounded.shape-none` on interior corners, and `rounded.shape-md` on its logical
outer corners. Its continuous boundary and state presentation reuse the outline
Button's background, foreground, border, and state tokens. Adjacent borders
collapse into one visible divider without introducing a new semantic color role.

Button Group introduces no component entry or color token in `DESIGN.md`
frontmatter. Its layout, relationships, responsive behavior, and semantics cannot
be represented honestly by the supported component properties.

## Behavior, events, and transitions

Each completed activation invokes only the activated Button's action. The group
does not add a group-level activation event, selection state, or keyboard model.
Loading prevents repeat activation only for the affected action unless the
workflow requires a broader busy state.

After activation, focus remains on the initiating Button unless the resulting
component or workflow defines a different focus destination. Removing, hiding,
or moving an action does not move focus unexpectedly; when the focused action is
removed, place focus at the nearest logical workflow target.

Use one stable logical order. Form and dialog commitment actions normally place
the primary action at the logical end; promotional calls to action may place it
at the logical start. Do not reverse action order at a responsive boundary.

## Responsive, overflow, and localization behavior

Keep the group horizontal while every label and focus indicator fits. A separated
responsive group may wrap when reading order remains unambiguous. When wrapping
would produce an unclear hierarchy or isolated action, use separated vertical
presentation instead. Vertically stacked actions may fill the available inline
size.

A connected group never wraps into multiple rows. When connected horizontal no
longer fits, transform the entire group to connected vertical or separated
responsive presentation. Do not separate individual actions from the connected
boundary or leave an isolated action on another row.

Responsive transformation preserves DOM, reading, and focus order. It follows
the [`responsive-density pattern`](../patterns/responsive-density.md) and responds
to the component's available space rather than viewport width alone.

Labels may grow for translation and increased text spacing without clipping or
overlap. Prefer visible labels over substituting unexplained icons. Use logical
alignment, spacing, and corner assignment so right-to-left presentation follows
the interface's reading direction without changing action meaning or sequence.
Transform the whole connected group before translated labels cause clipping or
horizontal page scrolling.

Tiny and small visual buttons provide non-overlapping minimum interactive areas
or promote to medium when touch is expected. Invisible target expansion must not
overlap another action in the group.

## Accessibility

Every action exposes its own name, Button role, state, and availability. Tab
moves through the actions in DOM order; Enter and Space retain the native Button
behavior. Separated and connected Button Groups do not use arrow-key navigation
or a managed tab stop.

Apply a programmatically named group only when announcing the relationship helps
users understand the actions. Do not add redundant group semantics to a familiar
form or dialog action row whose surrounding context already supplies the purpose.
State, hierarchy, and destructive meaning never rely on position or color alone.
Visual connection does not add radio, tab, listbox, selection, or toolbar
semantics. Every connected Button remains an independent tab stop.

At 200% zoom and with increased text spacing, a separated group wraps or stacks
and a connected group stacks as a whole without clipping labels, focus
indicators, or interactive targets. High-contrast and forced-color modes preserve
the boundary and focus requirements of each Button. Button Group adds no
animation, so reduced-motion behavior is inherited from any contained action or
resulting component.

### Web adapter

Use an ordinary container around native `button` elements and implement layout
with flex or an equivalent mechanism using logical gaps and alignment. Add
`role="group"` and an accessible name only when the relationship needs to be
announced. A visible heading may name the group through `aria-labelledby`; a
concise programmatic label may use `aria-label` when no visible label is
appropriate.

Do not use `role="toolbar"` unless the container implements the complete toolbar
interaction model. Do not use radio, tab, or listbox roles for independent
actions. A fieldset and legend are appropriate only when the surrounding form
semantics make the controls a genuinely named set, not merely to create visual
spacing.

Use source order as the reading and focus order. Separated actions may wrap or
stack, but they must not visually reverse. Connected horizontal presentation uses
logical inline-start and inline-end corner properties; connected vertical
presentation uses block-start and block-end corners. Do not infer logical corners
from left and right placement.

Adjacent connected boundaries may overlap by one rendered border width so they
form one divider. Focused and hovered Buttons render above neighboring Buttons.
The container permits focus-ring overflow and does not merge adjacent interactive
targets.

## Example

A publishing form presents `Cancel` as an outline Button, `Save draft` as a
secondary Button, and `Publish` as the single primary Button. The group uses the
medium size and `spacing.space-2`. When the labels no longer fit horizontally,
the same source order stacks vertically and the actions may fill the available
width.

A zoom control presents `Decrease zoom`, `Reset zoom`, and `Increase zoom` as
connected outline Buttons of one size. Each Button invokes a separate immediate
action. The group changes as a whole to connected vertical presentation when its
labels no longer fit horizontally.

Do not use Button Group for `Monthly` and `Annual` when they set one billing
interval. That interaction is a Radio group because it selects one value rather
than invoking either of two independent actions. Likewise, if a connected visual
control selects one zoom mode rather than invoking independent actions, use an
appropriate selection component.
