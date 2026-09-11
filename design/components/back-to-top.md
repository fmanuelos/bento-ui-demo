# Back to top

## Status

Contract complete for the inline pattern. Floating presentation is optional.

## Intent

Back to top is an optional in-page navigation aid for long pages and independent
scroll regions. It supplements the initial bypass route, landmarks, headings,
and platform navigation rather than replacing them.

## Anatomy and variants

1. Upward-direction indicator
2. Visible destination label

- **Inline:** Default presentation after primary content and before the footer.
- **Floating:** Optional presentation that becomes available after substantial
  scrolling and stops before overlapping the footer or another fixed region.

Use one control for each scroll context. Do not use an icon-only presentation;
the indicator supplements the visible label.

## Sizes and semantic token mapping

The inline presentation uses `action-link-*`, `label-md`, `shape-md`, the global
focus roles, and at least the minimum interactive target. A floating presentation
adds `surface-raised`, `border-secondary`, and `text-link`. It does not introduce
a dedicated token family or adopt primary-button styling.

## States

Support default, hover when available, focus, and active states. Back to top has
no disabled state. A floating presentation additionally supports unavailable near
the top destination and available after substantial scrolling; these visibility
changes do not move focus or require announcement.

## Behavior

Activation returns the current scroll context to its named top destination and
moves navigation focus to that destination. Do not move only the viewport while
leaving focus on an off-screen control. Movement is immediate by default. Any
optional smooth movement becomes immediate when reduced motion is requested.

## Responsive behavior

Inline presentation reflows with its surrounding content. Floating presentation
uses logical placement and respects system safe areas, zoom, text enlargement,
and persistent controls. It never obscures content, focused controls, or actions.
When those conditions cannot be met, use the inline presentation.

## Accessibility

Use the visible label “Back to top”, or name a specific scroll region when the
destination would otherwise be ambiguous. The indicator is decorative. Preserve
a visible focus treatment, a meaningful focus order, and the minimum interactive
target. Provide only one Back-to-Top control for each destination.

### Web adapter

Use a native anchor whose fragment identifies a stable destination in the same
document. The destination is the start of `main`, its page heading, or the named
top of an independent scroll region and must accept programmatic focus. Account
for sticky headers with logical scroll margin. Keep an optional floating link in
a meaningful DOM position regardless of its fixed visual placement.

## Example

A long report places an inline “Back to top” link after its final section and
before the footer. Activation returns focus and the viewport to the report title.
