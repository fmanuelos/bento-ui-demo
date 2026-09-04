# Data display

## Intent

Data-display patterns support comparison, interpretation, and action while making
data availability and freshness explicit.

## Contract

- Use a data table for static relational data and a data grid only when managed
  navigation, selection, or editing is necessary.
- Use charts for relationships and trends, not as the sole source of exact values.
- Provide a text summary or accessible alternative for essential chart meaning.
- Keep categorical color assignments consistent within an analytical context and
  add labels, shapes, patterns, or line styles for essential distinctions.
- Distinguish no results, no data yet, filtered empty, loading, partial, stale,
  permission-denied, offline, and error states.
- Preserve headers and useful data during refresh when possible.
- Sorting, filtering, pagination, and selection expose their current state and
  preserve focus.
- Truncation never removes access to an essential value.

## Responsive behavior

Prioritize columns before contained horizontal scrolling, stacked records, or a
dedicated detail view. Preserve information, actions, reading order, and state
when changing presentation. Two-dimensional scrolling is acceptable when the
data's meaning requires it, but the surrounding page must still reflow.
