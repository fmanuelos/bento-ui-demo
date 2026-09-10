# Select

## Status

Contract complete.

## Intent

A select chooses one value from a predetermined set without free-form entry. Use
a radio group for a small set that benefits from simultaneous visibility and a
combobox when filtering or text entry is required.

## Anatomy and variants

1. Visible label
2. Optional description
3. Current value and selection control
4. Optional helper or validation message

Use `surface-primary`, `text-primary`, the input typography, `rounded.md`, and the
default, focus, disabled, and validation boundary roles. Placeholder-like prompt
text is not a valid selected value unless the field is optional.

Selects support small (`control-height-small`) and medium
(`control-height-medium`) sizes and default to medium. They intentionally do not
inherit the button-only tiny, large, or extra-large sizes. The deprecated
`compact` and `standard` names remain aliases for small and medium for one
compatibility cycle.

## States and behavior

Support unselected, selected, focus, invalid, read-only when the platform can
represent it clearly, and disabled. Opening exposes all available choices;
selection produces one value and closing preserves it. A disabled option remains
distinguishable and is skipped by selection. Dynamic option changes do not clear
a valid selection without explanation.

## Responsive behavior

The control and its option presentation remain within available space. Long
values expose their full text and do not rely on a tooltip as the only access.

## Accessibility

Expose name, selected value, available choices, requirement, description,
validation, and availability. Complete operation is possible without pointer
input.

### Web adapter

Prefer a native `select` for ordinary single selection. Associate its label and
descriptions explicitly. If custom presentation is necessary, implement the
listbox or combobox contract rather than recreating only the visual appearance.

## Example

Use a select for choosing one project status from a stable, moderately sized set.
