# Accordion

## Status

Contract complete for multiple-open, single-open, and required-open accordions.

## Intent

An accordion coordinates a vertical group of related sections whose headings
control the visibility of their panels. Use a single
[`Disclosure`](disclosure.md) when content does not need group coordination. Do
not use Accordion to imitate Tabs, navigation, a menu, or sequential workflow.

Each item inherits Disclosure behavior. Accordion adds group policy, heading
structure, optional managed header navigation, and rules for preserving state as
items change.

## Anatomy and variants

1. Accordion group
2. Section with a semantic heading
3. Header Button as the heading's only interactive content
4. Expanded or collapsed indicator
5. Controlled content panel
6. Optional persistent action adjacent to, but outside, the heading

- **Multiple-open:** The default. Any number of panels may be expanded and every
  expanded panel may be collapsed.
- **Single-open:** Expanding one panel collapses the previously expanded panel;
  every panel may still be collapsed.
- **Required-open:** Exactly one panel remains expanded. The current panel cannot
  be collapsed until another panel opens.

The chosen policy is stable for the life of the group and does not change at a
responsive breakpoint.

## Sizes and semantic token mapping

Headers use the Button or Disclosure trigger mapping appropriate to their
surrounding density. Panel content uses its containing surface, text, border, and
spacing roles. The expanded indicator inherits the header foreground and uses a
non-color shape or direction change.

Use comfortable default spacing and avoid compressing multi-line headings into a
dense control height. No separate frontmatter entry is required because Accordion
composes existing Button, Disclosure, text, and surface mappings. Add a flat
mapping only if an approved Accordion header develops a distinct visual recipe
that the current DESIGN.md schema can represent honestly.

## States

Support collapsed, expanded, hover when available, focus, loading, error, and
non-collapsible expanded states as applicable. Focus remains visible independently
of expansion, loading, or error. Required-open makes only the current collapse
action unavailable; it does not make the section content unavailable.

Loading leaves the panel expanded when its status or recovery appears there. An
error remains associated with the affected panel and does not collapse it. A
disabled item is avoided unless an understandable reason remains available.

## Behavior

Enter or Space on a header toggles its panel according to the group policy. Focus
remains on the header. Tab and reverse Tab follow ordinary page focus order through
every header and interactive panel descendant.

Arrow, Home, and End navigation among headers are optional. If provided, use one
documented roving-focus model for the entire group: previous and next move among
enabled headers, Home moves to the first, and End moves to the last. These commands
do not replace ordinary Tab navigation into panel content.

Opening a panel does not move focus into it automatically. A deep link or
programmatic destination inside a collapsed panel expands the required ancestor
before moving or scrolling to the destination. Nested accordions are discouraged;
when unavoidable, each group has a distinct name and keyboard commands affect only
the nearest group.

When an item is inserted, removed, or reordered, preserve each surviving panel's
identity and expanded state. If the focused header is removed, move focus to the
nearest logical header or the next meaningful element after the accordion.

## Responsive behavior

Heading labels, metadata, and indicators wrap without clipping or overlapping.
Panels reflow in ordinary reading order and do not introduce simultaneous
horizontal and vertical page scrolling. Responsive changes preserve the group
policy, expanded items, focus, and content state.

Use logical alignment for indicators and adjacent actions. Directional indicators
mirror only when their meaning depends on writing direction. Heading level follows
the localized page outline rather than a visual size or a fixed Accordion level.

## Accessibility

Expose each heading, header action, expanded state, controlled panel, and
unavailable collapse state. The heading level fits the surrounding information
architecture. State is not communicated only through color, indicator rotation,
or animation.

Panel regions are optional. Use a named region when a panel contains substantial
structure or a nested accordion, but avoid creating excessive landmarks when many
panels can be expanded. Every interaction works without pointer input and all
panel descendants remain in meaningful reading and focus order.

High-contrast modes preserve header boundaries, focus, and expansion indicators.
Reduced motion makes panel expansion effectively immediate while retaining the
same expanded state and content availability.

### Web adapter

Place each native Button inside a heading element whose level fits the page. The
Button is the only element inside that heading and exposes `aria-expanded` and
`aria-controls`. Place persistent actions or content summaries outside the
heading while keeping their section relationship understandable.

Hide a collapsed panel with a mechanism that removes unavailable descendants from
the focus order. An expanded panel may use `role="region"` with
`aria-labelledby` when a landmark improves navigation. In required-open mode,
expose the current header's unavailable collapse action with `aria-disabled` while
leaving it focusable.

## Example

A settings page uses a multiple-open Accordion for Profile, Notifications, and
Security. Opening Notifications leaves focus on its header. The user may Tab into
its controls, return to another header, and keep both Profile and Notifications
expanded while editing.
