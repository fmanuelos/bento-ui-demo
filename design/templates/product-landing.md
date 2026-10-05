# Product Landing template

## Status

Draft. Product introduction and service introduction define the initial scope.
Interactive references, real conversion destinations, and behavioral validation
remain outstanding. Pricing, comparison, and checkout are separate structures.

## Intent

Help visitors understand a product or service, assess relevant evidence, and
choose a clearly described next action.

## Use when

Use for a product introduction and a service introduction when both communicate
one coherent offer through identity, value, supporting information, evidence,
and a primary next step. Content length follows the decision, not a fixed number
of promotional sections.

## Do not use when

Use [Public Content](public-content.md) for sustained reading. Detailed comparison,
public service status, an authenticated overview, and transactional commitment
need distinct templates. A landing page may lead to
[Registration](registration.md) without absorbing its account-creation flow.

## Classification

- Primary mode: [Public Site](../experiences/public-site.md).
- Applicable candidate variant: Marketing Site.
- Primary domain: Marketing.
- Audience: visitors assessing a product or service before choosing a next step.
- Excluded scope: checkout, account creation, and authenticated work.

## Regions and hierarchy

1. [Public-site Navigation](../blocks/public-site-navigation.md) and a main-content bypass.
2. [Hero](../blocks/hero.md) with one page heading, value proposition, and primary action.
3. Supporting benefits or [Feature Grid](../blocks/feature-grid.md) when meaningful.
4. Relevant [Customer Evidence](../blocks/customer-evidence.md) or other substantiated evidence.
5. Material eligibility, availability, or offer qualifications before commitment.
6. Optional repeated [Call to Action](../blocks/call-to-action.md) after supporting content.
7. [Site Footer](../blocks/site-footer.md) with appropriate supporting destinations.

Evidence is required as a content role; it need not be a testimonial block.
Product facts or a demonstrable service description may support the offer.
Omit optional media and repeated actions without leaving empty sections.

## Participating contracts

Apply [Link](../components/link.md), [Button](../components/button.md),
[Action hierarchy](../patterns/action-hierarchy-and-emphasis.md),
[Navigation shell](../patterns/navigation-shell.md),
[Responsive density](../patterns/responsive-density.md), and
[Asynchronous feedback](../patterns/async-feedback.md). Participating blocks own
their local composition; this template owns their complete page relationship.

## Actions and permissions

The primary action describes its destination or actual operation. Use a link for
navigation and a button for an operation. Repeated actions for the same purpose
keep their destination and meaning consistent. State material prerequisites
before the action; never imply eligibility or account access from a public visit.
When entering a Focused Flow, establish a safe exit, return destination, and focus
handoff without carrying unnecessary personal or campaign data.

## States, sequence, and continuity

Support initial loading, available content, unavailable optional media, failed
supporting sections, stale time-sensitive claims, and unavailable offers. Keep
usable content and navigation available through local failures; do not replace
the entire page with a spinner for deferred media. An essential offer failure
must show an honest unavailable state rather than invented claims.

Disable or replace an unavailable conversion action with an understandable
alternative. Expired offers must not remain actionable as if current. Preserve
normal browser back and in-page navigation. Avoid automatic redirects, autoplay,
and delayed content that displaces the action under the visitor's pointer.
A read-only page has no mutation-completion state; any inline form needs its own
explicit validation and commitment rules or a separate flow destination.

## Content and data requirements

Supply an accurate offer, intended audience, supporting facts, action destination,
qualifications, and content ownership. Claims, quoted evidence, and images require
accurate attribution and appropriate usage rights supplied by the consumer.
Time-sensitive information needs freshness rules. Do not fabricate statistics,
customer endorsements, legal text, or availability for a generic reference.
Exercise long headlines, absent media, lengthy qualifications, and sparse evidence.

## Responsive and localization behavior

Keep the value proposition and primary action understandable before decorative
media. Stack supporting content in semantic order; crop only where meaning is
preserved. Avoid fixed-height heroes that clip translations or 200% text. Support
RTL, expanded action labels, narrow screens, and localized quantities. Sticky
navigation must not cover anchor targets or keyboard focus.

## Accessibility

Provide a bypass, one page heading, labelled navigation, meaningful section
headings, and a main landmark. Explain action purpose without relying on visual
position. Supply meaningful alternative text and captions or transcripts when
required by the media. Evidence must remain understandable without logos or color.
Support keyboard navigation, visible focus, touch targets, themes, forced colors,
and reduced motion. Optional motion cannot be required to reveal essential content.

## Product instantiation

Supply the offer, supported audiences, approved content, evidence, media,
destinations, availability rules, locale variants, and privacy requirements.
Define the handoff to registration, contact, or another action without inventing
its business rules. Product and service introductions share the same evidence
and action hierarchy; their real claims remain product-owned.

## Reference pages and validation

Plan product and service introduction references with long headlines, absent
images, expanded translations, qualified offers, failed optional content, and an
unavailable primary destination. These references are not implemented.

Apply [Public landing](../verification/workflows.md#public-landing),
[Customer evidence assessment](../verification/workflows.md#customer-evidence-assessment)
when attributed customer evidence participates,
[Template conformance](../verification/stress-tests.md#template-conformance), and
[baseline validation](../verification/baseline.md). Record actual responsive,
media, navigation, accessibility, and cross-mode handoff results.
