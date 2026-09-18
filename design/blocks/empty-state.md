# Empty State block

## Status

Draft while representative collection and page-level implementations validate the
new block ownership boundary.

## Intent

The Empty State block explains why expected content is absent and presents a
realistic next step. It distinguishes a legitimate empty collection from loading,
filtering, failure, lost connectivity, and lack of permission without creating a
new interactive role.

## Use when

Use this block after the containing collection or page has determined why content
cannot be presented. It may appear compactly inside a bounded collection or
spaciously when absence is the page's primary content.

## Do not use when

Do not show Empty State before an initial request completes. Use
[`Progress`](../components/progress.md) while work is underway and
[`Alert`](../components/alert.md) when a message must remain near otherwise usable
content. Do not use generic encouragement merely to fill space.

## Anatomy

1. Optional nonessential icon or illustration
2. Concise title naming the condition
3. Explanation or relevant context
4. Optional primary recovery or creation action
5. Optional secondary action, such as clearing filters or learning more

## Variants

- **No data yet:** The collection is valid but has no records.
- **No results:** A completed query has no matches.
- **Filtered empty:** Existing data is excluded by current filters.
- **Unavailable:** Data cannot be shown because of connectivity, permission, or
  another known boundary.
- **Error:** Retrieval failed and a retry or recovery route exists.

Compact and spacious presentations change layout and spacing, not the amount or
meaning of essential information.

## Participating components and related patterns

Actions follow [`Button`](../components/button.md),
[`Link`](../components/link.md), and the
[`Action hierarchy and emphasis`](../patterns/action-hierarchy-and-emphasis.md)
pattern. Local progress follows [`Progress`](../components/progress.md), while a
contained warning or error may use [`Alert`](../components/alert.md).

The containing collection retains its own semantics. Query persistence, result
scope, and clear behavior follow
[`Search, filtering, and results`](../patterns/search-filtering-and-results.md).
Loading, retry, announcement, and replacement timing follow
[`Asynchronous feedback`](../patterns/async-feedback.md) and
[`Data display`](../patterns/data-display.md).

## Content requirements

The title names the current condition. The description explains its cause or
consequence without exposing sensitive details. Include an action only when the
person can perform it and its outcome is clear.

Do not offer retry for valid no-data states, creation without permission, or a
clear-filters action that changes criteria not named by the control. Preserve
search terms, filters, sort state, and valid input while the condition is shown.
Illustrations are optional and never carry the only explanation.

## Layout and semantic token mapping

Use the containing surface with `text-primary` and `text-secondary`. A contained
warning or error may use the matching `feedback-*` roles. Actions inherit their
Button or Link mappings. Illustrations use neutral or brand roles and never use
danger color decoratively.

Compact presentation fits the collection region without forcing unnecessary
height. Spacious presentation uses a readable content width and remains aligned
with the page container. The block introduces no dedicated token family.

## States and behavior

The block may be current, retrying, persistent, or resolving. These describe its
presentation; request state and recovery remain owned by the related patterns.
Retrying preserves the explanation and action context or replaces the initiating
action with local progress without clearing unrelated content.

When content becomes available, remove the block without moving focus unless the
focused control no longer exists. A permission or offline condition remains until
the underlying condition changes. A local action does not compete with a
higher-level commitment for the same task.

## Responsive and localization behavior

Titles, descriptions, and actions wrap. Actions stack when their labels no longer
fit, while reading and focus order remains title, explanation, primary action,
then secondary action. Essential copy is not truncated or moved exclusively into
a tooltip.

Support translation, increased text spacing, 200% zoom, right-to-left direction,
and locale-sensitive values without horizontal page scrolling. Decorative imagery
may simplify or disappear in constrained space.

## Accessibility

Expose the condition, explanation, and actions in meaningful reading order.
Recovery actions have names that identify their outcome. Decorative imagery is
excluded from the accessibility tree; informative imagery has an equivalent text
alternative.

When a user-initiated query or filter change produces the condition, announce it
once without moving focus by default. A page loaded directly into a stable empty
state does not require an automatic announcement. High-contrast modes retain
headings, boundaries, and actions. Reduced motion removes decorative transitions.

### Web adapter

Use ordinary document structure inside the containing region. Associate a table,
grid, listbox, or results region with the current status when needed. Use
`role="status"` only for a newly changed, non-urgent result and an alert only for
an urgent failure that satisfies the Alert contract.

Do not place decorative Empty State content inside a listbox, menu, or grid as if
it were a selectable item. Preserve native Button and Link behavior for actions.

## Representative example

A filtered project table with no matches says “No projects match these filters,”
keeps the active filters visible, and offers “Clear filters.” A new workspace with
no projects instead explains the starting condition and offers “Create project.”

## Validation scenarios

Apply the shared matrix and the checks in
[`Data management`](../VALIDATION.md#data-management),
[`Form workflow`](../VALIDATION.md#form-workflow), and
[`Block composition`](../VALIDATION.md#block-composition-and-reflow). Include
no-data, no-results, filtered, unavailable, error, retrying, resolved, compact,
spacious, long-copy, translated, RTL, high-zoom, high-contrast, and announced
result cases.
