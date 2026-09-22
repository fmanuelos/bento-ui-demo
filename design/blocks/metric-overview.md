# Metric Overview block

## Status

Draft until representative Application Workspace implementations and independent loading,
refresh, partial-failure, and accessibility validation are established.

## Intent

A Metric Overview helps a returning user scan a small set of related measures,
understand their scope and freshness, and identify which value may need
attention. It composes statistic cards and contextual information without
turning placeholder values, visual prominence, or color into data meaning.

The block owns the local arrangement and shared context. [`Card`](../components/card.md)
owns each statistic card, while data display and asynchronous feedback own data
state, freshness, loading, failure, and recovery behavior.

## Use when

Use a Metric Overview near the beginning of a dashboard view when several
high-value measures summarize the same operational scope and comparison across
them supports the next task.

## Do not use when

Do not use a Metric Overview for unrelated numbers, decorative counters,
complete analytical exploration, or a large record set. Use a table, chart, or
dedicated analysis surface when relationships require axes, many categories,
time-series inspection, or exact row-level comparison. Public Site claims or
marketing statistics belong to an evidence composition rather than this
operational block.

A Metric Overview does not include charts by default. Textual values,
comparisons, targets, timeframes, and status remain the baseline presentation. A
compact trend may support a metric only when it answers a documented orientation
question and follows the [`Chart`](../components/chart.md) contract; richer
analysis remains a separate named region.

## Anatomy

1. Required section heading
2. Optional description naming scope or interpretation
3. Optional shared freshness, source, or status context
4. Optional overview-level action
5. Required collection of two or more statistic cards
6. Optional local feedback or recovery associated with an affected card or group

Each statistic card contains:

1. Required metric label
2. Required current value or an explicit unavailable state
3. Optional unit
4. Optional comparison, trend, target, or timeframe
5. Optional persistent status
6. Optional metric-specific destination or action

The logical reading order remains heading, description, shared context, action,
then metrics. Within each metric it remains label, value, unit, comparison,
status, and action. Visual emphasis may place the value before the label, as
allowed by the Card contract, only when the accessible relationship and reading
order remain unambiguous.

## Variants

- **Standard:** Uses standard statistic cards and Application Workspace group spacing for a
  small overview that benefits from explanation and comfortable scanning.
- **Compact:** Uses compact statistic cards and tighter Application Workspace spacing for
  repeated pointer- or keyboard-oriented work when labels, values, targets, and
  touch requirements remain readable and operable.

Density changes presentation, not data precision, metric count, freshness,
states, or available recovery. The block may reflow to a single column without
becoming a different variant.

## Participating components and related patterns

Use [`Card`](../components/card.md) with its statistic-card presentation for each
measure. Use [`Status badge`](../components/status-badge.md) only for persistent
operational state and [`Alert`](../components/alert.md) for proportionate group
feedback. Use [`Empty state`](empty-state.md) only after absence,
permissions, offline state, or failure has been distinguished from loading.

Actions follow [`Button`](../components/button.md) or
[`Link`](../components/link.md). Progress indicators follow
[`Progress`](../components/progress.md) and never replace an available exact
value unless the metric itself measures progress. An optional compact trend
follows [`Chart`](../components/chart.md), retains a nearby persistent label and
exact value, and does not turn the complete Metric Overview into a chart region.

Apply [`Data display`](../patterns/data-display.md) to values, scope, freshness,
availability, and comparison; [`Asynchronous feedback`](../patterns/async-feedback.md)
to loading, refresh, failure, retry, and announcements; and
[`Responsive density`](../patterns/responsive-density.md) to transformation.
Apply [`Action hierarchy and emphasis`](../patterns/action-hierarchy-and-emphasis.md)
when overview, card, recovery, and page actions coexist.

Selection, filters, and date ranges remain owned by their applicable patterns
and page template. When they change the metrics, keep their applied state and
the resulting metric scope discoverable.

## Content requirements

