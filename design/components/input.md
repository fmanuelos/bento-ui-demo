# Input

## Status

Contract complete for a single-line text field. See the separate contracts for
[textarea](textarea.md), [select](select.md), [combobox](combobox.md),
[checkbox](checkbox.md), [radio group](radio.md), and [switch](switch.md).

## Intent

Inputs collect short, structured text. Every input has a visible label; placeholder copy is an example, not a replacement for the label.
The label, description, requirement, hint, validation, and message relationships
follow the shared [`form-field contract`](form-field.md).

When an Input changes the query for a page or dataset, the surrounding workflow
follows the
[`Search, filtering, and results pattern`](../patterns/search-filtering-and-results.md).
Filtering suggestions within a selectable value instead requires a Combobox.

## Anatomy

1. Label
2. Optional hint
3. Text-entry control
4. Optional status or character count
5. Optional helper or validation message

## Variants and sizes

- **Medium:** `control-height-medium` for forms and general data entry; this is
  the default.
- **Small:** `control-height-small` for dense desktop filters and toolbars.
- **Search:** Uses `surface-secondary` to distinguish utility search.

Inputs do not inherit the button-only tiny, large, or extra-large sizes.

## States

| State              | Support                          | Contract                                                                                         |
| ------------------ | -------------------------------- | ------------------------------------------------------------------------------------------------ |
| Empty or populated | Required                         | Label and instructions remain available in either state.                                         |
| Hover              | Required when hover is available | Does not replace focus or validation cues.                                                       |
| Focus              | Required                         | Uses `border-focus` and the global `focus-ring`.                                                 |
| Read-only          | Required                         | Remains focusable when review or copying is useful and is distinct from disabled.                |
| Invalid            | Required                         | Uses danger boundary and text roles plus a written error.                                        |
| Warning or success | Optional                         | Uses the corresponding semantic role and a non-color cue.                                        |
| Loading or busy    | Optional                         | Communicates that a related lookup or validation is pending without discarding input.            |
| Disabled           | Optional                         | Keeps its label, exposes unavailability, and uses disabled background, boundary, and text roles. |

The default boundary uses `border-primary`. Shared state precedence is defined in
[`DESIGN.md`](../../DESIGN.md#shared-state-model).

## Behavior and validation

Required or optional status is communicated before entry. Formatting instructions
appear before they are needed. Validation does not erase user input, and an error
identifies the field, describes the problem, and provides a correction when known.
After unsuccessful submission, focus moves to an error summary or the first
invalid field according to the form pattern. Read-only and disabled are not
interchangeable.

## Responsive behavior

Inputs fill their container up to the form's chosen content width. Small inputs
return to medium touch-friendly sizing when the input capability or available
space requires it. Labels, values, instructions, and errors wrap without clipping.

## Accessibility

Labels, descriptions, requirements, values, validation state, and errors have
programmatically determinable relationships. The visible label is included in the
accessible name. Input purpose is exposed when the platform supports it. Status
changes are announced without interrupting entry unnecessarily.

### Web adapter

Use the appropriate native input type and `autocomplete` value. Associate the
visible label explicitly. Reference helper and error content with
`aria-describedby`; expose invalid state with `aria-invalid`, and connect a
specific error with `aria-errormessage` when supported by the target environment.

## Example

Use helper text for persistent guidance and error text for the current invalid
state. Do not show both in the same message slot.
