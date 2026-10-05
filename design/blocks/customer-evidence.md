# Customer Evidence block

## Status

Draft. Landing-page quotations and product-page outcomes establish the intended
scope. Validation of attribution, qualifications, source availability, and media
fallback remains outstanding. The examples are illustrative, not real endorsements
or verified customer claims.

## Intent

Customer Evidence connects a customer statement or reported outcome to its
attribution, source context, and qualifications so a visitor can assess the claim.
The block owns those content relationships and their reflow. The consuming
product owns claim verification, publication rights, accuracy, and source upkeep.

## Use when

Supported modes: Public Site.

Use in Public Site when an attributable customer quotation or outcome materially
supports understanding of an offer. Examples include a testimonial on a landing
page and an attributed result on a product page. These uses share the same
claim, attribution, context, and source relationships.

## Do not use when

Use [Metric Overview](metric-overview.md) for operational measures,
[Feature Grid](feature-grid.md) for the product's own capability descriptions,
and [Related Content](related-content.md) for a collection of case-study links
without an evidence claim. A logo strip, anonymous praise, decorative counter,
or unsupported marketing assertion does not satisfy this block's requirements.

## Anatomy

1. Required section heading identifying the evidence's subject
2. Optional short introduction defining scope
3. Required one or more evidence items
4. Optional collection-level destination to supporting case studies

Each item has a required quotation or reported outcome, attributable customer
identity, source context, and any material qualification. Optional media and a
source or case-study destination support that information. Read claim,
attribution, context, qualifications, then destination together. A heading or
large number cannot detach a claim from its necessary conditions.

## Variants

- **Quotation:** Presents a customer's actual words with attribution and context.
- **Reported outcome:** Presents an attributed result with its measure, timeframe,
  basis, and material limitations.

Both preserve the evidence relationship. A mixed collection must label paraphrase
and measured outcomes honestly rather than presenting every item as a direct
quotation. A photograph or logo is optional in either presentation.

## Participating components and related patterns

Use [Link](../components/link.md) for sources,
[Card](../components/card.md) only when containment improves comprehension, and
[Avatar](../components/avatar.md) for an optional person's image under its
fallback rules. Native quotation and text semantics do not require a new component.

Apply [Images and media](../../DESIGN.md#images-and-media),
[Asynchronous feedback](../patterns/async-feedback.md) when content is retrieved,
[Action hierarchy](../patterns/action-hierarchy-and-emphasis.md), and
[Responsive density](../patterns/responsive-density.md). These dependencies
retain link, media, recovery, and presentation behavior.

## Content requirements

Keep direct quotations faithful and distinguish them from paraphrases. Identify
the customer, role or organization when relevant, and the source context or date
needed to interpret the statement. A source destination is optional only when
the visible context is sufficient and the consuming product maintains verifiable
provenance. Do not invent attribution or imply an endorsement from a logo alone.

Reported outcomes state the measure, baseline or comparison where relevant,
timeframe, and scope. Keep limitations, sponsorship or other material relationship,
and qualifications adjacent to the claim they affect. Product review determines
the necessary disclosures; this block does not establish legal requirements.
Never turn an illustrative number into a published customer result.

If an attribution must be anonymized, use an accurate, product-approved
description and explain relevant limits rather than inventing a named identity.
Remove claims that can no longer be supported under the product's publication
policy. A source link alone cannot replace essential visible qualifications.

## Layout and semantic token mapping

Use [Public Site](../../DESIGN.md#public-site-mode) container, page padding,
grid-gutter, and section spacing roles. Use shared heading, body, data when
appropriate, secondary text, link, surface, border, and focus roles. Maintain
readable quotation measures and legible attribution. No testimonial-specific
colors, fixed heights, oversized decorative quote tokens, or typography are needed.

## States and behavior

Static evidence has no interactive selection state. Each source link retains its
own behavior. A missing portrait or logo does not remove textual attribution;
collapse optional media cleanly. For asynchronous evidence, keep placeholders
outside quotation and result semantics and never fabricate a plausible claim.

When an item fails to load, preserve independently usable peers. If all evidence
is absent or unsupported, omit the section or provide a product-appropriate
availability explanation without an orphaned heading. Revalidate stale content
under the product's policy; do not preserve withdrawn claims merely to prevent
layout changes. An unavailable source requires review of whether the remaining
visible claim is still supportable. Do not rotate or auto-advance evidence.

## Responsive and localization behavior

Reflow items from useful widths to a single column while keeping each claim with
its attribution and qualifications. Do not truncate a quote to equalize cards
or hide a limitation on a narrow screen. Support 60% expansion, 200% text,
increased spacing, multiple scripts, RTL, and localized numbers and dates.
Translations and localized quotation marks preserve the original meaning and
make translated quotation status clear when relevant.

## Accessibility

Use proper quotation semantics for direct quotations and ordinary labelled text
for reported outcomes. Associate the claim, attribution, and source without
depending on visual columns, portraits, logos, or color. Avoid duplicated
portrait and name announcements. Source links are specific and keyboard
accessible with visible focus and usable targets. Contrast, forced colors,
high contrast, and reduced motion preserve the complete evidence.

### Web adapter

Use a named `section`; a list may group several peer evidence items. A `figure`
with `blockquote` and `figcaption` can associate a direct quotation and attribution.
Use `cite` for a work's title when appropriate, not merely a person's name.
Reported outcomes use ordinary text or description lists. Media alternative text
adds necessary meaning without repeating adjacent attribution. Use real anchors
for sources and never render a static claim as an interactive card without a
destination.

## Representative example

These are structural examples requiring real approved content before publication:

- A landing page's “Customer experiences” section presents an approved customer
  quotation, the speaker's name and role, interview context, and a case-study
  destination. Removing the portrait leaves the full attribution intact.
- A product page's “Customer results” section presents a customer-reported change
  in processing time with the customer's identity, comparison period, method,
  and limitations beside the result, followed by a source destination.

Neither example supplies fabricated testimony or a numerical result to publish.

## Validation scenarios

Test both variants and examples with one and several items, minimal and complete
anatomy, long quotations, missing portraits, anonymized attribution, translated
quotes, material qualifications, a changed or withdrawn claim, broken sources,
loading, partial failure, and no valid evidence.

Apply [Customer evidence assessment](../verification/workflows.md#customer-evidence-assessment),
[Images and media](../verification/stress-tests.md#images-and-media) when applicable,
[Block composition and reflow](../verification/stress-tests.md#block-composition-and-reflow),
and the [baseline](../verification/baseline.md) across themes, expanded text, RTL,
keyboard, touch, screen readers, forced colors, and reduced motion.
