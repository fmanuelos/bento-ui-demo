# Checkout implementation record

This record covers the October 5, 2026 third broader-journeys batch in the working
tree. Checkout and Order Summary remain Draft. Runtime availability, model tests,
browser observations, and production-provider readiness are separate claims.

## Availability and scope decisions

Checkout has two contexts: a one-time digital library purchase and a monthly
editorial service subscription. Order Summary has an exported runtime, a two-item
gallery example, and both checkout uses. The catalogs now contain 14 template
contracts and 23 block contracts; 14 blocks have runtime implementations.

File Upload, Date Input, and Code Block are not added: no admitted reference
requires attachments, scheduling, or executable instructions. Introducing those
components needs a concrete consumer and independent contract/validation scope.
No new primitive component or payment-provider dependency is introduced in this
checkout batch. File Upload, Date Input, and Code Block were subsequently admitted
for other references in the [input/content batch](input-content-evidence.md).

## Payment and recovery boundaries

All amounts, tax, discounts, identifiers, delays, provider steps, receipts, and
fulfillment results are fictional. The reference collects no card, billing,
contact, or authentication data and sends no payment requests. No order,
subscription, charge, or real download is created. The acknowledgement applies
to the preview and accepts no actual agreement.

The model uses integer USD cents, captures an immutable quote at submission,
clears acknowledgement after corrections and refreshed pricing, locks duplicate
submission, and distinguishes payment confirmation from fulfillment. Quote expiry
and unavailability are scenario controls, not authoritative inventory or clocks.
Changed quotes increase the illustrative unit price and require review again.

The provider panel is a local handoff simulation. Its return leaves the outcome
unknown until checked. Cancellation explicitly simulates an unpaid cancellation;
a real cancellation requires provider confirmation. Checks can confirm payment
and fulfillment, confirm not paid, or remain unresolved. Unknown and paid orders
cannot submit another payment. Checks and payment results reject stale identifiers.

All state is in memory. Reload, browser departure, and changing reference contexts
reset it. Before-unload warnings are best effort. Exit is not payment cancellation.
This is deliberately not durable payment recovery or production idempotency.
Production consumers must persist non-sensitive order/attempt identifiers and
reconcile authoritative provider state before re-enabling payment after return.

## Validation

Using Node 24.16.0, pnpm 11.22.0, and the repository dependencies on macOS:

- `pnpm check` passed formatting, design lint, migration, block and template
  coverage, all 42 model/catalog tests, component/icon/focus checks, ESLint,
  TypeScript, and the production build. Ten new checkout tests cover arithmetic,
  review gates, changed quote acknowledgement, immutable snapshots, duplicate
  prevention, decline, verification return/cancellation, unknown outcomes,
  confirmed-unpaid recovery, paid-but-unfulfilled orders, and superseded checks.
- The template suite now admits Checkout and its Focused Flow workflow.
  Design lint retains zero errors and 129 known warnings. The existing production
  bundle warning above 500 kB remains; code splitting is separate work.

In the Codex in-app browser against the local Vite server:

- The digital purchase changed quantity and reconciled its discount, tax, and total.
  Payment remained disabled until keyboard acknowledgement. Refreshing an increased
  quote cleared acknowledgement and changed the payment amount. Expired quotes
  displayed previous-price wording; unavailable quotes hid the summary amounts and
  disabled the action with an unavailable label. Zero discount now renders $0.00,
  not negative zero.
- A declined payment retained the reviewed order and required review again.
  Verification cancellation returned to a safe retry boundary. A subsequent
  simulated provider return produced an unknown result instead of success.
- An unresolved check retained the attempt and offered no resubmission. Exit
  confirmation focused Keep reviewing; cancelling preserved the attempt. A later
  successful check confirmed the same attempt and displayed its simulated receipt.
- A separate unknown-payment scenario was checked as unpaid, then deliberately
  reviewed and successfully submitted as a new attempt with a new receipt.
- The subscription reference distinguished the first payment ($66.00 for two seats)
  from its monthly renewal ($79.20). Payment confirmation with delivery pending kept
  the receipt and offered only result checking; fulfillment completion preserved
  that receipt and did not start another charge.
- Checkout stage headings received focus after deliberate transitions. Keyboard
  Space operated review acknowledgement. At 390 by 844, the subscription review
  had no measured horizontal main-content overflow with RTL and 200% text; the
  page heading doubled to 80 px. Preview option labels were shortened to remain
  readable at that size. Light and dark views and desktop documentation at 1440
  by 1000 were inspected. These are bounded observations, not a full audit.
- Checkout documentation exposed both reference links. Order Summary documentation
  showed its Draft/Implemented status, evidence link, and two-item live example.
  No browser console errors were captured during the checked journeys.

## Remaining validation

Live provider selection and integration, secure embedded entry, server quote
authority, currency rounding beyond USD fixtures, authorization changes, durable
idempotency, real redirects and callbacks, cross-device recovery, receipts,
fulfillment, cancellation settings, and production support are unimplemented.
Full screen-reader, forced-color, translated-content, mobile-keyboard, provider-frame,
and cross-browser validation remains outstanding. These limits prevent a claim of
production checkout readiness or complete contract conformance.
