# Pagination

## Status

Contract complete for numbered and sequential pagination.

## Intent

Pagination divides a large ordered result set into stable portions while keeping
the current position, result context, and route through the set understandable.
Use it when loading or presenting every result would reduce performance or task
clarity. Do not paginate short content merely to reduce page length, and do not
use pagination to represent sequential workflow steps.

Pagination follows the shared collection model, asynchronous-feedback pattern,
and the state-preservation requirements of the data-display pattern.

## Anatomy and variants

1. Named navigation region
2. Current-page or result-range summary
3. Previous and next controls
4. Optional first and last controls
5. Optional numbered page controls and gap indicators
6. Optional page-size control

- **Numbered pagination:** Exposes nearby page choices and is preferred when the
  total number of pages is known and direct movement is useful.
- **Sequential pagination:** Exposes previous and next movement when the total is
  unknown, unstable, or represented by cursors.

A page-size control is a separate Select associated with the pagination region.
Progressive “Load more” behavior is not numbered pagination; if used, it preserves
already loaded content, position, and a route to the newly added results.

## Sizes and semantic token mapping

Pagination controls use small Button sizing in compact tables and medium sizing
when touch is expected. The current page uses `background-accent` and
`text-accent` with a non-color current indicator. Available controls use outline
or ghost action treatment according to the surrounding emphasis. Disabled
boundary controls use their component's disabled roles.

The current page is a location state, not a primary action. Gap indicators are
informational text and never interactive. No separate frontmatter component entry
is required because Pagination composes Button, Select, text, and selection roles.

## States

Support default, hover when available, focus, current, unavailable boundary,
loading, error, and changed-result states. Focus remains visible on the current
page and on a control that initiates loading. A loading state prevents duplicate
requests without removing the current result set or position summary.

When filtering or page-size changes reduce the number of pages, retain the
current page when valid; otherwise move to the nearest valid page and communicate
the changed range. An error preserves the previous usable results and provides
retry when possible.

## Behavior

One activation requests one destination page. Previous and next move exactly one
page or cursor step. First and last appear only when those destinations are known
and useful. Numbered controls use a stable window around the current page; gap
indicators communicate omitted ranges without pretending every page is visible.

When new results replace the current set, keep focus on the initiating pagination
control unless moving it would leave focus on content that no longer exists. The
result region may receive focus or a programmatic announcement only when that
supports continuation. Sorting, filtering, and page-size changes reset or retain
pagination according to a documented data rule rather than silently selecting an
arbitrary page.

User-facing page state is represented in a shareable location when the product
supports bookmarking, history, or returning to results. Back and forward
navigation restores page, sort, filters, and useful scroll context.

## Responsive behavior

Preserve previous, next, and current-position information when numbered controls
do not fit. Remove distant page choices before hiding the current page or boundary
movement. Controls do not wrap into ambiguous rows; use a compact sequential
presentation instead.

Labels, page numbers, and result summaries use locale-aware formatting and remain
readable at 200% zoom. Touch presentations preserve minimum targets. Logical
previous and next meaning follows content order; directional icons mirror only
when their meaning depends on writing direction.

## Accessibility

Expose the pagination region's purpose, current page, available destinations,
unavailable boundaries, and result-range change. Every icon control has an
action-oriented accessible name. Do not use color alone for the current page or
use an unlabeled ellipsis as a control.

Announce a meaningful new range or result count once after user-initiated
pagination. Do not announce every disabled-state or loading animation change.
High-contrast modes preserve current, focus, and boundary states. Reduced motion
removes scrolling or replacement animation without obscuring the result change.

### Web adapter

Use a named navigation landmark. Use links when each page is a navigable location
and buttons when pagination changes an in-place data view without navigation.
Expose the current destination with `aria-current="page"`. Associate the result
summary and page-size Select with the pagination region through visible text and
programmatic relationships.

Gap indicators remain outside the tab order. A result region may use a stable
status node to announce a new range without moving focus.

## Example

A project table with 240 records shows “21–40 of 240,” Previous, pages 1, 2, 3,
an omitted-range indicator, page 12, and Next. Activating page 3 preserves table
filters, replaces only the result rows, and announces “Projects 41–60 of 240.”
