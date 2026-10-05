# Initial Setup template

## Status

Draft. Organization provisioning and project provisioning establish the scope.
Two simulated references exercise creation, defaults, and recovery. Real service,
authorization, and accessibility validation remain outstanding; see the
[implementation record](../verification/setup-status-content-evidence.md).

## Intent

Help an authorized person configure and provision a new resource, understand which
operations completed, and recover unfinished work without duplicate creation.

## Use when

Use for creating an organization with initial defaults or creating a project with
initial configuration. Entry requires an identified, eligible actor in a real
product. Creation has an explicit commitment boundary and an authoritative result.

## Do not use when

Use [Account Onboarding](account-onboarding.md) for preferences after account
creation and [Settings](settings.md) for ongoing configuration. Authentication,
registration, payments, and destructive migration require their own boundaries.
Do not promise rollback merely because a setup flow offers an exit.

## Classification

- Primary mode: [Focused Flow](../experiences/focused-flow.md).
- Applicable candidate variant: Setup Flow.
- Domains: assigned by the resource being provisioned.
- Audience: people authorized to create an organization or project.
- Excluded scope: account creation, payment, and recurring resource administration.

## Regions and hierarchy

1. Main-content bypass and bounded task identity using Page Header.
2. Flow Step Navigation when configuration, review, and result are separate stages.
3. Form Section for configuration and local validation feedback.
4. Review Summary with correction and explicit creation consequences.
5. Provisioning feedback, partial or unknown result, and scoped recovery actions.
6. Completion Summary only when the required operations are confirmed complete.
7. Exit and an appropriate next destination, with unsaved-work protection.

## Participating contracts

Use [Page Header](../blocks/page-header.md),
[Flow Step Navigation](../blocks/flow-step-navigation.md),
[Form Section](../blocks/form-section.md),
[Review Summary](../blocks/review-summary.md), and
[Completion Summary](../blocks/completion-summary.md).
Use [Input](../components/input.md), [Select](../components/select.md),
[Button](../components/button.md), [Link](../components/link.md),
[Progress](../components/progress.md), and [Alert Dialog](../components/alert-dialog.md).
Apply [Forms and validation](../patterns/forms-and-validation.md),
[Asynchronous feedback](../patterns/async-feedback.md), and
[Task continuity](../patterns/task-continuity.md). Progress represents operations,
not position in the step sequence.

## Actions and permissions

Review does not create anything. The creation action names the resource and
commits the reviewed configuration. Revalidate authorization and configuration
server-side at commitment; client eligibility is not authorization. Lock duplicate
submissions and unsafe correction during provisioning. Retry only unfinished work
after partial completion, retaining the authoritative resource identifier.
If permission changes, explain the boundary and provide a safe support or return
destination without exposing inaccessible resource details.

## States, sequence, and continuity

Distinguish configuration, invalid input, review, pending, failure before creation,
partial completion, unknown result, and confirmed completion. A partial result
identifies completed and failed operations. Unknown creation is reconciled before
another creation attempt. Ignore outcomes from superseded requests; use server
idempotency and operation identifiers in production. A failed retry does not erase
the resource already created. Configuration changes after creation belong to a
separate supported update operation, not an implicit create retry.

Preserve configuration on failure. Explain draft retention, resume, cancellation,
and exit semantics. The reference keeps state in memory, does not persist drafts,
and resets on reload. Browser Back leaves the flow; internal correction returns to
configuration. Leaving the reference is not rollback. Unload warnings are best
effort. Unknown-result checking returns a fixed simulated success.

## Content and data requirements

Supply resource type and name, supported configuration, exact creation scope,
operation status, durable identifiers, and usable recovery guidance. Missing or
unsupported configuration prevents review. Never synthesize real readiness from
elapsed time. The reference uses a fictional identifier and regions; no remote
resources, credentials, or permissions are created.

## Responsive and localization behavior

Stack configuration, summary values, and actions in reading order. Allow long
resource names and action labels to wrap. Support RTL, localized regions, 60%
text expansion, 200% text, and spacing overrides without clipping steps or outcomes.

## Accessibility

Use one page heading, a main landmark, native form labels, and a named error
summary linking to invalid fields. Move focus to the next stage or result heading
after deliberate transitions; announce pending work without repeated focus moves.
Keep progress indeterminate when no meaningful percentage exists. Dialog exit
defaults to keeping work and returns focus on cancellation. Support keyboard,
touch, visible focus, themes, forced colors, and reduced motion.

## Product instantiation

Supply entry authorization, validation, hosting options, default operations,
idempotency, resource and operation identifiers, reconciliation, support, retention,
and destinations. Explain which work is reversible. Real setup may continue on the
server after departure; resume must read authoritative state before retrying.

## Reference pages and validation

Open `/examples/initial-setup` and `/examples/initial-setup?context=project`.
Exercise required input, correction, duplicate prevention, failure before creation,
partial creation and retry, unknown outcome and checking, exit, reload, and long
names. Apply [Focused Flow](../verification/workflows.md#focused-flow),
[Template conformance](../verification/stress-tests.md#template-conformance), and
[baseline validation](../verification/baseline.md). Record limitations separately
from model tests and browser observations in the implementation record.

The project reference additionally uses [Date Input](../components/date-input.md)
for an optional target launch date. This is planning metadata; creation still
starts immediately. Validate date-only bounds before review and preserve the date
through correction and retry. See the [input/content evidence](../verification/input-content-evidence.md).
