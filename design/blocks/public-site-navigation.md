# Public-site Navigation block

## Status

Draft while representative Public Site implementations validate the block after
its migration from the component inventory.

## Intent

Public-site Navigation arranges identity, primary destinations, current location,
and the principal conversion or account action without competing with page
content. It provides a stable public-site header composition while its Links,
Buttons, disclosures, and temporary surfaces retain their own semantics.

## Use when

Use this block for commercial, marketing, documentation, and informational sites
whose primary destinations recur across pages. Use the
[`Application Navigation block`](application-navigation.md) for authenticated,
task-oriented workspaces.

## Do not use when

Do not use it as local view switching, hierarchical location, result paging, or a
workflow stepper. Use [`Tabs`](../components/tabs.md),
[`Breadcrumb`](../components/breadcrumb.md), or
[`Pagination`](../components/pagination.md) for those purposes. Do not introduce
the full block for a single logo-and-link treatment with no recurring navigation.

## Anatomy

1. Brand destination
2. Primary navigation region
3. Current destination indicator
4. Optional primary action
5. Optional utility actions
6. Optional responsive disclosure trigger and destination region

## Variants

- **Inline:** Brand, destinations, and actions coexist comfortably.
- **Disclosure:** Destinations appear in ordinary flow or a layered non-modal
  surface controlled by a named trigger.
- **Modal:** Destinations use a temporary Dialog or Drawer when non-modal
  disclosure cannot preserve comfortable access.
- **Sticky:** The block remains at the viewport edge without obscuring focus,
  headings, anchors, or enlarged content.

Destination identity, order, and current-location meaning remain consistent
across variants.

## Participating components and related patterns

Destinations and actions use [`Link`](../components/link.md),
[`Button`](../components/button.md), and
[`Button Group`](../components/button-group.md). Responsive presentation uses
[`Disclosure`](../components/disclosure.md),
[`Dialog`](../components/modal.md), or [`Drawer`](../components/drawer.md) as
appropriate. [`Skip link`](../components/skip-link.md) provides the bypass route.

Action priority follows
[`Action hierarchy and emphasis`](../patterns/action-hierarchy-and-emphasis.md).
Loading and route feedback follow
[`Asynchronous feedback`](../patterns/async-feedback.md), while public composition
follows [`Responsive density`](../patterns/responsive-density.md).

## Content requirements

The brand has a stable name and normally links to the public home. Destination
labels are purpose-led, unique within the region, and ordered consistently. Use
one primary action when a conversion or account task is important. Current
location is not styled or described as that primary action.

Utility actions are secondary to destinations and the principal action. Do not
silently remove destinations, expose icon knowledge as a prerequisite, or
duplicate the same outcome as competing primary actions in the page and header.

## Layout and semantic token mapping

Use `navigation-topbar-background` and `navigation-topbar-border` with
`text-primary` and `text-secondary`. Current location uses `background-accent`
and `text-accent` or another documented non-color indicator. Buttons and Links
inherit their complete mappings.

Treat `topbar-height` as a normal minimum rather than a clipping boundary. Align
content with Public Site page-padding and container tokens. The block introduces
no separate component entry or token family.

## States and behavior

The block may be inline, sticky, disclosure-collapsed, disclosure-expanded, or
temporarily modal. Individual hover, focus, active, and expanded states remain
owned by participating components. Current destination remains visible with focus.

Brand and destination activation navigate. Route changes close a temporary
presentation when appropriate. Opening a non-modal Disclosure leaves focus on its
trigger; modal navigation follows Dialog or Drawer for focus entry, containment,
dismissal, and restoration. Content loading does not reorder or collapse the
block unexpectedly.

## Responsive and localization behavior

Transform according to available space, label length, zoom, and input capability
rather than device detection. Retain brand and the primary action when possible,
move secondary utilities into an accessible overflow treatment, and replace the
destination list with Disclosure before labels overlap or clip.

At 200% zoom, brand, trigger, current location, and primary action remain
reachable without horizontal page scrolling. Longer translations do not cause
silent destination removal. Logical order and alignment support right-to-left
direction; directional icons mirror only when their meaning depends on direction.

## Accessibility

Expose the brand destination, primary navigation purpose, destination names,
current location, disclosure state, and utility purpose. Name each navigation
landmark distinctly when more than one exists. Current location has a non-color
visual cue and a programmatic current state.

All destinations and actions work without pointer input and retain visible focus.
Sticky content does not cover focused controls or anchor destinations.
High-contrast modes preserve boundaries, current state, and focus. Reduced motion
removes transitions without delaying access.

### Web adapter

Use a header with a named navigation landmark and native anchors for destinations.
Mark the current destination with the appropriate `aria-current` value. A
Disclosure trigger is a native button with expanded and controlled relationships;
modal presentation follows the Dialog or Drawer adapter.

Preserve DOM order and use logical layout properties rather than visual
reordering. Provide a Skip Link or equivalent bypass route past repeated
navigation to the page's primary content.

## Representative example

A public product site displays its brand, Product, Pricing, and Resources links,
plus one “Start free” action. When translated labels no longer fit, the links move
behind a labelled navigation Disclosure while the brand and primary action remain
available.

## Validation scenarios

Apply the shared matrix and the checks in
[`Public landing`](../VALIDATION.md#public-landing),
[`Public content`](../VALIDATION.md#public-content), and
[`Block composition`](../VALIDATION.md#block-composition-and-reflow). Include
inline, disclosure, modal, sticky, current-route, long-label, 60% expansion, RTL,
200% zoom, high-contrast, reduced-motion, loading, and duplicate-action cases.
