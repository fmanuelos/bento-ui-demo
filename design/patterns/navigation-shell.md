# Navigation shell

## Intent

The navigation shell communicates location and gives stable access to primary
destinations while preserving workspace priority.

## Contract

- Destination names, order, and current-location meaning remain consistent across
  persistent, collapsed, and temporary forms.
- Current location uses a non-color indicator and is exposed programmatically.
- Global utilities are separated from destination navigation.
- Collapsing navigation does not remove accessible names or make icon knowledge a
  prerequisite.
- Temporary navigation follows either the disclosure or modal-dialog contract;
  it does not invent a third focus model.
- Opening and closing temporary navigation preserve a predictable focus location.
- Navigation does not move merely because content loads or the viewport changes.

## Transformation

Use persistent navigation when it coexists comfortably with the primary task.
Collapse or replace it when labels, localization, zoom, or available space would
compete with the workspace. The system ranges are defaults, not device detection.
