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

### Shared checkbox indicator

This component is the visual source of truth for every square checked, unchecked,
or mixed selection indicator. Checkbox groups, selectable tables and data grids,
and multi-select listboxes reuse this presentation instead of defining local
checkbox geometry or colors.

- The indicator is `spacing.scale-5` square with a 2px border and
  `rounded.shape-sm` corners.
- Unchecked uses `surface-primary` with `border-strong`.
- Checked and indeterminate use `action-primary-background-default` for the
  background and border with `action-primary-foreground` for the mark.
- Checked uses the shared small Check icon. Indeterminate uses a centered
  horizontal bar; the two marks never appear together.
- Disabled uses `background-disabled` and `border-disabled` while retaining the
  applicable checked or mixed mark.
- When the checkbox itself owns focus, use the global 3px focus ring with its
  2px offset. When a composite option or grid cell owns focus, that parent draws
  focus and the indicator does not add a second ring.

Hover, validation, and selected-row or selected-option backgrounds may add
context without changing this geometry. The checked or mixed mark remains the
non-color state cue.

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

Components that use native checkbox semantics keep the native input as the state
and accessibility owner even when it is visually hidden behind the shared
indicator. A listbox option may reuse the indicator as an `aria-hidden` visual,
but it must not nest a checkbox input inside an option; `aria-selected` remains
the option's state.

## Example

Use independent checkboxes to select which notification channels a project uses.
