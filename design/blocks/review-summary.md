# Review Summary block

## Status

Draft. The two representative uses below define the intended scope; validation
of correction return paths, changed data, and blocked commitment is outstanding.
The examples do not establish implemented or tested support.

## Intent

Review Summary arranges the information a person must check before a pending
commitment. It groups answers or proposed changes with correction routes and
material consequences. The containing workflow owns the reviewed snapshot,
validation, persistence, final action, and commitment state.

## Use when

Use in Focused Flow for application review and in Application Workspace for
publishing-change review when checking grouped information reduces consequential
mistakes. These are the block's supported modes; classification is Shared.

## Do not use when

Use [Record Details](record-details.md) for inspecting existing facts,
[Form Section](form-section.md) for data entry, and
[Completion Summary](completion-summary.md) after confirmed completion. Do not
add a review step to an immediate task solely to use this block. A destructive
confirmation follows [Destructive actions](../patterns/destructive-actions.md)
and its appropriate dialog or workflow rather than this block alone.

## Anatomy

1. Required heading naming the information or change being reviewed
2. Optional concise scope or review instruction
3. Required named groups of labelled answers or proposed changes
4. Optional correction destination or action scoped to each editable group or answer
5. Required material consequences and qualifications when the action has them
6. Optional scoped validation, stale-data explanation, or recovery

Read each group's heading, answers, and correction actions together. The
containing form or template places its final action after the relevant review
and consequences; the block does not duplicate that action.

## Variants

No variants are established. Existing and proposed values may appear together
when the decision requires a comparison, labelled explicitly as “Current” and
“Proposed.” This is optional content, not a new comparison state machine.

## Participating components and related patterns

Use [Link](../components/link.md) for correction destinations,
[Button](../components/button.md) for in-place corrections,
[Alert](../components/alert.md) for scoped problems, and
[Status Badge](../components/status-badge.md) only for persistent state.
Use the same native label-value semantics as [Record Details](record-details.md).

Apply [Forms and validation](../patterns/forms-and-validation.md),
[Task continuity](../patterns/task-continuity.md),
[Asynchronous feedback](../patterns/async-feedback.md),
[Action hierarchy](../patterns/action-hierarchy-and-emphasis.md), and
[Responsive density](../patterns/responsive-density.md). The product and these
patterns retain correction, focus, snapshot, submission, and recovery behavior.

## Content requirements

Show complete decision-relevant values with labels matching the entry task.
Differentiate unanswered optional questions from invalid or missing requirements.
Do not expose sensitive answers that policy requires to remain masked. Explain
how to correct them without revealing them in accessible names or summaries.

Name correction actions by subject, such as “Change delivery address.” An
uneditable value needs an explanation when the inability to change it matters.
Show applicable timing, affected scope, charges, publication visibility, or other
material consequences before commitment; a collapsed hint cannot be their only
location. Never present illustrative or outdated values as the reviewed snapshot.

## Layout and semantic token mapping

Use the containing [Focused Flow](../../DESIGN.md#focused-flow-mode) or
[Application Workspace](../../DESIGN.md#application-workspace-mode) container,
padding, and group spacing roles. Use shared heading, body, secondary text,
feedback, border, and focus roles. Keep explanations readable and corrections
adjacent to their subjects. No block-specific token values are needed.

## States and behavior

The block reflects reviewing, incomplete, stale, blocked, pending, and failed
conditions supplied by the workflow. The workflow preserves valid work when a
person corrects an answer and returns to review. Recompute affected summaries
and consequences after a correction; do not silently retain superseded values.

If authoritative data or permissions change, explain which review information
is affected. The owning workflow determines whether renewed review is required
before commitment. Pending submission keeps the reviewed context available and
prevents duplicate commitment through the asynchronous pattern. An unknown
outcome uses verification or recovery instead of inviting blind resubmission.
Validation messages remain associated with their actual scope.

## Responsive and localization behavior

Stack labels, values, comparisons, and corrections in meaningful order before
columns become cramped. Do not move correction links ahead of their subjects.
Support 60% expansion, 200% text, increased spacing, local number and date formats,
multiple writing systems, and RTL. Preserve full consequences and identifiers
without a fixed-height review area or page-level horizontal scrolling.

## Accessibility

Use named groups and explicit label-value relationships. Current and proposed
values must remain distinguishable without color, strikethrough, or column
position. Keep corrections keyboard accessible with specific names and visible
focus. Follow the owning workflow for focus on validation and return from editing;
layout changes alone do not move focus. Keep targets usable and announcements
proportionate. Forced colors and reduced motion retain all review information.

### Web adapter

Use a named `section`, native headings, and description lists for answers. Use
ordinary text labels for paired current and proposed values. Use anchors for
correction routes and buttons for in-place operations. Do not create a nested
form or duplicate submit button. Associate feedback with the relevant group;
do not announce the complete summary whenever one answer changes.

## Representative example

- A Focused Flow application review shows Contact details and Delivery details
  with named correction links and the delivery consequence. Correcting an address
  returns to the updated review without clearing other answers.
- An Application Workspace publishing review shows the proposed Title,
  Audience, and Publication time alongside current values where useful. Changing
  the audience updates the visibility explanation before the containing task's
  “Publish changes” action.

These examples preserve the same group, answer, correction, and consequence
relationships while their products own different commitment rules.

## Validation scenarios

Validate both modes with minimal and complete anatomy, optional answers absent,
required answers missing, masked values, correction unavailable, dependent answers
changed, stale authority, permission loss, interrupted editing, pending submission,
failure, and unknown outcome. Verify the final action commits the reviewed scope.

Apply [Review and completion](../verification/workflows.md#review-and-completion),
[Form workflow](../verification/workflows.md#form-workflow),
[Block composition and reflow](../verification/stress-tests.md#block-composition-and-reflow),
and the [baseline](../verification/baseline.md). Cover both modes, long content,
RTL, enlarged text, light and dark themes, keyboard, touch, screen readers,
forced colors, and reduced motion before claiming implementation conformance.
