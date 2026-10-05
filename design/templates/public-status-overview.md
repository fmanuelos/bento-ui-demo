# Public Status Overview template

## Status

Draft. Single-service and multi-service status destinations establish the scope.
References show fictional snapshots, not a live status provider. See the
[implementation record](../verification/setup-status-content-evidence.md).

## Intent

Help visitors understand the reported availability of named public services,
affected scope, freshness, and published incident or maintenance information.

## Use when

Use for a single public service and a portfolio of related public services with
explicit status coverage and published updates. Visitors may arrive directly
during an incident without an authenticated session.

## Do not use when

Do not use for an internal observability dashboard, private incident response,
account-specific diagnostics, or guaranteed service-level reporting. Use
[Public Content](public-content.md) for durable explanatory articles. Time-series
metrics and uptime reporting require evidence and semantics beyond status labels.

## Classification

- Primary mode: [Public Site](../experiences/public-site.md).
- Applicable candidate variant: Information Site.
- Domains: operations information for the services supplied by the consumer.
- Audience: public visitors checking service conditions.
- Excluded scope: internal responders, monitoring controls, and private diagnostics.

## Regions and hierarchy

1. Public navigation and main-content bypass.
2. Page Header identifying the service or portfolio.
3. Service Status Summary with coverage, freshness, and named service conditions.
4. Applicable maintenance notices with affected scope and time window.
5. Published incident summaries and Activity History for each identified incident.
6. Supporting guidance and optional subscription destinations when implemented.
7. Public footer and return destinations.

Do not replace service conditions with an incident list: an empty incident list
does not demonstrate that services are healthy.

## Participating contracts

Use [Public-site Navigation](../blocks/public-site-navigation.md),
[Page Header](../blocks/page-header.md),
[Service Status Summary](../blocks/service-status-summary.md),
[Activity History](../blocks/activity-history.md), and [Site Footer](../blocks/site-footer.md).
Use [Link](../components/link.md), [Button](../components/button.md), and
[Status Badge](../components/status-badge.md). Apply
[Data display](../patterns/data-display.md),
[Asynchronous feedback](../patterns/async-feedback.md), and
[Task continuity](../patterns/task-continuity.md). The reference footer is a local
composition, not a shared Site Footer implementation.

## Actions and permissions

Reading is public. Publish only intentionally public descriptions and service
identifiers; omit private responders, customer impact details, and internal links.
Refresh retains useful safe data and communicates failures with freshness intact.
A subscription action requires a real destination and its own consent and delivery
rules; the references expose no subscription control or implied notification.

## States, sequence, and continuity

Distinguish loading, operational, degraded, disruption, maintenance, unknown,
partial coverage, stale data, and retrieval failure. Unknown and stale conditions
cannot resolve to healthy. A portfolio summary explains incomplete coverage even
when a known service is degraded. Show the timestamp and scope of retained data;
never present a stale last-known condition as a current assertion.

Incident updates have stable identity, explicit order, and exact timestamps or
unknown time. Keep reading position and focus during updates; announce only useful
changes. Resolve independent history failure separately from service condition
failure. Production refresh ignores superseded responses. References use a fixed
snapshot and synchronous scenario changes; loading the operational sample is not
a live request. Reload resets the scenario and no history is persisted.

## Content and data requirements

Supply authoritative status sources, public service names, regions or exclusions,
freshness policy, localized timestamps with timezone, aggregation rules, incident
identifiers, maintenance windows, and uncertainty wording. Do not invent uptime,
resolution estimates, or missing events. Missing services remain unknown rather
than disappearing from coverage. Private data is removed before public rendering.

## Responsive and localization behavior

Stack service labels with their conditions and incident updates with timestamps.
Retain chronological order in RTL. Allow long names, translated labels, 200% text,
text spacing, localized dates, and multiple scripts without horizontal timelines.

## Accessibility

Use one page heading, main landmark, named status sections, semantic service lists,
and ordered incident history. Convey conditions in words independent of color.
Make refresh keyboard accessible and preserve focus. Avoid a live region around
the whole history. Support bypass, keyboard, touch, visible focus, themes, forced
colors, and reduced motion.

## Product instantiation

Define public publishing policy, authority, service coverage, freshness thresholds,
aggregation, independent retrieval, retention, and incident resolution semantics.
Specify refresh cadence and subscription destinations if offered. This contract
does not require a monitoring provider, notification service, or chart component.

## Reference pages and validation

Open `/examples/public-status` and `/examples/public-status?context=multi`.
Exercise all scenario controls, stale and incomplete coverage, multiple service
conditions, maintenance, and public incident ordering. Apply
[Public status](../verification/workflows.md#public-status),
[Template conformance](../verification/stress-tests.md#template-conformance), and
[baseline validation](../verification/baseline.md). Provider integration,
automatic refresh continuity, and complete accessibility validation remain open.
