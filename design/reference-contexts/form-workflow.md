# Form workflow

**Mode:** Dashboard or application  
**Primary audience:** A user creating or editing consequential information across
several related fields.

## Scenario and outcome

The fictional “Create project” workflow collects a project name, owner,
description, visibility, target date, notification preference, and initial health
status. A user should understand requirements before entry, review and correct
problems, submit once, and recover from interruption or failure without losing
valid work.

Representative content includes the project name “Coastal service transition —
Northeast regional operations,” an owner with a multi-part name, a multi-paragraph
description, a locale-formatted target date, and a visibility choice whose
consequences require explanatory text.

## Template structure

1. Page or dialog heading that names the task and resulting object.
2. Instructions and requirement summary before affected controls.
3. Logical field groups with persistent labels, descriptions, and units.
4. Local validation messages and an optional submission-error summary with routes
   to affected controls.
5. Primary submission and safe cancellation or return action.
6. Submission progress, completion feedback, and recoverable failure adjacent to
   the task context.
7. Unsaved-change handling proportional to the amount and consequence of work.

Use a page or side panel for long or multi-step work. A modal is appropriate only
when the task remains bounded and usable under reflow, enlargement, and the
on-screen keyboard.

## Participating system contracts

- Functional patterns: [forms and validation](../patterns/forms-and-validation.md),
  [asynchronous feedback](../patterns/async-feedback.md), and
  [responsive density](../patterns/responsive-density.md).
- Components: [Form field](../components/form-field.md),
  [Text field](../components/input.md), [Textarea](../components/textarea.md),
  [Select](../components/select.md), [Combobox](../components/combobox.md),
  [Checkbox](../components/checkbox.md), [Radio group](../components/radio.md),
  [Switch](../components/switch.md), [Button](../components/button.md),
  [Alert](../components/alert.md), [Progress](../components/progress.md), and
  [Dialog](../components/modal.md) when applicable.
- Perceptual patterns: calm grouping, clear label hierarchy, persistent
  requirements, visible validation, and decisive but proportionate submission
  emphasis.

## Required states and transitions

- Distinguish untouched, edited, validating, valid, warning, invalid, submitting,
  succeeded, and failed states without announcing routine state repeatedly.
- Communicate known requirements, format, units, and consequences before entry.
- Validation never clears a value. Submission errors identify affected controls
  and provide a useful route to each problem.
- While submitting, prevent duplicate activation and preserve the action label,
  values, messages, and task context.
- Network, permission, conflict, and session failures preserve valid work and
  explain whether retry, sign-in, review, or copying the data is available.
- Cancellation does not require confirmation when no meaningful work would be
  lost. Unsaved-change confirmation identifies the consequence and safe action.

## Context-specific stress conditions

- Submit an untouched form, then a form with one invalid field above the viewport
  and another below it.
- Enter the maximum valid content in every field, including long unbroken values
  only where the data format permits them.
- Expand labels and validation messages by 60%, apply 200% text enlargement, and
  show the on-screen keyboard in the narrow presentation.
- Switch a selection while asynchronous validation for its previous value is
  pending; a late response must not overwrite the current state.
- Lose the network during submission, restore it, and retry without creating a
  duplicate project.
- Present a server-side conflict after local validation succeeds and retain a
  route to compare or revise the conflicting value.

## Acceptance outcomes

- Every field has an understandable visible label, programmatic name, requirement,
  description, and error relationship where applicable.
- Keyboard and assistive-technology users can identify every error and move to the
  affected control without a trap or unexpected context change.
- Reflow preserves logical group, reading, and focus order; no label, value,
  message, or action is clipped.
- Submission produces exactly one operation, and all recoverable failure paths
  preserve valid work.
- Success feedback names the created or updated outcome instead of equating field
  presence or focus with validity.
