# Chart

## Status

Contract draft until representative Application Workspace implementations and
validation establish the supported chart families, inspection model, responsive
transformations, and accessibility outcomes.

## Intent

A chart uses position, length, shape, or another visual encoding to help people
understand a trend, comparison, distribution, composition, or relationship.
Charts are optional analytical representations. The presence of this contract
does not make a chart required in an Application Workspace, dashboard, Metric
Overview, report, or data-bearing region.

The Chart contract owns the bounded representation, chart-specific inspection,
axes, series identification, and relationship between visual marks and an
accessible equivalent. [`Data display`](../patterns/data-display.md) owns shared
data state, scope, freshness, and coordination with filters. The consuming
composition owns why the chart appears and which question it answers.

## Use when

- Position, length, shape, or another visual encoding makes a material pattern
  easier to understand than prose or isolated values.
- People need to compare change over an ordered interval, rank categories,
  understand part-to-whole change, inspect a distribution, or identify a
  relationship between measures.
- The represented measure, aggregation, scope, units, and missing-value policy
  are known.
- The consuming region has enough space to keep labels, marks, and controls
  readable or can provide a documented alternate presentation.

## Do not use when

- Numeric data exists but no visual comparison supports the current task.
- A small number of values provides sufficient orientation; use statistic
  [`Card`](card.md) presentations or a
  [`Metric Overview`](../blocks/metric-overview.md).
- Exact row-and-column comparison is primary; use a [`Table`](table.md).
- People need spreadsheet-like record navigation, range selection, or inline
  editing; use a [`Data grid`](data-grid.md).
- The chart would repeat nearby content without adding a distinct relationship.
- Essential meaning would be available only through color, animation, pointer
  hover, or a visual trend line.

Do not use three-dimensional perspective, decorative data distortion, or an
unrelated second quantitative axis to make a representation appear richer.
Pie, donut, radar, gauge, dual-axis, geographic, network, and other specialized
families remain product-specific until repeated validated use justifies shared
contract coverage.

## Anatomy

1. Required accessible chart name, normally supplied by a visible heading
2. Optional description stating the represented question or purpose
3. Required scope, timeframe, units, and freshness when they affect meaning
4. Plot region containing the visual marks
5. Axes and axis titles when the encoding uses a coordinate scale
6. Direct series or category labels when they fit
7. Optional legend when direct labeling is impractical
8. Optional reference line, range, target, or concise annotation
9. Optional transient inspection detail
10. Required text summary or another accessible route to essential meaning
11. Optional local status, feedback, recovery, or action

The chart name, purpose, scope, timeframe, units, source, and freshness remain
available outside transient inspection detail.

## Variants and supported families

### Interaction variants

- **Static:** Communicates its material relationship through visible labels,
  annotations, and summary. The plot itself has no focusable inspection behavior.
- **Inspectable:** Adds coordinated pointer, touch, and keyboard access to values
  or series without making transient detail the only route to essential
  information.
- **Selectable:** Allows marks or ranges to change a documented selection or
  filter. Selection remains distinct from hover, focus, and inspection and
  follows the applicable query or selection pattern.

Actionable marks are not a separate visual variant. A mark that performs an
action must expose the same action through a named semantic control and cannot
rely on chart geometry as its only label or target.

### Initially governed chart families

- **Line:** Shows change across an ordered quantitative or chronological domain.
  Missing observations remain distinguishable from zero and from interpolation.
- **Bar:** Compares magnitude across categories or ordered periods. Use a zero
  baseline for magnitude comparison unless a documented analytical reason and
  explicit annotation justify another baseline.
- **Stacked bar:** Shows part-to-whole composition across categories or periods.
  Every segment and total remains identifiable, and the stack order is stable.
- **Scatter:** Shows the relationship between two quantitative measures. Outliers,
  overlapping marks, and sample size do not disappear from the accessible
  equivalent.
- **Compact trend:** Provides secondary directional context beside a persistent
  label and exact value. It does not require visible axes when the nearby text
  supplies scope and units, and it is never added to every metric by default.

Chart families define valid encodings rather than visual decoration. A combined
or specialized representation that changes comparison logic remains outside the
shared contract until its purpose, states, responsive behavior, and
accessibility outcomes are documented.

## States and semantic token mapping

