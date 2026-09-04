# Switch

## Status

Contract complete.

## Intent

A switch changes a persistent setting between on and off and normally takes
effect immediately. Use a checkbox when the value is part of a form committed by
a separate submit action.

## Anatomy and variants

1. Visible setting label
2. On/off indicator
3. Optional description or current consequence

Use action-primary for on, a neutral treatment for off, and global focus and
disabled roles. On and off include non-color shape or position cues.

## States and behavior

Support off, on, hover, focus, busy, error, and disabled. Activation changes the
state once. For asynchronous settings, expose busy state, prevent duplicate
changes, and either confirm the new state or restore the previous state with an
error. The visible label does not change when the value changes.

## Responsive behavior

The label and switch remain one understandable row or stacked group. The target
meets `touch-target-min`; long labels wrap without separating state from meaning.

## Accessibility

Expose the setting name, on/off value, description, busy or error status, and
availability. State is perceivable without relying on color or control position
alone.

### Web adapter

Use a native checkbox where its semantics fit or expose `role="switch"` with the
checked state. The label activates the switch. Enter support may be added, but
Space follows the expected toggle behavior.

## Example

Use a switch for “Email notifications” when the preference saves immediately.
