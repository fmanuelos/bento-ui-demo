# Web adapter

This adapter maps Bento UI to web-platform mechanisms. These mechanisms are
implementation guidance, not the conceptual definitions of the design system.

## Semantics and interaction

- Prefer native HTML elements whose semantics and behavior satisfy the component
  contract.
- Use WAI-ARIA patterns only when native semantics do not express the required
  composite behavior, and implement the corresponding keyboard interaction.
- Expose names, roles, values, states, descriptions, errors, and relationships
  through HTML and accessibility APIs.
- Preserve DOM reading order and focus order when CSS changes visual layout.
- Complete pointer actions on release so users can cancel before completion unless
  down-event activation is essential.

Component files contain their specific HTML and ARIA mappings under `Web adapter`
subsections.

## Support boundary

This repository provides the web adapter as its current platform mapping. Exact
browser, operating-system, device, and assistive-technology versions are declared
and tested by each consuming product; they are not inferred from generated CSS or
a successful application build. A web support claim records that test matrix and
any known limitation in a durable product review or release record.

## Theme selection

The document's `data-theme` value selects the authored light or dark theme. Set
the corresponding `color-scheme` value so native controls and browser-rendered
UI use the same mode. Theme selection must not change semantics, reading order,
focus order, or available actions, and it must not briefly expose a mismatched
foreground and background while the page initializes.

## Focus and high contrast

- Render a persistent focus indicator for keyboard focus. Do not remove the user
  agent indicator unless the replacement meets the design contract on every
  supported surface.
- Use `colors.focus-ring` and `colors.focus-ring-offset` where they remain
  perceivable. Retain or add a user-agent/system indicator when authored colors
  are insufficient.
- Ensure sticky and overlay content does not fully obscure the focused component.
- Under forced colors, allow system colors and outlines to replace authored color
  while preserving focused, selected, checked, invalid, and disabled states.

## Icons

SVG interface icons normally use `currentColor` so they inherit the component's
semantic foreground. Hide decorative SVG from assistive technology. Give an
informative standalone icon a text alternative, and give an icon-only control an
accessible name on the control rather than duplicating it on the SVG.

## Motion

Use `prefers-reduced-motion: reduce` to detect the web user's reduced-motion
preference. Collapse nonessential transitions and smooth scrolling to effectively
immediate changes while retaining visible state feedback. Do not remove progress
or status information with the animation.

## Skeleton loading

Treat skeleton shapes as decorative. Hide the placeholder group from the
accessibility tree, such as with `aria-hidden="true"`, and apply
`aria-busy="true"` to the named region whose content is unavailable. Do not give
placeholder shapes table, row, grid, grid-cell, list-item, control, value, or
focus semantics, and do not add them to counts or position metadata.

Provide one visible or programmatic loading status when the region and initiating
action do not already identify the pending work. Use a status live region only
when the change needs announcement, such as after a user-initiated request; do
not announce each skeleton shape or animation cycle. When loaded, empty,
unavailable, or error content replaces the skeleton, remove the busy state and
announce only the meaningful resulting change.

Implement shimmer as nonessential CSS motion. Disable the animation under
`prefers-reduced-motion: reduce` while retaining the static placeholder, busy
state, and loading status. Under forced colors, preserve enough region structure
to distinguish unavailable content without requiring authored highlight colors.

## Text and reflow

Support text enlargement to 200%, user text-spacing overrides, and page reflow at
high zoom. Do not clip labels, values, instructions, errors, or controls. Contain
horizontal scrolling to data or media whose meaning requires two dimensions.

## Validation

Supported web experiences target WCAG 2.2 Level AA and the stronger 44px
`touch-target-min` design token where applicable. Test with keyboard-only input,
screen-reader browsing and interaction modes, touch, zoom, increased text
spacing, reduced motion, and forced colors.
