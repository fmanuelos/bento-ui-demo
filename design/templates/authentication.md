# Authentication template

## Status

Draft. Password-based login and reauthentication define the initial scope.
Provider-specific authentication, passkeys, and multi-factor steps require their
own product integration and review. Runtime and validation evidence are tracked
in the [implementation record](../verification/focused-flow-evidence.md).

## Intent

Provide a bounded task for establishing or renewing access while preserving the
intended destination and any safely recoverable work.

## Use when

Use for an account login and for a session-expiry reauthentication journey. Both
share identity context, credentials, recovery access, feedback, and continuation.
The reference page demonstrates both contexts with simulated outcomes.

## Do not use when

Use [Registration](registration.md) to create an account. [Account Recovery](account-recovery.md) defines password-reset recovery.
Identity verification, provider selection, and multi-factor challenges need
explicitly defined steps when required; do not represent them as generic login
errors or add nonfunctional provider buttons.

## Classification

- Primary mode: [Focused Flow](../experiences/focused-flow.md).
- Variant: Authentication Flow.
- Primary domain: Identity & Access.
- Audience: signed-out users or users renewing an expired session.

## Regions and hierarchy

1. Product identity and a safe task-local return or exit route.
2. [Page Header](../blocks/page-header.md) with task name and account context.
3. Required instructions and any settled form-level error summary.
4. Labelled identifier and credential controls; optional product-supported help.
5. One primary sign-in action, recovery access, and an optional registration route.
6. Authoritative continuation or a clearly scoped failure.

A simple login uses fields directly. Use [Form Section](../blocks/form-section.md)
only when meaningful field grouping adds comprehension. Persistent global
navigation, marketing content, and an unnecessary confirmation screen are absent.

## Participating contracts

Apply [Input](../components/input.md), [Button](../components/button.md),
[Link](../components/link.md), [Alert](../components/alert.md),
[Forms and validation](../patterns/forms-and-validation.md),
[Task continuity](../patterns/task-continuity.md), and
[Asynchronous feedback](../patterns/async-feedback.md). The Page Header and
optional Form Section own only local arrangement, not authentication state.

## Actions and permissions

The primary action names the actual operation. Recovery and exit remain quieter
but discoverable. Reauthentication identifies the continuing task without
exposing private content. A consumer validates and authorizes the return target;
never redirect to an arbitrary supplied URL. Authentication does not imply
permission to the destination.

## States, sequence, and continuity

Support entry, validation failure, submitting, rejected credentials, service
failure, unknown result, authenticated continuation, and interrupted renewal.
Prevent repeated commitment while a request is pending. Associate errors with
fields when the cause is known; an authentication rejection must not falsely
identify an account as existing or absent. An unknown outcome requires a safe
status check or a product-defined retry, not a fabricated success.

Preserve the identifier and safe task context through recoverable failures.
Credentials follow the consumer's security policy; never persist them to browser
storage, URLs, logs, or analytics. Permit password managers, autofill, and paste.
An optional reveal control keeps its name, pressed state, and input association
clear. Leaving or unmounting cancels local pending work and prevents late updates.
Reauthentication restores only work the renewed identity may access.

## Content and data requirements

Use persistent labels and correct identifier purpose. Password input uses
`current-password` autocomplete and identifiers use `username` where they identify
an account. Do not treat placeholder text as a label. State actionable problems
without exposing credentials. The consumer supplies provider rules, credentials,
error mapping, destinations, and session policy. Reference inputs are samples;
no credential is transmitted or retained by the reference implementation.

## Responsive and localization behavior

Use the Focused Flow narrow or readable container with page padding and a single
column by default. Wrap guidance and actions before clipping. Preserve the
primary and safe exit actions with a virtual keyboard, 200% text, 60% expansion,
increased spacing, and RTL. Do not require a viewport-height card.

## Accessibility

Provide one page heading and a named form. Following failed submission, focus
the error summary or first invalid field; summary links lead to actual fields.
Do not both focus and repeatedly announce the same full error. Pending status is
concise and does not erase the action label. Successful continuation moves focus
to its meaningful destination. Support keyboard, touch, screen readers, high
contrast, forced colors, reduced motion, autofill, and password managers.

## Product instantiation

Each consumer supplies the identity provider, supported factors, policy, recovery
route, safe return destination, data-retention boundary, and permission checks.
Two reference uses are a fresh login and session renewal returning to a report.
The reference outcome controls belong to preview tooling outside the task.
They do not implement a real session or an authentication service.

## Reference pages and validation

Validate login and reauthentication for session renewal. Exercise required
and malformed input, successful continuation, rejected credentials, service
failure, pending duplicate activation, exit during a pending request, password
reveal, reload, and safe return. Reload starts a fresh reference task; no sample
credential or simulated session persists.

Apply [Focused Flow](../verification/workflows.md#focused-flow),
[Form workflow](../verification/workflows.md#form-workflow),
[Template conformance](../verification/stress-tests.md#template-conformance), and
[baseline validation](../verification/baseline.md). Record tested environments
and outstanding assistive-technology or provider checks in the
[implementation record](../verification/focused-flow-evidence.md).
