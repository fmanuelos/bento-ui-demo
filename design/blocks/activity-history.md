# Activity History block

## Status

Draft. Publishing history and support-case updates establish the intended scope.
Validation of chronological order, partial history, permissions, and refresh
continuity remains outstanding. Examples are design scenarios, not test evidence.

## Intent

Activity History groups events about one subject so people can understand what
happened, who or what caused it, and when. The block owns event relationships,
visible ordering, and local detail arrangement. The product owns event authority,
identity, ordering rules, access, retention, and completeness.

## Use when

Use in Application Workspace for a publishing record's history, support-case
updates, or comparable events about an identified subject. Chronological context
must contribute to understanding the record.

## Do not use when

Do not use for future workflow steps, a discussion composer, a notification inbox,
or a complete audit-search page. Use [Record Details](record-details.md) for
current attributes and [Results Toolbar](results-toolbar.md) with an appropriate
results surface for searching events across many records. A visual timeline alone
does not justify a new block or interactive component.

## Anatomy

1. Required section heading identifying the history's subject or scope
2. Required visible chronological ordering context
3. Optional coverage, freshness, or retention explanation
4. Required ordered event collection, or a scoped absence or availability message
5. Optional access to older events or the complete history

Each event has a required action description and timestamp or explicit unknown
time, actor context when available or material, and optional affected-object
reference, result, expanded detail, or destination. Read each event's meaningful
content together; a decorative connector does not establish its order.

## Variants

No variants are established. Date grouping and optional disclosed event detail
preserve the same chronological collection; they do not create different event
semantics or a second ordering model.

## Participating components and related patterns

Use [Link](../components/link.md) for destinations,
[Button](../components/button.md) for loading or refreshing,
[Disclosure](../components/disclosure.md) for optional detail,
[Avatar](../components/avatar.md) only as supplementary actor identification,
[Status Badge](../components/status-badge.md) for persistent event-result state,
and [Empty State](empty-state.md) for scoped absence or unavailability.
[Pagination](../components/pagination.md) is appropriate only for a bounded result
set with a defined paging model, not an unbounded stream.

Apply [Data display](../patterns/data-display.md),
[Asynchronous feedback](../patterns/async-feedback.md),
[Task continuity](../patterns/task-continuity.md), and
[Responsive density](../patterns/responsive-density.md). The block does not
introduce subscription, pagination, announcement, or recovery state machines.

## Content requirements

Describe events with an actor, action, and subject where available, such as
“Morgan assigned case C-104 to Support.” Distinguish a system event, deleted
actor, undisclosed actor, and genuinely unknown actor without inventing names.
Do not expose restricted content in collapsed details or accessible labels.

Show localized timestamps with an understandable timezone when it matters.
Relative time has a persistent or keyboard-accessible exact equivalent, never
hover-only information. The product defines stable ordering for equal, late,
corrected, and unknown timestamps; do not infer causal order from display order.
State when history is filtered, partial, or limited by retention. No visible
events does not prove that no events occurred.

## Layout and semantic token mapping

Use [Application Workspace](../../DESIGN.md#application-workspace-mode) layout,
group spacing, heading and body type, secondary text, border, status, and focus
roles. Give event text room before reserving avatar or timestamp columns.
Connectors and markers are optional decoration using existing border roles;
introduce no timeline-specific color, size, or breakpoint values.

## States and behavior

Reflect initial loading, current, refreshing, partial, stale, empty, restricted,
offline, and failed conditions from the owning data pattern. Keep existing safe
events visible during refresh and isolate a failed older-events request from
already loaded history. Placeholders are not events and do not count as history.

New events must not steal focus or unexpectedly move the event being read. The
product chooses a continuity-preserving insertion or explicit new-events control
under the data pattern. Stable event identities prevent duplicate entries across
requests. Keep expanded detail and focus when their events remain accessible;
remove restricted content promptly on access changes and resolve affected focus.

## Responsive and localization behavior

Stack timestamp and actor context with the event before narrow columns obscure
meaning. Keep chronological order stable in RTL; mirror logical alignment, not
the event sequence. Support 60% expansion, 200% text, increased spacing, long
actor and object names, multiple scripts, localized dates, and timezone changes.
Do not truncate the only action description or require a horizontal timeline.

## Accessibility

Expose the named history and event ordering through document structure. Each
disclosure names its event; repeated destinations remain distinguishable. Avoid
duplicate avatar and actor announcements. Keyboard focus is visible and follows
reading order, with usable touch targets. Do not announce every background event
by default. Meaning survives removal of connectors, color, avatars, and motion,
including forced colors and high contrast.

### Web adapter

Use a named `section`, an `ol` for ordered events, native headings where useful,
and `time` with a machine-readable timestamp when known. Keep event descriptions
as text, links as anchors, and detail controls under Disclosure semantics. Do
not assign `role="log"` solely because content is chronological; live-region
behavior follows the asynchronous pattern and actual update needs.

## Representative example

- A publishing record shows “Publication history,” “Newest first,” and events
  for publication, approval, and submission with actors and exact times. Optional
  detail explains the submitted changes.
- A support case shows “Case activity,” “Newest first,” assignment and status
  events, and “Load older events.” A coverage note explains that only the last
  90 days are available. A failed older-events request preserves visible updates.

These design examples share event relationships without asserting that their
retention or access rules are universal.

## Validation scenarios

Test both uses with no events, one event, many events, duplicate timestamps,
unknown actors or times, delayed events, grouped dates, partial coverage, loading,
failed older-event retrieval, stale refresh, permissions changing, and expanded
detail retained during new-event arrival.

Apply [Record inspection and history](../verification/workflows.md#record-inspection-and-history),
[Block composition and reflow](../verification/stress-tests.md#block-composition-and-reflow),
and the [baseline](../verification/baseline.md). Include long translated content,
RTL, 200% text, light and dark themes, keyboard, touch, screen readers, forced
colors, and reduced motion.
