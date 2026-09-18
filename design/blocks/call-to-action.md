# Call to Action block

## Status

Draft until representative Public Site implementations and validation coverage
are established.

## Intent

A Call to Action gives people a focused next step after enough context has been
provided to understand the decision. It combines a concise proposition,
supporting explanation, and a limited action group in one clearly scoped Public
Site region.

Prominence follows the visitor's likely decision and available evidence, not an
unrelated business objective.

## Use when

Use a Call to Action near the conclusion of explanatory, feature, comparison, or
campaign content when one destination or action appropriately advances the
visitor's current decision.

## Do not use when

Do not use a Call to Action as a page introduction; use [`Hero`](hero.md). Do not
use it for page identity or section labelling; use
[`Page Header`](page-header.md) or [`Section Header`](section-header.md). Do not
use it to disguise navigation, an alert, required consent, destructive
commitment, or a multi-step form as promotional content.

A Call to Action is optional; omit it when there is no honest, useful next step.

## Anatomy

1. Optional eyebrow or category label
2. Required heading or explicit proposition
3. Optional supporting description
4. Required primary action
5. Optional secondary action
6. Optional concise supporting context, such as eligibility or trust information
7. Optional supporting media

The primary action is required because the block's purpose is to offer a next
step. The heading or proposition explains that decision without depending on the
action label or media. Omit every other optional region when it does not improve
understanding.

The logical reading order remains label, heading, description, actions,
supporting context, and informative media. Visual layout may place media or
actions beside the text only when reading and focus order remain coherent.

## Variants

- **Contained:** Places the composition on a bounded surface aligned with the
  page container. This is the default.
- **Full-width:** Extends a background to the viewport while keeping content
  aligned to the page container.
- **Split:** Places supporting media beside the decision content when both
  retain useful width and the media materially supports comprehension.

These variants change containment and layout, not action priority or meaning. A
text-only block does not reserve media space. Do not create urgency, gradient,
dark, or conversion variants that change emphasis without changing purpose.

## Participating components and related patterns

The primary and secondary controls follow [`Button`](../components/button.md) or
[`Link`](../components/link.md) according to whether they act in place or
navigate. A related pair may use
[`Button Group`](../components/button-group.md) when its arrangement contract
applies.

Apply [`Action hierarchy and emphasis`](../patterns/action-hierarchy-and-emphasis.md)
to the decision region and nearby actions,
[`Responsive density`](../patterns/responsive-density.md) to reflow, and
[`Asynchronous feedback`](../patterns/async-feedback.md) when an in-place action
does not complete immediately. Form submission follows
[`Forms and validation`](../patterns/forms-and-validation.md); the Call to Action
does not define form fields, validation, or consent.

