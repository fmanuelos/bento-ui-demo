# Focused Flow

## Status

Draft. This is a new mode contract. Its validation coverage and relationships to
specific flow templates remain to be expanded in later phases.

## Intent

Focused Flow supports one bounded outcome while reducing unrelated navigation,
choices, and information. It preserves comprehension, valid work, and safe exit
through validation, asynchronous work, interruption, and recovery.

## Use when

Use Focused Flow when a person is completing a bounded task such as sign-in,
account recovery, onboarding, checkout, application submission, or initial
setup. The task may contain one step or several; sequence alone does not define
the mode.

Focused Flow may begin from a Public Site or Application Workspace. Its origin
does not change the flow's task requirements.

## Do not use when

Do not use Focused Flow merely to create a narrow page, centered card, wizard,
modal, or minimal visual treatment. Use [Public Site](public-site.md) when the
primary goal is public discovery or reading. Use
[Application Workspace](application-workspace.md) when people need persistent
access to several related destinations, records, or operational tools.

Do not split a simple task into artificial steps to justify a flow. Do not remove
necessary help, consequences, recovery, or exit controls in the name of focus.

## Audience and outcomes

Participants may be new or returning, authenticated or unauthenticated. They can:

- Understand the intended outcome and current task state.
- Know what information is required and why when the reason matters.
- Move through a meaningful sequence without losing valid work.
- Review material consequences before commitment.
- Exit, resume, retry, or recover according to the task's risk and persistence
  model.

## Experience variants

Candidate variants include Authentication Flow, Onboarding Flow, Checkout Flow,
Application Flow, Account Recovery Flow, and Setup Flow. These labels classify
recurring journeys; they do not imply that every instance is multi-step or that
all variants share one progress model.

## Navigation model

Keep navigation task-local. Provide identity, necessary context, the current
task, and a safe exit or return path where leaving is permitted. Do not expose
unrelated global destinations that compete with the outcome.

Show progress only when steps form a stable, meaningful sequence. Progress
communicates current position and completion policy; it is not a decorative step
count. Back, cancel, save and exit, browser history, and direct-entry behavior
must agree with the flow's persistence model.

When a flow appears within another mode, define whether it is a page, modal
dialog, drawer, or another task surface through the applicable component
contract. Closing the surface follows the same interruption and unsaved-work
rules as leaving by navigation.

## Layout and density

Apply the [`Focused Flow mode`](../../DESIGN.md#focused-flow-mode) layout rules.
Prefer `container-narrow` for compact authentication and account tasks and
`container-readable` when instructions, review, or form complexity requires more
space. Use page padding and enough separation to keep the task sequence legible.

One column is the default. Add columns only when label, validation, translation,
zoom, and reading order remain clear. Do not shrink text or controls to keep a
flow above the fold. Long or multi-step tasks normally use a page rather than a
constrained modal surface.

## Content hierarchy

Present the task name, concise purpose, required instructions, current fields or
decision, validation and status, and actions in meaningful order. Introduce
requirements before they are needed. Explain material consequences before the
committing action.

Preserve a stable task name across steps. Step titles describe the current
decision without making the overall outcome ambiguous. Avoid internal process
language, vague action labels, and progress text that promises completion before
the authoritative outcome is known.

## Action hierarchy

Keep one primary action for the current decision region. Label it with the
specific next action or commitment. Back, cancel, save and exit, help, and
recovery actions retain visible but quieter emphasis appropriate to their role.

A destructive or irreversible commitment follows
[`Destructive actions`](../patterns/destructive-actions.md). Do not use disabled
primary actions as the only explanation of incomplete requirements; provide
discoverable validation or guidance.

## Task continuity and states

Define the authoritative state, saved boundary, and resumption policy before
implementation. Preserve valid input across validation errors, recoverable
failures, reauthentication, responsive transformation, and accidental
interruption whenever policy permits.

Distinguish initial, editing, validating, submitting, unknown, failed, blocked,
completed, expired, and resumed states where applicable. Prevent duplicate
commitment while an outcome is pending. An unknown result does not invite blind
resubmission when that could duplicate a consequential operation.

If authentication or authorization changes during the flow, preserve only work
that can be retained safely. After recovery, verify access and authoritative data
before restoring the task. Completion identifies the durable outcome and the
next destination.

## Templates, pages, and domains

A flow template defines the durable sequence, state transitions, persistence,
review, commitment, and recovery structure. A flow step is one meaningful state
or stage of that template. A product flow supplies real requirements, content,
permissions, domain rules, and destinations.

Identity & Access, Account, Billing, or another domain may use Focused Flow, but
the domain does not determine the mode. A flow may cross domains when the
transition is necessary to one coherent outcome; record one primary domain and
only material secondary domains.

## Responsive and localization behavior

Preserve task name, current state, instructions, fields, validation, and primary
and exit actions at every supported size. Stack regions and actions before they
overflow. Keep the meaningful reading order consistent with focus order and do
not move focus merely because the layout transforms.

Support longer labels, validation messages, names, addresses, locale-specific
formats, and bidirectional text. Do not encode sequence or required meaning only
through position, arrows, color, or English sentence structure.

## Accessibility

Every step has a programmatically determinable name and logical heading
structure. Focus moves only for a documented task reason, such as entering a new
step or presenting an urgent blocking decision, and returns predictably when a
temporary surface closes.

Errors are associated with affected fields and summarized when useful. Status
and progress announcements are concise and do not repeat on every render. The
flow supports keyboard, touch, screen readers, 200% text enlargement, increased
text spacing, high contrast, forced colors, reduced motion, and password
managers or autofill where relevant.

## Participating components and related patterns

Common dependencies include Form Field and its controls, Button, Button Group,
Alert, Progress, Dialog, Modal Dialog, Drawer or Sheet, Link, and appropriate
disclosure components. Apply Forms and validation, Task continuity and unsaved
work, Asynchronous feedback, Destructive actions, Action hierarchy and emphasis,
and Responsive density.

Components retain their individual state, semantics, focus behavior, and
accessible naming. The flow contract owns their coordinated sequence,
persistence, interruption, and recovery across the task.

## Validation scenarios

Apply the shared baseline and the dedicated
[`Focused Flow`](../VALIDATION.md#focused-flow) scenario, plus
[`Form workflow`](../VALIDATION.md#form-workflow),
[`Destructive workflow`](../VALIDATION.md#destructive-workflow), and
[`Action hierarchy and emphasis`](../VALIDATION.md#action-hierarchy-and-emphasis)
as applicable. Also apply
[`Experience classification and mode transitions`](../VALIDATION.md#experience-classification-and-mode-transitions)
when the flow starts within or returns to another mode.
