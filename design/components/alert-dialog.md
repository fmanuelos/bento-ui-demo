# Alert dialog

## Status

Contract complete.

## Intent

An alert dialog interrupts the current task for a short decision that requires
immediate acknowledgement. Use it when an action is difficult to reverse, affects
other people, has broad scope, or must be resolved before work can continue. Do
not use it for routine information, passive alerts, long forms, or reversible
actions that can provide undo.

Alert Dialog extends the shared [`dialog and modal contract`](modal.md) and the
destructive-actions pattern. It is always modal.

When the decision applies to several selected records, selection scope,
eligibility, the immutable commitment snapshot, and per-record outcomes follow
the
[`Selection and bulk actions pattern`](../patterns/selection-and-bulk-actions.md).
When the decision confirms discarding entered or recovered work, its save state,
recovery promise, and return context follow the
[`Task continuity and unsaved work pattern`](../patterns/task-continuity.md).

## Anatomy and variants

1. Blocking backdrop and modal surface
2. Title naming the decision
3. Description identifying the object, scope, and consequence
4. Optional concise warning or relevant detail
5. Safe action
6. Commitment action
7. Optional typed confirmation for exceptional impact

- **Destructive confirmation:** Confirms removal, revocation, or irreversible
  loss. The commitment action uses the destructive Button variant.
- **Critical acknowledgement:** Resolves a blocking condition that is not a
  destructive action. Use the action hierarchy appropriate to the decision and
  do not apply danger styling automatically.

The dialog's decision region follows the
[`Action hierarchy and emphasis pattern`](../patterns/action-hierarchy-and-emphasis.md).
Destructive treatment identifies the consequential commitment without also
applying primary styling, and a safe alternative remains available.

## Sizes and semantic token mapping

Use the standard modal surface mapping and dialog width. Alert dialogs remain
short and focused; content that requires a larger surface, multiple sections, or
several fields uses an ordinary modal, page, drawer, or sheet.

Titles and descriptions use neutral text roles. Warning or danger roles emphasize
the consequence only when their semantic meaning applies. Actions use the Button
contract. Do not recolor the entire dialog as the only indication of risk.

No separate frontmatter component entry is required because Alert Dialog composes
the modal surface and existing action and feedback mappings.

## States

Support closed, opening, awaiting decision, validating confirmation, committing,
failed, and closing states as relevant. Committing prevents duplicate activation
and preserves the decision, object, and consequence. Failure keeps the dialog
open, retains entered confirmation, and provides retry or recovery.

The dialog does not report success while it remains open unless another decision
is required. After successful commitment, close it and provide appropriate
completion feedback in the resulting context.

## Behavior

Prefer an undo or reversible flow before requiring confirmation. When confirmation
is justified, the title and commitment label name the actual outcome. Avoid vague
labels such as “Yes,” “OK,” or “Continue.”

Initial focus normally favors the safe action or another non-destructive element
that supports comprehension. Do not place initial focus on the destructive action
merely because it is visually primary. Typed confirmation is reserved for
exceptional, high-impact actions; the required phrase is visible, concise, and
compatible with paste and assistive input.

Escape and backdrop activation do not commit the decision. They may cancel only
when cancellation is safe and does not discard required recovery information.
Explicit Cancel remains available. Closing restores focus according to the Dialog
contract; if the initiating object was removed after success, focus moves to the
nearest logical continuation.

## Responsive behavior

The dialog retains at least `spacing.space-4` viewport clearance. Descriptions,
object names, consequences, and actions wrap. Actions stack when they do not fit,
while preserving a clear safe choice and commitment order. Do not truncate the
object or scope that users are being asked to confirm.

Typed confirmation and action labels support translation, text enlargement, and
right-to-left direction. Matching rules account for documented normalization
without requiring language-specific casing or punctuation that users cannot
reasonably enter.

## Accessibility

Expose the alert-dialog name, description, modality, consequence, current busy or
error state, and available actions. Focus is contained and remains visible. Risk
is communicated in text rather than through color, iconography, or action order
alone.

Announce the dialog when it opens and announce a failed commitment once. Do not
reannounce the full warning after every input change. High-contrast modes retain
surface, focus, and action distinctions. Reduced motion makes opening and closing
effectively immediate while background interaction remains blocked.

### Web adapter

Use the native dialog element when it satisfies the contract, or expose
`role="alertdialog"` with `aria-modal="true"`. Connect the title and concise
consequence with `aria-labelledby` and `aria-describedby` or equivalent naming
relationships. Follow the Dialog contract for inertness, focus containment,
Escape policy, scroll containment, and return focus.

Do not use a generic live-region alert as a substitute for the modal decision or
automatically focus the destructive button.

## Example

“Delete Field Notes?” identifies that the project and its shared files will be
removed, offers “Cancel” as the safe action, and uses “Delete project” for the
destructive commitment. Backdrop activation cannot confirm deletion.
