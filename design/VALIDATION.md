# Validation guide

Use this guide to review Bento UI implementations in representative workflows and
adverse conditions. It complements the normative rules in [`DESIGN.md`](../DESIGN.md),
the [`component contracts`](components/), and the [`experience
patterns`](patterns/); it does not redefine them or prescribe one layout.

Apply the shared matrix and every scenario relevant to the change. When a check is
not applicable, record why rather than marking an entire category as unsupported.

## Shared validation matrix

| Dimension         | Required coverage                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------------- |
| Available space   | Mobile, tablet, desktop, and wide layouts, including content-driven transformations                            |
| Input             | Keyboard, pointer, and touch; hover is an enhancement only                                                     |
| Text              | 200% text enlargement, increased text spacing, long valid values, and at least 60% label expansion             |
| Direction         | Left-to-right and right-to-left order; directional icons mirror only when their meaning depends on direction   |
| Locale            | Locale-aware names, dates, times, numbers, units, and currency using at least two materially different formats |
| Presentation      | Light, dark, inverse when used, forced colors or high contrast, and reduced motion                             |
| Navigation        | Meaningful reading order, visible focus, a bypass route, no keyboard trap, and predictable focus restoration   |
| State             | Relevant loading, empty, partial, stale, offline, permission, validation, success, and failure conditions      |
| Content integrity | No clipped essential text, inaccessible truncation, color-only meaning, or destructive loss of valid work      |

## Scenario checklists

### Public landing

**Outcome:** A first-time visitor can understand the offer, identify supporting
evidence, and choose a next step without learning application navigation.

- Keep navigation, heading, summary, evidence, actions, and footer in a meaningful
  reading order when columns collapse or optional media is missing.
- Provide no more than one primary action in a decision region. Do not rely on
  hover, imagery, or color to communicate its purpose.
- Preserve destination names, order, current location, focus restoration, and
  background-interaction rules when navigation changes presentation.
- Test a 90-character heading, action labels expanded by 60%, mixed-length proof
  statements, missing images, and multi-paragraph disclosures.
- Keep asynchronous action labels and context available through loading, failure,
  and recovery.

### Public content

**Outcome:** A visitor arriving at any point can understand the document, move
through its structure, interpret warnings and comparisons, and leave without
losing their place.

- Preserve a semantic document outline, readable measure, descriptive links,
  freshness metadata, and canonical breadcrumb relationships.
- Keep focused headings visible below sticky content and return focus predictably
  after in-page navigation.
- Preserve alert severity and table relationships without depending on color or
  two-dimensional page scrolling.
- Test long-form content, a 120-character title, repeated headings with unique
  destinations, unbroken identifiers, RTL, 200% text, and a six-column table.
- Removing optional media must not remove instructions, meaningful captions, or
  the sequence of the article.

### Dashboard overview

**Outcome:** A returning user can identify current location, freshness, the most
important action, and work needing attention even when some data is unavailable.

- Distinguish initial loading, background refresh, stale data, partial failure,
  empty data, no results, permissions, offline state, and errors.
- Keep successful regions usable when one region fails; place recovery beside
  the affected content.
- Do not present placeholders as real metrics or selectable rows, and do not use
  event feedback as persistent status.
- Test unavailable, stale, and oversized metrics; translated labels; multiple
  writing systems; zero and many records; 200% zoom; and theme changes during
  refresh.
- Preserve scroll, focus, selection, navigation, and freshness state when layout
  or theme changes.

### Data management

**Outcome:** A recurring user can search, compare, select, and act on a large
record set without asynchronous updates destroying query or navigation context.

- Keep filters, sort, result count, freshness, selection, pagination, and row
  actions understandable without color or hover.
- Keep focus distinct from selection and active-item state. Preserve valid
  selections across filtering, pagination, refresh, and removal, and explain
  selections that become unavailable.
- Ignore stale asynchronous responses rather than allowing them to reset a newer
  query, focus, selection, or scroll position.
- Test 0, 1, 25, 4,286, and unknown totals; duplicate names; 120-character names;
  missing values; multiple locales; out-of-order refreshes; and partial bulk
  results.
- At narrow widths and 200% zoom, preserve exact values, headings, controls,
  recovery, and relationships using prioritization, contained scrolling, stacked
  records, or a detail page as appropriate.
- Use a data grid only when managed cell navigation, editing, or range selection
  is necessary.

### Form workflow

**Outcome:** A user can understand requirements, correct problems, submit once,
and recover from interruption or failure without losing valid work.

- Give every field a persistent visible label and the necessary programmatic
  name, requirement, description, unit, and error relationship.
- Distinguish untouched, edited, validating, valid, warning, invalid, submitting,
  succeeded, and failed states without excessive announcements.
- Never clear valid input during validation or failure. Link submission summaries
  to affected controls.
- Prevent duplicate submission while preserving the action label, values,
  messages, and task context.
- Test errors above and below the viewport, maximum content, 60% expansion, 200%
  text, an on-screen keyboard, late validation responses, network loss, retry,
  and server conflicts.
- Confirm cancellation only when meaningful work would be lost, and name the
  consequence and safe action.

### Destructive workflow

**Outcome:** Before committing, a user understands the action, object, scope,
permanence, and recovery without relying on color.

- Give reversible work less interruption than permanent or broad-scope loss.
  Offer undo only for a recovery mechanism the product actually provides.
- For permanent deletion, name the object, affected data or people, permanence,
  prerequisites, and final action explicitly. Favor the safe initial focus.
- Ensure one activation creates at most one operation. Treat an ambiguous network
  result as unknown rather than encouraging an unsafe duplicate submission.
- Keep cancellation visually and operationally distinct from commitment. Define
  predictable focus entry, dismissal, restoration, and post-removal movement.
- Test similar and very long object names, missing permissions, policy blocks,
  network loss before/during/after commitment, partial bulk results, 200% text,
  Escape, backdrop interaction, and browser navigation.
- Report partial and failed outcomes per object: what changed, what did not, and
  what can safely happen next.

## Recording evidence

Keep product-specific evidence in the pull request, issue, release record, or
other durable review record. Include:

- Product or implementation name and source revision.
- Applicable scenarios and conditions from the shared matrix.
- Browser, operating-system, device, input, assistive-technology, theme, locale,
  and writing-direction coverage.
- Automated results, manual review notes, and screenshots when they clarify a
  rendered condition.
- Known limitations, affected users, compensating behavior, owner, and review
  date.

Parsing, generation, compilation, inventory coverage, or visual inspection alone
does not demonstrate accessible behavior or user outcomes. Correct recurring
failures in the shared foundation, component, or pattern; keep genuinely local
needs in the consuming product.
