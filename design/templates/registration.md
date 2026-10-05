# Registration template

## Status

Draft. Self-service account creation and invited account creation define the
initial scope. Real account policy, invitation authority, and verification
integration remain consumer-owned. See the separate
[implementation record](../verification/focused-flow-evidence.md).

## Intent

Collect only the information needed to create an account, explain material
requirements before commitment, and identify whether the account is active or
still awaiting verification.

## Use when

Use for self-service registration and invited registration when both share
account details, applicable requirements, one creation decision, and an
understandable result. The reference page demonstrates both entry contexts.

## Do not use when

Use [Authentication](authentication.md) for existing accounts. Detailed profile
onboarding, [account recovery](account-recovery.md), payment, and organizational approval are separate
steps only when their requirements justify them. Do not require a review screen
for a small account form solely to reuse Review Summary.

## Classification

- Primary mode: [Focused Flow](../experiences/focused-flow.md).
- Variant: Onboarding Flow.
- Primary domain: Identity & Access.
- Secondary domain: Account when profile requirements materially change the task.
- Audience: new users, including people following a valid invitation.

## Regions and hierarchy

1. Product identity and task-local exit or existing-account destination.
2. [Page Header](../blocks/page-header.md) naming account creation and its context.
3. Required instructions and a scoped error summary when necessary.
4. [Form Section](../blocks/form-section.md) grouping account credentials.
5. Applicable qualifications followed by one account-creation action.
6. [Completion Summary](../blocks/completion-summary.md) after an authoritative
   creation result, including verification expectations when necessary.

[Section Header](../blocks/section-header.md) may name meaningful guidance outside
field groups. Do not repeat the fieldset legend or create redundant headings.

## Participating contracts

Apply [Input](../components/input.md), [Button](../components/button.md),
[Link](../components/link.md), [Alert](../components/alert.md),
[Forms and validation](../patterns/forms-and-validation.md),
[Task continuity](../patterns/task-continuity.md), and
[Asynchronous feedback](../patterns/async-feedback.md). Product rules determine
whether consent or eligibility controls are necessary; do not add invented
legal text or compulsory consent to a generic reference.

## Actions and permissions

Keep creation, existing-account sign-in, recovery, and exit distinct. Explain
requirements before submission. Invitation identity and eligibility are verified
by the consumer; a query parameter or disabled field does not prove authority.
If an invitation is expired, unavailable, or for a different identity, provide
an appropriate recovery path without silently creating a different membership.

## States, sequence, and continuity

Support editing, invalid, pending, rejected, service failure, unknown outcome,
created and active, and created but verification required. Pending or queued
work does not imply that an account exists. Prevent duplicate creation while
pending. An uncertain result follows the product's outcome-verification policy.

Preserve safe valid values after recoverable failures. Clear passwords on a
confirmed outcome and never retain them in storage, URLs, logs, or analytics.
Warn on an intentional exit when meaningful entered work would be lost; offer a
safe way to continue editing. Navigation, reload, and resumption follow an
explicit retention policy. The reference keeps values only in memory, warns on
leaving an edited form, and starts fresh on reload rather than claiming resumption.

A verification-required result states the pending boundary and next action. A
real consumer supplies expiring-token handling, resend policy, duplicate-account
recovery, and verification authority. A receipt is not evidence of verification.

## Content and data requirements

Provide persistent email and password labels, email input purpose, and
`new-password` autocomplete. Use `username` autocomplete when email is the account
identifier. Allow autofill and paste. Explain the actual password requirement
before entry and validate it consistently; requirements in a reference are sample
rules, not a recommended universal account policy.

Product-specific terms, consent, eligibility, invitation data, and verification
copy must be accurate and available before they affect a decision. Never render
secret values in an error summary or completion reference.

## Responsive and localization behavior

Use a narrow or readable Focused Flow container with one column by default.
Stack actions, preserve long instructions, and avoid fixed-height surfaces.
Support narrow screens, virtual keyboards, 200% text, 60% expansion, increased
spacing, localized content, mixed-direction email addresses, and RTL.

## Accessibility

Use one page heading and a native fieldset and legend for related credentials.
Keep individual labels and errors associated with each control. On invalid
submission, focus a named error summary with links to affected fields. After a
confirmed outcome, move focus to the result heading according to the workflow;
the Completion Summary itself does not move focus or announce automatically.
Ensure visible keyboard focus, usable targets, theme contrast, forced colors,
reduced motion, and equivalent password-manager and paste access.

## Product instantiation

Consumers supply real creation, invitation validation, policy, verification,
recovery, and authorized destinations. The two representative uses are public
self-service creation and creation from an organization invitation. Their local
structure remains stable; membership and identity rules remain product-owned.
Reference previews use sample values and simulated results without network calls.

## Reference pages and validation

Validate self-service and invited registration. Exercise
missing and malformed values, the displayed sample password rule, submission
failure with retained input, duplicate activation, interrupted submission,
intentional exit, confirmed creation, and verification-required completion.
A successful reference operation does not create an account or send email.

Apply [Focused Flow](../verification/workflows.md#focused-flow),
[Form workflow](../verification/workflows.md#form-workflow),
[Review and completion](../verification/workflows.md#review-and-completion),
[Template conformance](../verification/stress-tests.md#template-conformance), and
the [baseline](../verification/baseline.md). Record both exercised conditions and
remaining real-provider and assistive-technology checks in the
[implementation record](../verification/focused-flow-evidence.md).