Support initial loading, current, background refresh, stale or delayed, partial,
empty, filtered empty, offline, permission limited, failed, and outcome unknown
states as applicable. A chart may also have inspected, focused, selected, and
filtered marks or ranges. These interaction states remain independent.

- Use `chart-series-1` through `chart-series-6` for stable series or category
  identity within one analytical context.
- Use `chart-positive` and `chart-negative` only when the quantitative domain
  establishes positive and negative meaning. An upward movement is not
  automatically positive, and a downward movement is not automatically negative.
- Use `chart-gridline` for quiet reference structure and `chart-axis` for axis
  lines, ticks, and comparable structural marks.
- Use `text-primary` for essential titles, values, and labels and
  `text-secondary` or `text-tertiary` only for supporting context that preserves
  required contrast.
- Use the shared focus, selection, feedback, status, action, surface, and border
  roles for those meanings rather than creating chart-specific substitutes.

The active theme uses the corresponding light or dark chart roles from
[`DESIGN.md`](../../DESIGN.md#data-visualization). High-contrast or forced-color
adapters may replace authored colors and patterns while preserving series,
structure, focus, inspection, and selection distinctions.

Do not create a new series color because more than six peers are present. Reduce
the comparison, group intentionally, use direct labels, introduce a supported
non-color distinction, or choose a representation that remains understandable.
Use one primary series color when peer identity is not meaningful.

Initial loading may approximate the stable plot region with decorative geometry,
but placeholders are not marks, values, categories, trends, axes, legend items,
or focus targets. Background refresh preserves the usable chart, summary,
and inspection state whenever safe. Partial failure keeps successful series or
regions available and identifies what is unavailable.

## Behavior, events, and transitions

The chart receives authoritative data and formatting from its owner. It does not
silently derive a different filter, aggregation, time interval, missing-value
policy, unit, or precision from an associated metric or table. Sorting a table
does not reorder an intentionally chronological chart unless both views share a
documented sort state.

Series assignments remain stable while the analytical context persists. Hiding
or revealing a series does not reassign the remaining colors. Legend order,
direct-label order, inspection detail, and summary language use the same series
names and formatting.

Transient inspection may reveal a value, category, series, unit, and relevant
comparison. Pointer exit or focus movement may dismiss that detail, so it cannot
carry the only title, instruction, status, material conclusion, or recovery action. A
multi-value or structured inspection surface is chart-owned and does not become
a generic non-interactive Tooltip merely because it floats above the plot.

Inspectable charts maintain one coordinated inspection context instead of
placing every dense mark in the surrounding page tab sequence. Keyboard, touch,
and pointer operation reach the same meaningful values and update the same
visible detail. The chosen family documents how inspection moves through ordered
marks, categories, or spatial neighbors and how a person exits the chart. Focus
does not move merely because data refreshes or a mark animates.

Selection requires explicit activation and a visible, programmatic state.
Inspection alone does not change filters, selection, navigation, or application
state. When a selected or inspected value disappears, continue from the nearest
logical value or chart-level control and explain a material context change once.

Animation is optional. Do not animate initial appearance merely to decorate the
chart. When a user-initiated change benefits from continuity, marks may move
between valid states without obscuring labels or interaction. Avoid looping
motion, excessive duration, or animation that implies nonexistent intermediate
data. Reduced motion uses an immediate or substantially simplified transition.

## Responsive, overflow, and localization behavior

Charts respond to their available container and content. Measure label length,
value formatting, series count, text enlargement, and available input before
choosing tick density, legend position, label placement, or orientation. Global
page ranges may guide workspace composition but do not replace chart fit.

At narrower widths, preserve the represented measure and comparison while
reducing nonessential ticks, wrapping supporting text, moving the legend,
or switching a valid bar orientation. Do not change aggregation, omit a material
series, truncate the only category label, or shrink essential text merely to
preserve a preferred chart shape.

A chart may use contained scrolling only when the relationship genuinely
requires a larger coordinate space and the surrounding page still reflows.
Focused or selected marks, labels, inspection detail, and recovery controls must
not be obscured by the scroll boundary. Prefer a table or another representation
when two-dimensional navigation makes the visual encoding harder to understand.

Format numbers, dates, times, durations, currency, percentages, and units for the
active locale. Accommodate at least 60% label expansion, 200% text enlargement,
increased spacing, multiple writing systems, and mixed-direction values.
Chronological, quantitative, stack, and domain-specific order does not reverse
solely because surrounding text uses right-to-left direction. Use logical
alignment and direction isolation where the platform requires it.

## Accessibility

Expose the chart's name, purpose, scope, timeframe, units, source, freshness,
series or categories, material relationship, and data availability without
requiring visual inference. The text summary should explain what the chart helps
the person understand rather than list every mark.

Color is never the only series, magnitude, direction, selection, or status cue.
Use position, direct labels, symbols, line styles, patterns, or explicit text as
appropriate. High-contrast and forced-color presentations preserve axes,
essential marks, series distinctions, focus, inspection, selection, and reference
values. A gridline may disappear when it is nonessential, but its disappearance
must not remove the only scale or boundary cue.

Static charts do not introduce focus targets solely to announce visual marks.
Inspectable and selectable charts provide visible focus, concise operating
instructions when the interaction is unfamiliar, an understandable entry and
exit, and equivalent keyboard, touch, pointer, and speech access. Dense charts
avoid hundreds of page tab stops by using one coordinated inspection context.

Do not announce ordinary pointer movement or every animation frame. Announce a
user-initiated filter, selection, material context change, failure, or recovery
once and at an urgency proportionate to its effect. Routine background refresh
remains quiet unless it changes the current task or invalidates a decision.

Reduced motion removes nonessential drawing, pulsing, sweeping, and interpolation
without removing state or delaying access to current values. Touch targets for
interactive marks may use a larger invisible hit region without exaggerating the
visible data encoding.

### Web adapter

Use a `figure` with a visible `figcaption`, or a section associated with its
heading, when that structure matches the surrounding document. Expose a concise
accessible description for an SVG or canvas plot. Do not use a bitmap or canvas
without an equivalent name and summary.

An SVG may use `title` and `desc` for plot identification, but they do not replace
the visible title, context, or summary. Avoid duplicate announcements between the
figure, SVG, caption, and nearby text. Hide decorative gridlines and duplicate
marks from the accessibility tree when the equivalent relationships are already
exposed.

Use native buttons, links, checkboxes, or other controls for actions and
selection outside the plot whenever possible. A focusable chart inspection
region exposes one coordinated tab stop and a documented internal navigation
model; do not apply `role="application"` merely to capture keys. Marks that are
semantic actions use the matching native or ARIA role and an accessible name that
includes their data context.

Live regions report meaningful chart-level state changes, not every inspected
point.

## Representative example

A service-operations workspace includes an optional line chart titled “Median
response time,” scoped to “Daily median, last 30 days,” with milliseconds named
on the quantitative axis and dates on the chronological axis. The chart uses
`chart-series-1`, directly labels the one series, and marks a deployment with a
text annotation. A summary states that response time declined after the
deployment.

During background refresh, the existing line, summary, and inspected date remain
available with a quiet refresh state. If five recent dates fail, the chart shows
a labeled gap rather than treating them as zero or connecting them silently.
Keyboard and touch users can inspect the same daily values as pointer users, and
reduced motion updates the line without interpolation.

## Validation scenarios

Validate each governed family and interaction variant with:

- Zero, negative, fractional, very large, estimated, missing, unavailable,
  duplicated, constant, and outlier values
- One through six series and an attempted seventh series
- Unsorted input, repeated timestamps, irregular intervals, gaps, and mixed units
- Initial loading, fast completion, background refresh, stale, partial, empty,
  filtered empty, offline, permission limited, failed, and outcome unknown states
- Consistency between chart, summary, filters, and associated metrics
- Narrow and wide containers, awkward intermediate widths, 60% label expansion,
  200% text enlargement, increased spacing, and contained overflow
- Multiple locales, writing systems, number and date formats, and right-to-left
  direction
- Keyboard, touch, pointer, and speech operation; visible focus; exit from an
  inspectable chart; selection distinct from inspection
- Light and dark themes, color removal, common color-vision deficiencies, forced
  colors, high contrast, reduced motion, and print when supported
- Long category and series names, long units, overlapping marks, dense data, and
  a chart with no useful legend position

Apply the [`Dashboard overview`](../VALIDATION.md#dashboard-overview) when the
chart appears in a dashboard,
[`Data management`](../VALIDATION.md#data-management) when filters or record
scope apply, [`Data visualization`](../VALIDATION.md#data-visualization), and the
baseline asynchronous, responsive, media, and accessibility conditions. The
contract remains Draft until representative implementations demonstrate that
these outcomes work without making charts default workspace content.
