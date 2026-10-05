# Service Status Summary block

## Status

Draft. Single-service and portfolio summaries establish the scope. Runtime and
fictional references are described in the
[implementation record](../verification/setup-status-content-evidence.md).

## Intent

Group named service conditions with their coverage and freshness so visitors can
understand what a reported status does and does not establish.

## Use when

Supported modes: Public Site.

Use for one named public service or a related portfolio with an explicit coverage
boundary. Products own condition authority, freshness, and aggregation rules.

## Do not use when

Do not use for resource metrics, internal monitoring controls, task progress, or
incident chronology. Use [Activity History](activity-history.md) for published
incident events and [Progress](../components/progress.md) for running operations.

## Anatomy

1. Required heading identifying the summary.
2. Required coverage or affected scope.
3. Required freshness or unavailable-source explanation.
4. Required qualified overall statement.
5. Named service conditions, or an explicit unavailable-data message.
6. Optional per-service explanation of impact, uncertainty, or last-known status.

## Variants

No variants are established. One service and several services preserve the same
scope, freshness, and named-condition relationships.

## Participating components and related patterns

Use [Status Badge](../components/status-badge.md) for textual condition emphasis.
Apply [Data display](../patterns/data-display.md),
[Asynchronous feedback](../patterns/async-feedback.md), and
[Responsive density](../patterns/responsive-density.md). The consuming
[Public Status Overview](../templates/public-status-overview.md) owns retrieval,
refresh, public incident composition, and complete-page continuity.

## Content requirements

Supply stable service IDs, public names, condition labels, coverage, timestamp and
timezone, and an honest overall statement. Distinguish operational, degraded,
disruption, maintenance, and unknown. Missing or stale data cannot establish
healthy conditions. Specify affected regions or exclusions rather than implying
universal coverage. Do not expose internal service identifiers or private diagnostics.

## Layout and semantic token mapping

Use [Public Site](../../DESIGN.md#public-site-mode) spacing, surfaces, heading/body
type, borders, focus, and semantic status roles. Keep labels, values, and supporting
explanations together. Do not introduce status-specific colors outside the palette.

## States and behavior

Support current, incomplete, stale, and unavailable summaries. Loading has no
invented service values. Keep last-known values only with explicit stale wording.
An empty list is unavailable data, not all-clear. A consumer supplies aggregate
wording and never infers health from an empty incident history. The block is a
display composition; it starts no requests, timers, alerts, or subscriptions.

## Responsive and localization behavior

Stack name, badge, and impact text when needed. Preserve service order and full
conditions in RTL, expanded translations, 200% text, and spacing overrides. Do
not use horizontal scrolling or truncate the only condition label.

## Accessibility

Use a named section and semantic service collection. Conditions remain meaningful
without color or icons. Changes do not move focus; announcements belong to the
consumer's explicit refresh interaction. Support contrast, themes, and forced colors.

### Web adapter

Use a heading-labelled `section` and `ul` of named services. Status Badge contains
the full condition text. Do not apply `role="status"` to each item or wrap the
entire summary in a continuously announcing live region.

## Representative example

- A publishing API summary identifies all sample regions, a snapshot timestamp,
  degraded performance, and the applicable uncertainty.
- A portfolio lists publishing and asset delivery independently, retaining an
  operational peer when the publishing source reports unknown status.

## Validation scenarios

Test single-service and portfolio uses with operational, degraded, disruption,
maintenance, unknown, mixed, empty, loading, stale, and failed data. Verify that
stale or incomplete coverage cannot produce all-clear wording. Include long
service names, RTL, 200% text, keyboard, themes, and screen readers. Apply
[Public status](../verification/workflows.md#public-status),
[Block composition and reflow](../verification/stress-tests.md#block-composition-and-reflow),
and the [baseline](../verification/baseline.md).
