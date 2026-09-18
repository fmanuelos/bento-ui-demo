# Feature Grid block

## Status

Draft until representative Public Site implementations demonstrate that varied
feature content, optional media, and responsive reflow preserve comparable
meaning and a coherent reading order.

## Intent

A Feature Grid presents a concise set of peer capabilities, benefits, or service
attributes so a visitor can scan and compare the offer. It composes repeated
content items without implying that every item is interactive or that equal
visual size means equal importance.

The block owns the collection relationship, item order, and responsive
arrangement. [`Card`](../components/card.md), links, actions, and the shared media
foundation retain their existing semantics and behavior.

## Use when

Use a Feature Grid on a Public Site when three or more short, related items share
one scope and parallel content structure, and scanning the collection helps a
visitor understand an offer before choosing a next step.

## Do not use when

Do not use a Feature Grid for operational metrics, relational records, steps in
a required sequence, pricing comparison, or unrelated promotional cards. Use
[`Metric Overview`](metric-overview.md) for operational measures, a table for
relational comparison, and ordered content for a sequence. Keep a one-off group
in its consuming page until repeated use establishes a stable contract.

Do not make every item a card-shaped link solely to create a larger target. An
item is interactive only when it has a real destination or bounded action.

## Anatomy

1. Required section heading
2. Optional section description
3. Required collection of three or more feature items
4. Optional section-level action after the collection

Each feature item contains:

1. Optional decorative or informative icon, image, or illustration
2. Required feature heading
3. Required concise description
4. Optional supporting metadata
5. Optional explicit destination or action

The logical order remains section heading, description, feature items in
authored order, then the section-level action. Within each item it remains media
when informative, heading, description, metadata, and action. Decorative media
does not enter the reading order.

## Variants

- **Open:** Uses spacing and alignment to group items without individual
  containing surfaces. This is the default for concise benefits.
- **Contained:** Uses peer Card surfaces when each item needs stronger
  separation, longer content, or its own metadata or action.
- **Media-led:** Gives informative media greater space when visual explanation
  materially improves understanding.

Variants change containment and emphasis, not item semantics, minimum content,
or order. Do not mix open and contained items in one collection to imply an
unstated hierarchy.

## Participating components and related patterns

Use [`Card`](../components/card.md) only when a feature item benefits from
containment. Destinations follow [`Link`](../components/link.md); in-place
operations follow [`Button`](../components/button.md). A pair of related actions
may use [`Button Group`](../components/button-group.md).

