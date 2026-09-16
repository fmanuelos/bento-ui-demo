# Destructive actions

## Intent

Destructive actions remove data, access, or progress. This pattern makes the
object, scope, consequence, and recovery model clear; prevents accidental or
duplicate loss; and provides proportionate confirmation or recovery.

## Use when

Use this pattern when an action permanently or temporarily removes information,
revokes access, abandons meaningful work, resets configuration, or otherwise
creates a consequential loss. Increase protection when the action is difficult
to reverse, affects other people, has broad scope, or is easy to trigger
accidentally.

## Do not use when

Do not use destructive presentation for a warning that changes nothing, a
negative status, or an ordinary cancellation that preserves all work. Do not ask
people to confirm routine reversible actions when direct action with reliable
undo provides sufficient protection.

Typed confirmation is not a default confirmation treatment. Reserve it for
exceptional, high-impact actions when deliberate transcription meaningfully
reduces a demonstrated risk.

## Participating components and related patterns

[`Button`](../components/button.md),
[`Alert dialog`](../components/alert-dialog.md), and
[`Dialog and modal`](../components/modal.md) provide the bounded commitment and
confirmation controls. [`Alert`](../components/alert.md) and
[`Toast and notification region`](../components/toast.md) may communicate durable
or transient outcomes. Apply [asynchronous feedback](async-feedback.md) to the
operation and [forms and validation](forms-and-validation.md) when confirmation
requires a reason, reassignment, or other entered value. Apply
[selection and bulk actions](selection-and-bulk-actions.md) when one commitment
targets several selected records. Apply
[task continuity and unsaved work](task-continuity.md) when the loss is entered,
recovered, or draft work. Apply
[action hierarchy and emphasis](action-hierarchy-and-emphasis.md) so the risky
commitment remains distinct from and proportionate to its safe alternative.

## States and sequence

A destructive workflow may move through available, blocked, reviewing,
confirming, committing, succeeded, failed, partially succeeded, outcome unknown,
and undone states. Use only applicable states, but do not collapse failure,
partial success, and an unknown outcome into one message.

- The initiating action names the outcome; color is supporting emphasis only.
- Check known permission, policy, dependency, and retention constraints before
  commitment. A blocked action explains the constraint and any valid next step.
- Prefer a reversible soft-delete or undo model when it provides real recovery.
- Confirmation identifies the object, scope, consequence, permanence, affected
  people or data, and any prerequisite.
- The destructive action remains secondary to a safe alternative until the final
  commitment step.
- One activation creates at most one operation. While commitment is pending,
  prevent duplicate activation without hiding what is happening.
- Success identifies what changed. Partial success reports each relevant success
  and failure or provides an equally clear grouped account.
- If connection loss or timeout makes the result uncertain, label the outcome as
  unknown and verify current state before enabling an attempt that could repeat
  the loss.

## Persistence, interruption, and recovery

Opening and dismissing confirmation preserves the initiating context and any
unrelated work. Failure preserves the object, scope, entered confirmation values
when safe, and a recovery route. Retry targets only work known not to have
completed.

Undo is offered only when the product can restore the promised state. Communicate
its scope and availability before it expires; expiration must not depend on
animation or a toast remaining visible. Recovery that requires a durable history
or separate destination remains available after transient feedback is dismissed.

After successful removal, move focus to the nearest logical continuation when
the initiating object no longer exists. For a removed item in a collection,
preserve the surrounding query and selection context and identify any items that
could not be removed.

## Content and localization

Use specific verbs and object names. Avoid vague commitment labels such as
“Yes,” “OK,” or “Continue.” Distinguish “remove access,” “archive,” “move to
trash,” and “delete permanently” according to the actual outcome.

Object names, counts, retention periods, and consequences support locale-aware
formatting, expansion, pluralization, and different writing directions. Long or
similar names remain distinguishable. Do not rely on capitalization, punctuation,
iconography, or word order to communicate permanence.

## Responsive behavior

The complete object, scope, consequence, and safe alternative remain visible or
directly reachable when confirmation reflows. Actions may stack, but their
semantic priority and separation remain clear. A narrow presentation must not
truncate the object name or move commitment ahead of the consequence in reading
order.

Long or multi-step destructive work uses a page or suitable task surface rather
than forcing essential information into a small dialog. Temporary presentation
changes do not reset confirmation or create another operation.

## Accessibility

Confirmation provides a meaningful heading and description. Initial focus favors
the safe action unless task evidence justifies another placement. Cancel remains
available, and commitment is visually and operationally distinct from dismissal.

When confirmation is modal, backdrop activation does not discard the decision or
entered information. Focus entry, containment, dismissal, restoration, and
post-removal movement follow the applicable dialog and component contracts.

Consequences, blocked states, progress, and outcomes are communicated in text
without relying on danger color or motion. The workflow remains operable with
keyboard, touch, and pointer input and distinguishable in high contrast and at
increased text sizes.

## Validation scenarios

Apply the shared matrix and every check in the
[`Destructive workflow`](../VALIDATION.md#destructive-workflow). Include reversible
and permanent actions, similar and long object names, permission and policy
blocks, dependent records, network loss before and after commitment, duplicate
activation, partial bulk results, undo expiration, browser navigation, and focus
after removal.
