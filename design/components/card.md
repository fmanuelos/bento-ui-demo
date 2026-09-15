# Card and statistic card

## Status

Contract complete.

## Intent

Cards group related content when a boundary improves comprehension. They are not
the default wrapper for every dashboard region.

## Anatomy and variants

1. Optional heading or label
2. Primary content
3. Optional metadata or action

- **Standard card:** A standard surface using `surface-primary`, a quiet border,
  `rounded.shape-lg`, and `spacing.space-6` without a shadow.
- **Compact card:** A standard surface using `surface-primary`, a quiet border,
  `rounded.shape-md`, and `spacing.space-4` without a shadow.
- **Statistic card:** Emphasizes a `data-*` value before label and context.

## States

A static card has no hover state. An interactive card needs a single clear action,
visible hover and focus, and the platform semantic that matches its action. Focus
remains visible independently of any nested control. Loading, empty, and error
states follow the applicable data-display pattern and
[`empty-state contract`](empty-state.md).

## Behavior

A whole-card action has one destination or action. It must not conflict with
nested controls. When a card contains multiple actions, keep the container static
and expose each action separately. Visual elevation does not imply interactivity.

## Responsive behavior

Cards reflow based on available width. KPI groups may use two to four columns and
stack before values or labels become difficult to scan.

## Accessibility

Use semantic headings and preserve reading order. Do not make nested interactive
controls part of a conflicting whole-card action. Grouping, heading, value,
metadata, and action relationships remain understandable without the visual
boundary.

### Web adapter

Use an ordinary section or article for static grouped content when appropriate.
Use a link for a whole-card destination and a button for a whole-card action, but
do not nest other interactive elements inside that control. Preserve a valid
heading hierarchy.

## Example

Use a statistic card for completion percentage, label, comparison, and timeframe.
