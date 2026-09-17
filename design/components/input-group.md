# Input Group

## Status

Contract complete for connected text-field compositions with static addons,
icons, compatible secondary controls, or an adjacent action.

## Intent

An Input Group visually joins a primary [`Input`](input.md) with closely related
content or controls. Use it when the relationship helps people enter or act on
one value, such as a protocol prefix, a search icon, a currency selector, or a
submission action.

Input Group is a composition, not a new form-control role. Every interactive
part retains its own name, value, state, focus, and behavior. Visual connection
must not imply that independent fields share one value or that a Button becomes
part of the Input's editable value.

Use an ordinary [`Form field`](form-field.md) and Input when an addon does not
improve comprehension. Use a [`Combobox`](combobox.md) when text entry and popup
selection produce one value. Use a [`Button Group`](button-group.md) for related
independent actions without a text-entry control.

When an Input Group submits a query for a page or dataset, the complete query and
result workflow follows the
[`Search, filtering, and results pattern`](../patterns/search-filtering-and-results.md).
Input Group continues to own only the connected field-and-action composition.

## Anatomy

1. Persistent visible Form field label
2. Optional persistent description, requirement, or format guidance
3. Connected visual boundary
4. Optional leading static text or decorative icon
5. One primary Input
6. Optional trailing static text, compatible secondary control, or
   [`Button`](button.md)
7. Optional status, hint, or validation message

The primary Input is always present. Include only parts that are necessary to
understand or complete the field's task. An icon, prefix, suffix, placeholder,
or adjacent Button does not replace the visible label.

## Variants and sizes

- **Text addon and Input:** Places a short prefix or suffix next to the editable
  value, such as `https://`, `$`, `%`, or a unit.
- **Icon and Input:** Places one familiar decorative icon at the logical start or
  end. The visible label still communicates the field's purpose.
- **Addon, Input, and secondary control:** Adds one compatible control, commonly
  a Select for a unit or currency that qualifies the entered value.
- **Input and action:** Adds one Button whose action directly uses the current
  value, such as `Send invite`, `Apply`, or `Search`.

Medium is the default and uses `control-height-medium`. Small is permitted in
dense desktop filters and toolbars and uses `control-height-small`. Every
interactive part in one connected presentation uses the same canonical height.
Input Group does not introduce tiny, large, or extra-large field sizes.

Static addons stay concise. Do not place sentences, validation messages,
multiple icons, menus, or unrelated status content inside the connected
boundary. An Input Group contains at most one adjacent action. When several
actions are needed, place a Button Group outside the field.
The containing decision region follows the
[`Action hierarchy and emphasis pattern`](../patterns/action-hierarchy-and-emphasis.md);
the adjacent Button does not become primary merely because it is visually joined
to the field.

## States

| State              | Support                          | Contract                                                                                                                        |
| ------------------ | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Empty or populated | Required                         | Addons remain stable while the editable value changes.                                                                          |
| Hover              | Required when hover is available | Applies to the interactive part under the pointer and does not replace focus or validation cues.                                |
| Focus              | Required                         | The focused interactive child owns the only focus indicator; the connected container does not add a second focus ring.          |
| Read-only          | Required for the Input           | The value remains reviewable and copyable; adjacent controls remain available only when their actions still make sense.         |
| Invalid            | Required                         | The affected control exposes invalid state, the group uses the danger boundary, and a written message explains the correction.  |
| Warning or success | Optional                         | Uses the corresponding boundary and written or symbolic non-color cue.                                                          |
| Loading or busy    | Optional                         | Applies to the control or action performing work without discarding the entered value.                                          |
| Disabled           | Optional per interactive part    | Disabled controls expose their own unavailability; disable the whole group only when the workflow makes every part unavailable. |

Static addons do not receive hover, focus, pressed, selected, loading, or
disabled semantics. Their visual treatment may follow the surrounding group's
state so the composition remains coherent.

## Semantic token mapping

The primary control inherits typography, foreground, background, placeholder,
height, padding, and state mappings from Input. A secondary Select inherits
[`Select`](select.md) mappings. An adjacent action inherits its complete Button
variant, label, icon, state, and target-size mappings.

The connected boundary uses `surface-primary`, `border-primary`, and
`rounded.shape-md`. Internal dividers use `border-primary`. Static addons use
`surface-secondary`, `text-secondary`, and `spacing.scale-3` inline padding at
medium size or `spacing.scale-2` at small size. Text entry retains enough inline
padding to keep its value separate from an addon or divider.

Interior corners use `rounded.shape-none`; only the parts at the logical outer
edges receive `rounded.shape-md`. Adjacent boundaries collapse into one visible
divider. The connected container must not clip focus indicators.

Each interactive child uses `border-focus` and the global `focus-ring`. The
connected container does not add a `focus-within` ring. Invalid, warning,
success, disabled, and dark-theme presentation reuse the applicable semantic
control tokens and shared state precedence. A decorative icon uses the control's
neutral foreground and the canonical 20px medium or 16px small icon size.

Input Group introduces no frontmatter component entry or color token. Its visual
relationship, focus ownership, and responsive transformation cannot be
represented honestly by the supported component properties.

## Behavior, events, transitions, and state precedence

Input Group has no group-level value, selection, activation event, or keyboard
model. Typing changes only the Input. A Select changes only its selected value. A
Button invokes only its named action. Static addons never receive pointer or
keyboard events.

