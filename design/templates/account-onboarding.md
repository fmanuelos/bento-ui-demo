# Account Onboarding template

## Status

Draft. Individual and invited-user profile setup define the initial scope.
Simulated references exist; live profile persistence, invitation authority, and
broader accessibility validation remain outstanding. See the
[implementation record](../verification/broader-journeys-evidence.md).

## Intent

Help a newly registered person complete necessary profile setup and optional preferences, with a clear distinction between account creation and readiness to continue.

## Use when

Use after account creation for individual profile setup and invited-user profile
setup. Both share required profile details, optional preferences, review, and a
confirmed handoff. Include only fields necessary for the declared outcome.

## Do not use when

Use [Registration](registration.md) to create an account and
[Settings](settings.md) to revisit existing preferences. Organization provisioning,
resource setup, payment, and invitation acceptance that grants new permissions
require separate commitments. Do not turn optional personalization into eligibility.

## Classification

- Primary mode: [Focused Flow](../experiences/focused-flow.md).
- Applicable candidate variant: Onboarding Flow.
- Primary domain: Account; Identity & Access is secondary only when authority materially affects the task.
- Audience: newly registered individuals and invited users with product-verified access.
- Excluded scope: account creation, access grants, and resource provisioning.

## Regions and hierarchy

1. Task identity and safe exit.
2. Task heading with individual or team context.
3. Optional step navigation for a stable meaningful sequence.
4. Required profile details and clearly optional preferences.
5. Review with scoped correction actions when it reduces mistakes.
6. Current-step primary action, Back, optional Skip, and supported Save draft.
7. Confirmed completion and authorized next destination.

A short onboarding task need not use several steps or a review screen.

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

Name the final action Finish setup rather than Create account. Explain which
preferences can be skipped and what default or absence results. Invited context
does not verify an invitation or grant membership. The consumer rechecks access
before saving and authorizes the destination. Keep exit and correction available
except during transitions whose interruption policy is explicitly explained.

## States, sequence, and continuity

Support editing, invalid, skipped preferences, reviewing, saving, failed, unknown,
complete, restored, expired draft, and changed access. Skipping explicitly clears
or retains optional values according to a stated rule; the reference clears them.
Corrections invalidate affected review readiness. A saved draft is not a completed
profile. Unknown outcomes require a status check before repeated commitment.

The reference stores sample values only on explicit Save sample draft, in tab-local
session storage for one hour. Resume revalidates the saved shape and prerequisites;
no account identity or authorization is restored. Internal Back preserves values.
Reload or browser departure starts fresh with an optional saved-draft offer; browser
Back does not traverse the internal steps. Unsaved exit asks for confirmation and
browser departure uses best-effort unload protection. Real products define durable
storage, retention, account ownership, and supported navigation restoration.

## Content and data requirements

Supply field purpose, required versus optional status, accurate defaults, team
context, readiness criteria, and destination. Use sample values in references,
not real account data. Exercise long names, absent preferences, translated labels,
and invalid or unavailable saved drafts. Never infer eligibility from a query parameter.

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

Consumers supply profile schema, valid account context, invitation authority,
save and readiness rules, persistence and expiry, permitted skips, and safe
continuation. The two references use the same profile structure but different
entry descriptions; their success does not establish a real profile or membership.

## Reference pages and validation

Validate individual and invited-user onboarding. Exercise required input, skip,
correction, explicit draft save and resume, expiry, failed submission, duplicate
activation, unknown result reconciliation, and confirmed completion.

Apply [Focused Flow](../verification/workflows.md#focused-flow),
[Form workflow](../verification/workflows.md#form-workflow),
[Review and completion](../verification/workflows.md#review-and-completion),
[Template conformance](../verification/stress-tests.md#template-conformance), and
[baseline validation](../verification/baseline.md). Keep simulated evidence separate
from provider, storage, and assistive-technology validation.
