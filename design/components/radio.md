# Radio group

## Status

Contract complete.

## Intent

A radio group selects exactly one value from a small set whose options benefit
from simultaneous visibility. Use a select for a longer compact list.
Its group label, description, requirement, validation, and message relationships
follow the shared [`form-field contract`](form-field.md). Option navigation also
follows the shared collection model in DESIGN.md.

## Anatomy and variants

1. Group label
2. Optional group description
3. Two or more radio options with visible labels
4. Optional option descriptions
5. Optional group-level validation message

Horizontal and vertical layouts have the same selection behavior.

Use action-primary for selected emphasis, neutral boundaries for unselected state,
and the global focus, disabled, and validation roles.

## States and behavior

Support unselected, selected, hover, focus, invalid group, and disabled option or
group. One option is selected when the question requires a value; an optional
question may begin unselected. Directional navigation moves and selects within the
group according to platform convention. Disabled options are skipped but remain
understandable when visible.

## Responsive behavior

Use vertical layout when labels wrap or horizontal spacing becomes constrained.
Visual rearrangement preserves option order and group context.

## Accessibility

Expose the group name, each option name and description, selected value,
requirement, validation, and availability. The group label names the group, and
each visible option label provides only that option's accessible name. Associate
optional option guidance as a description rather than appending it to the name.
Focus remains visible on the active option.

### Web adapter

Prefer native radio inputs with the same group name. Use a fieldset and legend or
equivalent programmatic group name. Associate option descriptions with their
radio inputs. Associate group-level descriptions and errors with the group, and
make the current group error available when a radio receives focus.

## Example

Use a radio group to choose one billing interval from Monthly and Annual.