The heading names the measured subject or operational scope. Descriptions,
sources, timeframes, and freshness provide enough context to interpret the
values. Do not rely on page position, an icon, or color to explain what a number
represents.

Metric labels use domain language and remain distinct when read outside their
visual columns. Values use locale-aware number, currency, percentage, date,
duration, and unit formatting. Preserve meaningful precision; do not abbreviate
values in a way that conceals material differences. If a compact abbreviation is
used for scanning, provide the exact value through persistent text or another
accessible route that does not depend on hover.

Zero, missing, not applicable, withheld, estimated, delayed, and unavailable are
different conditions and receive different text. Never display a dash without a
defined meaning. A skeleton or plausible sample value is not data and must not
contribute to a total, comparison, or status.

Comparisons name their basis and period, such as “12% higher than the previous
30 days.” Positive or negative color does not determine whether a change is
desirable; use text and domain meaning. Trends and status must not contradict
the displayed value or freshness.

When a compact trend is justified, its scope, timeframe, missing values, and
direction agree with the metric's persistent text. It remains supporting context:
the metric label, exact value, comparison, and status do not depend on inspecting
the trend, and the trend does not appear merely to fill unused card space.

Limit the overview to the measures required for orientation and the next task.
When many metrics are equally important, provide a dedicated analysis or
customization experience rather than shrinking text or creating an unscannable
grid.

## Layout and semantic token mapping

