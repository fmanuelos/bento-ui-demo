# Plan Comparison block

## Status

Draft. Public pricing and account-upgrade examples establish the intended scope.
Validation of offer comparability, changing prices, selection, and narrow-screen
access remains outstanding. Examples describe designs, not tested billing flows.

## Intent

Plan Comparison arranges comparable offers so a person can understand their
prices, capabilities, limitations, and available next steps. It owns the
relationships among comparison context, plans, attributes, and actions. The
product owns prices, eligibility, recommendations, billing, and purchase rules.

## Use when

Supported modes: Public Site; Application Workspace.

Use in Public Site for a public pricing section and in Application Workspace
for account upgrades when two or more plans share a meaningful basis of
comparison. Classification is Shared across those two modes.

## Do not use when

Use [Feature Grid](feature-grid.md) for capabilities without plan selection and
[Call to Action](call-to-action.md) for a single public offer and next step. A
checkout, payment form, or account subscription-management page is a separate
flow or template. This block cannot establish payment behavior or conceal
consequences that belong in [Review Summary](review-summary.md).

## Anatomy

1. Required section heading and meaningful comparison scope
2. Optional controls for billing period, currency, or another supported offer basis
3. Required collection of two or more plans with comparable labelled attributes
4. Required shared qualifications when they affect the offers
5. Optional supporting explanation or contact destination

Each plan has a required name, price and billing basis or explicit quote-based
terms, comparable inclusions and limitations, and an available next step or
explanation of unavailability. Optional context identifies audience, current
plan, eligibility, or a substantiated recommendation. Read the comparison basis
before offers; keep each action associated with its price and conditions.

## Variants

- **Offer summaries:** Groups each plan's price, attributes, qualifications, and
  action for a small set of straightforward offers.
- **Attribute comparison:** Uses a relational table when comparing the same
  capability across plans is the main task.

These are alternative presentations of the same offer decision. They retain the
same authoritative values, plan order, and qualifications. Do not duplicate
focusable actions or contradictory prices if both representations are present.

## Participating components and related patterns

Use [Card](../components/card.md) for contained offer summaries,
[Table](../components/table.md) for relational comparison,
[Link](../components/link.md) for purchase destinations,
[Button](../components/button.md) for in-place actions,
[Radio](../components/radio.md) or [Select](../components/select.md) for mutually
exclusive billing choices, and [Alert](../components/alert.md) for scoped feedback.
Use [Status Badge](../components/status-badge.md) only for actual persistent state,
such as the current plan, rather than decorative marketing emphasis.

Apply [Data display](../patterns/data-display.md),
[Asynchronous feedback](../patterns/async-feedback.md),
[Forms and validation](../patterns/forms-and-validation.md) when selecting a plan,
[Action hierarchy](../patterns/action-hierarchy-and-emphasis.md), and
[Responsive density](../patterns/responsive-density.md). Offer controls and
purchase actions retain their component semantics and product-owned effects.

## Content requirements

State currency, billing period, quantity basis, commitment, and material charges
or exclusions. An annual offer expressed as a monthly equivalent also shows the
actual billed total and interval. “Free,” unavailable, quote-based, and unknown
prices are distinct. Show limits with units and explain inclusion or exclusion
in text; checkmarks and dashes cannot be the only meaning.

Use consistent attribute labels and an honest comparison basis. Current plan,
selected plan, and recommended plan are separate concepts. Recommendations need
an understandable basis and cannot imply that other plans are unavailable.
Name actions by plan and outcome. Treat the comparison as one decision region:
use at most one primary action, with equivalent quiet alternatives or a single
continuation after explicit selection. Do not silently select a paid option.

## Layout and semantic token mapping

Use [Public Site](../../DESIGN.md#public-site-mode) or
[Application Workspace](../../DESIGN.md#application-workspace-mode) layout,
padding, grid-gutter, and spacing roles as applicable. Reuse heading, body,
price-appropriate data typography, surface, text, border, and focus roles.
Prominence must not hide qualifications or turn every offer into a primary
action. Introduce no pricing-specific colors, equal-height constraints, or tokens.

## States and behavior

The product supplies current offers, selected basis, eligibility, and purchase
state. Initial loading never renders plausible prices. A billing-period change
must update prices, totals, limitations, and action destinations consistently;
ignore superseded responses and prevent committing a mismatched offer.

During refresh, safe stale values may remain identified as such, but an action
must not imply they are a confirmed payable price. Explain unavailable offers
and preserve usable peers when one lookup fails. If a selected offer changes or
becomes ineligible, communicate that change and follow the product's renewed
selection or review policy rather than switching plans silently. The purchase
flow owns final confirmation, duplicate prevention, cancellation, and recovery.

## Responsive and localization behavior

Stack offer summaries in stable order, keeping each attribute's label, price
basis, conditions, and action together. Attribute comparisons follow the Table
contract: preserve row and column associations with contained scrolling when
necessary or a semantically equivalent stacked presentation. Never create
page-level horizontal scrolling to retain decorative columns.

Support localized currencies and number formats, 60% expansion, 200% text,
increased spacing, multiple scripts, and RTL. Locale changes alone must not
silently change billing currency. Sticky labels or actions cannot obscure focused
content, limitations, or the actual billed total.

## Accessibility

Expose the comparison name, offer names, attribute relationships, and control
labels. Announce a settled user-initiated offer change proportionately through
the owning pattern. Current, selected, recommended, included, and excluded
meanings remain distinct without color, position, icons, or border weight.
Preserve keyboard access, visible focus, touch targets, contrast in both themes
and forced colors, and full information with reduced motion.

### Web adapter

Use a named `section` and a list of offer summaries, or a native table with a
caption and properly scoped headers for attribute comparison. Use native radios
or selects for choice controls; do not style tabs as a billing selector unless
the operation truly switches peer panels under the Tabs contract. Use anchors
for destinations and buttons for in-place actions, avoiding nested card controls.

## Representative example

These are illustrative offer structures, not real prices or commercial claims:

- A Public Site compares Starter and Team. In annual mode, Team displays
  “USD 20 per month, billed USD 240 annually,” with member limits and shared
  qualifications visible beside the plan decision.
- An Application Workspace compares an account's current Starter plan with Team.
  It identifies current usage and applicable limits, and “Review Team upgrade”
  opens the product's review flow where the actual charge and effective date are
  confirmed.

Both retain plan, price basis, attributes, qualifications, and next-step scope.

## Validation scenarios

Test both modes and variants with two and several plans, no available plans,
quote-based and free offers, current versus selected plans, long qualifications,
mixed eligibility, monthly and annual bases, partial price failure, out-of-order
responses, price changes, and a selected plan becoming unavailable. When only
one offer exists, use the appropriate single-offer composition.

Apply [Plan selection](../verification/workflows.md#plan-selection),
[Action hierarchy](../verification/stress-tests.md#action-hierarchy-and-emphasis),
[Block composition and reflow](../verification/stress-tests.md#block-composition-and-reflow),
and the [baseline](../verification/baseline.md), including both themes, long
localized prices, RTL, expanded text, keyboard, touch, screen readers, forced
colors, and reduced motion.
