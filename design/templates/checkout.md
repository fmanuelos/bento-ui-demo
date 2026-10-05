# Checkout template

## Status

Draft. One-time digital purchases and recurring service subscriptions establish
the scope. Two simulated references exercise quote review and payment recovery;
provider integration and complete accessibility validation remain outstanding.
See the [implementation record](../verification/checkout-evidence.md).

## Intent

Help people review an order and its complete monetary commitment, submit payment
once, and understand the confirmed payment and fulfillment outcome.

## Use when

Use for a one-time digital purchase or recurring service subscription with an
authoritative order, a defined currency, payment eligibility, and explicit
fulfillment. Returning customers and visitors share the review and commitment
structure; identity and payment-provider choices remain product-owned.

## Do not use when

Use [Comparison](comparison.md) for comparing offers without commitment and
[Application Submission](application-submission.md) for submitting an application
without payment. Refunds, subscription administration, physical shipping,
multi-seller carts, financing, and payment disputes need additional scope.
Do not use the reference simulator as a production payment adapter.

## Classification

- Primary mode: [Focused Flow](../experiences/focused-flow.md).
- Applicable candidate variant: Checkout Flow.
- Domains: assigned by the purchase or service being fulfilled.
- Audience: people eligible to purchase the selected offering.
- Excluded scope: financial services, physical delivery logistics, and ongoing billing administration.

## Regions and hierarchy

1. Main-content bypass and Page Header identifying the purchase.
2. Flow Step Navigation if selection, review, and result are separate stages.
3. Order details and correction controls, including quantity when meaningful.
4. Order Summary with currency, item quantities, adjustments, tax, total, and any renewal commitment.
5. Provider-owned payment entry or handoff, review acknowledgement when required, and a specifically labelled commitment action.
6. Pending, verification, declined, cancelled, unknown, or paid-but-unfulfilled feedback and recovery.
7. Completion Summary only for the confirmed outcome, with receipt and next steps.
8. Exit with a clear distinction between leaving and cancelling submitted payment.

## Participating contracts

Use [Page Header](../blocks/page-header.md),
[Flow Step Navigation](../blocks/flow-step-navigation.md),
[Form Section](../blocks/form-section.md), [Order Summary](../blocks/order-summary.md),
and [Completion Summary](../blocks/completion-summary.md).
[Review Summary](../blocks/review-summary.md) may supplement non-monetary details;
it does not replace the order's monetary relationships.
Use [Select](../components/select.md), [Checkbox](../components/checkbox.md),
[Button](../components/button.md), [Link](../components/link.md),
[Progress](../components/progress.md), and [Alert Dialog](../components/alert-dialog.md).
Apply [Forms and validation](../patterns/forms-and-validation.md),
[Asynchronous feedback](../patterns/async-feedback.md), and
[Task continuity](../patterns/task-continuity.md). Provider fields retain their own
security and accessibility integration; no generic card-input primitive is introduced.

## Actions and permissions

Selection and review create no financial commitment. The final action names its
amount and currency; recurring terms remain visible before commitment. Required
acknowledgement is unchecked initially and clears after quantity, price, availability,
or terms change. Do not preselect optional purchases or hide renewal conditions.

Revalidate the server quote, currency, eligibility, stock, and required terms at
commitment. Bind a durable idempotency key to an immutable order revision. Lock
duplicate submission and order correction while a payment is unresolved. A new
attempt is allowed only after authoritative evidence that retry is safe. The
reference uses local attempt identifiers and fictional outcomes, not authorization.

## States, sequence, and continuity

Distinguish selection, review, stale or unavailable quote, payment pending,
additional provider verification, decline, verified cancellation, unknown outcome,
payment confirmed with fulfillment pending, and confirmed completion. Retain the
submitted order snapshot and amount while processing. A changed quote requires
renewed review. Missing prices are unavailable, not zero.

A provider return URL, elapsed time, or client callback alone does not prove
payment. Verify server-side provider evidence and reconcile the existing attempt.
An unknown result offers checking and support rather than another payment button.
If checking remains unresolved, keep the attempt and explain the next safe action.
Ignore late or duplicate payment and check responses. Confirmed payment with failed
or pending fulfillment must never restart charging as a delivery retry.

Preserve recoverable non-sensitive work and define expiry and restoration policy.
Real reload, Back, redirect, and cross-device return must restore authoritative
order and attempt state before permitting payment. Never persist card data or
security codes in a draft. Leaving does not imply cancellation or refund. Only an
authoritative cancellation permits a fresh payment attempt.

The reference keeps all state in memory and resets on reload; it is not durable
payment recovery. Internal correction returns to selection; browser Back leaves
the reference. Unload warnings are best effort. Payment and check delays are local
simulations. Quote expiry is scenario-driven, not a production expiry clock.

## Content and data requirements

Supply stable item and order identities, quantity units, currency, authoritative
minor-unit amounts, discounts, taxes, fees, shipping applicability, and quote
revision/expiry. Products own rounding and the applicable currency exponent. Clearly
distinguish subtotal, total due now, and recurring amounts; one-time discounts must
not appear to reduce every renewal. Explain fulfillment, material restrictions,
cancellation, and support destinations before commitment.

Receipts identify the confirmed order and payment, not just an accepted request.
Do not expose payment secrets in labels, URLs, logs, or local storage. Reference
USD prices and tax are fictional fixtures; no actual payment details are collected.

## Responsive and localization behavior

Keep currency and amounts unambiguous in RTL and mixed-direction content. Stack
item details and summary rows before narrow columns obscure their relationships.
Allow long names and payment action labels to wrap. Support localized numbers,
60% text expansion, 200% text, user spacing, and provider-frame reflow. Do not move
qualifications out of reading order or hide totals behind optional disclosure.

## Accessibility

Provide one page heading, main landmark, named form groups, item lists, and
label-value relationships. The payment action communicates its amount. Associate
errors with the owning fields; provider errors need accessible local feedback.
Focus new stage or outcome headings after deliberate transitions and preserve
focus during background checking. Announce relevant status changes once; do not
continuously announce the entire order. Provider handoff must support keyboard
entry, return focus, and useful failure recovery. Support visible focus, touch,
themes, forced colors, and reduced motion.

## Product instantiation

Supply server quote authority, currency/rounding rules, order revision, eligibility,
terms, payment provider, secure entry, idempotency, redirect validation, server-side
verification, reconciliation, durable recovery, receipt, fulfillment, and support.
Bind authenticated or guest recovery to the correct order without exposing another
person's purchase. Validate provider behavior separately from the template.

File Upload, Date Input, and Code Block are not admitted for these two uses:
neither requires attachments, scheduling, nor executable instructions. If a future
checkout needs them, assess and define their own contracts before adding them.

## Reference pages and validation

Validate one-time digital purchases and recurring service subscriptions.
Exercise quantity correction, first-payment versus renewal amounts, quote changes,
expiry, unavailable offers, duplicate prevention, decline, verification cancellation,
provider return, unresolved checks, confirmed-unpaid recovery, fulfillment delay,
completion, exit, and reflow. Apply [Checkout](../verification/workflows.md#checkout),
[Focused Flow](../verification/workflows.md#focused-flow),
[Template conformance](../verification/stress-tests.md#template-conformance), and
[baseline validation](../verification/baseline.md). Record simulated behavior
separately from real provider and complete assistive-technology validation.
