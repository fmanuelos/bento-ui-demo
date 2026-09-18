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

### Action hierarchy

**Outcome:** A user can identify the most important appropriate action in each
decision region without losing access to supporting, navigation, cancellation,
or recovery actions.

Apply the
[`Action hierarchy and emphasis`](patterns/action-hierarchy-and-emphasis.md)
pattern together with every functional pattern that owns the actions' outcomes.

- Name each decision region and classify its controls as primary action,
  supporting action, alternative, utility, navigation, or destructive
  commitment. Keep at most one primary action in a region.
- Check adjacent and nested regions together. When independent regions each have
  a primary action, verify that headings, containment, spacing, and quieter
  nested treatment make every scope unambiguous.
- Verify Button and Link semantics before visual treatment. Current location,
  selection, status, validation severity, and progress must not appear to be a
  primary action.
- Put the primary action into loading, disabled, unavailable, failed, and outcome
  unknown states. Preserve its label and context, explain unavailable outcomes,
  and do not silently promote Cancel or an unrelated supporting action.
- For destructive commitment, preserve a safe alternative, communicate the
  consequence in text, avoid combining primary and destructive treatments, and
  favor safe initial focus unless task evidence requires otherwise.
- Remove optional actions and resolve empty or error regions. The remaining
  hierarchy must still represent the task, and focus must continue at a logical
  location when its control disappears.
- At narrow widths, 200% text, and 60% label expansion, stack or transform action
  regions without reversing source order, changing priority, clipping labels, or
  hiding commitment, safety, cancellation, or recovery in overflow.
- Test keyboard and reading order, touch targets, right-to-left direction, color
  removal, forced colors, and reduced motion. Purpose and priority must remain
  understandable without relying on color, size, position, or animation alone.

### Dashboard overview

**Outcome:** A returning user can identify current location, freshness, the most
important action, and work needing attention even when some data is unavailable.

- Distinguish initial loading, background refresh, stale data, partial failure,
  empty data, no results, permissions, offline state, and errors.
- Keep successful regions usable when one region fails; place recovery beside
  the affected content.
- Do not present placeholders as real metrics or selectable rows, and do not use
  event feedback as persistent status.
- When initial loading uses skeletons, verify that they approximate only the
  unavailable structure, stay outside counts and interaction semantics, resolve
  independently by region, and transition directly to loaded, empty,
  unavailable, or error content. Background refresh must preserve usable data.
- Test unavailable, stale, and oversized metrics; translated labels; multiple
  writing systems; zero and many records; 200% zoom; and theme changes during
  refresh.
- Test fast completion without distracting placeholder flicker, screen-reader
  output without repeated shape announcements, and skeleton presentation in
  dark mode, forced colors, reduced motion, narrow layouts, and right-to-left
  direction.
- Preserve scroll, focus, selection, navigation, and freshness state when layout
  or theme changes.

### Data management

**Outcome:** A recurring user can search, compare, select, and act on a large
record set without asynchronous updates destroying query or navigation context.

Apply the [`Search, filtering, and results`](patterns/search-filtering-and-results.md),
[`Data display`](patterns/data-display.md),
[`Selection and bulk actions`](patterns/selection-and-bulk-actions.md), and
[`Asynchronous feedback`](patterns/async-feedback.md) patterns together with
the applicable component contracts.

- Keep filters, sort, result count, freshness, selection, pagination, and row
  actions understandable without color or hover.
- Distinguish fixed constraints, initial defaults, applied criteria, and staged
  changes. Verify that individual removal and clear-all affect only their stated
  scope.
- Test immediate and staged application. Closing a temporary filter surface must
  preserve the applied query and must not silently apply or discard a draft.
- Keep focus distinct from selection and active-item state. Preserve valid
  selections across filtering, pagination, refresh, and removal, and explain
  selections that become unavailable.
- Verify that visible-set selection, hidden selections, and whole-query selection
  have distinct, explicit scopes. Changing a query must not silently expand an
  existing whole-query selection.
- Before a bulk operation commits, identify the exact selection, action, mixed
  eligibility, and consequences. Later selection changes must not alter the
  pending operation snapshot.
- Ignore stale asynchronous responses rather than allowing them to reset a newer
  query, focus, selection, or scroll position.
- If initial results use skeleton rows, verify that the placeholders are not
  records, managed cells, selectable targets, result counts, or pagination
  positions. Refreshing existing results must retain the usable rows.
- Preserve the applied query through no results, partial results, failure,
  offline state, retry, direct entry, and supported Back and Forward navigation.
- Test 0, 1, 25, 4,286, and unknown totals; duplicate names; 120-character names;
  empty and long queries; one and many filters; missing values; multiple locales;
  out-of-order refreshes; sensitive criteria; visible, cross-page, and whole-query
  selections; mixed eligibility; and partial bulk results.
- At narrow widths and 200% zoom, preserve exact values, headings, controls,
  recovery, and relationships using prioritization, contained scrolling, stacked
  records, or a detail page as appropriate.
- Use a data grid only when managed cell navigation, editing, or range selection
  is necessary.

### Form workflow

**Outcome:** A user can understand requirements, correct problems, submit once,
and recover from interruption or failure without losing valid work.

Apply the [`Forms and validation`](patterns/forms-and-validation.md),
[`Task continuity and unsaved work`](patterns/task-continuity.md), and
[`Asynchronous feedback`](patterns/async-feedback.md) patterns together with the
applicable component contracts.

- Give every field a persistent visible label and the necessary programmatic
  name, requirement, description, unit, and error relationship.
- Distinguish untouched, edited, validating, valid, warning, invalid, submitting,
  succeeded, and failed states without excessive announcements.
- Never clear valid input during validation or failure. Link submission summaries
  to affected controls.
- Prevent duplicate submission while preserving the action label, values,
  messages, and task context.
- Distinguish edited, unsaved, saving, durably saved, save failed, offline,
  queued, conflicted, restored, and discarded states where applicable. Saving a
  draft must not imply final commitment.
- Edit while a save is pending and return its responses out of order. A result
  for an older snapshot must not mark newer edits saved or replace their values.
- Test reload, Back and Forward, task closure, responsive transformation, session
  expiry, permission change, and restoration according to the declared
  continuity and sensitive-data policy.
- Test errors above and below the viewport, maximum content, 60% expansion, 200%
  text, an on-screen keyboard, late validation responses, network loss, retry,
  storage failure, simultaneous editing, remote conflicts, and expired drafts.
- Confirm cancellation only when meaningful work would be lost, and name the
  consequence and safe action.

### Destructive workflow

**Outcome:** Before committing, a user understands the action, object, scope,
permanence, and recovery without relying on color.

Apply the [`Destructive actions`](patterns/destructive-actions.md) pattern and,
for multi-record operations, the
[`Selection and bulk actions`](patterns/selection-and-bulk-actions.md) pattern.
When the loss is entered or recovered work, also apply the
[`Task continuity and unsaved work`](patterns/task-continuity.md) pattern.

- Give reversible work less interruption than permanent or broad-scope loss.
  Offer undo only for a recovery mechanism the product actually provides.
- For permanent deletion, name the object, affected data or people, permanence,
  prerequisites, and final action explicitly. Favor the safe initial focus.
- Ensure one activation creates at most one operation. Treat an ambiguous network
  result as unknown rather than encouraging an unsafe duplicate submission.
- For a bulk commitment, preserve an immutable selection snapshot. Report mixed
  eligibility and later partial, failed, or unknown outcomes without silently
  omitting records.
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