Use Application Workspace padding and group spacing from
[`DESIGN.md`](../../DESIGN.md#application-workspace-mode). The metric collection uses
intrinsic columns or container-aware behavior with useful minimum card widths.
It may use two to four columns when content fits and stacks before values,
labels, comparisons, or actions become difficult to scan.

Statistic cards retain the Card contract's surface, border, shape, and spacing
roles. Values use an appropriate `data-*` typography role and tabular numerals
when alignment supports comparison. Labels, metadata, and freshness use semantic
text and label roles. Status, feedback, and actions use their component token
mappings.

Do not introduce Metric Overview-specific colors, heights, grid breakpoints, or
fixed card widths. Equal heights are optional and must not clip expanded content
or create large empty regions. Visual emphasis may identify importance, but
status and desirability require explicit text and semantic treatment.

## States and behavior

Support the applicable data conditions explicitly:

- **Initial loading:** Keep the stable heading, scope, and safe controls visible.
  A predictable card may use a decorative skeleton that is not a value, status,
  count, or focus target.
- **Current:** Show values with their scope and freshness.
- **Background refresh:** Preserve usable values and interactions, and provide
  proportionate refresh feedback without returning cards to skeletons.
- **Stale or delayed:** Keep the last known value when safe, identify its
  freshness, and distinguish it from current data.
- **Partial:** Keep successful cards usable while each affected card explains
  unavailable or failed data and provides local recovery when one exists.
- **Empty or not applicable:** Explain why a measure has no value; do not convert
  absence to zero.
- **Offline or permission limited:** State the known boundary without exposing
  sensitive information or implying that retry will change authorization.
- **Failed:** Keep scope and successful peers available and place recovery beside
  the affected metric or group.

Independently loaded cards resolve without resetting successful peers, focus,
scroll, filters, or page state. Ignore stale responses rather than replacing
newer values. A group-level failure treatment is appropriate only when one cause
makes the complete collection unavailable.

Metric-specific actions remain scoped to their cards. A whole-card destination
has one clear route and cannot contain conflicting nested controls. Refresh,
retry, or drill-down actions do not silently become the page's primary action.

## Responsive and localization behavior

Reflow the collection according to container fit, value length, label length,
text size, writing direction, and input capability. Prefer fewer columns before
abbreviating or truncating essential values. A single-column presentation keeps
the authored metric order unless the product defines another stable priority
that also governs reading order.

Labels, values, units, comparisons, freshness, messages, and actions wrap without
overlap. Do not shrink `data-*` text below a readable scale to preserve columns.
Actions and recovery controls remain adjacent to the affected scope.

Support locale-aware formats, 60% text expansion, 200% text enlargement,
increased spacing, multiple writing systems, and right-to-left direction.
Quantitative, chronological, and domain-specific order does not reverse merely
because the surrounding writing direction changes. Use logical alignment and
isolate mixed-direction values where the platform requires it.

## Accessibility

Associate the overview region with its heading. Expose each metric's label,
value, unit, comparison, timeframe, freshness, and status as one understandable
group. Do not require a user to infer relationships from card position, equal
height, color, arrow direction, or font size.

Decorative skeleton shapes remain outside metric and collection semantics and
are ignored by assistive technology. Mark only the affected region busy and
announce a meaningful state change once. Routine background refresh remains
quiet unless it changes the current task, invalidates a decision, or requires
action.

Keyboard, touch, pointer, and speech users receive equivalent access to metric
destinations and recovery. Focus remains visible and distinct from status or
visual emphasis. High-contrast and forced-color presentations preserve card
boundaries, labels, values, state, focus, and actions. Reduced motion removes
shimmer and nonessential value transitions without hiding refresh state.

### Web adapter

Use a `section` associated with its native heading. Use a list when the metrics
form a homogeneous peer collection whose count and order are meaningful;
otherwise use ordinary grouped sections. Each static statistic card may be an
`article` or section according to the Card adapter and document structure.

Use native text for values and units, and a `time` element when it accurately
represents freshness or a timestamp. Do not use `role="grid"`, `role="table"`,
or `role="application"` for a visual card grid. A whole-card destination uses an
anchor; an in-place action uses a button; never nest interactive controls inside
either whole-card control.

Expose a narrowly scoped pending or status relationship for an affected card or
group rather than making the complete dashboard a live region. Decorative
skeleton markup stays out of headings, lists of real metrics, names, and values.

## Representative example

A service-operations dashboard uses a standard Metric Overview titled “Service
health” with four cards:

- “Availability,” value “99.98%,” timeframe “Last 30 days”
- “Open incidents,” value “3,” warning status “Needs review”
- “Median response time,” value “182 ms,” comparison “14 ms faster than previous 30 days”
- “Deployments,” last known value “24,” freshness “Updated 18 minutes ago,” and stale status

During background refresh, all four values remain readable. If the response-time
request fails, only that card shows its local error and “Try again” action. The
other cards retain their current values, and the overview does not announce each
unchanged value again.

## Validation scenarios

Validate the Metric Overview with:

- Two, three, four, and more metrics to confirm the documented practical limit
- Standard and compact density with keyboard, pointer, and touch input
- Zero, negative, very large, fractional, estimated, unknown, and unavailable values
- Currency, percentage, duration, date, unit, and mixed-direction formats
- Current, initial loading, refresh, stale, delayed, partial, empty, offline, permission, and failed states
- Independent cards resolving successfully, out of order, empty, and failed
- Fast completion without skeleton flicker and reduced-motion skeleton presentation
- Page, overview, card, whole-card, recovery, and filter actions on the same view
- The same overview with no charts and with one justified compact trend, confirming that chart presence is optional
- Narrow and wide containers, 60% text expansion, 200% text, and increased spacing
- Multiple locales, writing systems, and right-to-left direction
- Keyboard and screen-reader use, visible focus, dark mode, forced colors, and high contrast

Apply the [`Dashboard overview`](../VALIDATION.md#dashboard-overview),
[`Data management`](../VALIDATION.md#data-management) when filters or record
scope apply, [`Data visualization`](../VALIDATION.md#data-visualization) when a
compact trend is present,
[`Block composition and reflow`](../VALIDATION.md#block-composition-and-reflow),
and the baseline asynchronous and responsive conditions. The block is ready for
shared use when values, scope, freshness, partial availability, and recovery
remain understandable without placeholder data or visual inference.
