# Order Summary block

## Status

Draft. A digital purchase and a recurring service order establish the repeated
monetary structure. Runtime and simulated references are documented in the
[implementation record](../verification/checkout-evidence.md).

## Intent

Group an order's items, quantities, adjustments, payable total, and recurring
commitments so people can understand the monetary scope before acting.

## Use when

Supported modes: Focused Flow.

Use in one-time digital purchase review and recurring subscription checkout.
The consumer supplies authoritative pricing and owns the payment state machine.

## Do not use when

Use [Plan Comparison](plan-comparison.md) to compare offers and
[Review Summary](review-summary.md) for non-monetary answers or proposed changes.
This block is not a cart editor, invoice accounting system, payment form, or receipt
authority. A visually similar workspace invoice does not establish another supported mode.

## Anatomy

1. Required section heading and explicit currency.
2. Required quote availability, freshness, or captured-order context.
3. Item collection with stable identity, name, quantity, unit price, and line total.
4. Labelled monetary breakdown including applicable subtotal, discounts, tax, fees, and shipping.
5. Explicit total due now or an accurately labelled confirmed amount.
6. Recurrence basis, renewal amount, introductory conditions, and cancellation context when applicable.
7. Optional corrections adjacent to the reviewed order.

Unavailable or empty orders display a scoped message instead of a payable total.

## Variants

One-time and recurring orders share the same monetary relationships. Recurring
orders require renewal context; they do not infer renewal from an item name. No
editable cart or invoice-table variant is established.

## Participating components and related patterns

Use [Button](../components/button.md) or [Link](../components/link.md) for
consumer-supplied corrections. Apply [Data display](../patterns/data-display.md),
[Forms and validation](../patterns/forms-and-validation.md),
[Asynchronous feedback](../patterns/async-feedback.md), and
[Responsive density](../patterns/responsive-density.md).
[Checkout](../templates/checkout.md) owns commitment, provider handoff, and recovery.

## Content requirements

Show meaningful item names and quantity units; clearly label credits and discounts.
Supply complete localized monetary values and an explicit currency, including the
meaning of zero, excluded, unknown, and not applicable amounts. Shipping of a
digital purchase may be explicitly zero or not applicable; unknown tax cannot be
silently treated as zero. Reconcile breakdown and total using product-owned
rounding and authoritative pricing. The block does not calculate taxes or totals.

Separate payment due now from renewal charges. Explain introductory discounts,
billing frequency, quantity basis, and applicable timing and cancellation context.
Do not display illustrative amounts as live offers or stale quotes as payable.
Mask any sensitive supporting information supplied by the consumer.

## Layout and semantic token mapping

Use [Focused Flow](../../DESIGN.md#focused-flow-mode) container, group spacing,
heading/body type, surfaces, borders, and focus roles. Give item names and
qualifications room to wrap. Emphasize the total with existing weight and border
roles instead of a new monetary color or token scale.

## States and behavior

Reflect current, stale, and unavailable quote state. Stale values remain explicitly
previous and require refresh/review. Empty or unavailable orders expose no payable
amount. The consumer controls correction availability and clears prior agreement
when the order changes. Submitted snapshots stay stable while payment is pending.
Changing display data never submits payment or establishes success.

The runtime accepts preformatted monetary strings; it cannot verify arithmetic,
authority, expiry, currency consistency, or whether a supplied confirmed-total
label is justified. Those remain consumer obligations. No provider fields,
submission handler, timers, focus transitions, or announcements are built in.

## Responsive and localization behavior

Allow label/value rows to wrap or stack in source order. Keep monetary text intact
where possible without forcing page-level overflow. Support RTL with isolated
amount direction, long translated item names, 60% expansion, 200% text, text-spacing
overrides, local separators, and zero- or three-decimal currencies supplied by the
consumer. References currently exercise fictional USD only.

## Accessibility

Expose the summary's name, each item, quantity and price relationships, and total
labels through document structure. Corrections have meaningful names and visible
focus. Recurring consequences remain readable without activating disclosure.
Meaning does not depend on alignment or emphasis alone. Consumer announcements
describe changed totals without rereading the entire order. Support themes,
keyboard, touch, forced colors, and reduced motion.

### Web adapter

Use a heading-labelled `section`, a semantic item list, and `dl` pairs for item
details and monetary breakdown. Use `bdi` around preformatted values in mixed
direction content. Correction controls are native buttons or anchors. Do not
embed a form, submit action, live region, or provider iframe in the block itself.

## Representative example

- A digital library order shows two licenses, a multi-license discount, illustrative
  tax, zero shipping, and a one-time total with a quantity correction action.
- A monthly editorial service shows seats, a first-month discount, the first
  payment, and the full monthly renewal amount after that discount ends.

## Validation scenarios

Exercise both uses with one and multiple items, quantity changes, zero discounts,
tax unavailable, long names, stale and unavailable quotes, delayed payment,
confirmed totals, and renewal qualifications. Verify monetary arithmetic in the
consumer, and absence of a payable total for unavailable data. Apply
[Checkout](../verification/workflows.md#checkout),
[Review and completion](../verification/workflows.md#review-and-completion),
[Block composition and reflow](../verification/stress-tests.md#block-composition-and-reflow),
and the [baseline](../verification/baseline.md). Include RTL, enlarged text,
localized currencies, keyboard, screen readers, and both themes.
