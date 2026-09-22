# Validation guide

## Purpose and authority

Use this guide to review Bento UI implementations in representative workflows and
adverse conditions. It complements the normative rules in [`DESIGN.md`](../DESIGN.md),
the [`component contracts`](components/), the [`block contracts`](blocks/), and
the [`experience patterns`](patterns/), [`experience mode contracts`](experiences/),
[`template contracts`](templates/), and
[`product-domain guidance`](product-domains.md); it does not redefine them or
prescribe one layout.

The normative contracts define the required outcomes. This guide defines baseline
conditions, representative workflows, and cross-cutting stress tests for checking
whether an implementation preserves those outcomes.

## How to use this guide

1. Record the experience mode, applicable variant and template, primary and
   material secondary domains, audience, and authoritative state owner.
2. Identify every workflow scenario and cross-cutting stress test that the change
   affects.
3. Apply all relevant baseline environments, states, and invariants to those
   workflows.
4. Add every participating component, block, and pattern contract.
5. When an individual check is not applicable, explain why rather than marking an
   entire category as unsupported.

The scenario checklists emphasize risks that are especially important to a
workflow. They do not replace the baseline validation requirements.

## Applicability index

Several rows can apply to one change.

| Change involves                                                      | Apply                                                                                             |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Marketing, acquisition, or another first-visit page                  | [Public landing](#public-landing)                                                                 |
| Articles, policies, documentation, or other long-form content        | [Public content](#public-content)                                                                 |
| Authentication, onboarding, checkout, setup, or another bounded task | [Focused Flow](#focused-flow)                                                                     |
| Persistent or temporary application navigation and recurring work    | [Application Workspace](#application-workspace)                                                   |
| Metrics or several independently loaded data regions                 | [Dashboard overview](#dashboard-overview), an Application Workspace page scenario                 |
| Charts, plots, or compact analytical trends                          | [Data visualization](#data-visualization)                                                         |
| Search, filtering, tables, pagination, or bulk operations            | [Data management](#data-management)                                                               |
| Entering, editing, validating, or saving user-provided data          | [Form workflow](#form-workflow)                                                                   |
| Permanent, broad-scope, or otherwise consequential loss              | [Destructive workflow](#destructive-workflow)                                                     |
| Meaningful images, charts, illustrations, video, or animation        | [Images and media](#images-and-media)                                                             |
| Competing, nested, destructive, or changing actions                  | [Action hierarchy and emphasis](#action-hierarchy-and-emphasis)                                   |
| A reusable page or section composition                               | [Block composition and reflow](#block-composition-and-reflow)                                     |
| Selecting a mode or moving between mode boundaries                   | [Experience classification and mode transitions](#experience-classification-and-mode-transitions) |
| A shared template, product instance, or reference page               | [Template conformance](#template-conformance)                                                     |
| Adding, changing, or assigning a business capability                 | [Product-domain classification](#product-domain-classification)                                   |

## Baseline validation

### Classification record

Before rendered validation, record:

- One primary experience mode and the user goal that justifies it.
- The applicable experience variant and whether it is Proposed or governed by a
  dedicated contract.
- The shared template, or why the structure remains product-specific.
- One primary product domain and only material secondary domains.
- The audience, permissions, authoritative state, saved boundary, and evidence
  owner.

Treat this record as validation scope, not supported `DESIGN.md` frontmatter.
Authentication, route location, team ownership, a sidebar, cards, or visual
density do not determine the mode. A domain does not determine the mode, variant,
template, or visual system.

### Test environments

| Dimension       | Required coverage                                                                                              |
| --------------- | -------------------------------------------------------------------------------------------------------------- |
| Available space | Mobile, tablet, desktop, and wide layouts, including content-driven transformations                            |
| Input           | Keyboard, pointer, and touch; hover is an enhancement only                                                     |
| Text            | 200% text enlargement, increased text spacing, long valid values, and at least 60% label expansion             |
| Direction       | Left-to-right and right-to-left order; directional icons mirror only when their meaning depends on direction   |
| Locale          | Locale-aware names, dates, times, numbers, units, and currency using at least two materially different formats |
| Presentation    | Light, dark, inverse when used, forced colors or high contrast, and reduced motion                             |
| Media           | Decorative, informative, complex, missing, slow, failed, cropped, and motion-sensitive media where applicable  |

### State coverage

Exercise every state relevant to the workflow, including:

- Loading and background refresh.
- Empty and no-result outcomes.
- Partial, stale, and unavailable data.
- Offline and interrupted operation.
- Missing permission or changed access.
- Validation, warning, and blocked states.
- Success, failure, recovery, and unknown outcomes.

State changes must preserve usable content and task context whenever the
normative contract requires them to remain available.

### Core invariants

- Preserve meaningful reading order, visible focus, a bypass route, freedom from
  keyboard traps, and predictable focus restoration.
- Do not clip essential text or make truncation inaccessible.
- Do not communicate meaning through color alone.
- Do not destructively lose valid work.
- Keep necessary meaning and operation available when optional media is missing,
  fails, or changes presentation.

## Workflow scenarios

### Public landing

**Outcome:** A first-time visitor can understand the offer, identify supporting
evidence, and choose a next step without learning application navigation.

**Use when:** Reviewing a marketing, acquisition, campaign, product-introduction,
or other first-visit page whose main purpose is orientation and a next action.

**Related contracts:** Apply [`Hero`](blocks/hero.md),
[`Section Header`](blocks/section-header.md),
[`Call to Action`](blocks/call-to-action.md),
[`Feature Grid`](blocks/feature-grid.md), and
[`Site Footer`](blocks/site-footer.md) when those compositions are present,
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

### Public content

**Outcome:** A visitor arriving at any point can understand the document, move
through its structure, interpret warnings and comparisons, and leave without
losing their place.

**Use when:** Reviewing an article, policy, guide, documentation page, or another
long-form document that a visitor may enter at any point.

**Related contracts:** Apply [`Page Header`](blocks/page-header.md),
[`Section Header`](blocks/section-header.md), and
[`Site Footer`](blocks/site-footer.md) when those compositions are present,
together with the relevant breadcrumb, link, alert, table, and navigation
contracts.

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

### Focused Flow

**Outcome:** A person can complete one bounded outcome, understand their current
state and consequences, and exit, resume, retry, or recover without losing valid
work.

**Use when:** Reviewing authentication, reauthentication, account recovery,
onboarding, checkout, application submission, initial setup, or another bounded
task whose unrelated choices should be reduced.

**Related contracts:** Apply the
[`Focused Flow`](experiences/focused-flow.md) mode contract together with
[`Forms and validation`](patterns/forms-and-validation.md),
[`Task continuity and unsaved work`](patterns/task-continuity.md),
[`Asynchronous feedback`](patterns/async-feedback.md), and
[`Action hierarchy and emphasis`](patterns/action-hierarchy-and-emphasis.md).
Apply destructive-action and temporary-surface contracts when their conditions
are present.

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

### Application Workspace

**Outcome:** A recurring user can identify their workspace, current location,
available authorized destinations, and primary task while retaining context
through navigation, responsive transformation, interruption, and failure.

**Use when:** Reviewing an application shell or page for recurring operational,
administrative, publishing, analytical, customer, or support work across related
destinations, records, settings, tools, or data.

**Related contracts:** Apply the
[`Application Workspace`](experiences/application-workspace.md) mode contract and
[`Navigation shell`](patterns/navigation-shell.md), together with the applicable
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

### Dashboard overview

**Experience context:** This is a page-level dashboard scenario within
Application Workspace, not a separate experience mode.

**Outcome:** A returning user can identify current location, freshness, the most
important action, and work needing attention even when some data is unavailable.

**Use when:** Reviewing a page composed of metrics, summaries, status regions, or
several independently loaded data regions.

**Related contracts:** Apply [`Page Header`](blocks/page-header.md),
[`Section Header`](blocks/section-header.md), and
[`Metric Overview`](blocks/metric-overview.md) when those compositions are
present, together with the relevant data-display, asynchronous-feedback,
navigation, status, and action contracts. Apply [`Chart`](components/chart.md)
and [Data visualization](#data-visualization) only when a chart is present.

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

### Data management

**Outcome:** A recurring user can search, compare, select, and act on a large
record set without asynchronous updates destroying query or navigation context.

**Use when:** Reviewing search, filtering, sorting, pagination, selectable data,
or actions over one or many records.

**Related contracts:** Apply the
[`Search, filtering, and results`](patterns/search-filtering-and-results.md),
[`Data display`](patterns/data-display.md),
[`Selection and bulk actions`](patterns/selection-and-bulk-actions.md), and
[`Asynchronous feedback`](patterns/async-feedback.md) patterns together with the
applicable component contracts. Apply
[`Results Toolbar`](blocks/results-toolbar.md) when query controls, result
context, and operations form that composition. When metrics summarize the
current query or record scope, also apply
[`Metric Overview`](blocks/metric-overview.md).

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

### Form workflow

**Outcome:** A user can understand requirements, correct problems, submit once,
and recover from interruption or failure without losing valid work.

**Use when:** Reviewing data entry, editing, validation, draft saving, or final
submission.

**Related contracts:** Apply the
[`Forms and validation`](patterns/forms-and-validation.md),
[`Task continuity and unsaved work`](patterns/task-continuity.md), and
[`Asynchronous feedback`](patterns/async-feedback.md) patterns together with the
applicable component contracts. Apply
[`Form Section`](blocks/form-section.md) when related fields and guidance form a
named section within the workflow.

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

### Destructive workflow

**Outcome:** Before committing, a user understands the action, object, scope,
permanence, and recovery without relying on color.

**Use when:** Reviewing deletion, irreversible change, broad-scope loss, or a
reversible action whose failure or unknown outcome could cause consequential
harm.

**Related contracts:** Apply the
[`Destructive actions`](patterns/destructive-actions.md) pattern and, for
multi-record operations, the
[`Selection and bulk actions`](patterns/selection-and-bulk-actions.md) pattern.
When the loss is entered or recovered work, also apply the
[`Task continuity and unsaved work`](patterns/task-continuity.md) pattern.

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

## Cross-cutting stress tests

### Experience classification and mode transitions

**Outcome:** A product uses one coherent primary mode at a time and preserves
meaning, state, and focus when a journey intentionally crosses a mode boundary.

**Use when:** Selecting or changing an experience mode, embedding a bounded task
inside another mode, or linking among Public Site, Focused Flow, and Application
Workspace experiences.

**Related contracts:** Apply the
[`experience mode index`](experiences/README.md) and the selected
[`Public Site`](experiences/public-site.md),
[`Focused Flow`](experiences/focused-flow.md), or
[`Application Workspace`](experiences/application-workspace.md) contract.

**Classification checks:**

- Justify the primary mode from the current user goal and required navigation,
  continuity, density, and state model. Authentication, team, route, layout, or
  visual preference alone is insufficient.
- Use a variant only when its label improves shared understanding. A Proposed
  variant inherits only its parent mode until a dedicated contract is approved.
- Treat dashboard as a workspace overview page or template, never as a mode or
  general label for authenticated experiences.
- If two modes appear to coexist, identify an explicit page, flow, dialog, drawer,
  or other component boundary. Do not blend conflicting navigation and continuity
  rules implicitly.

**Transition checks:**

- Verify that the source communicates the destination or outcome before entry.
  Preserve the origin, safe exit, intended return destination, focus restoration,
  and state ownership required by the task.
- Exercise direct entry, deep links, reload, Back and Forward, cancellation,
  completion, interruption, session expiry, permission loss, and an unavailable
  return destination.
- Resolve source-page unsaved work before departure. Do not allow a mode change to
  discard valid work, duplicate commitment, restore stale authority, or move focus
  without a task reason.
- At responsive boundaries, verify that a presentation change does not silently
  change the experience mode, available destinations, or persistence policy.

**Evidence:**

- Record the before-and-after classification, transition trigger, state owner,
  persistence boundary, entry and exit routes, and observed focus behavior.

### Template conformance

**Outcome:** A reusable template preserves its declared complete-page or flow
structure across product instances and adverse conditions without absorbing the
responsibilities of its participating contracts.

**Use when:** Proposing, changing, implementing, or validating a shared template,
product page or flow-step instance, or reference page.

**Related contracts:** Apply the [`template index`](templates/README.md), its
declared experience mode, and every named component, block, and experience
pattern contract.

**Contract checks:**

- Confirm that the template solves a recurring named problem, remains stable
  across at least two representative uses, and declares one unambiguous primary
  mode. Shared chrome or visual arrangement alone does not satisfy admission.
- Verify required and optional regions, meaningful source order, action and
  permission boundaries, complete-structure states, continuity, content and data
  requirements, responsive behavior, localization, and accessibility.
- Remove every optional region independently. No empty wrapper, reserved gap,
  broken heading sequence, inaccessible destination, or action without a subject
  may remain.
- Confirm that product instances supply real content, data, routes, permissions,
  state, business rules, and domain classification without weakening or silently
  extending the shared contract.

**Reference-page checks:**

- Exercise representative, minimum-valid, maximum-valid, localized, narrow,
  wide, loading, empty, partial, stale, offline, error, unauthorized, interrupted,
  resumed, and accessibility-relevant instances as applicable.
- Record the template revision and scenario coverage. A screenshot, successful
  build, or one product instance is evidence but does not independently prove
  template completeness.

### Product-domain classification

**Outcome:** A page or flow uses a stable business-capability vocabulary without
allowing organizational ownership or interface structure to create misleading
domains or visual systems.

**Use when:** Assigning primary or secondary domains, adding or changing a shared
domain, or reusing a mode, variant, or template across capabilities.

**Related contracts:** Apply the
[`product-domain guidance`](product-domains.md) and the page or flow's selected
mode and template contracts.

**Classification checks:**

- Assign the primary domain by asking which business capability the person used
  or advanced when the experience succeeded.
- Add a secondary domain only when it materially changes terminology,
  eligibility, permissions, data, sequence, recovery, policy, or validation.
  Team contribution, data origin, shared components, and outbound links are not
  sufficient.
- Test ambiguous boundaries explicitly: Marketing and Publishing, Identity &
  Access and Account, Analytics and Administration, Help & Support and
  Publishing, and Administration and Identity & Access.
- When two domains appear equally primary, verify that one coherent outcome
  genuinely requires both; otherwise separate the decisions, pages, steps, or
  regions.

**System checks:**

- Reuse the same domain across modes only when each experience continues to obey
  its own navigation, density, permission, continuity, and accessibility rules.
- Verify that a domain has not automatically created a color family, theme,
  spacing or layout token, component prefix, mode, variant, template fork,
  navigation destination, or permission boundary.
- For a domain addition, rename, merge, split, or removal, record rationale,
  affected classifications and metadata, migration, navigation implications,
  validation impact, owner, and review date.

### Images and media

**Outcome:** A user receives the same necessary meaning and can complete the same
task regardless of whether media loads, can be perceived, or changes presentation.

**Use when:** A workflow contains decorative, informative, complex, functional,
cropped, responsive, linked, animated, or asynchronously loaded media.

**Related contracts:** Apply the shared
[`Images and media`](../DESIGN.md#images-and-media) foundation and the applicable
component or composition contract. Apply [`Hero`](blocks/hero.md) and
[`Call to Action`](blocks/call-to-action.md), or
[`Feature Grid`](blocks/feature-grid.md) when media participates in those blocks.

**Critical behaviors:**

- Classify representative media as decorative, informative, complex, or
  functional in its actual context. Confirm decorative media is ignored,
  informative media has a concise non-duplicative equivalent, and complex media
  has an adjacent explanation or data equivalent.
- Test image-only controls, images beside control text, and linked figures. Each
  interaction exposes one clear name, role, destination or action, and focus
  target without nested controls or duplicate announcements.

**State and failure conditions:**

- Disable images and test missing, slow, restricted, and failed requests.
  Essential instructions, status, labels, captions, and recovery remain
  available; decorative assets disappear cleanly; broken-asset chrome and source
  filenames do not become fallback content.
- Test intrinsic dimensions and reserved aspect ratios under slow loading. The
  page and focused controls remain stable, and late media does not cause a
  disruptive layout shift or reading-order change.

**Boundary and adverse cases:**

- Test narrow, wide, and high-zoom layouts with the approved crops. Subjects,
  focal areas, embedded labels, and necessary product information remain visible
  without distortion or page-level horizontal scrolling.
- Test left-to-right and right-to-left layouts with directional and
  non-directional media. Only intentionally localized directional assets mirror,
  and the accessible reading order remains unchanged by visual placement.

**Additional baseline emphasis:**

- Test light, dark, inverse when used, forced colors or high contrast, and reduced
  motion. Nearby and overlaid text and controls retain contrast, and removing
  nonessential animation does not remove information or operation.

### Data visualization

**Outcome:** A user can understand the represented relationship and inspect
relevant values without relying on color, hover, animation, or one visual
presentation for essential meaning.

**Use when:** A workflow contains a chart, plot, compact trend, or another
analytical graphic governed by the shared Chart contract.

**Related contracts:** Apply [`Chart`](components/chart.md),
[`Data display`](patterns/data-display.md),
[`Asynchronous feedback`](patterns/async-feedback.md), and
[`Responsive density`](patterns/responsive-density.md). Use
[`Table`](components/table.md) instead when exact row-and-column comparison is
the primary task, and apply the applicable search, filtering, selection, or
action patterns when those states change represented data.

**Critical behaviors:**

- Record the analytical question and confirm that a chart materially improves a
  trend, comparison, distribution, composition, or relationship. Verify that a
  metric, table, or prose explanation would not serve the task more directly.
- Confirm the title, purpose, scope, timeframe, units, source, freshness, series,
  missing-value policy, and material relationship remain understandable without
  transient inspection detail.
- Compare the chart and its summary with applied filters and associated metrics.
  They must use the same authoritative data, aggregation, precision, units, and
  freshness.
- Remove color and confirm labels, position, symbols, line styles, patterns, or
  text preserve every essential distinction. Positive and negative treatment
  must follow domain meaning rather than visual direction alone.
- Verify inspection, focus, selection, and filtering remain distinct. Pointer
  hover cannot commit a selection or become the only route to essential meaning.

**State and interaction conditions:**

- Test zero, negative, fractional, constant, very large, estimated, missing,
  unavailable, duplicated, irregular, and outlier values. Test one through six
  series and an attempted seventh series without silently inventing another
  categorical token.
- Exercise initial loading, fast completion, background refresh, stale, partial,
  empty, filtered empty, offline, permission limited, failed, and outcome unknown
  states. Placeholders remain outside chart and collection semantics, while
  refresh preserves usable data and inspection state when safe.
- For inspectable or selectable charts, test keyboard, touch, pointer, and speech
  input. Entry, internal movement, activation, and exit remain understandable;
  dense marks do not create an impractical page tab sequence.
- Remove an inspected or selected value during refresh and verify that focus
  continues at the nearest logical value or chart-level control and that a
  material context change is explained once.

**Boundary and adverse cases:**

- Test narrow, wide, and awkward intermediate containers; long series and
  category names; long units; overlapping marks; dense data; and a layout with no
  useful legend position. Labels and essential marks do not overlap or clip, and
  responsive changes do not silently alter aggregation, scope, or series.
- Test 60% label expansion, 200% text enlargement, increased spacing, multiple
  writing systems, mixed-direction values, right-to-left presentation, and
  materially different number, date, time, currency, and unit formats.
- Test light and dark themes, color removal, common color-vision deficiencies,
  forced colors, high contrast, reduced motion, and print when supported. Motion
  removal preserves the current state and relationship.
- Disable the visual plot or replace it with its fallback. The chart name,
  purpose, summary, data state, and recovery remain available without duplicate
  or contradictory announcements.

**Additional baseline emphasis:**

- Confirm charts remain opt-in: the shared contract governs a chart when chosen
  but does not require one in every Application Workspace, dashboard, Metric
  Overview, report, or data-bearing region.

### Action hierarchy and emphasis

**Outcome:** A user can identify the most important appropriate action in each
decision region without losing access to supporting, navigation, cancellation,
or recovery actions.

**Use when:** A workflow contains competing, adjacent, nested, conditional,
destructive, or asynchronously changing actions.

**Related contracts:** Apply the
[`Action hierarchy and emphasis`](patterns/action-hierarchy-and-emphasis.md)
pattern together with every functional pattern that owns the actions' outcomes.
Apply [`Hero`](blocks/hero.md), [`Page Header`](blocks/page-header.md),
[`Section Header`](blocks/section-header.md), and
[`Call to Action`](blocks/call-to-action.md) when their action regions are
present. Apply [`Feature Grid`](blocks/feature-grid.md),
[`Form Section`](blocks/form-section.md), and
[`Results Toolbar`](blocks/results-toolbar.md) when their section or item action
regions are present.

**Critical behaviors:**

- Name each decision region and classify its controls as primary action,
  supporting action, alternative, utility, navigation, or destructive
  commitment. Keep at most one primary action in a region.
- Check adjacent and nested regions together. When independent regions each have
  a primary action, verify that headings, containment, spacing, and quieter
  nested treatment make every scope unambiguous.
- Verify Button and Link semantics before visual treatment. Current location,
  selection, status, validation severity, and progress must not appear to be a
  primary action.
- For destructive commitment, preserve a safe alternative, communicate the
  consequence in text, avoid combining primary and destructive treatments, and
  favor safe initial focus unless task evidence requires otherwise.

**State changes:**

- Put the primary action into loading, disabled, unavailable, failed, and outcome
  unknown states. Preserve its label and context, explain unavailable outcomes,
  and do not silently promote Cancel or an unrelated supporting action.
- Remove optional actions and resolve empty or error regions. The remaining
  hierarchy must still represent the task, and focus must continue at a logical
  location when its control disappears.

**Boundary and adverse cases:**

- At narrow widths, 200% text, and 60% label expansion, stack or transform action
  regions without reversing source order, changing priority, clipping labels, or
  hiding commitment, safety, cancellation, or recovery in overflow.

**Additional baseline emphasis:**

- Test keyboard and reading order, touch targets, right-to-left direction, color
  removal, forced colors, and reduced motion. Purpose and priority must remain
  understandable without relying on color, size, position, or animation alone.

### Block composition and reflow

**Outcome:** A user can understand and operate a reusable composition when
optional regions, content length, available space, writing direction, state, or
input capability changes.

**Use when:** Reviewing any shared block contract or an implementation that
claims conformance with one.

**Related contracts:** Apply the relevant block contract:
[`Hero`](blocks/hero.md), [`Page Header`](blocks/page-header.md),
[`Section Header`](blocks/section-header.md),
[`Call to Action`](blocks/call-to-action.md), or
[`Metric Overview`](blocks/metric-overview.md),
[`Feature Grid`](blocks/feature-grid.md), [`Site Footer`](blocks/site-footer.md),
[`Form Section`](blocks/form-section.md), or
[`Results Toolbar`](blocks/results-toolbar.md). Apply every participating
component and experience pattern named by that block.

**Critical behaviors:**

- Verify the required anatomy first, then remove each optional region separately.
  Remaining content must reflow without empty wrappers, reserved gaps, orphaned
  headings, or controls that lose their subject.
- Confirm that the authored reading and focus order preserves the contract's
  hierarchy in every visual variant. Columns, inline regions, centering, and
  media placement must not create a contradictory sequence.
- Check each action against its actual destination or operation. Block-level
  composition must not change Button, Link, status, media, card, or other
  participating-component semantics.
- Apply loading, refresh, unavailable, empty, error, and recovery only where the
  block or its dependencies declare them. Stable headings and usable peer
  regions remain available when their contracts require it.

**Responsive and localization conditions:**

- Test immediately before and after every content-driven transformation, not
  only at the system page ranges. Each region must retain a useful width before
  columns, inline actions, or media stack.
- Test heading, description, metadata, value, condition, and action content with
  at least 60% expansion, 200% text, increased spacing, unbroken valid values,
  multiple writing systems, and left-to-right and right-to-left direction.
- Verify that logical alignment, source order, focus order, action priority,
  metric meaning, and directional media survive writing-direction changes.
  Locale-aware names, dates, times, numbers, units, and currency remain
  associated with their labels.

**Boundary and adverse cases:**

- Test the minimum valid anatomy, the complete anatomy, unusually long valid
  content, absent optional media or metadata, failed asynchronous content, and
  adjacent blocks with independent headings and primary actions.
- Test keyboard, pointer, touch, speech, dark and inverse surfaces when used,
  forced colors or high contrast, reduced motion, slow media, and an on-screen
  keyboard where actions or forms participate.

**Additional baseline emphasis:**

- Record which block variant, optional regions, participating contracts, and
  workflow scenario were exercised. Passing one representative page does not
  demonstrate every variant or supported experience mode.

## Recording evidence

Keep product-specific evidence in the pull request, issue, release record, or
other durable review record. Include:

- Product or implementation name and source revision.
- Applicable scenarios and conditions from [baseline validation](#baseline-validation).
- Browser, operating-system, device, input, assistive-technology, theme, locale,
  and writing-direction coverage.
- Automated results, manual review notes, and screenshots when they clarify a
  rendered condition.
- Known limitations, affected users, compensating behavior, owner, and review
  date.

Parsing, generation, compilation, inventory coverage, or visual inspection alone
does not demonstrate accessible behavior or user outcomes. Correct recurring
failures in the shared foundation, component, block, or pattern; keep genuinely
local needs in the consuming product.
