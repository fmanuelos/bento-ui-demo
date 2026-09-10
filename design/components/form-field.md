# Form field

## Status

Contract complete for the shared form-field foundation.

## Intent

A form field gives one control or one related group the label, instructions,
requirements, feedback, and status needed to understand and correct its value.
It is a composition primitive rather than an input type. Text fields, textareas,
selects, comboboxes, checkbox groups, radio groups, and switches retain their own
value and interaction contracts.

## Anatomy and variants

1. Persistent visible label or group label
2. Optional required or optional indicator
3. Optional persistent description, format, units, or constraints
4. Control or named group of controls
5. Optional status, character count, or brief hint
6. Optional validation or asynchronous message

The default layout stacks the label, description, control, and messages. An
inline layout is allowed only when every label, instruction, value, and message
has sufficient room to wrap without losing its relationship.

`Description` means persistent guidance that remains useful in every state.
`Hint` means brief contextual metadata, such as units or a character count.
`Validation message` means current success, warning, or error feedback. Do not
replace essential persistent guidance with a validation message.

## Sizes and semantic token mapping

The field container does not create a third control-size system. Its control uses
the sizes defined by that component. Small and medium controls align their labels
and messages with `label-md`, `body-xs`, and the spacing scale. The field uses
`text-primary` for its label, `text-secondary` for descriptions and neutral
hints, and the matching semantic text and border roles for success, warning, and
invalid states.

Use `spacing.space-2` between a label and its control by default. Closely related
label metadata may use `spacing.space-1`; descriptions or messages remain near
the control they explain. Do not use reduced text size or tighter spacing to hide
long labels or validation content.

## States

| State                | Support  | Contract                                                                                                      |
| -------------------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| Default              | Required | Presents the label, persistent guidance, and current value without implying validity.                         |
| Edited               | Required | Preserves entered content and does not announce ordinary editing as a status change.                          |
| Validating or busy   | Optional | Keeps the value available, prevents conflicting submission when necessary, and announces meaningful delay.    |
| Success              | Optional | Confirms a meaningful validated outcome with text or another non-color cue; focus alone never causes success. |
| Warning              | Optional | Explains a potential issue without claiming that submission is invalid.                                       |
| Invalid              | Required | Identifies the problem in text and provides a correction when known.                                          |
| Read-only            | Required | Preserves review and copying when useful and remains distinguishable from disabled.                           |
| Disabled             | Optional | Retains its label and communicates unavailability without presenting an unavailable recovery action.          |
| Submitting or failed | Form     | Follows the forms-and-validation and asynchronous-feedback patterns without clearing valid values.            |

When more than one message could apply, an error has presentation priority over
a warning, and a warning has priority over success. Persistent descriptions,
requirements, units, and constraints do not disappear because a higher-priority
validation message is present. Busy status supplements rather than obscures an
error that still requires action.

## Behavior and validation

Communicate known requirements before entry. Validation occurs at a predictable
time and does not erase or silently transform a value. Field-level feedback
describes the current control; submission-level feedback provides an error
summary or equivalent route when several fields need correction.

The visible label remains stable while the value, validity, or busy state
changes. A required marker is supplemental; the accessible requirement is
exposed programmatically. If every field in a form follows the same requirement
convention, explain that convention once before the form rather than adding
repetitive copy to every label.

Counts state whether they show characters used or remaining and become prominent
before a limit prevents further entry. Asynchronous validation does not announce
every keystroke or intermediate result.

## Responsive and localization behavior

Labels, descriptions, hints, controls, and messages wrap without clipping at
200% zoom and with increased text spacing. The stacked layout is the default when
translations, validation text, or narrow space make an inline relationship hard
to scan. Visual rearrangement preserves label, control, description, and message
order.

Support right-to-left direction without moving requirement meaning or units away
from their values. Locale-sensitive numbers, dates, and measurement formats use
the current locale. Small controls promote to a touch-appropriate size when the
input capability requires it.

## Accessibility

Expose the label or group label, description, requirement, current value,
availability, validity, and current message through programmatic relationships.
A visible label is included in the accessible name. Do not use placeholder text,
position, color, or an icon as the only label or validation cue.

Announce a newly relevant error, warning, completion, or delayed validation once.
Do not recreate unchanged live content after unrelated updates. Moving focus is
reserved for submission recovery or another task-level need; ordinary field
validation leaves focus and text selection intact.

High-contrast modes preserve control boundaries, required state, focus, and
validation distinctions. Reduced motion removes nonessential message or status
transitions without delaying the underlying state change.

### Web adapter

Use a native label relationship for one control and a fieldset with legend or an
equivalent named group for related controls. Reference persistent descriptions
and current messages with `aria-describedby`. Expose invalid state with
`aria-invalid` and associate a specific error with `aria-errormessage` when the
supported environment communicates it reliably. Native `required`, `readonly`,
and `disabled` behavior must match the conceptual state; do not substitute one
for another.

A live region may announce asynchronous validation or submission feedback, but
it does not replace the control's persistent description or error relationship.

## Example

A project-name field shows its visible label, a persistent naming constraint, the
text input, and a current error explaining which character must be removed. The
constraint remains available while the error is shown.
