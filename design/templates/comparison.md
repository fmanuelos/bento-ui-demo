# Comparison template

## Status

Draft. Public subscription-plan and recurring service-package comparison define
the initial scope. The reference supports offer summaries, not a dense attribute
matrix or real checkout. See the [implementation record](../verification/broader-journeys-evidence.md).

## Intent

Help visitors compare plans or service offers on a consistent basis, understand qualifications, and choose an eligible next step.

## Use when

Use for subscription plans and recurring service packages with comparable named
attributes, an explicit price and billing basis, qualifications, and available
next steps. At least two offers must share a meaningful comparison basis.

## Do not use when

Use [Product Landing](product-landing.md) for introducing one offer and
[Public Content](public-content.md) for sustained reading. Arbitrary product
comparison, authenticated subscription management, payment entry, and checkout
require separate scope. Public comparison does not authorize a purchase.

## Classification

- Primary mode: [Public Site](../experiences/public-site.md).
- Applicable candidate variant: Marketing Site.
- Primary domain: Marketing.
- Audience: visitors comparing publicly available plans or services.
- Excluded scope: checkout, payment, and authenticated subscription management.

## Regions and hierarchy

1. Public navigation and a main-content bypass.
2. Page Header naming the decision and audience.
3. Comparison basis controls such as billing period.
4. Plan Comparison with consistent attributes and scoped availability.
5. Qualifications, limitations, and applicable supporting guidance.
6. Public footer and supporting destinations.

Keep billing basis before prices and each offer's next action beside its conditions.

## Participating contracts

Apply [Public-site Navigation](../blocks/public-site-navigation.md),
[Page Header](../blocks/page-header.md), [Plan Comparison](../blocks/plan-comparison.md),
[Site Footer](../blocks/site-footer.md), and [Select](../components/select.md),
[Button](../components/button.md), [Link](../components/link.md),
[Data display](../patterns/data-display.md),
[Asynchronous feedback](../patterns/async-feedback.md), and
[Action hierarchy](../patterns/action-hierarchy-and-emphasis.md).
The reference footer uses a minimal local arrangement; a shared Site Footer
runtime implementation is not claimed.

## Actions and permissions

Changing basis updates prices, billing text, qualifications, and available actions
consistently. Clear or revalidate prior selection when basis or eligibility changes.
Unavailable or stale offers cannot imply a confirmed payable price. Real next-step
navigation carries an offer identifier and revalidates it at the destination;
never treat browser-displayed totals as purchase authority.

## States, sequence, and continuity

Support loading without invented prices, current offers, independently unavailable
peers, stale prices, changed basis, and selected next step. Preserve useful peers
when one offer fails. Ignore superseded async responses. Communicate changed or
removed selected offers without silently choosing another. The reference uses
synchronous fictional data; the scenario controls expose loading, partial, and
stale conditions without making real requests.

Keep comparison context on browser return when the product promises it. The
reference resets to the default basis on reload and does not persist selection.
Selecting an offer displays a preview message and never begins checkout.

## Content and data requirements

Supply comparable attribute labels, authoritative values, currency, billing period,
limits, eligibility, and qualification wording. Show annual totals distinctly from
monthly equivalents. Missing data is not zero or excluded functionality. Reference
prices and capabilities are explicitly fictional and cannot be represented as
real offers. Exercise long offer names, differing limits, missing values, and
unavailable or stale pricing.

## Responsive and localization behavior

Stack offer summaries while keeping labels attached to values and actions.
Do not hide limitations to fit a narrow screen. If a future attribute matrix is
implemented, preserve row and column relationships with an accessible overflow
strategy. Support expanded translations, localized currency and numbers, 200%
text, RTL, and meaningful source order.

## Accessibility

Provide one page heading, a named comparison region, labelled basis controls,
meaningful offer names, and semantic attribute relationships. Distinguish missing,
included, and unavailable values in text. Announce selection and relevant offer
changes without stealing focus. Support bypass, keyboard navigation, visible
focus, touch targets, themes, forced colors, and reduced motion.

## Product instantiation

Supply offers, pricing authority, billing bases, supported currencies, eligibility,
comparison attributes, qualification text, and real next destinations. Product
rules own taxes, fees, commitments, and renewal conditions. The references
exercise subscription and service packages without real monetary operations.

## Reference pages and validation

Validate subscription-plan and recurring-service-package comparisons.
Exercise billing-basis changes, selection clearing, loading without prices,
independent offer unavailability, stale-price refresh, narrow layouts, and RTL.

Apply [Public landing](../verification/workflows.md#public-landing),
[Plan selection](../verification/workflows.md#plan-selection),
[Template conformance](../verification/stress-tests.md#template-conformance), and
[baseline validation](../verification/baseline.md). Real offer retrieval, checkout
handoffs, attribute matrices, translations, and assistive-technology checks remain
separate validation work.
