# Empty state

## Status

Contract complete.

## Intent

An empty state explains why expected content is absent and what the user can do
next. It distinguishes a legitimate empty collection from loading, filtering,
failure, lost connectivity, and lack of permission. It does not fill space with
generic encouragement or imply that missing data is an error when it is a valid
starting condition.

## Anatomy and variants

1. Optional nonessential icon or illustration
2. Concise title naming the condition
3. Explanation or relevant context
4. Optional primary recovery or creation action
5. Optional secondary action, such as clearing filters or learning more

- **No data yet:** The collection is valid but has no records. Offer creation only
  when the user can create the first record.
- **No results:** A completed query has no matches. Preserve the query and offer a
  useful revision or clear action.
- **Filtered empty:** Existing data is excluded by current filters. Identify the
  filtering condition and provide a way to change it.
- **Unavailable:** Data cannot be shown because of offline state, permissions, or
  another known boundary. State the reason without exposing sensitive details.
- **Error:** Retrieval failed. Preserve surrounding context and offer retry or
  recovery when one exists.

## Sizes and semantic token mapping

Use a compact presentation inside a listbox, table, data grid, card, or other
bounded collection. Use a spacious presentation only when the empty condition is
the page's primary content. Size changes spacing and composition, not the meaning
or amount of essential explanation.

Neutral empty states use the containing surface with `text-primary` and
`text-secondary`. Error and warning conditions use the matching `feedback-*`
roles when a contained message treatment is needed. Actions follow the Button or
Link contract. Illustrations use brand or neutral roles and never use danger
color decoratively.

No new frontmatter entry is required because Empty State composes existing text,
surface, feedback, and action roles.

## States

Support current, retrying, resolved, and persistent states as relevant. Loading
is not an empty state. A collection does not show “no data” before its first
request has completed. Retrying preserves the explanation and action context or
replaces it with local progress without clearing unrelated content.

When data becomes available, remove the empty state without moving focus unless
focus was on a control that no longer exists. A persistent permission or offline
condition remains visible until the underlying condition changes.

## Behavior

Determine the cause before choosing copy and actions. Titles name the condition;
descriptions explain cause or consequence; actions provide a realistic next step.
Do not offer retry for a valid no-data state or creation when the user lacks
permission.

Search terms, filters, sort state, and valid user input survive empty and failed
results. Clearing filters is explicit and changes only the filters described by
the action. A retry repeats the failed operation without duplicating submissions
or resetting unrelated state.

## Responsive behavior

Compact states fit inside their collection without forcing an unnecessarily tall
surface. Page-level states retain a readable content width. Titles, explanations,
and actions wrap; actions stack when their labels do not fit. Essential copy is
not truncated or moved exclusively into a tooltip.

Reading and focus order remains title, explanation, primary action, then secondary
action in every layout and writing direction. Illustrations may simplify or be
removed in constrained space because they are not the only source of meaning.

## Accessibility

Expose the condition, explanation, and actions in a meaningful reading order.
When an empty state results from a user-initiated query or filter change, announce
the result count or condition once without moving focus by default. A page loaded
directly into a stable empty state does not automatically require a live-region
announcement.

Recovery actions have names that identify their outcome. Icons and illustrations
are decorative unless they add information not already present in text. Color,
imagery, and whitespace are never the only distinction between no data, error,
offline, and permission states.

High-contrast modes retain headings, boundaries, and actions. Reduced motion
removes decorative entrance or replacement transitions.

### Web adapter

Use ordinary document structure inside the containing region. Associate a table,
grid, listbox, or search-results region with its current status where needed. Use
`role="status"` only for a newly changed, non-urgent result; use an alert only for
an urgent failure that meets the Alert contract. Do not put decorative empty-state
content inside a listbox, menu, or grid as if it were a selectable option.

## Example

A filtered project table with no matches says “No projects match these filters,”
keeps the active filters visible, and offers “Clear filters.” A new workspace with
no projects instead explains the starting condition and offers “Create project.”
