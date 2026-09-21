# Select

## Status

Contract complete.

## Intent

A select chooses one value from a predetermined set without free-form entry. Use
a radio group for a small set that benefits from simultaneous visibility and a
combobox when filtering or text entry is required.
Its label, description, requirement, hint, validation, and message relationships
follow the shared [`form-field contract`](form-field.md).

## Anatomy and variants

1. Visible label
2. Optional description
3. Current value and selection control
4. Optional popup listbox for custom presentation
5. Optional helper or validation message

Use `surface-primary`, `text-primary`, the input typography, `rounded.shape-md`, and the
default, focus, disabled, and validation boundary roles. Placeholder-like prompt
text is not a valid selected value unless the field is optional.

Selects support small (`control-height-small`) and medium
(`control-height-medium`) sizes and default to medium. They intentionally do not
inherit the button-only tiny, large, or extra-large sizes.

The native variant uses the platform option presentation. The custom-popup
variant uses the shared dropdown surface and listbox option states also used by
Combobox. The two variants share field sizing, validation, and trigger styling;
only the custom variant owns popup presentation.

## States and behavior

Support unselected, selected, focus, invalid, read-only when the platform can
represent it clearly, and disabled. The custom variant additionally supports
collapsed, expanded, active-option, loading, and empty states. Opening exposes
all available choices; selection produces one value and closing preserves it. A
disabled option remains distinguishable and is skipped by pointer, directional,
and type-ahead selection. Dynamic option changes do not clear a valid selection
without explanation.

## Responsive behavior

The control and its option presentation remain within available space. A custom
popup matches the trigger width, stays anchored within the viewport, and scrolls
when its available height is constrained. Long values expose their full text and
do not rely on a tooltip as the only access.

## Accessibility

Expose name, selected value, available choices, requirement, description,
validation, and availability. Complete operation is possible without pointer
input.

For the custom variant, keep focus on the trigger, expose the popup as a listbox,
and identify the active option with `aria-activedescendant`. Arrow keys move past
disabled options; Home and End move to the boundaries; Enter or Space commits;
Escape closes without changing the value; printable characters provide
type-ahead.

### Web adapter

Prefer `Select`, backed by a native `select`, for ordinary single selection,
mobile platform affordances, and native form constraint validation. Use
`CustomSelect` when product requirements need a consistently styled popup. Its
button trigger uses the ARIA select-only combobox pattern and submits its value
through a named hidden input; required validation remains application-managed.
Use `Combobox` instead when the value must be editable or filterable.

## Example

Use a native select for ordinary project status selection. Use the custom-popup
variant only when its richer presentation or consistent option styling is a
product requirement.
