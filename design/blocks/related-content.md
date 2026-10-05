# Related Content block

## Status

Draft. Public help-article and workspace-resource examples establish the intended
scope. Relevance, destination availability, and responsive collection validation
remain outstanding; the examples are not implementation evidence.

## Intent

Related Content presents a small, coherent collection of destinations that help
a person continue from their current subject or task. The block owns section
context, item relationships, and reflow. The consuming product owns relevance,
ranking, permissions, destinations, and content retrieval.

## Use when

Supported modes: Public Site; Application Workspace.

Use in Public Site for related guides or help articles and in Application
Workspace for resources relevant to the current task. Classification is Shared
across those modes. Each item must have a useful destination and an explainable
relationship to the surrounding content.

## Do not use when

Use [Feature Grid](feature-grid.md) for peer capabilities or benefits,
[Results Toolbar](results-toolbar.md) and the search pattern for query results,
and navigation blocks for persistent destinations. A lone inline reference needs
only a [Link](../components/link.md). Do not use recommendations to interrupt a
Focused Flow or to replace instructions required to complete the current task.

## Anatomy

1. Required section heading naming the relationship, such as “Related guides”
2. Optional description explaining scope or selection
3. Required collection of two or more related destinations
4. Optional collection-level destination, such as “Browse all guides”

Each item contains a required descriptive title and destination, plus optional
summary, content type, freshness or other useful metadata, and supporting media.
Read the heading and scope before items in authored relevance order, then any
collection-level destination. Within an item, preserve title, explanation, and
metadata relationships even when media appears beside them.

## Variants

No variants are established. A list or a reflowing collection of Card surfaces
may express the same content relationships when containment aids scanning.
Presentation must not change ranking or require identical item heights.

## Participating components and related patterns

Use [Link](../components/link.md) for each destination,
[Card](../components/card.md) when a quiet boundary is helpful,
[Button](../components/button.md) only for an in-place recovery operation, and
[Alert](../components/alert.md) when a persistent local explanation is necessary.
Apply [Images and media](../../DESIGN.md#images-and-media),
[Asynchronous feedback](../patterns/async-feedback.md),
[Action hierarchy](../patterns/action-hierarchy-and-emphasis.md), and
[Responsive density](../patterns/responsive-density.md).

## Content requirements

Name destinations specifically and disambiguate similar titles with summaries or
metadata. A summary explains relevance rather than repeating the title. Include
content type, language, date, or download details when they materially affect
the decision to follow the link. Do not imply freshness without a reliable date.

Items remain peers within one named relationship; do not mix unrelated promotions
into supporting resources. Essential meaning is text, not a thumbnail. Product
rules determine which destinations are safe to disclose. Do not reveal restricted
titles or summaries merely because the destination will later deny access.

## Layout and semantic token mapping

Use the containing [Public Site](../../DESIGN.md#public-site-mode) or
[Application Workspace](../../DESIGN.md#application-workspace-mode) container,
padding, grid-gutter, and group spacing roles as applicable. Reuse heading, body,
secondary text, link, surface, border, and focus roles. Keep summaries readable
and optional media subordinate. No new card dimensions or block-specific tokens
are required.

## States and behavior

The block has no independent selection or hover state; links and any actions
retain theirs. For asynchronous content, the product defines whether this
supporting section may be omitted or needs an availability explanation. Preserve
usable safe items during refresh and do not shuffle focused items as ranking
changes. Place recovery locally when offered.

When no useful destinations exist, omit the section and its heading. When only
one exists, use an ordinary contextual link. Do not invent filler items to reach
the minimum. Missing optional media collapses cleanly. If an item becomes
restricted or unavailable, remove it or explain availability according to product
policy and restore affected focus predictably; do not leave an empty card.

## Responsive and localization behavior

Reflow from useful item widths to one column without changing source order.
Allow mixed-length titles, summaries, and metadata to wrap. Support 60% expansion,
200% text, increased spacing, mixed scripts, locale-aware dates, and RTL through
logical alignment. Do not hide summaries or qualifiers solely to maintain equal
heights, and do not require a carousel to access the collection.

## Accessibility

Use a named section and semantic collection, with item headings at appropriate
levels when the content warrants them. Each destination has one clear accessible
name and focus target; avoid separate adjacent thumbnail and title links to the
same destination. Keep nested actions out of whole-card links. Focus, touch
targets, contrast, and relationships remain clear without imagery or color, in
forced colors, and with reduced motion.

### Web adapter

Use a `section` with a native heading and `ul`/`li` for peer destinations.
Use anchors with real destinations. If the whole item is linked, keep its
accessible name concise and do not nest other controls; follow Card and Link
semantics. Decorative thumbnails have empty alternative text. Keep loading
shapes out of list counts and link semantics.

## Representative example

- A Public Site help article ends with “Related guides”: account recovery,
  updating contact information, and managing sessions, each with a specific
  title and a short explanation.
- An Application Workspace import screen includes “Import resources”: supported
  file formats and resolving rejected rows, with summaries describing when each
  guide is useful. The required import instructions remain in the task itself.

Both examples use the same relationship and item structure while relevance is
chosen by their consuming products.

## Validation scenarios

Test both modes with two items, the product's supported maximum, optional media
and metadata removed, zero or one useful destination, long or similar titles,
different content languages, loading, partial failure, stale refresh, broken
media, permission changes, and loss of the focused item.

Apply [Related content discovery](../verification/workflows.md#related-content-discovery),
[Images and media](../verification/stress-tests.md#images-and-media) when applicable,
[Block composition and reflow](../verification/stress-tests.md#block-composition-and-reflow),
and the [baseline](../verification/baseline.md) across themes, RTL, expanded text,
keyboard, touch, screen readers, forced colors, and reduced motion.