When a visible prefix or suffix contributes to the submitted value, expose the
complete value or explain the transformation programmatically. For example, a
field that visually prefixes `https://` must either submit and expose the full
URL or tell people that the protocol is added automatically. Do not make a
meaningful unit or qualifier available only as decorative text.

An adjacent action uses the current value at activation time. Prevent duplicate
activation while that action is loading when repetition would be harmful. Do not
clear or replace the Input value after failure. Success, failure, and validation
feedback appear in the Form field message area unless the resulting workflow
defines another persistent destination.

Enter follows the containing form's native submission behavior. Do not make
Enter invoke the adjacent Button unless that Button is the form's documented
submit action. Tab moves through interactive parts in source order; static
addons are skipped.

The shared state precedence applies to every interactive child. At the connected
boundary, error has presentation priority over warning, warning over success,
and focus remains visible over every validation treatment. Hover and active
presentation never conceal focus or a higher-priority validation state.

State transitions preserve layout and entered values. Any boundary, message, or
busy transition is brief and nonessential; reduced-motion preferences remove it
without delaying the underlying state change.

## Responsive, overflow, and localization behavior

Keep the connected presentation on one line while every value, label, control,
target, divider, and focus indicator fits. Preserve a useful minimum width for
the primary Input instead of allowing addons or actions to crowd out text entry.

Short static prefixes and suffixes remain connected to the Input. When an
Input-and-action presentation no longer fits, separate the Button below the
Input as a full Button while preserving source and focus order. When a secondary
Select no longer fits, present it as a separately bounded, programmatically
labelled control adjacent to or below the Input. Restored standalone controls
receive complete `rounded.shape-md` corners; do not leave disconnected square
corners or partial dividers.

Do not wrap individual connected parts into an ambiguous multi-row boundary.
Transform the whole composition at a container-based threshold. Small controls
promote to medium touch-friendly sizing when input capability requires it.

Labels, values, addons, option text, Button labels, descriptions, and messages
support translation, increased text spacing, and 200% zoom without clipping or
horizontal page scrolling. Use logical start and end placement so the outer
corners and reading order adapt to right-to-left presentation. Protocols,
currency symbols, numbers, and units follow their locale-specific conventions
rather than being reversed mechanically.

## Accessibility

The Form field label names the primary Input. Descriptions, requirements,
validation state, and messages follow the Form field contract. A secondary
interactive control has its own programmatic name, such as `Currency`; an
adjacent Button has an action-oriented name, such as `Send invite`.

Decorative icons are excluded from the accessibility tree. If an icon conveys
information not already present in the label or description, provide an
equivalent text alternative or persistent text. Never use an icon as the only
label, validation cue, or indication that an action is available.

The visual group does not merge accessible roles or tab stops. Each interactive
part exposes its own value, availability, validity, and state. Add group
semantics only when announcing the relationship materially improves
understanding; do not add redundant group announcements to a familiar labelled
field.

Keyboard focus is visible on the active control, including where adjacent
boundaries overlap. Pointer and touch targets do not overlap, and every
interactive child meets `touch-target-min` when touch is expected. High-contrast
and forced-color modes preserve the outer boundary, internal dividers, focused
control, validation state, and Button affordance. Essential content and actions
remain available without hover.

### Web adapter

Use an ordinary Form field container around the connected presentation. Use the
appropriate native `input`, `select`, and `button` elements and preserve their
native keyboard behavior. Associate the visible label with the primary Input;
give every secondary control its own visible or programmatic label. Use
`aria-describedby`, `aria-invalid`, and `aria-errormessage` according to the Form
field and Input contracts.

A static addon may be hidden from the accessibility tree when it is decorative
or repeated in the accessible label or description. When it changes the value's
meaning, include that meaning in the Input's accessible description or expose
the complete value through the platform's value model. Do not place an
interactive control inside a label.

Use flex or an equivalent one-dimensional layout with logical border and corner
properties. DOM order matches reading and focus order. Draw the focus indicator
on the focused interactive element and raise it above adjacent segments when
necessary. The connected container must not add a second focus ring. Do not use
composite widget roles, roving tab index, or `role="toolbar"` for the connected
presentation.

Set an adjacent action's native type deliberately. Use `type="submit"` only when
it submits the containing form; otherwise use `type="button"`. Do not duplicate
the action by adding a second key handler to the Input.

## Examples

- **Website:** A field labelled `Website` displays the static prefix `https://`
  before an Input containing `example.com`. Its description explains that the
  protocol is included in the saved URL.
- **Project search:** A field labelled `Search projects` displays a decorative
  search icon before an Input. The icon is excluded from the accessibility tree
  because the label already communicates purpose.
- **Invoice amount:** A field labelled `Invoice amount` displays `$`, an amount
  Input, and a Select named `Currency`. The Select defaults to `USD`, and the
  complete amount and currency remain separately determinable.
- **Invite teammate:** A field labelled `Invite teammate` joins an email Input
  and a `Send invite` Button. Activation validates and submits the current email;
  a failure preserves the address and places a written error in the field's
  message area.

Do not use Input Group to place first name and last name, start and end dates, or
unrelated filters inside one boundary. Those values are separate Form fields
even when a local layout places them on the same row.
