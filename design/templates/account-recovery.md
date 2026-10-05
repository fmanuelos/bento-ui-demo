# Account Recovery template

## Status

Draft. Password-reset requests and resuming recovery through expired or invalid
reset links define the initial scope. Provider integration, interactive reference
pages, token handling, delivery behavior, and accessibility validation remain
outstanding. Assisted identity proof and recovery of lost authentication factors
are excluded from this draft.

## Intent

Help people regain access through an authorized password-reset process with
clear request, reset, failure, and completion boundaries.

## Use when

Use for a forgotten-password request and a return through an expired reset link.
Both share a request stage, provider-authorized reset stage, understandable
recovery from invalid entry, and a confirmed handoff to authentication.

## Do not use when

Use [Authentication](authentication.md) for sign-in or session renewal and
[Registration](registration.md) for account creation. An authenticated password
change, lost-factor recovery, identity proof, or administrator-assisted recovery
requires separately defined authority and recovery behavior.

## Classification

- Primary mode: [Focused Flow](../experiences/focused-flow.md).
- Applicable candidate variant: Account Recovery Flow.
- Primary domain: Identity & Access.
- Audience: people requesting password recovery or following a recovery link.
- Excluded scope: identity proof, lost-factor recovery, and authenticated credential changes.

## Regions and hierarchy

1. Product identity and a safe exit to authentication.
2. [Page Header](../blocks/page-header.md) naming the current recovery task.
3. Task instructions and scoped feedback without disclosing account existence.
4. Request identifier input, or authorized new-password fields, according to the current stage.
5. One primary stage action and applicable recovery or return links.
6. Request acknowledgement or [Completion Summary](../blocks/completion-summary.md) according to the authoritative outcome.

A request acknowledgement does not mean a message was delivered or a password
changed. Do not show a step count implying control over external message delivery.
A reset form appears only after the consumer establishes reset authority.

## Participating contracts

Apply [Form Section](../blocks/form-section.md) when meaningful grouping is needed,
[Input](../components/input.md), [Form Field](../components/form-field.md),
[Button](../components/button.md), [Link](../components/link.md),
[Alert](../components/alert.md),
[Forms and validation](../patterns/forms-and-validation.md),
[Task continuity](../patterns/task-continuity.md), and
[Asynchronous feedback](../patterns/async-feedback.md).

## Actions and permissions

Separate requesting instructions, requesting them again, submitting a new
password, and returning to sign-in. Enforce provider eligibility and resend rules;
a countdown or disabled control does not establish authority. Public-facing
responses follow the consumer's anti-enumeration policy without claiming an
account exists. A query parameter alone cannot authorize a reset. Verify return
destinations and do not treat password reset as permission to the requested resource.

## States, sequence, and continuity

Support request entry, malformed input, pending request, acknowledgement, service
failure, retry unavailable, token validation, authorized reset entry, expired or
invalid link, pending reset, rejected password, unknown outcome, and confirmed reset.
Do not render authorized fields while token validation is still pending. Invalid,
expired, or already-used links offer a safe new request or sign-in path.

Prevent duplicate commitments while pending. Preserve only safe identifier and
task context through recoverable failures. Never retain passwords or recovery
secrets in application storage, logs, or analytics. Incoming recovery tokens follow
the provider's transport policy; avoid propagating them into unrelated links,
referrers, or return URLs. Clear password inputs after confirmed completion.

Reload and external-link return require fresh provider validation; an in-memory
stage cannot prove continued authority. Resending must explain applicable link
replacement behavior without inventing provider policy. Interrupted or unknown
resets require an authoritative outcome check or provider-defined safe recovery;
never claim success from a timeout. Completion states whether sign-in is required
and makes no claim about session revocation unless the provider confirms it.

## Content and data requirements

Provide persistent identifier and password labels, actual password requirements,
actionable errors, and accurate instructions. Use identifier autocomplete matching
the account model and `new-password` for reset input. Permit password managers,
autofill, and paste. Optional reveal controls expose their state and association.
Never repeat secrets in summaries or reveal account existence through sample copy.
Exercise long identifiers, translated instructions, malformed links, and delayed delivery.

## Responsive and localization behavior

Use a narrow or readable Focused Flow container and a single-column form. Wrap
instructions and actions without a fixed-height card. Keep primary and safe exit
actions usable with virtual keyboards, 200% text, expanded translations, increased
spacing, RTL, and mixed-direction account identifiers. Time-based retry information
uses understandable localized units without announcing every second.

## Accessibility

Provide one page heading and a named form for each actionable stage. Associate
labels, help, and errors with controls. After invalid submission, focus an error
summary or first invalid field without duplicating announcements. On a deliberate
stage change, focus the new task heading or meaningful first control. Announce
pending and completed outcomes concisely. Support keyboard, screen readers,
visible focus, themes, forced colors, reduced motion, and password-manager use.

## Product instantiation

Supply the recovery provider, identifier policy, reset authority, delivery and
resend rules, expiry, password policy, safe destinations, credential retention,
and confirmed session consequences. Define anti-enumeration and outcome-recovery
behavior. Initial requests and expired-link entry share this structure; they do
not share an assumption that an account or valid token exists.

## Reference pages and validation

Plan forgotten-password and expired-link references using simulated outcomes.
Exercise malformed input, generic acknowledgement, unavailable resend, provider
failure, invalid and reused links, pending duplicate activation, rejected new
passwords, interrupted reset, unknown outcome, and confirmed handoff to sign-in.
These references are not implemented and will not send recovery messages.

Apply [Focused Flow](../verification/workflows.md#focused-flow),
[Form workflow](../verification/workflows.md#form-workflow),
[Review and completion](../verification/workflows.md#review-and-completion),
[Template conformance](../verification/stress-tests.md#template-conformance), and
[baseline validation](../verification/baseline.md). Record actual provider,
password-manager, token, delivery, responsive, and assistive-technology coverage.
