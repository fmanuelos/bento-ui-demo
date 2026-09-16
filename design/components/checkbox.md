# Checkbox

## Status

Contract complete.

## Intent

A checkbox represents an independent binary choice or one choice in a set.
Indeterminate communicates a mixed summary state; it is not a third submitted
value unless the product explicitly defines one.
Labels, descriptions, requirements, group relationships, and validation follow
the shared [`form-field contract`](form-field.md).

When a Checkbox selects a record in a dataset or summarizes a visible selected
set, scope, persistence, mixed state, and downstream operations follow the
[`Selection and bulk actions pattern`](../patterns/selection-and-bulk-actions.md).
The Checkbox continues to own only its individual checked or mixed state.

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
to a defined checked or unchecked value. Its visual indicator, checked value, and
exposed accessibility state update together. The label activates the same
control. Groups do not make each independent checkbox behave like a radio
option.

## Responsive behavior

The indicator and label form one comfortable target. Labels and descriptions wrap
without separating their activation or reading relationship.

## Accessibility

Expose name, checked or mixed state, requirement, description, validation, and
availability. The visible checkbox label provides its accessible name. Optional
guidance and validation are associated as descriptions rather than appended to
or repeated with that name. State does not rely on color or a subtle fill
difference alone.

### Web adapter

Prefer a native checkbox. Use its indeterminate DOM state for a mixed visual and
expose the mixed state to accessibility APIs. Keep the DOM state and custom
visual synchronized when activation clears an indeterminate state. Associate an
individual label explicitly and reference its description and current error from
the checkbox. Use a fieldset with a legend or an equivalent named group for
related checkboxes, and associate group-level descriptions and errors.

## Example

Use independent checkboxes to select which notification channels a project uses.
