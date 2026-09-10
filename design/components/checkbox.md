# Checkbox

## Status

Contract complete.

## Intent

A checkbox represents an independent binary choice or one choice in a set.
Indeterminate communicates a mixed summary state; it is not a third submitted
value unless the product explicitly defines one.
Labels, descriptions, requirements, group relationships, and validation follow
the shared [`form-field contract`](form-field.md).

## Anatomy and variants

1. Selection indicator
2. Visible label
3. Optional description
4. Optional group label and group-level error

Use action-primary for selected emphasis, neutral boundaries for unselected state,
and the global focus and validation roles.

## States and behavior

Support unchecked, checked, indeterminate, hover, focus, invalid, and disabled.
Activation toggles the value; activating an indeterminate summary normally moves
to a defined checked or unchecked value. The label activates the same control.
Groups do not make each independent checkbox behave like a radio option.

## Responsive behavior

The indicator and label form one comfortable target. Labels and descriptions wrap
without separating their activation or reading relationship.

## Accessibility

Expose name, checked or mixed state, requirement, description, validation, and
availability. State does not rely on color or a subtle fill difference alone.

### Web adapter

Prefer a native checkbox. Use its indeterminate DOM state for a mixed visual and
expose the mixed state to accessibility APIs. Associate labels, descriptions, and
group relationships explicitly.

## Example

Use independent checkboxes to select which notification channels a project uses.
