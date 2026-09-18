# Page Header block

## Status

Draft until representative Public Site and Application Workspace implementations
and their validation coverage are established.

## Intent

A Page Header orients people at the beginning of a page by naming the page,
placing it in context, and exposing the page-level information and actions needed
to begin. It combines document structure, optional navigation, metadata, status,
and actions without changing the semantics of those parts.

Breadcrumb navigation, actions, status, and asynchronous feedback retain their
existing contracts and state ownership.

## Use when

Use a Page Header when a page needs clear identity or task context before its
primary content. It may introduce a public article, a settings page, a record
detail, or a dashboard view.

## Do not use when

Do not use a Page Header as primary site or application navigation. Use the
[`Hero`](hero.md) when the region's purpose is prominent value communication or
public acquisition, and use [`Section Header`](section-header.md) for a region
inside the page. A modal, drawer, card, or other bounded task surface retains its
own heading contract rather than embedding a Page Header.

## Anatomy

1. Optional breadcrumb or other canonical parent context
2. Optional category, entity type, or genuine status
3. Required page heading
4. Optional supporting description
5. Optional page metadata, such as owner, freshness, or last update
6. Optional page-level action group

The required heading identifies the current page and normally provides its
`h1`. Omit optional regions when they add no useful context. Do not render empty
wrappers or placeholder metadata.

The logical reading order remains context, heading, description, metadata, and
actions. A wide presentation may place actions beside the heading region, but it
must not move them before the page identity in reading or focus order.

## Variants

- **Content-led:** Gives the heading, description, provenance, and freshness a
  readable measure for articles, policies, guides, and informational pages.
- **Task-oriented:** Keeps the heading, operational status, metadata, and
  page-level actions compact for Application Workspace work.

These variants adapt emphasis and density without changing the Page Header's
meaning. Breadcrumb presence, action count, and status presence are optional
anatomy, not separate variants.

## Participating components and related patterns

Use [`Breadcrumb`](../components/breadcrumb.md) only for a stable information
hierarchy. Use [`Status badge`](../components/status-badge.md) only for a genuine
persistent entity or workflow state; categories and entity types remain ordinary
text.

Actions follow [`Button`](../components/button.md) or
[`Link`](../components/link.md) according to whether they perform an in-place
action or navigate. Related actions may use
[`Button Group`](../components/button-group.md) when its grouping contract
applies.

Apply [`Action hierarchy and emphasis`](../patterns/action-hierarchy-and-emphasis.md)
to page and nearby section actions,
[`Responsive density`](../patterns/responsive-density.md) to transformation, and
[`Asynchronous feedback`](../patterns/async-feedback.md) when metadata, status,
or actions depend on asynchronous work. Page navigation outside the block
follows the applicable Public Site or Application Workspace navigation contract.

## Content requirements

The heading names the current destination, record, or task in language that
remains understandable without the breadcrumb. Do not repeat the product name,
navigation label, or entity type unless it disambiguates the page.

The description explains purpose, scope, or consequence rather than restating
the heading. Metadata labels make dates, owners, sources, scope, and freshness
understandable without relying on position or icons. Format values for the active
locale and distinguish missing, unknown, and unavailable information.

Use status only when it affects understanding of the current entity or workflow.
Transient messages such as “Saved” or “Updated” use feedback rather than a
status badge. A page may have several utilities, but it has at most one primary
action for the current page-level decision. Section, card, and recovery actions
remain visually subordinate and clearly scoped to their regions.

Long object names, translated descriptions, metadata, and action labels wrap.
Do not truncate the page heading. When a complete technical identifier is
essential, provide a readable label where possible and preserve access to the
full value.

## Layout and semantic token mapping

