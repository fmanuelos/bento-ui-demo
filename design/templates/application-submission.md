# Application Submission template

## Status

Draft. Membership and service applications define the initial scope. The references
simulate receipt without sending applications. Attachments, identity proof, and
live processing are excluded from this first implementation. See the
[implementation record](../verification/broader-journeys-evidence.md).

## Intent

Help people prepare, correct, and submit an application once, retain recoverable work, and distinguish a confirmed receipt from an approval decision.

## Use when

Use for membership and service applications with applicant details, applicable
conditional requirements, a consequential review boundary, and submission receipt.
Both references support individual and organization applicants.

## Do not use when

Use [Registration](registration.md) for account creation, [Account Onboarding](account-onboarding.md)
for profile readiness, and [Record Detail](record-detail.md) for inspecting a received
application. Payment, file attachments, complex eligibility adjudication, and
identity proof need explicitly scoped contracts or product integrations.

## Classification

- Primary mode: [Focused Flow](../experiences/focused-flow.md).
- Applicable candidate variant: Application Flow.
- Domains: Account for membership; Help & Support for the service-request example. Consumers classify their actual capability.
- Audience: applicants eligible to enter the consuming product's application process.
- Excluded scope: payment, identity proof, and approval decisions.

## Regions and hierarchy

1. Task identity, application scope, and safe exit.
2. Step navigation for the meaningful sequence.
3. Applicant information and conditional requirements.
4. Scoped validation and recovery guidance.
5. Review Summary with correction routes and material consequences.
6. Explicit Submit application action after review.
7. Completion Summary identifying receipt and pending processing.

Processing and approval are separate outcomes; a receipt cannot imply either.

## Participating contracts

Apply [Page Header](../blocks/page-header.md),
[Flow Step Navigation](../blocks/flow-step-navigation.md) for a meaningful sequence,
[Form Section](../blocks/form-section.md), [Review Summary](../blocks/review-summary.md),
and [Completion Summary](../blocks/completion-summary.md). Use
[Forms and validation](../patterns/forms-and-validation.md),
[Task continuity](../patterns/task-continuity.md),
[Asynchronous feedback](../patterns/async-feedback.md), and
[Action hierarchy](../patterns/action-hierarchy-and-emphasis.md).
Inputs, Select, Button, Link, and Alert Dialog retain their own semantics.

## Actions and permissions

Separate Continue, Save draft, correction, and final submission. A change in
applicant type explains which dependent values will be cleared before activation.
Recheck eligibility, authority, and the reviewed snapshot at commitment. Do not
silently submit newly changed values or infer authority from disabled inputs.

## States, sequence, and continuity

Support entry, conditional fields, invalid, draft saved, resumed, expired,
reviewing, submitting, rejected, service failure, unknown outcome, and received.
Changing applicant type clears obsolete organization data and invalidates downstream
review. Revalidate the active branch before submission; hidden obsolete values
must not be sent. Preserve unrelated valid values through recoverable failures.

The reference saves sample values explicitly to tab-local storage for one hour;
resumption validates context, schema, expiry, and prerequisites. It never restores
a pending or completed status. Internal Back preserves values. Reload and browser
Back leave the internal sequence and offer a valid saved draft on re-entry.
Warn on meaningful unsaved departure; browser unload protection is best effort.
Unknown submission outcomes block another submit until authoritative reconciliation.
The preview's Check simulated result returns a fixed simulated receipt, not a server check.

## Content and data requirements

Supply field purposes, applicant types, conditional requirements, review labels,
consequences, receipt identity, and processing expectations. A missing required
answer differs from not applicable. Exercise long names, empty conditional values,
changed branches, corrupted drafts, service failure, and unavailable processing
information. Do not invent legal consent or approval timelines.

## Responsive and localization behavior

Use a readable Focused Flow container and single-column form. Wrap step labels,
review values, instructions, and action groups without changing their reading
order. Keep current-step context visible when navigation wraps. Preserve focus
with virtual keyboards, 200% text, expanded translations, increased spacing,
RTL, and mixed-direction values. Avoid fixed-height cards or scroll traps.

## Accessibility

Provide one task heading, a named form, and a distinct current-step heading.
Move focus to the new step heading after deliberate navigation and to a named
error summary or invalid control after failed validation. Summary links focus the
actual field; avoid duplicate announcements. Step navigation exposes the current
step and textual availability. Announce pending and confirmed results concisely.
On completion focus the outcome heading. Support keyboard, touch, screen readers,
visible focus, themes, forced colors, and reduced motion.

## Product instantiation

Consumers provide business eligibility, schema and branch rules, draft ownership,
retention, submission identity and duplicate prevention, receipt retrieval, and
processing communication. Real services must reconcile uncertain outcomes before
resubmission. Membership and service examples share submission structure while
retaining separate entry descriptions and draft contexts.

## Reference pages and validation

Validate membership and service applications. Exercise required fields,
organization branch validation, correction and dependent-value clearing, draft
save and resume, interrupted pending work, service failure, duplicate submission,
unknown outcome, and receipt distinct from approval.

Apply [Focused Flow](../verification/workflows.md#focused-flow),
[Form workflow](../verification/workflows.md#form-workflow),
[Review and completion](../verification/workflows.md#review-and-completion),
[Template conformance](../verification/stress-tests.md#template-conformance), and
[baseline validation](../verification/baseline.md). The service context now uses [File Upload](../components/file-upload.md) for required
supporting documents and [Date Input](../components/date-input.md) for a preferred
start date. These are draft components with [partial evidence](../verification/input-content-evidence.md).
At least one successful upload and a valid date are required before review and
submission. Unfinished or rejected files must be removed or resolved. The reference
never reads or transmits file contents. Saving a draft retains the canonical date,
but no File objects, filenames, or upload receipts; restoring requires reselection
and renewed upload. Version 1 drafts migrate to an empty date. Dates express a
preference, not a confirmed appointment. Production products own upload transport,
server validation, remote detachment/deletion, retention, and date eligibility.
