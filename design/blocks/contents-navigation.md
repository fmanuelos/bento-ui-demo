# Contents Navigation block

## Status

Draft. A procedural guide and a versioned policy establish the shared reading
scope. Native-anchor implementation and examples are recorded in the
[implementation record](../verification/setup-status-content-evidence.md).

## Intent

Help readers move among substantive sections of one document using a named list
of links that matches the document's heading structure.

## Use when

Supported modes: Public Site.

Use in a long public guide or policy where section navigation saves readers time.
The article owns section content, heading hierarchy, and target identifiers.

## Do not use when

Do not use for sequential task steps, global site navigation, tabs that replace
content, or sections with no meaningful content. Use
[Flow Step Navigation](flow-step-navigation.md) for bounded task progression.

## Anatomy

1. Required visible navigation label.
2. Required list of descriptive links in document reading order.
3. Required corresponding stable section targets owned by the consuming document.

Omit the block when there are no useful destinations. Do not leave an empty nav.

## Variants

No variants are established. This implementation provides a flat list. Hierarchical
navigation or active-section tracking requires additional implementation and validation.

## Participating components and related patterns

Use [Link](../components/link.md),
[Navigation shell](../patterns/navigation-shell.md), and
[Responsive density](../patterns/responsive-density.md). Section content belongs
to [Public Content](../templates/public-content.md), not to the navigation block.

## Content requirements

Each label describes its real destination and follows heading order. Supply stable,
unique identifiers independent of array position or transient loading state. Avoid
duplicate labels without useful context. Preserve old anchors when content moves
where the publishing policy promises durable links.

## Layout and semantic token mapping

Use [Public Site](../../DESIGN.md#public-site-mode) reading width, group spacing,
body and label type, border, text, and focus roles. Use logical spacing and allow
labels to wrap. Do not introduce custom breakpoints or navigation colors.

## States and behavior

Native links support fragment navigation, browser history, and direct arrivals.
Missing targets are a content defect; an invalid incoming fragment must still leave
the article readable. Do not display targets for an unavailable article. The block
does not manage article loading, scroll spying, persistence, or task completion.

## Responsive and localization behavior

Retain document order and all links at narrow widths. Support RTL, long translated
headings, 60% expansion, 200% text, and user text spacing. Target headings remain
visible below any sticky shell. The reference uses no sticky navigation.

## Accessibility

Name this navigation distinctly from global navigation. Links expose their full
purpose, visible focus, and native activation. Heading targets must accept focus
from fragment navigation without joining the normal Tab order.

### Web adapter

Use `nav` with an accessible name, a semantic list, and native `a href="#id"`
links. Consumer headings have matching unique `id` and `tabindex="-1"`. Preserve
native fragment and history behavior. Do not use tab or tree roles. Verify focus
arrival and the next Tab destination in the supported browser and assistive technology.

## Representative example

- A publishing guide links to prerequisites, preparation steps, and expected result.
- An editorial policy links to scope, review requirements, and correction history.

## Validation scenarios

Exercise guide and policy uses, empty lists, invalid incoming fragments, direct
anchors, Back and Forward, keyboard activation, unavailable bodies, long headings,
RTL, 200% text, themes, forced colors, and screen readers. Apply
[Public content](../verification/workflows.md#public-content),
[Block composition and reflow](../verification/stress-tests.md#block-composition-and-reflow),
and the [baseline](../verification/baseline.md).
