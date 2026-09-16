# Slider

## Status

Contract complete for a single-thumb continuous, stepped, or centered slider.
Multi-thumb interval selection is outside this contract.

## Intent

A slider selects one numeric value from a bounded range when direct manipulation
and relative position help people understand the choice. Use a text field when
people must enter an exact value efficiently, a select or radio group when every
choice needs a distinct label, and a switch for an immediate binary setting.

The slider's label, description, requirement, validation, and message
relationships follow the shared [`form-field contract`](form-field.md). A visible
current value is required when the thumb position alone does not communicate the
chosen value precisely enough for the task.

## Anatomy

1. Visible label
2. Optional description or instruction
3. Track representing the bounded range
4. Optional selected segment between the minimum or semantic origin and the thumb
5. Thumb representing the current value
6. Optional visible current-value output
7. Optional endpoint labels or discrete marks
8. Optional validation message

Labels and marks supplement the slider; they do not create additional focusable
controls. The thumb remains the only interactive element in this contract.

## Variants and sizes

- **Continuous:** Selects any value permitted by the smallest supported step.
  Use when relative magnitude matters more than named choices.
- **Stepped:** Snaps to a finite sequence of evenly spaced values. Show marks only
  when they clarify meaningful stops and remain readable.
- **Centered:** Uses a meaningful origin inside the range, such as neutral or
  zero. The selected segment extends from that origin to the current value, and
  the origin has a non-color cue.

The default slider provides at least `touch-target-min` around its thumb and
track, even when the visible track and thumb are smaller. A compact visual
presentation is permitted in dense desktop toolbars, but its interactive target
does not shrink below the input method's required target size. The slider does
not use the button control-height scale as its visible track height.

## States

| State              | Support                          | Contract                                                                                                     |
| ------------------ | -------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Default            | Required                         | Shows the current value and the available range.                                                             |
| Hover              | Required when hover is available | Emphasizes the thumb or track without replacing focus or value cues.                                         |
| Focus              | Required                         | Uses the global `focus-ring` and remains visible while dragging or when validation is present.               |
| Active or dragging | Required                         | Keeps the thumb attached to the pointer and updates the value predictably within the bounds.                 |
| Invalid            | Optional                         | Uses danger boundary and text roles plus a written error; invalid does not alter the range silently.         |
| Disabled           | Optional                         | Preserves the visible value and range, exposes unavailability, and accepts no pointer or keyboard changes.   |
| Read-only          | Unsupported                      | Present the value as text, a meter, or another non-editable display instead of a focusable read-only slider. |
| Loading or busy    | Not applicable                   | Show saving or validation status in the surrounding field or workflow without making the slider busy.        |
| Indeterminate      | Not applicable                   | A slider always represents a current value; use Progress for an indeterminate operation.                     |

Shared state precedence is defined in
[`DESIGN.md`](../../DESIGN.md#shared-state-model).

## Semantic token mapping

Use `surface-sunken` or `border-secondary` for the unselected track and
`action-primary-background-default` for the selected segment. Use
`surface-primary` with `action-primary-border` for the thumb. Hover and active
feedback use the corresponding primary action roles without changing the
reported value.

Focus uses `border-focus` and `focus-ring`. Labels and values use `text-primary`;
instructions, endpoints, and secondary marks use `text-secondary`. Disabled
presentation uses `background-disabled`, `border-disabled`, and `text-disabled`.
Invalid presentation uses `border-danger` and `text-danger` with a written
message. Dark mode uses the corresponding `dark-*` semantic aliases rather than
literal color substitutions.

No frontmatter component entry is required yet. The current component schema
cannot represent track, selected segment, thumb, and origin as separate parts
without a misleading visual mapping.

## Behavior and value model

The slider has a finite minimum, maximum, current value, and positive step. The
current value is clamped to the inclusive bounds and normalized to a valid step.
Changing the value never changes the bounds, unit, or step silently.

Dragging the thumb updates the value continuously. Activating the track moves the
thumb according to the platform convention and preserves the same step rules.
Keyboard arrows change the value by one step; Home and End move to the minimum
and maximum. Page Up and Page Down may move by a documented larger increment when
the platform convention supports them. Keyboard operation does not require a
pointer gesture.

Value changes update any visible output in the same interaction. Expensive work,
network requests, and persistence may wait for a committed value, but the
interface keeps the preview and committed value distinguishable when they can
differ. Do not announce every intermediate drag value through a separate live
region.

For a centered slider, the origin is stable and lies within the bounds. Crossing
the origin changes the selected segment's direction without creating a second
value. A multi-thumb minimum-and-maximum selector requires a separate interval
selection contract with defined thumb collision, focus, and accessible naming.

## Responsive, overflow, and localization behavior

The label, current value, slider, and endpoint labels reflow without clipping or
horizontal page scrolling at 320 CSS pixels and 200% zoom. Place the current
value beside the label when space permits and below it when it does not. Remove
optional intermediate marks before reducing readable text or the interactive
target.

Format numbers, decimals, percentages, currency, and units for the current
locale. Reserve enough space for the longest formatted value so dragging does not
cause disruptive layout shifts. Logical ranges follow the writing direction when
the platform convention does; physical directions such as audio balance retain
their real-world meaning and use explicit endpoint labels.

## Accessibility

Expose the slider's name, minimum, maximum, current value, availability, and any
description or validation message. When raw numbers do not communicate meaning,
expose equivalent value text such as “Medium” or “Neutral” while preserving the
numeric value model.

The thumb has a visible focus indicator and a non-overlapping target of at least
`touch-target-min` for touch presentations. Track position or color is never the
only value cue when precision matters. Endpoint labels and centered origins
remain distinguishable in high-contrast modes. Reduced motion removes decorative
transitions without delaying thumb movement or value feedback.

Screen readers receive the changing value through the slider semantic itself;
the component does not add a duplicate live-region announcement for every step.
Validation and committed asynchronous outcomes follow the Form Field and
asynchronous-feedback patterns.

### Web adapter

Prefer a native `input` with `type="range"` and an explicitly associated visible
label. Set `min`, `max`, `step`, and `value`; use `aria-valuetext` only when a
formatted or named value communicates more than the numeric value. Associate
descriptions and errors through the Form Field contract.

Use the `input` event for immediate local feedback and the `change` event for a
committed value when that distinction is useful. A visible current value may use
an `output` associated with the range input. CSS may style the track and thumb,
but it must preserve native focus, forced-color visibility, keyboard behavior,
and the accessible value.

## Example

A settings panel uses a continuous Volume slider from 0 to 100 with “72%” shown,
a stepped Text size slider whose five numeric stops are exposed as “Extra small”
through “Extra large,” and a centered Warmth slider from −5 to 5 whose zero value
is exposed as “Neutral.” Each slider has its own visible label and one focusable
thumb.
