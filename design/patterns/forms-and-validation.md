# Forms and validation

## Intent

Forms help people understand requirements, enter and review information, correct
problems, submit once, and recover from interruption or failure without losing
valid work.

## Use when

Use this pattern when people provide, edit, or review information that is
validated or committed as a task. It applies to short forms, settings, complex
data entry, authentication, and review-before-commitment workflows.

## Do not use when

Do not use a form submission model for an immediate binary setting; use the
[`Switch`](../components/switch.md) contract when the change is committed on
activation. Do not make read-only information resemble disabled form controls,
and do not split a simple choice into a multi-step task solely to reduce the
amount shown at once.

## Participating components and related patterns

All controls inherit the [`Form field`](../components/form-field.md) contract.
Text field, Textarea, Select, Listbox, Combobox, Checkbox, Radio group, Switch,
Slider, Button, and Input Group retain their individual semantics and state
models. Alerts and links may provide a submission summary and routes to affected
controls.

Apply [asynchronous feedback](async-feedback.md) to validation, submission, and
save operations. Apply
[task continuity and unsaved work](task-continuity.md) to manual save, autosave,
drafts, interruption, offline edits, conflicts, restoration, and session expiry.
Apply [destructive actions](destructive-actions.md) when cancelling, resetting,
discarding, or replacing information would cause consequential loss. Apply
[action hierarchy and emphasis](action-hierarchy-and-emphasis.md) to submission,
save, cancellation, and supporting actions in each decision region.

## States and sequence

Distinguish untouched, edited, validating, valid, warning, invalid, submitting,
succeeded, failed, conflicted, and offline states when applicable. Do not
communicate validity from color alone, and do not show success merely because a
field received focus or contains text.

- Every control has a persistent visible label and an accessible name containing
  that label.
- Required or optional status, format, units, and known constraints are
  communicated before entry.
- Related controls use a named group and preserve a meaningful reading order.
- Validation occurs at a predictable time and never clears a value.
- Asynchronous validation applies only its latest relevant response. A late
  response must not overwrite a newer value or message.
- An error identifies its control, describes the problem in text, and suggests a
  correction when known.
- Cross-field errors identify every affected relationship without assigning the
  problem misleadingly to only one control.
- A submission error provides a summary or equivalent route to each invalid
  control. Focus moves only when doing so aids recovery.
- Conditional controls are introduced in a predictable reading and focus order.
  Hiding a control does not silently discard a valid value unless that consequence
  is part of the stated choice.
- Consequential submissions provide an opportunity to review and correct the
  relevant information before commitment.

## Persistence, interruption, and recovery

Preserve valid values through validation, failure, responsive transformation,
authentication recovery, and retry. Previously supplied information is not
requested again without an essential reason.

The [task-continuity pattern](task-continuity.md) owns whether values are unsaved,
locally recoverable, queued, durably saved, conflicted, restored, or discarded.
This pattern continues to own the validity and relationships of the values that
are preserved or restored.

Authentication permits password managers, paste, and other assistance. When
reauthentication is required, restored fields retain their labels, descriptions,
validation, and review opportunity before commitment.

## Content and localization

Use labels that describe the requested value and instructions that appear before
they are needed. Placeholder text is an example, not a label or requirement.
Messages describe problems without blame and use the terminology visible in the
form.

Labels, options, help, units, values, errors, summaries, and actions support
expansion, locale-aware formatting, pluralization, and right-to-left presentation.
Validation must not depend on English punctuation, capitalization, name order, or
formats that contradict the active locale.

## Responsive behavior

Labels, help, errors, values, and actions wrap without clipping. Logical
relationships and focus order remain intact when fields change columns, groups
move, or actions stack. An on-screen keyboard must not obscure the focused field,
its error, or the controls required to continue.

Long or multi-step work uses a page or suitable task surface rather than a small
popover or dialog. Responsive transformation preserves values, validation,
current task context, and the ability to reach the submission summary.

## Accessibility

Each field exposes its name, value, requirement, description, units, and error
relationships through the applicable component and platform contracts. Keyboard,
touch, pointer, speech, and assistive-technology users receive the same
requirements, validation, and recovery options.

Status updates use [asynchronous feedback](async-feedback.md) and do not
repeatedly interrupt entry. Focus does not move on routine field validation.
After failed submission, move focus only to a summary or affected control when it
materially shortens recovery, and keep every error reachable from that route.

Warnings, errors, success, required state, and disabled or read-only distinctions
remain visible without color alone and survive high contrast, increased text
spacing, and reduced motion.

## Validation scenarios

Apply the shared matrix and every check in the
[`Form workflow`](../VALIDATION.md#form-workflow). Include errors above and below
the viewport, cross-field and conditional errors, maximum valid content, 60%
label expansion, 200% text, an on-screen keyboard, stale validation responses,
autosave failure, offline submission, session expiry, retry, server conflict,
and cancellation with and without meaningful unsaved work.
