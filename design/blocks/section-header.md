# Section Header block

## Status

Draft until representative Public Site and Application Workspace implementations
and their validation coverage are established.

## Intent

A Section Header introduces a distinct region within a page, names its contents,
and optionally provides concise context, metadata, or a region-level action. It
creates a stable relationship between a section heading and the content that
follows without creating a new heading, action, or navigation component.

## Use when

Use a Section Header before a meaningful content, feature, form, collection, or
data region when a heading alone does not provide enough context or when a local
action needs a clear scope.

## Do not use when

Do not use a Section Header for the page's main identity; use
[`Page Header`](page-header.md). Do not use it as a promotional decision region;
use [`Call to Action`](call-to-action.md). A card, dialog, table, or other bounded
component uses its own heading region when that heading belongs only to the
component.

A decorative title row without a meaningful region is not a Section Header. Do
not add headings solely to support a preferred layout or divide content that is
already understandable as one section.

## Anatomy

1. Optional eyebrow, category, or genuine status
2. Required section heading
3. Optional supporting description
4. Optional metadata or freshness context
5. Optional region-level action group

The heading and following content form one semantic region. Omit optional parts
rather than rendering blank space or placeholder labels. The logical reading
order remains label, heading, description, metadata, actions, then the section
content.

When actions appear visually beside the heading, they remain after the heading
and explanatory context in source and focus order unless the owning workflow
requires a different meaningful sequence.

## Variants

- **Stacked:** Places context and actions below the heading. This is the default
  and the required fallback when content does not fit comfortably.
- **Inline:** Places a concise action or metadata region beside the heading and
  description when both regions retain useful width.
- **Centered:** Centers brief Public Site copy and optional actions. Use only
  when the section content has a single clear subject and centered reading does
  not weaken scanning or localization.

Variants change presentation, not heading rank, action semantics, content order,
or section meaning. Do not add left, right, or color-named variants.

## Participating components and related patterns

Actions follow [`Button`](../components/button.md) or
[`Link`](../components/link.md) according to their semantics. A small related set
may use [`Button Group`](../components/button-group.md). Use
[`Status badge`](../components/status-badge.md) only when the label communicates
persistent state; ordinary categories and eyebrows remain text.

Apply [`Action hierarchy and emphasis`](../patterns/action-hierarchy-and-emphasis.md)
when the section competes with page, card, empty-state, or recovery actions.
Apply [`Responsive density`](../patterns/responsive-density.md) when the header
reflows and [`Asynchronous feedback`](../patterns/async-feedback.md) when
freshness or action state changes asynchronously.

The following region retains its own component or block contracts. A Section
Header does not absorb the loading, empty, error, selection, form, or collection
behavior of the content it introduces.

## Content requirements

The heading names the region's subject or purpose and remains understandable
when encountered through heading navigation. Avoid vague headings such as
“Overview,” “More,” or “Details” unless page context makes their subject
unambiguous.

The description adds scope, instructions, or interpretation rather than
repeating the heading. Introduce instructions before the related content and
keep essential requirements outside placeholders, tooltips, or media.

Metadata identifies its subject and uses locale-aware values. Freshness belongs
near data whose interpretation depends on it. Do not use a status badge for a
category, count, or transient result.

A section action applies to the complete named region. Row, card, field, and
selected-record actions remain with their affected content. Use at most one
primary action in the section decision region and keep it subordinate to any
higher-level primary commitment for the same task.

## Layout and semantic token mapping

