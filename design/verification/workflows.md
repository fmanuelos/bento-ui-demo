# Workflow scenarios

Use the [verification guide](README.md#applicability-index) to select applicable
checks. Apply the [baseline validation requirements](baseline.md) alongside every
selected check and follow the [evidence guidance](evidence.md) to record results.

## Public landing

**Outcome:** A first-time visitor can understand the offer, identify supporting
evidence, and choose a next step without learning application navigation.

**Use when:** Reviewing a marketing, acquisition, campaign, product-introduction,
or other first-visit page whose main purpose is orientation and a next action.

**Related contracts:** Apply [`Hero`](../blocks/hero.md),
[`Section Header`](../blocks/section-header.md),
[`Call to Action`](../blocks/call-to-action.md),
[`Feature Grid`](../blocks/feature-grid.md),
[`Plan Comparison`](../blocks/plan-comparison.md),
[`Customer Evidence`](../blocks/customer-evidence.md), and
[`Site Footer`](../blocks/site-footer.md) when those compositions are present,
together with the relevant navigation, action, disclosure, and media contracts.

**Critical behaviors:**

- Provide no more than one primary action in a decision region. Do not rely on
  hover, imagery, or color to communicate its purpose.
- Preserve destination names, order, current location, focus restoration, and
  background-interaction rules when navigation changes presentation.

**Workflow-specific states:**

- Keep asynchronous action labels and context available through loading, failure,
  and recovery.

**Boundary and adverse cases:**

- Test a 90-character heading, action labels expanded by 60%, mixed-length proof
  statements, missing images, and multi-paragraph disclosures.

**Additional baseline emphasis:**

- Keep navigation, heading, summary, evidence, actions, and footer in a meaningful
  reading order when columns collapse or optional media is missing.

## Public content

**Outcome:** A visitor arriving at any point can understand the document, move
through its structure, interpret warnings and comparisons, and leave without
losing their place.

**Use when:** Reviewing an article, policy, guide, documentation page, or another
long-form document that a visitor may enter at any point.

**Related contracts:** Apply [`Page Header`](../blocks/page-header.md),
[`Section Header`](../blocks/section-header.md), and
[`Site Footer`](../blocks/site-footer.md) when those compositions are present,
together with the relevant breadcrumb, link, alert, table, and navigation
contracts.

When contextual destinations follow the content, also apply
[Related content discovery](#related-content-discovery).

**Critical behaviors:**

- Preserve a semantic document outline, readable measure, descriptive links,
  freshness metadata, and canonical breadcrumb relationships.
- Preserve alert severity and table relationships without depending on color or
  two-dimensional page scrolling.

**Workflow-specific states:**

- Removing optional media must not remove instructions, meaningful captions, or
  the sequence of the article.

**Boundary and adverse cases:**

- Test long-form content, a 120-character title, repeated headings with unique
  destinations, unbroken identifiers, RTL, 200% text, and a six-column table.

**Additional baseline emphasis:**

- Keep focused headings visible below sticky content and return focus predictably
  after in-page navigation.

## Focused Flow

**Outcome:** A person can complete one bounded outcome, understand their current
state and consequences, and exit, resume, retry, or recover without losing valid
work.

**Use when:** Reviewing authentication, reauthentication, account recovery,
onboarding, checkout, application submission, initial setup, or another bounded
task whose unrelated choices should be reduced.

**Related contracts:** Apply the
[`Focused Flow`](../experiences/focused-flow.md) mode contract together with
[`Forms and validation`](../patterns/forms-and-validation.md),
[`Task continuity and unsaved work`](../patterns/task-continuity.md),
[`Asynchronous feedback`](../patterns/async-feedback.md), and
[`Action hierarchy and emphasis`](../patterns/action-hierarchy-and-emphasis.md).
Apply destructive-action and temporary-surface contracts when their conditions
are present.

For pre-commitment review and confirmed outcomes, also apply
[Review and completion](#review-and-completion).

**Critical behaviors:**

- Keep the task name and current state stable. Present requirements, fields or
  decisions, validation, consequences, and actions in meaningful reading and
  focus order.
- Keep navigation task-local and preserve a safe exit or return when leaving is
  permitted. Do not expose unrelated global destinations as competing actions.
- Keep one primary action for the current decision. Back, cancel, save and exit,
  help, recovery, and destructive commitment retain distinct purposes and
  emphasis.
- Show progress only for a stable, meaningful sequence. A one-step flow does not
  require progress, and a multi-step flow must not promise completion before the
  authoritative outcome is known.
- Make Back, Forward, direct entry, reload, surface dismissal, and explicit exit
  agree with the declared persistence and unsaved-work policy.

**Workflow-specific states:**

- Distinguish initial, editing, validating, submitting, outcome unknown, failed,
  blocked, completed, expired, and resumed states where applicable.
- Preserve valid input through validation, recoverable failure, responsive
  transformation, and reauthentication when policy permits. Prevent duplicate
  commitment while an outcome is pending or unknown.
- After session expiry, permission loss, or identity change, verify access and
  authoritative data before restoring safe retained work.
- Completion identifies the durable outcome and an accurate next destination;
  intermediate persistence does not imply final commitment.

**Boundary and adverse cases:**

- Test a valid one-step flow and a meaningful multi-step flow, direct entry to
  supported and unsupported steps, browser Back and Forward, reload, interruption,
  save and exit, resumption, expiry, and completion.
- Test validation above and below the viewport, late validation, slow submission,
  failure before and after commitment, unknown outcome, network loss, duplicate
  activation, and recovery without blind resubmission.
- Test long instructions, 60% label expansion, locale-specific names and
  addresses, bidirectional text, password managers or autofill where relevant,
  an on-screen keyboard, 200% text, increased spacing, forced colors, and reduced
  motion.

**Additional baseline emphasis:**

- Use `container-narrow` or `container-readable` with the applicable page padding,
  one column by default, and no persistent workspace sidebar. Stack and wrap
  before content overflows without hiding required guidance or shrinking controls.
- When launched from a Public Site or Application Workspace, verify the boundary,
  origin, exit destination, return context, focus restoration, and state owner.

## Application Workspace

**Outcome:** A recurring user can identify their workspace, current location,
available authorized destinations, and primary task while retaining context
through navigation, responsive transformation, interruption, and failure.

**Use when:** Reviewing an application shell or page for recurring operational,
administrative, publishing, analytical, customer, or support work across related
destinations, records, settings, tools, or data.

**Related contracts:** Apply the
[`Application Workspace`](../experiences/application-workspace.md) mode contract and
[`Navigation shell`](../patterns/navigation-shell.md), together with the applicable
task, data, form, continuity, asynchronous-feedback, and action contracts.

**Critical behaviors:**

- Preserve workspace identity, current location, authorized destinations, primary
  task access, and bypass navigation when the shell changes between persistent,
  collapsed, and temporary presentations.
- Use `workspace-padding-mobile`, `workspace-padding-tablet`, and
  `workspace-padding-desktop` at their matching system ranges. Use
  `container-workspace` when the normal data-heavy width is appropriate; wider
  tables and analysis surfaces require a task reason.
- Give the main task or analysis surface width before secondary summaries or
  inspectors. Density may improve scanning but must not reduce readable text,
  essential targets, or complete values indiscriminately.
- Keep navigation, current location, local views, pagination, selection, status,
  and action priority semantically distinct.

**Workflow-specific states:**

- Preserve applicable route, query, filter, sort, pagination, selection, expanded
  detail, scroll, and return context through navigation, refresh, failure, and
  responsive transformation.
- Test initial loading, background refresh, stale and partial data, offline state,
  no results, missing permission, changed access, session expiry, and unknown
  outcomes without redirecting silently to unrelated work.
- When entering or returning from a Focused Flow, resolve unsaved work and restore
  the intended origin, focus, and authoritative state.

**Boundary and adverse cases:**

- Test navigation labels expanded by 60%, 200% text, narrow task regions, dense
  valid data, an on-screen keyboard, right-to-left direction, touch, keyboard,
  and pointer input.
- Test a narrow layout that requires temporary navigation and a wide layout where
  persistent navigation still cannot coexist with the task. Available space and
  content fit, not a named breakpoint alone, determine the transformation.
- Test role and permission changes while navigation is open, while editing, and
  after direct entry to an unavailable destination.

**Additional baseline emphasis:**

- Verify that dashboard remains a specific overview template or page type rather
  than the label for the complete workspace. Non-dashboard record, editor,
  settings, and administrative pages retain accurate names and structures.

## Dashboard overview

**Experience context:** This is a page-level dashboard scenario within
Application Workspace, not a separate experience mode.

**Outcome:** A returning user can identify current location, freshness, the most
important action, and work needing attention even when some data is unavailable.

**Use when:** Reviewing a page composed of metrics, summaries, status regions, or
several independently loaded data regions.

**Related contracts:** Apply [`Page Header`](../blocks/page-header.md),
[`Section Header`](../blocks/section-header.md), and
[`Metric Overview`](../blocks/metric-overview.md) when those compositions are
present, together with the relevant data-display, asynchronous-feedback,
navigation, status, and action contracts. Apply [`Chart`](../components/chart.md)
and [Data visualization](stress-tests.md#data-visualization) only when a chart is present.

**Critical behaviors:**

- Keep successful regions usable when one region fails; place recovery beside
  the affected content.
- Do not present placeholders as real metrics or selectable rows, and do not use
  event feedback as persistent status.
- Confirm the overview remains complete without a chart unless a documented
  analytical question requires one. A compact trend does not replace its
  metric's exact value, comparison, timeframe, or status.

**Workflow-specific states:**

- Distinguish initial loading, background refresh, stale data, partial failure,
  empty data, no results, permissions, offline state, and errors.
- When initial loading uses skeletons, verify that they approximate only the
  unavailable structure, stay outside counts and interaction semantics, resolve
  independently by region, and transition directly to loaded, empty,
  unavailable, or error content. Background refresh must preserve usable data.

**Boundary and adverse cases:**

- Test unavailable, stale, and oversized metrics; translated labels; multiple
  writing systems; zero and many records; 200% zoom; and theme changes during
  refresh.
- Test fast completion without distracting placeholder flicker, screen-reader
  output without repeated shape announcements, and skeleton presentation in
  dark mode, forced colors, reduced motion, narrow layouts, and right-to-left
  direction.

**Additional baseline emphasis:**

- Preserve scroll, focus, selection, navigation, and freshness state when layout
  or theme changes.

## Data management

**Outcome:** A recurring user can search, compare, select, and act on a large
record set without asynchronous updates destroying query or navigation context.

**Use when:** Reviewing search, filtering, sorting, pagination, selectable data,
or actions over one or many records.

**Related contracts:** Apply the
[`Search, filtering, and results`](../patterns/search-filtering-and-results.md),
[`Data display`](../patterns/data-display.md),
[`Selection and bulk actions`](../patterns/selection-and-bulk-actions.md), and
[`Asynchronous feedback`](../patterns/async-feedback.md) patterns together with the
applicable component contracts. Apply
[`Results Toolbar`](../blocks/results-toolbar.md) when query controls, result
context, and operations form that composition. When metrics summarize the
current query or record scope, also apply
[`Metric Overview`](../blocks/metric-overview.md).

**Critical behaviors:**

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
- Use a data grid only when managed cell navigation, editing, or range selection
  is necessary.

**Workflow-specific states:**

- Ignore stale asynchronous responses rather than allowing them to reset a newer
  query, focus, selection, or scroll position.
- If initial results use skeleton rows, verify that the placeholders are not
  records, managed cells, selectable targets, result counts, or pagination
  positions. Refreshing existing results must retain the usable rows.
- Preserve the applied query through no results, partial results, failure,
  offline state, retry, direct entry, and supported Back and Forward navigation.

**Boundary and adverse cases:**

- Test 0, 1, 25, 4,286, and unknown totals; duplicate names; 120-character names;
  empty and long queries; one and many filters; missing values; multiple locales;
  out-of-order refreshes; sensitive criteria; visible, cross-page, and whole-query
  selections; mixed eligibility; and partial bulk results.

**Additional baseline emphasis:**

- At narrow widths and 200% zoom, preserve exact values, headings, controls,
  recovery, and relationships using prioritization, contained scrolling, stacked
  records, or a detail page as appropriate.

## Form workflow

**Outcome:** A user can understand requirements, correct problems, submit once,
and recover from interruption or failure without losing valid work.

**Use when:** Reviewing data entry, editing, validation, draft saving, or final
submission.

**Related contracts:** Apply the
[`Forms and validation`](../patterns/forms-and-validation.md),
[`Task continuity and unsaved work`](../patterns/task-continuity.md), and
[`Asynchronous feedback`](../patterns/async-feedback.md) patterns together with the
applicable component contracts. Apply
[`Form Section`](../blocks/form-section.md) when related fields and guidance form a
named section within the workflow.

Use [Review and completion](#review-and-completion) when the task presents a
[Review Summary](../blocks/review-summary.md) or
[Completion Summary](../blocks/completion-summary.md).

**Critical behaviors:**

- Give every field a persistent visible label and the necessary programmatic
  name, requirement, description, unit, and error relationship.
- Never clear valid input during validation or failure. Link submission summaries
  to affected controls.
- Prevent duplicate submission while preserving the action label, values,
  messages, and task context.
- Confirm cancellation only when meaningful work would be lost, and name the
  consequence and safe action.

**Workflow-specific states:**

- Distinguish untouched, edited, validating, valid, warning, invalid, submitting,
  succeeded, and failed states without excessive announcements.
- Distinguish edited, unsaved, saving, durably saved, save failed, offline,
  queued, conflicted, restored, and discarded states where applicable. Saving a
  draft must not imply final commitment.
- Edit while a save is pending and return its responses out of order. A result
  for an older snapshot must not mark newer edits saved or replace their values.

**Boundary and adverse cases:**

- Test reload, Back and Forward, task closure, responsive transformation, session
  expiry, permission change, and restoration according to the declared
  continuity and sensitive-data policy.
- Test errors above and below the viewport, maximum content, 60% expansion, 200%
  text, an on-screen keyboard, late validation responses, network loss, retry,
  storage failure, simultaneous editing, remote conflicts, and expired drafts.

**Additional baseline emphasis:**

- Preserve valid values, messages, task context, and a safe continuation across
  responsive transformations, interruption, failure, and recovery.

## Record inspection and history

**Outcome:** A person can inspect current record facts and understand related
events without confusing current state, partial history, or missing information.

**Use when:** Reviewing a profile, support case, publishing record, or another
Application Workspace record with grouped attributes or chronological events.

**Related contracts:** Apply [Record Details](../blocks/record-details.md),
[Activity History](../blocks/activity-history.md),
[Data display](../patterns/data-display.md),
[Task continuity](../patterns/task-continuity.md), and
[Asynchronous feedback](../patterns/async-feedback.md) as applicable.

**Critical behaviors:**

- Identify each fact's label, value, availability, and local action without
  relying on columns. Keep page identity and page-wide actions in their own scope.
- Distinguish historical event outcomes from the current record state. Name
  chronological order and explain filtered, retained, or partial history.
- Return from local editing to the correct record and updated facts, preserving
  useful history context. Preserve focus and expanded detail during refresh.
- Associate actor, action, subject, and timestamp; provide an exact time route
  without hover and define stable ordering for equal or unknown timestamps.

**Workflow-specific states:**

- Exercise initial loading, current, stale, partial, missing, offline, failed,
  and permission-limited data. Do not render placeholders as facts or events.
- Remove restricted values, actors, and event detail after access changes,
  including hidden and accessible content. Resolve focus when controls disappear.
- Fail an older-events request while leaving current history usable. Deliver
  late and duplicate events without duplication, causal claims, or scroll jumps.

**Boundary and adverse cases:**

- Test both Record Details examples and both Activity History examples, minimal
  and complete anatomy, zero and many events, unknown actors or times, long
  identifiers and addresses, timezone changes, duplicate names, and retention gaps.

**Additional baseline emphasis:**

- Keep label-value and event relationships intact at 200% text, 60% expansion,
  RTL, and narrow widths. Verify keyboard, touch, screen-reader, light and dark
  theme, forced-color, and reduced-motion behavior.

## Review and completion

**Outcome:** A person can check a pending commitment, correct information, and
understand the confirmed outcome without losing work or submitting twice.

**Use when:** Reviewing application submission, publication changes, import
results, or similar tasks in Focused Flow and Application Workspace.

**Related contracts:** Apply [Review Summary](../blocks/review-summary.md),
[Completion Summary](../blocks/completion-summary.md),
[Forms and validation](../patterns/forms-and-validation.md),
[Task continuity](../patterns/task-continuity.md), and
[Asynchronous feedback](../patterns/async-feedback.md). Apply
[Destructive actions](../patterns/destructive-actions.md) when warranted.

**Critical behaviors:**

- Keep labelled answers, proposed changes, corrections, and material consequences
  associated. The containing workflow owns one appropriate final action.
- Correct an answer and return without losing unrelated work. Recompute dependent
  answers and consequences, and ensure commitment refers to the reviewed scope.
- Distinguish received, processed, approved, partially completed, failed, and
  unknown outcomes. Saving a draft or queueing a request must not imply completion.
- Preserve confirmed results when an optional receipt or result download fails.
  Describe remaining work and the next responsible party when necessary.

**Workflow-specific states:**

- Test incomplete review, stale authority, permission changes, interrupted
  corrections, pending submission, failure before and after commitment, unknown
  outcome, and terminal partial results.
- Reload, navigate Back and Forward, and directly open a result. Follow the
  product's retrieval policy without submitting again or inventing success.
- Verify that completion focus and announcements communicate the outcome once,
  and that partial retries cannot repeat successful consequential operations.

**Boundary and adverse cases:**

- Cover both representative uses of each block and both supported modes. Include
  no correction actions, no useful continuation, masked answers, long references,
  missing optional answers, blocked requirements, and changed dependent values.

**Additional baseline emphasis:**

- Keep consequences and complete values visible at narrow widths, 200% text,
  60% expansion, and RTL. Check keyboard, touch, screen readers, both themes,
  forced colors, and reduced motion, including a transition from review to result.

## Related content discovery

**Outcome:** A person can understand why destinations are relevant and follow
them without losing access to the current task's essential instructions.

**Use when:** Reviewing related public articles or contextual workspace resources.

**Related contracts:** Apply [Related Content](../blocks/related-content.md),
[Link](../components/link.md), [Card](../components/card.md) when used, and
[Asynchronous feedback](../patterns/async-feedback.md).

**Critical behaviors:**

- Identify each destination and its relationship to the current subject. Keep
  required instructions in the task rather than only in optional resources.
- Provide distinct link names and one focus target per destination within an
  item. Do not nest controls in whole-card links.
- Omit empty sections and use an ordinary contextual link for a single resource.
  Remove restricted titles and summaries under the product's disclosure policy.

**Workflow-specific states:**

- Exercise loading, partial failure, failed media, unavailable destinations,
  refreshed ranking, and access changes without fabricating resources or moving
  focus unexpectedly. Remove a focused item and verify predictable continuation.

**Boundary and adverse cases:**

- Test both supported modes, two through the supported maximum number of items,
  zero and one item, duplicate titles, long summaries, mixed languages, and each
  optional region removed independently.

**Additional baseline emphasis:**

- Preserve source order, complete labels, metadata, and targets through 60%
  expansion, 200% text, RTL, narrow layouts, theme changes, forced colors,
  keyboard, touch, screen readers, and reduced motion.

## Plan selection

**Outcome:** A person can compare applicable offers, understand the actual price
and limitations, and enter the correct next step for their chosen plan.

**Use when:** Reviewing public pricing or account upgrade comparisons.

**Related contracts:** Apply [Plan Comparison](../blocks/plan-comparison.md),
[Table](../components/table.md) when used,
[Data display](../patterns/data-display.md),
[Asynchronous feedback](../patterns/async-feedback.md), and
[Action hierarchy](../patterns/action-hierarchy-and-emphasis.md).

**Critical behaviors:**

- Compare consistent attributes and units. Preserve currency, period, quantity
  basis, actual billed total, commitment, limitations, and next-action meaning.
- Keep current, selected, and recommended plans distinguishable. Verify the
  rationale for a recommendation and at most one primary action in the decision.
- Change billing basis and verify prices, qualifications, selection context,
  and destination agree. Never commit a combination of old and new offer data.
- Confirm that the purchase flow supplies final charge and effective-date review;
  a comparison is not itself proof of a completed subscription change.

**Workflow-specific states:**

- Exercise loading, refresh, partial price failure, stale offers, unavailable
  plans, changed eligibility, changed prices, and out-of-order responses. Unknown
  price is not free, and selecting an offer must not silently authorize purchase.

**Boundary and adverse cases:**

- Test both modes and both variants with two and several plans, zero or one
  offer, free and quote-based plans, annual totals with monthly equivalents,
  long qualifications, current usage beyond limits, and selection becoming invalid.

**Additional baseline emphasis:**

- Preserve table associations or equivalent labelled stacked offers at 200% text,
  60% expansion, and narrow widths. Include long currency formats, RTL, keyboard,
  touch, screen readers, light and dark themes, forced colors, and reduced motion.

## Customer evidence assessment

**Outcome:** A visitor can interpret a customer claim with its attribution,
source context, and qualifications even when media is absent.

**Use when:** Reviewing customer quotations or reported outcomes on public pages.

**Related contracts:** Apply [Customer Evidence](../blocks/customer-evidence.md),
[Link](../components/link.md), and
[Images and media](../../DESIGN.md#images-and-media).

**Critical behaviors:**

- Distinguish a direct quote, paraphrase, and reported measure. Verify real
  publication content against the product's approved source and attribution.
- Keep customer identity, relevant role or organization, timeframe, measurement
  basis, and material limitations associated with the claim they qualify.
- Remove portraits and logos and confirm that attribution remains complete.
  Verify that a broken source or withdrawn claim triggers the product's review
  policy rather than retaining an unsupported endorsement.

**Workflow-specific states:**

- Exercise missing media, loading, partial failure, changed sources, withdrawn
  permission, stale claims, and no valid evidence. Placeholders and illustrative
  examples must never appear as published testimony or customer results.

**Boundary and adverse cases:**

- Cover both variants and representative uses, one and several items, long
  quotations, translated quotations, anonymized attribution, nearby qualifiers,
  and optional source links or media removed independently.

**Additional baseline emphasis:**

- Keep claims and qualifications readable together at narrow widths, 200% text,
  60% expansion, and RTL. Check semantic quotation and attribution with screen
  readers, keyboard, touch, both themes, forced colors, and reduced motion.

## Destructive workflow

**Outcome:** Before committing, a user understands the action, object, scope,
permanence, and recovery without relying on color.

**Use when:** Reviewing deletion, irreversible change, broad-scope loss, or a
reversible action whose failure or unknown outcome could cause consequential
harm.

**Related contracts:** Apply the
[`Destructive actions`](../patterns/destructive-actions.md) pattern and, for
multi-record operations, the
[`Selection and bulk actions`](../patterns/selection-and-bulk-actions.md) pattern.
When the loss is entered or recovered work, also apply the
[`Task continuity and unsaved work`](../patterns/task-continuity.md) pattern.

**Critical behaviors:**

- Give reversible work less interruption than permanent or broad-scope loss.
  Offer undo only for a recovery mechanism the product actually provides.
- For permanent deletion, name the object, affected data or people, permanence,
  prerequisites, and final action explicitly. Favor the safe initial focus.
- For a bulk commitment, preserve an immutable selection snapshot. Report mixed
  eligibility and later partial, failed, or unknown outcomes without silently
  omitting records.
- Keep cancellation visually and operationally distinct from commitment. Define
  predictable focus entry, dismissal, restoration, and post-removal movement.

**Workflow-specific states:**

- Ensure one activation creates at most one operation. Treat an ambiguous network
  result as unknown rather than encouraging an unsafe duplicate submission.
- Report partial and failed outcomes per object: what changed, what did not, and
  what can safely happen next.

**Boundary and adverse cases:**

- Test similar and very long object names, missing permissions, policy blocks,
  network loss before, during, and after commitment, partial bulk results, 200%
  text, Escape, backdrop interaction, and browser navigation.

**Additional baseline emphasis:**

- Verify that the action, object, scope, permanence, safe alternative, and
  recovery remain understandable without color, position, or assumed context.

## Public status

Exercise the [Public Status Overview](../templates/public-status-overview.md) with
one service and a portfolio. Check [Service Status Summary](../blocks/service-status-summary.md)
and [Activity History](../blocks/activity-history.md) together.

- Confirm service coverage, exact snapshot time and timezone, and source authority.
- Exercise operational, degraded, disruption, maintenance, unknown, partial,
  loading, stale, and failed data. No missing or stale report may imply all-clear.
- Separate maintenance windows, current conditions, and incident chronology.
  A missing incident history cannot establish service availability.
- Preserve useful safe values during refresh, reject superseded responses, and
  keep focus and reading position. Isolate independently failing history requests.
- Publish only public descriptions; private responders and diagnostics never
  appear in DOM text, accessible labels, or expanded details.
- Verify known and unknown timestamps, stable IDs, explicit event order, and
  coverage. New updates do not unexpectedly move the current reading position.
- Exercise keyboard, narrow widths, long labels, RTL, 200% text, theme changes,
  forced colors, reduced motion, and screen-reader announcements.
- Record provider, subscription, live-refresh, and accessibility limits separately
  from simulated snapshot evidence. Apply the [baseline](baseline.md).

## Checkout

Exercise [Checkout](../templates/checkout.md) and [Order Summary](../blocks/order-summary.md)
with a one-time digital purchase and a recurring service order.

- Confirm item identity, quantity, currency, subtotal, discounts, taxes, fees,
  total due now, and renewal amounts. Check rounding under supported currencies.
- Correct quantity and refresh a changed quote. Prior acknowledgement clears;
  expired or unavailable quotes cannot submit. Missing amounts are never zero.
- Submit only the reviewed server quote. Lock pending duplicates, preserve the
  submitted snapshot, and verify durable provider idempotency independently.
- Exercise decline, additional verification, provider return, cancellation, lost
  responses, unknown outcomes, unresolved checks, and authoritative unpaid recovery.
  A browser return alone never confirms payment. Check the existing attempt first.
- Confirm that fulfillment recovery after payment does not charge again. Receipts
  and success wording match the authoritative payment and fulfillment outcome.
- Test late and duplicate responses, reload, redirects, Back, departure, quote
  expiry, permission changes, and guest/authenticated recovery to the correct order.
- Keep payment secrets out of drafts, URLs, and logs. Validate secure provider
  entry, keyboard focus, accessible errors, and return behavior with that provider.
- Check narrow layouts, long labels, 200% text, RTL, localized currencies, themes,
  forced colors, reduced motion, and screen-reader feedback. Apply the
  [baseline](baseline.md). Record simulation limits separately from provider evidence.

## Attachment and date entry

Exercise [File Upload](../components/file-upload.md) and
[Date Input](../components/date-input.md) in the service application, and date
entry in project setup. Apply the [baseline](baseline.md).

- Check allowed types, empty/oversized/duplicate files, count limits, selected versus
  uploaded status, per-file errors, retry, cancellation, removal, and late callbacks.
- Verify required attachments block commitment until completed. Restore a saved
  draft: retain the date, require file reselection, and never restore a fake receipt.
- Validate partial, impossible, leap-day, required/optional and inclusive-boundary
  dates; changing bounds requires revalidation. Check localized display and no
  timezone day shift. A planning date never silently schedules provisioning.
- Check error-summary links, keyboard/native file selection, focus after removal,
  accessible status updates, native date behavior, RTL, enlarged text, and themes.
- Record transport/server, browser-native picker, and assistive-technology limits.

## Technical guide reading

Exercise [Code Block](../components/code-block.md) in API documentation and the
Public Content technical guide. Apply [Public content](#public-content) and the
[baseline](baseline.md).

- Identify each snippet by title and language. Render source literally, preserving
  whitespace and special characters. Copy must exactly match source, without labels.
- Exercise successful, denied, and unavailable clipboard writes, pending duplicate
  clicks, retry, content replacement, and unmount during copying.
- Keep focus on Copy, announce outcomes once, and retain manual selection on failure.
- Scroll long lines by keyboard within the snippet at narrow widths and 200% text;
  verify no document-wide overflow, RTL surrounding content, and both themes.
