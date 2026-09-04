# Tabs

## Status

Specified; no reusable React component exists.

## Intent

Tabs switch between peer views of the same context. They do not replace global
navigation or represent sequential steps.

## Anatomy and variants

1. Tab list
2. Two or more tabs
3. Selected indicator
4. Associated tab panel

Default tabs use `text-secondary`; hover uses the tertiary action surface; the
selected tab uses `background-accent` and `text-accent` plus a non-color
indicator.

## States

Support default, hover, focus, selected, and disabled where necessary. Selection
and focus are independent states.

## Responsive behavior

Keep labels concise. When tabs do not fit, use contained horizontal scrolling or
replace them with another peer-view control; do not wrap tabs into ambiguous rows.

## Accessibility

Use the ARIA tabs pattern with arrow-key navigation, Home and End, and managed
tab stops. Each tab controls one labelled panel.

## Example

Use tabs for Overview, Activity, and Settings views of the same project.