Align the Section Header with the container and grid of the content it
introduces. Use the applicable Public Site section spacing or Application
Workspace group spacing from [`DESIGN.md`](../../DESIGN.md#layout). The containing section owns
one block separation; do not add both header margin and section padding that
duplicate the same spacing role.

Use semantic text, surface, border, and action roles. The heading uses the level
and type scale required by the document hierarchy. Descriptions and metadata use
supporting text and label roles. Do not introduce Section Header-specific tokens
or arbitrary widths to preserve an inline layout.

Keep descriptive copy within a readable measure. An inline action region takes
only the width it needs while the text region remains flexible. Use a boundary
or surface only when the containing section requires one; the header does not
become a card by default.

## States and behavior

The Section Header itself has no interactive or asynchronous state. Participating
actions, status, metadata, and following content retain their own states.

The heading remains available while the following region loads, refreshes,
fails, or becomes empty. Stable descriptions and safe actions remain visible
when useful. Do not replace the heading with a skeleton or use the header to
announce every change inside its section.

When a section action becomes busy or unavailable, preserve its label, relative
hierarchy, and section association. Loading or error content below the header
must not move the action into another decision region or promote a secondary
action.

If the entire section is conditionally absent, omit both its header and content.
Do not leave an orphaned heading or action. If only optional metadata is absent,
remove that region and let the remaining header reflow.

## Responsive and localization behavior

Use the stacked variant by default at constrained widths. Transform an inline
header before the heading, description, metadata, or actions lose useful width.
Centered headers may become start-aligned when long content or the active writing
system makes centered scanning difficult.

Actions wrap or stack without reversing source order. Lower-priority utilities
may move to a named overflow control only when they are not required to
understand, begin, or recover the section's task. Metadata wraps while retaining
label-value relationships.

Allow headings, descriptions, metadata, and action labels to wrap at 200% text
and with increased spacing. Support substantial translation expansion,
locale-aware values, multiple writing systems, and right-to-left direction. Use
logical alignment and spacing rather than position-specific instructions.

## Accessibility

Use the heading level required by the document outline. A Section Header does
not force `h2`; nested sections may require another level. Styling must not
simulate a heading without native or equivalent heading semantics.

Associate the following section with its heading. The heading, description,
metadata, and actions remain understandable without visual position. Do not
depend on a border, background, icon, or capitalization as the only indication
that an action belongs to this region.

Focus order follows the logical sequence, focus remains visible, and targets do
not overlap after wrapping. High-contrast modes preserve heading, metadata,
action, and boundary distinctions. Reduced motion removes nonessential reflow or
entrance animation without changing availability.

### Web adapter

Place the heading and content in a native `section` when the region is distinct
enough to belong in the document outline. Associate the section with its heading
using ordinary native structure or `aria-labelledby` when necessary. A `header`
element may group the heading and introductory content inside that section, but
it does not create a separate landmark.

Use native headings and paragraphs, anchors for destinations, and buttons for
in-place actions. Do not apply `role="toolbar"` to an ordinary action row. Avoid
creating many unnamed section landmarks when a heading and ordinary document
structure already communicate the relationship.

## Representative example

An Application Workspace projects page introduces its recent-project collection with:

- The `h2` “Recent projects”
- The description “Projects updated in the last 30 days”
- Metadata reading “Updated 2 minutes ago”
- A supporting “View all projects” destination

At a wide width the destination aligns beside the text region. When the
description expands or the container narrows, the destination moves below the
metadata without changing source order. Loading, empty, and failed collection
states appear below the stable header and retain their own contracts.

## Validation scenarios

Validate the Section Header with:

- Public Site and Application Workspace sections at several heading levels
- Heading only and every optional region present
- Stacked, inline, and centered presentations
- No actions, one action, and a small action group with long labels
- Adjacent page-level, card-level, empty-state, and recovery actions
- Loading, current, empty, failed, and conditionally absent following content
- Short and 120-character headings, multi-paragraph descriptions, and long metadata
- Narrow and wide containers, 60% text expansion, 200% text, and increased spacing
- Locale-aware values, multiple writing systems, and right-to-left direction
- Keyboard and touch operation, forced colors, high contrast, and reduced motion

Apply the applicable [`Public landing`](../VALIDATION.md#public-landing),
[`Public content`](../VALIDATION.md#public-content), or
[`Dashboard overview`](../VALIDATION.md#dashboard-overview) workflow,
[`Action hierarchy`](../VALIDATION.md#action-hierarchy-and-emphasis),
[`Block composition and reflow`](../VALIDATION.md#block-composition-and-reflow),
and the baseline responsive and accessibility conditions. The block is ready for
shared use when its heading and local action scope remain clear in every
supported composition and the following region retains its own state and
behavioral ownership.
