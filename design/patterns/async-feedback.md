# Asynchronous feedback

## Intent

Asynchronous feedback explains what is happening, what completed, what failed,
and what a person can safely do next without obscuring usable content or creating
unnecessary interruption.

## Use when

Use this pattern when an operation does not complete immediately, when data may
arrive or change independently of the current interaction, or when completion,
failure, cancellation, or recovery must be communicated across components.

Apply it to initial loading, background refresh, submission, long-running work,
optimistic updates, retry, and operations whose final outcome may be unknown.

## Do not use when

Do not use event feedback as persistent entity or workflow status; use the
[`Status badge`](../components/status-badge.md) contract. Keep field validation
with the affected control through the
[`Form field`](../components/form-field.md) contract. A static absence of content
uses the [`Empty state`](../components/empty-state.md) contract even when an
asynchronous operation revealed that condition.

Do not introduce a busy state for work that completes without a perceptible
delay. Brief work may complete without presenting transitional feedback, but its
result and any failure still follow this pattern.

## Participating components and related patterns

[`Progress`](../components/progress.md), [`Alert`](../components/alert.md),
[`Toast and notification region`](../components/toast.md),
[`Empty state`](../components/empty-state.md), and
[`Button`](../components/button.md) provide bounded presentation and interaction
behavior. Forms, data display, and destructive actions apply this pattern to
their task-specific operations and recovery risks. Apply
[task continuity and unsaved work](task-continuity.md) when an operation
determines whether the current task is unsaved, locally recoverable, queued,
durably saved, or conflicted. Apply
[action hierarchy and emphasis](action-hierarchy-and-emphasis.md) so pending,
unavailable, retry, verification, and recovery actions retain the correct
priority.

## States and sequence

An operation begins from an idle or usable state, becomes pending, and resolves
as succeeded, failed, cancelled, partially succeeded, or outcome unknown. Retry
creates a new pending attempt without erasing the earlier outcome. Components may
use narrower state names while preserving this sequence.

- Distinguish initial loading, which may make a region unavailable, from
  background refresh, which preserves useful content and interaction whenever it
  remains safe.
- Use a local busy state for a local operation and a page-level state only when
  the entire task is unavailable.
- Prevent conflicting or duplicate activation while an operation is pending,
  while retaining the action label and task context.
- Show determinate progress only when the measure and completion point are
  reliable. Otherwise communicate non-determinate activity without inventing a
  percentage or duration.
- Treat a timeout or lost connection according to what is known. Do not report
  failure when the operation may have completed, and do not encourage an unsafe
  duplicate attempt while the outcome remains unknown.
- Ignore a stale response when a newer request owns the current query, values,
  selection, focus, or navigation context.
- An optimistic update remains identifiable as pending when that distinction is
  material. Failure either restores the previous state or presents an explicit
  reconciliation path without silently discarding later work.
- Partial success identifies what completed, what did not, and whether retrying
  the remainder is safe.

## Persistence, interruption, and recovery

Preserve usable content during background work and retain valid input, query,
selection, focus, scroll, and unrelated state through failure and retry. A retry
reuses the applicable operation context but does not reset successful or
unrelated work.

Cancellation stops work only when the underlying operation can actually be
cancelled. Otherwise describe the action as leaving, hiding, or stopping updates
rather than claiming that the operation was cancelled. When an outcome is
unknown and duplication could cause harm, provide a way to verify current state
before offering another commitment.

If content disappears after completion, continue from the nearest logical
location and explain any material change. Recovery stays beside the affected
region unless the whole task requires a page-level response.

## Content and localization

Pending feedback identifies the work when the surrounding context is
insufficient. Completion feedback names the completed outcome. Error feedback
describes the affected operation without blame and provides a recovery action
when one exists.

Use locale-aware numbers, units, dates, times, and durations. Labels and messages
must accommodate expansion and different writing directions without separating
status from its subject. Do not promise a completion time that the system cannot
reliably determine.

## Responsive behavior

Feedback remains associated with the operation when regions stack, collapse,
move into an overlay, or change density. Preserve useful content rather than
replacing a complete region with a loading indicator during refresh. Progress,
errors, and recovery actions wrap without clipping or forcing page-level
two-dimensional scrolling.

## Accessibility

Starting or completing an operation does not move focus by default. If focused
content disappears, place focus at the nearest logical continuation. A pending
control retains an understandable name and exposes its unavailable or busy state
without relying on animation.

Announce a meaningful state change once and at an urgency proportionate to its
effect. Routine refreshes remain quiet unless they change the current task,
invalidate a choice, or require action. Repeated progress updates are throttled
so they do not prevent other navigation or reading.

Loading motion is not the only indication of activity and becomes static or
effectively immediate under a reduced-motion preference. Status, boundaries, and
recovery controls remain distinguishable in high-contrast presentation and
operable with keyboard, touch, and pointer input.

## Validation scenarios

Apply the shared matrix and the asynchronous conditions in the
[`Dashboard overview`](../VALIDATION.md#dashboard-overview),
[`Data management`](../VALIDATION.md#data-management),
[`Form workflow`](../VALIDATION.md#form-workflow), and
[`Destructive workflow`](../VALIDATION.md#destructive-workflow) scenarios. Include
out-of-order responses, refresh with usable content, cancellation, timeout,
offline transition, optimistic rollback, unknown outcome, retry, and partial
success where applicable.
