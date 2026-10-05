# Flow Step Navigation block

## Status

Draft. Linear sequences with optional steps and controlled return navigation are
implemented in simulated onboarding and application references. Complex branching,
route-based steps, and assistive-technology validation remain outstanding.

## Intent

Show a task's meaningful step sequence, current position, and available return
paths without owning validation, eligibility, persistence, or commitment.

## Use when

Supported modes: Focused Flow.

Use for profile onboarding with optional preferences and application submission
with conditional fields when a stable sequence helps orientation. The workflow
supplies every step's identity, label, state, and permitted activation.

## Do not use when

Do not add steps to a simple task to justify this block. Use
[Progress](../components/progress.md) for a running operation,
[Breadcrumb](../components/breadcrumb.md) for location in a hierarchy, and
[Tabs](../components/tabs.md) for peer panels. Those semantics do not describe
step prerequisites. This block is not a workflow engine or a progress percentage.

## Anatomy

1. Required accessible navigation name.
2. Required ordered collection of named steps with stable identities.
3. Exactly one current step while the sequence is active.
4. Textual completed, skipped, available, or blocked state as applicable.
5. Optional explanation of prerequisites or optional status.
6. An activation control only for a permitted destination.

## Variants

No variants are established. Wrapping or stacking preserves the same source order.
The initial implementation supports in-page activation callbacks. Route-based
step links need adapter work and validation before implementation claims.

## Participating components and related patterns

Compose [Button](../components/button.md) for deliberate in-page transitions and
[Link](../components/link.md) for true navigation when supported by the consumer.
Apply [Task continuity](../patterns/task-continuity.md),
[Forms and validation](../patterns/forms-and-validation.md),
[Asynchronous feedback](../patterns/async-feedback.md), and
[Action hierarchy](../patterns/action-hierarchy-and-emphasis.md).

## Content requirements

Use short meaningful step labels and understandable availability explanations.
Optional, skipped, and completed are distinct. Numbering denotes sequence, not
completion authority. Test long translated names and changed prerequisite states.
Do not infer completed state from index alone; the consumer supplies the state.

## Layout and semantic token mapping

Use existing text, border, surface, shape, and spacing roles. Navigation wraps
within the task container and keeps each label with its state. Required meaning
is not carried solely by color, connecting lines, or physical position.

## States and behavior

The consumer supplies current, completed, available, blocked, and skipped states.
Blocked steps have no activation. Busy transitions prevent conflicting activation.
Reopening a step does not submit or save it. Editing an earlier answer can
invalidate dependent review and destination eligibility through the owning flow.
Completion of the entire task replaces this navigation with the appropriate outcome.

## Responsive and localization behavior

Wrap or stack in logical sequence; do not horizontally clip steps. Retain the
current label and explanations at narrow widths, 200% text, expanded translations,
and RTL. A responsive change alone never changes the current step or focus.

## Accessibility

Expose named navigation and an ordered list. Identify exactly one current step
and provide availability in text. Only actual actions enter the tab sequence.
Use ordinary keyboard activation rather than tablist arrow-key behavior. The
consumer focuses the new step heading after deliberate activation; the block
never automatically announces every state or takes focus during refresh.

### Web adapter

Use a `nav` with an accessible name, an ordered list, and `aria-current="step"`
on the current item. In-page operations use buttons; blocked items remain readable
text with an explanation. The consumer validates activation again before transition.

## Representative example

Onboarding shows Your details, optional Preferences, and Review. Application
submission shows Your details, Application details, and Review. Both retain Back
and scoped correction actions; skipped preferences remain explicitly identified.

## Validation scenarios

Exercise current, completed, blocked, skipped, long labels, changing prerequisites,
busy activation, correction and return, narrow layouts, RTL, themes, and keyboard
focus on the new step. Apply [Focused Flow](../verification/workflows.md#focused-flow)
and [Block composition](../verification/stress-tests.md#block-composition-and-reflow).