Use the container, page-padding, grid-gutter, and experience-mode spacing roles
defined in [`DESIGN.md`](../../DESIGN.md#layout). Public Site presentations use
the appropriate readable or content container and section spacing. Application
Workspace presentations use the `workspace-padding-*` tokens and compact group
spacing without reducing essential text or targets.

Use semantic text, surface, border, and action roles. The heading uses the
appropriate display or heading scale for its mode and hierarchy; metadata uses
supporting text or label roles. Do not introduce Page Header-specific colors,
spacing, typography, widths, or breakpoints when existing semantic roles express
the requirement.

The text region retains a readable line length. A full-width background may
extend to the viewport while content remains aligned with the page container.
Use containment, spacing, or a quiet boundary when needed to distinguish the
header from adjacent content; do not add a card solely to create separation.

## States and behavior

The Page Header itself has no hover, pressed, selected, disabled, loading, or
error state. Those conditions belong to its participating components, data, or
experience patterns.

Stable page identity remains visible while optional metadata or actions load.
Do not replace the page heading or breadcrumb with a skeleton. If asynchronously
loaded metadata is important, reserve appropriate space and resolve it to a
current, unavailable, or error presentation without blocking unrelated page
content.

Background refresh preserves usable metadata and status. A failed page-level
action keeps its label and context and presents recovery according to the owning
pattern. Changes to metadata, status, or action availability must not move the
heading or unexpectedly move focus.

The Page Header does not become sticky by default. When a product separately
provides persistent page actions, preserve one logical action region and do not
duplicate controls in the Page Header and sticky area.

## Responsive and localization behavior

Transform according to available space, content length, text size, writing
direction, and input capability. The default narrow presentation is a single
column in logical reading order.

At wider sizes, the text and action regions may sit beside one another when both
retain useful width. Actions wrap or stack before they overflow and never reverse
source order. Breadcrumb transformation remains owned by its contract. Metadata
may wrap into several lines or groups, but labels stay associated with values.

Do not hide the page heading, current status, material freshness, or the action
required to begin or recover the page task. Lower-priority utilities may move to
a clearly named overflow control only when their meaning and access remain
intact.

Support at least 60% text expansion, 200% text enlargement, increased text
spacing, locale-aware values, multiple writing systems, and right-to-left
direction. Use logical alignment and spacing; do not change the semantic order
to keep actions on a preferred physical side.

## Accessibility

Provide one page heading at the level required by the containing document,
normally `h1`. Styling does not determine rank. The Page Header must not create
a second `h1` when the consuming page already owns one.

The page name, hierarchical context, description, metadata, status, and actions
remain understandable without visual position, color, or iconography. Focus
order follows logical reading order and every participating control retains its
visible focus and target requirements.

Dynamic metadata and status changes use the announcement behavior of their
owning pattern. Do not make the entire Page Header a live region. High-contrast
and forced-color presentations preserve headings, boundaries, status, links,
and actions. Reduced motion removes nonessential entrance or reflow animation
without delaying access to the page identity or controls.

### Web adapter

Use a `header` element when the block introduces the document or its main
content. It does not need a landmark role. Keep the page heading as a native
heading and use paragraphs, description lists, time elements, or other native
structures appropriate to the metadata.

Use the Breadcrumb web adapter for hierarchical navigation, anchors for
destinations, and buttons for in-place actions. Do not use an ARIA toolbar merely
because actions appear in one visual row. Associate asynchronously updated
metadata with a narrowly scoped status region only when an announcement is
required.

## Representative example

An Application Workspace project page uses a task-oriented Page Header with:

- The breadcrumb “Projects / Website migration”
- The `h1` “Website migration”
- A neutral “Draft” status badge
- Metadata reading “Updated 18 September 2026 by Morgan Lee”
- A primary “Publish project” action and supporting “Project settings” destination

On a narrow presentation, the breadcrumb collapses according to its contract,
the title and status remain together in reading order, metadata wraps below the
title, and actions stack after the metadata. The publication action remains the
only page-level primary action.

## Validation scenarios

Validate the Page Header with:

- Public content and Application Workspace task contexts
- Heading only and every optional region present
- No breadcrumb, a short trail, and a collapsed long trail
- No actions, one action, and several actions with one primary
- Short and 120-character headings, long descriptions, and long identifiers
- Current, stale, unavailable, and asynchronously updating metadata
- No status, a persistent status, and transient feedback placed outside status
- Adjacent sections or cards with their own local actions
- Narrow and wide containers, 60% text expansion, 200% text, and increased spacing
- Locale-aware dates and names, multiple writing systems, and right-to-left direction
- Keyboard and touch operation, visible focus, forced colors, and reduced motion

Apply the [`Public content`](../VALIDATION.md#public-content),
[`Dashboard overview`](../VALIDATION.md#dashboard-overview),
[`Action hierarchy`](../VALIDATION.md#action-hierarchy-and-emphasis), and
[`Block composition and reflow`](../VALIDATION.md#block-composition-and-reflow)
validation scenarios.
The block is ready for shared use when page identity, context, status, metadata,
and action scope remain clear in every supported mode without redefining its
participating components.
