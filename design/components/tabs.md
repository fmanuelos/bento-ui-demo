# Tabs

## Status

Contract complete.

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
and focus are independent states. Focus remains visible on the selected tab.
Insertion, removal, loading, and error states preserve a valid selected tab and a
predictable focus location.

## Behavior

Choose one activation model for each tab set:

- Automatic activation displays a panel when its tab receives focus and is used
  only when panel display has no perceptible delay.
- Manual activation moves focus independently; a separate activation action
  displays the panel.

When the selected tab is removed, select and focus the nearest logical tab. When
tabs are inserted, do not move focus or selection without user action. Disabled
tabs are skipped by managed navigation unless the product requires them to remain
discoverable with an explanation.

## Responsive behavior

Keep labels concise. When tabs do not fit, use contained horizontal scrolling or
replace them with another peer-view control; do not wrap tabs into ambiguous rows.

## Accessibility

Expose the tab list, each tab, selection, and the associated panel
programmatically. Keyboard users move among tabs without traversing every tab in
the page sequence. Focus order remains predictable when tabs overflow or change.

### Web adapter

Use the ARIA tabs pattern with managed tab stops. Horizontal tabs use Left and
Right Arrow; vertical tabs use Up and Down Arrow. Home and End move to the first
and last tab. In manual activation, Enter or Space selects the focused tab. Each
tab controls one labelled tab panel.

## Example

Use tabs for Overview, Activity, and Settings views of the same project.
