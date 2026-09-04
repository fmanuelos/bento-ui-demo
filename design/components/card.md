# Card and statistic card

## Status

Specified; the demo uses inline card markup but no reusable React component.

## Intent

Cards group related content when a boundary improves comprehension. They are not
the default wrapper for every dashboard region.

## Anatomy and variants

1. Optional heading or label
2. Primary content
3. Optional metadata or action

- **Standard card:** `surface-primary`, `rounded.lg`, and `spacing.xl`.
- **Compact card:** `surface-primary`, `rounded.md`, and `spacing.lg`.
- **Statistic card:** Emphasizes a `data-*` value before label and context.

## States

A static card has no hover state. An interactive card needs a single clear action,
visible hover and focus, and semantic link or button behavior.

## Responsive behavior

Cards reflow based on available width. KPI groups may use two to four columns and
stack before values or labels become difficult to scan.

## Accessibility

Use semantic headings and preserve reading order. Do not make nested interactive
controls part of a conflicting whole-card action.

## Example

Use a statistic card for completion percentage, label, comparison, and timeframe.
