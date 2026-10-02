# Cross-cutting stress tests

Use the [verification guide](README.md#applicability-index) to select applicable
checks. Apply the [baseline validation requirements](baseline.md) alongside every
selected check and follow the [evidence guidance](evidence.md) to record results.

## Experience classification and mode transitions

**Outcome:** A product uses one coherent primary mode at a time and preserves
meaning, state, and focus when a journey intentionally crosses a mode boundary.

**Use when:** Selecting or changing an experience mode, embedding a bounded task
inside another mode, or linking among Public Site, Focused Flow, and Application
Workspace experiences.

**Related contracts:** Apply the
[`experience mode index`](../experiences/README.md) and the selected
[`Public Site`](../experiences/public-site.md),
[`Focused Flow`](../experiences/focused-flow.md), or
[`Application Workspace`](../experiences/application-workspace.md) contract.

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

## Template conformance

**Outcome:** A reusable template preserves its declared complete-page or flow
structure across product instances and adverse conditions without absorbing the
responsibilities of its participating contracts.

**Use when:** Proposing, changing, implementing, or validating a shared template,
product page or flow-step instance, or reference page.

**Related contracts:** Apply the [`template index`](../templates/README.md), its
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

## Product-domain classification

**Outcome:** A page or flow uses a stable business-capability vocabulary without
allowing organizational ownership or interface structure to create misleading
domains or visual systems.

**Use when:** Assigning primary or secondary domains, adding or changing a shared
domain, or reusing a mode, variant, or template across capabilities.

**Related contracts:** Apply the
[`product-domain guidance`](../product-domains.md) and the page or flow's selected
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

## Images and media

**Outcome:** A user receives the same necessary meaning and can complete the same
task regardless of whether media loads, can be perceived, or changes presentation.

**Use when:** A workflow contains decorative, informative, complex, functional,
cropped, responsive, linked, animated, or asynchronously loaded media.

**Related contracts:** Apply the shared
[`Images and media`](../../DESIGN.md#images-and-media) foundation and the applicable
component or composition contract. Apply [`Hero`](../blocks/hero.md) and
[`Call to Action`](../blocks/call-to-action.md), or
[`Feature Grid`](../blocks/feature-grid.md) when media participates in those blocks.

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

## Data visualization

**Outcome:** A user can understand the represented relationship and inspect
relevant values without relying on color, hover, animation, or one visual
presentation for essential meaning.

**Use when:** A workflow contains a chart, plot, compact trend, or another
analytical graphic governed by the shared Chart contract.

**Related contracts:** Apply [`Chart`](../components/chart.md),
[`Data display`](../patterns/data-display.md),
[`Asynchronous feedback`](../patterns/async-feedback.md), and
[`Responsive density`](../patterns/responsive-density.md). Use
[`Table`](../components/table.md) instead when exact row-and-column comparison is
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

## Action hierarchy and emphasis

**Outcome:** A user can identify the most important appropriate action in each
decision region without losing access to supporting, navigation, cancellation,
or recovery actions.

**Use when:** A workflow contains competing, adjacent, nested, conditional,
destructive, or asynchronously changing actions.

**Related contracts:** Apply the
[`Action hierarchy and emphasis`](../patterns/action-hierarchy-and-emphasis.md)
pattern together with every functional pattern that owns the actions' outcomes.
Apply [`Hero`](../blocks/hero.md), [`Page Header`](../blocks/page-header.md),
[`Section Header`](../blocks/section-header.md), and
[`Call to Action`](../blocks/call-to-action.md) when their action regions are
present. Apply [`Feature Grid`](../blocks/feature-grid.md),
[`Form Section`](../blocks/form-section.md), and
[`Results Toolbar`](../blocks/results-toolbar.md) when their section or item action
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

## Block composition and reflow

**Outcome:** A user can understand and operate a reusable composition when
optional regions, content length, available space, writing direction, state, or
input capability changes.

**Use when:** Reviewing any shared block contract or an implementation that
claims conformance with one.

**Related contracts:** Apply the relevant block contract:
[`Hero`](../blocks/hero.md), [`Page Header`](../blocks/page-header.md),
[`Section Header`](../blocks/section-header.md),
[`Call to Action`](../blocks/call-to-action.md), or
[`Metric Overview`](../blocks/metric-overview.md),
[`Feature Grid`](../blocks/feature-grid.md), [`Site Footer`](../blocks/site-footer.md),
[`Form Section`](../blocks/form-section.md), or
[`Results Toolbar`](../blocks/results-toolbar.md). Apply every participating
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