All imagery follows the shared
[`Images and media`](../../DESIGN.md#images-and-media) foundation. The block owns
only the relationship between media and the decision content.

## Content requirements

The heading or proposition names the value, outcome, or next step specifically.
The description provides information needed to decide and does not repeat the
heading. Claims, prices, dates, eligibility, commitments, and limitations must be
accurate and available as text rather than hidden in media or fine print.

Use one primary action. Its label describes the destination or result, such as
“Start a free trial” or “Create an account,” rather than “Get started” when the
outcome is otherwise unclear. A secondary action offers a distinct supporting
route, such as viewing a demo or reading requirements; it must not duplicate the
primary action.

Supporting context remains concise and subordinate, but it is not visually or
semantically minimized when it contains a material condition. Do not manufacture
scarcity, urgency, social proof, or risk. Do not preselect consent or imply that
navigation completes a commitment.

Media supports the proposition but is never the sole source of the offer,
condition, instruction, or action meaning. Decorative media may be removed under
constraint. Informative media retains its alternative or adjacent explanation.

## Layout and semantic token mapping

Use Public Site container, page-padding, grid-gutter, readable-width, and section
spacing roles from [`DESIGN.md`](../../DESIGN.md#public-site-mode). Use semantic
brand, neutral, inverse, surface, text, border, and action roles according to the
selected background.

The text region keeps a readable line length. Contained presentation may use an
existing feature-surface shape and quiet boundary; elevation is optional and
must express separation rather than interactivity. A full-width background does
not allow content to escape the page container.

Actions use their component token mappings. Extra-large controls remain limited
to one major public-facing action group and are not required. Do not introduce
Call to Action-specific colors, gradients, spacing, typography, heights, or
breakpoints when existing semantic roles express the purpose.

When text or controls appear on an inverse or media-adjacent surface, contrast
must remain valid without depending on an unpredictable part of an image or an
overlay whose effectiveness varies with the asset.

## States and behavior

The block itself has no hover, pressed, disabled, loading, success, or error
state. Participating actions and workflows own those states.

An asynchronous in-place action preserves its label, location, and task context,
prevents duplicate activation, and provides proportionate feedback. A failed or
unknown outcome retains the proposition and presents a safe recovery or
verification path. Do not replace the complete block with a spinner or promote
the secondary action while the primary action is busy.

If optional media or supporting context is unavailable, omit that region and
reflow the remaining content. Do not show broken media, an empty action group,
or a skeleton indefinitely. If the offer itself cannot be made because of a
known eligibility or availability condition, explain the condition instead of
presenting a misleading disabled primary action.

A Call to Action does not become sticky, trap focus, autoplay audio, or delay
access to its text and actions. Optional animation is decorative and cannot be
required to understand the offer.

## Responsive and localization behavior

Use a single-column composition at constrained widths. A split layout collapses
before either region loses a useful width. Decision content precedes media in
logical order unless informative media must be understood first, in which case
the authored order makes that dependency explicit.

Actions wrap or stack before they overflow, preserve source order, and retain
their relative emphasis. Full-width mobile actions are optional rather than
automatic. Supporting context stays associated with the decision and must not
be pushed into an unrelated footer or tooltip.

Headings, descriptions, conditions, and labels wrap without clipping at 200%
text and with increased spacing. Support substantial translation expansion,
pluralization, locale-aware prices and dates, multiple writing systems, and
right-to-left direction. Mirror media only when its meaning is directional and
the localized asset is designed to mirror.

## Accessibility

Use the heading level required by the containing page. Associate the region with
its heading when it forms a distinct section. The proposition, conditions, and
action purposes remain understandable without imagery, visual position, color,
size, or motion.

Focus order follows the logical decision sequence and every action retains a
visible focus treatment and adequate target. Visual prominence does not require
moving focus to the primary action. Screen-reader users encounter material
conditions before committing, not after activation.

Text and controls meet contrast requirements on every supported surface.
High-contrast and forced-color presentations preserve action boundaries, focus,
and the distinction between primary and secondary routes. Reduced motion removes
entrance, parallax, background-video, and media-transition effects without
changing access to content.

### Web adapter

Use a `section` associated with its native heading when the block is a distinct
document region. Use an ordinary grouping element when another containing
section already provides the necessary structure and an additional landmark
would add noise.

Use anchors for destinations and buttons for in-place actions, even when their
visual treatments match. Do not wrap the block or its surface in a whole-region
link. Reserve intrinsic media dimensions or an appropriate aspect ratio, and
apply the shared web media classification.

## Representative example

After a product feature explanation, a contained Call to Action uses:

- The heading “Automate your first workflow”
- A description explaining that setup takes about ten minutes
- A primary “Create a free workspace” destination
- A secondary “Review setup requirements” destination
- Supporting text stating that no payment method is required

At narrow widths the actions stack after the description and retain their source
order. The payment condition remains visible with the decision content, and the
block remains understandable when its decorative illustration is removed.

## Validation scenarios

Validate the Call to Action with:

- Contained, full-width, split, and text-only presentations
- One primary action and primary plus secondary actions
- Navigation destinations and asynchronous in-place actions
- Long headings, multi-paragraph descriptions, long labels, and material conditions
- Accurate price, date, trial, payment, and eligibility language
- Decorative, informative, missing, slow, and failed media
- Pending, failed, unavailable, and outcome-unknown actions
- Nearby Hero, navigation, section, footer, and recovery actions
- Narrow and wide containers, 60% text expansion, 200% text, and increased spacing
- Locale-aware values, multiple writing systems, and right-to-left direction
- Keyboard and touch operation, visible focus, forced colors, and reduced motion

Apply the [`Public landing`](../VALIDATION.md#public-landing),
[`Images and media`](../VALIDATION.md#images-and-media), and
[`Action hierarchy`](../VALIDATION.md#action-hierarchy-and-emphasis), and
[`Block composition and reflow`](../VALIDATION.md#block-composition-and-reflow)
scenarios. The block is ready for shared use when the proposition, material
conditions, primary route, and secondary route remain honest and distinguishable
in every supported presentation.
