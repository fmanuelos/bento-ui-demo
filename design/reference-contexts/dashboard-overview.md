# Dashboard overview

**Mode:** Dashboard  
**Primary audience:** A returning authenticated user monitoring work and deciding
what needs attention next.

## Scenario and outcome

The fictional Northstar Workspace overview summarizes active projects, upcoming
deadlines, recent changes, and system health. A user should orient quickly,
distinguish persistent status from event feedback, identify one primary next
action, and continue useful work when some data is delayed or unavailable.

Representative content includes 12 active projects, three items needing review,
an 87% on-time rate, a “Reporting data updated 8 minutes ago” freshness label,
and a recent-project table containing varied owner names and statuses.

## Template structure

1. Initial bypass route and navigation shell with current location.
2. Page heading, freshness context, and one primary page action.
3. Summary compositions using statistic cards and status badges.
4. Primary work or data region before secondary activity or guidance.
5. Recent-record table with a route to the complete data-management view.
6. Local alerts, progress, empty states, or recovery actions adjacent to the
   content they describe.

## Participating system contracts

- Functional patterns: [navigation shell](../patterns/navigation-shell.md),
  [data display](../patterns/data-display.md),
  [asynchronous feedback](../patterns/async-feedback.md), and
  [responsive density](../patterns/responsive-density.md).
- Components: [Navigation shell](../components/navigation.md),
  [Skip link](../components/skip-link.md), [Button](../components/button.md),
  [Card](../components/card.md), [Status badge](../components/status-badge.md),
  [Alert](../components/alert.md), [Progress](../components/progress.md),
  [Empty state](../components/empty-state.md), and
  [Data table](../components/table.md).
- Perceptual patterns: compact operational rhythm, strong information hierarchy,
  quiet containment, persistent status language, and restrained feedback.

## Required states and transitions

- Initial loading identifies the unavailable regions without presenting
  placeholders as real metrics or selectable rows.
- Background refresh preserves useful data, marks freshness honestly, and remains
  quiet unless the current task materially changes.
- Partial failure keeps successful regions available and places recovery with the
  failed region instead of replacing the entire page.
- Empty, no-results, permission-denied, offline, stale, and error states remain
  distinct and offer an appropriate next action when one exists.
- Temporary navigation preserves destination order and restores focus to its
  trigger after dismissal.
- Completion feedback describes an event; status badges continue to describe the
  condition of the associated project or process.

## Context-specific stress conditions

- Render one metric as unavailable, one as stale, and one with a value large
  enough to exceed its normal line length.
- Use translated card labels expanded by 60% and owner names from multiple writing
  systems.
- Test zero projects, one project, and enough projects to require pagination in
  the complete view.
- Collapse the persistent sidebar while keeping every destination name available
  without requiring icon recognition.
- Test the page at 200% zoom with a temporary navigation panel, an active refresh,
  and a visible local error.
- Switch between light and dark themes without resetting scroll, focus, selection,
  navigation, or freshness state.

## Acceptance outcomes

- The current location, data freshness, most important action, and items needing
  attention are identifiable without color alone.
- Failure in one region does not unnecessarily block unrelated dashboard work.
- Dashboard density improves scanning without shrinking essential text or targets.
- Reflow preserves the priority of primary work over secondary summaries.
- Loading, feedback, persistent status, selection, and navigation use distinct
  language and visual roles.