Apply [`Responsive density`](../patterns/responsive-density.md) to collection
reflow and [`Action hierarchy and emphasis`](../patterns/action-hierarchy-and-emphasis.md)
when item-level or section-level actions participate. Apply
[`Asynchronous feedback`](../patterns/async-feedback.md) to an in-place action.
All imagery follows the shared
[`Images and media`](../../DESIGN.md#images-and-media) foundation.

## Content requirements

The section heading names the shared scope. Each item heading identifies one
distinct capability or benefit, and its description explains the outcome in
parallel, specific language. Avoid repeating the same claim with different
icons or using headings that depend on position such as “First” or “Next.”

Keep items comparable in conceptual depth, not forced character count. Do not
truncate a valid heading or description to make rows visually equal. When an
item requires substantially more explanation, link to detail or move the
collection into a more suitable content structure.

Claims, limitations, availability, and qualifications remain accurate text.
Icons and illustrations support meaning but do not replace the feature heading
or necessary explanation. Alternative text must not duplicate adjacent text.

An item action names its destination or result and remains subordinate to the
collection's explanatory purpose. Use at most one primary action for the
section-level decision region; do not create a row of competing primary actions.

## Layout and semantic token mapping

Use Public Site container, page-padding, grid-gutter, readable-width, and section
spacing roles from [`DESIGN.md`](../../DESIGN.md#public-site-mode). Use existing
surface, border, shape, type, icon, and action roles for items and controls.

Choose the column count from the minimum useful item width and actual content,
not from a fixed promise that every collection has three or four columns. Items
in one row may align their internal regions when content permits, but equal
height must not create empty semantic regions, clipped copy, or displaced
actions.

Contained items use Card token mappings. Open items do not invent a transparent
card variant. Do not add Feature Grid-specific colors, spacing, typography,
heights, or breakpoints when existing semantic roles express the relationship.

## States and behavior

The Feature Grid has no block-level hover, selected, expanded, loading, success,
or error state. Individual links, buttons, media, and asynchronous operations
retain their component and pattern states.

When optional media is missing, slow, or fails, remove its reserved presentation
when safe and preserve the heading, description, and action. A failed item action
retains the item context and exposes proportionate recovery. Do not replace the
whole collection when one independently loaded item is unavailable.

If the complete feature set is loaded asynchronously, stable section context
remains available and placeholders must not be announced or counted as features.
The consuming product owns whether partial content is safe to show.

## Responsive and localization behavior

Reduce columns before items become difficult to read or operate. A grid may
become two columns and then one, but source and focus order remain the authored
item order. Do not use visual placement or dense masonry packing to create a
contradictory reading sequence.

Headings, descriptions, metadata, and actions wrap without clipping at 200%
text, with increased spacing, and with at least 60% expansion. Long valid words,
multiple writing systems, and right-to-left direction must not cause page-level
horizontal scrolling. Align through logical properties so direction changes do
not reverse item meaning or order.

Media crops retain important content at every supported item width. Directional
media mirrors only when its meaning and localized asset require it.

## Accessibility

Use the heading level required by the containing document. Represent the items
as a list when their collection relationship aids understanding. Every item has
a programmatically associated heading, and repeated actions remain distinguishable
by accessible name or item context.

Reading and focus order follow the logical order. Do not make a whole Card
interactive when it contains nested controls, and do not duplicate one
destination through several adjacent focus targets. Information and hierarchy
remain understandable without color, icons, equal height, animation, or visual
position.

Text, media, boundaries, and focus indicators meet contrast requirements across
supported themes and forced colors. Touch targets remain adequate when the grid
is dense. Reduced motion removes entrance, hover, and rearrangement animation
without hiding content or changing order.

### Web adapter

Use a `section` associated with its heading when the grid is a distinct document
region. Use `ul` and `li` for a collection whose item relationship should be
announced; do not add list semantics solely for CSS layout when another native
structure better describes the content.

Use native headings within items. Render destinations as anchors and in-place
actions as buttons. Do not nest interactive elements or wrap a complete item in
an anchor when it contains another action. Reserve intrinsic media dimensions
or an appropriate aspect ratio to limit layout shift.

## Representative example

A service overview titled “Everything your team needs to publish” presents four
features: structured drafting, accessible review, scheduled publishing, and
revision history. Each open item has a small decorative icon, a specific heading,
and a two-sentence description. One section-level link, “Explore all publishing
features,” follows the collection.

At narrow widths the items become one column in the same authored order. Removing
the icons does not remove meaning or leave empty space, and expanded German copy
wraps without changing action priority.

## Validation scenarios

Validate the Feature Grid with:

- Open, contained, and media-led presentations
- Three items, a typical collection, and the supported upper boundary
- Items with and without media, metadata, and explicit actions
- Mixed valid content lengths without truncation or false equalization
- Decorative, informative, missing, slow, failed, and differently cropped media
- One failed or pending item action while peer content remains usable
- One, two, and several columns around every content-driven transformation
- Long valid words, 60% expansion, 200% text, multiple writing systems, and RTL
- Keyboard, pointer, touch, speech, forced colors, dark mode, and reduced motion

Apply [`Public landing`](../VALIDATION.md#public-landing),
[`Images and media`](../VALIDATION.md#images-and-media),
[`Action hierarchy`](../VALIDATION.md#action-hierarchy-and-emphasis), and
[`Block composition and reflow`](../VALIDATION.md#block-composition-and-reflow).
The block is ready for shared use when each feature remains distinct, comparable,
and understandable across supported presentations without relying on its media
or grid position.
