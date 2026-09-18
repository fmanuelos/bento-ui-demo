# Listbox

## Status

Contract complete.

## Intent

A listbox presents a visible or popup list from which one or more values can be
selected. It is not an action menu and its items do not trigger unrelated
commands.
A popup listbox follows the shared [`overlay contract`](overlay.md). Persistent
and popup variants follow the shared collection model in DESIGN.md.

## Anatomy and variants

1. Label or controlling trigger
2. Listbox surface
3. Options
4. Optional group labels
5. Optional selection summary for multi-selection

Single- and multi-selection are distinct variants.

Use `surface-raised`, `text-primary`, `rounded.shape-md`, and `spacing.scale-2` for a popup
surface. Options use ghost action roles for hover and focus and selection roles
for selected state.

## States and behavior

Support closed and open when popup, active option, selected, checked when used for
multi-selection, disabled option, loading, empty, and error. Focus, active option,
and selection remain distinct. Directional commands move the active option;
selection follows the chosen single- or multi-selection model. Type-ahead is
available for longer lists. Reordering or filtering preserves valid selections.
Loading presentation follows the [`progress-indicator contract`](progress.md).
Empty and unavailable content follows the compact
[`empty-state contract`](../blocks/empty-state.md) without becoming an option.

## Responsive behavior

Keep options and group labels readable at enlarged text. Popup listboxes remain
within the viewport; persistent listboxes may scroll internally without trapping
page navigation.

## Accessibility

Expose the listbox name, single- or multi-selection mode, active option, selected
options, groups, option availability, and result changes.

### Web adapter

Use the ARIA listbox pattern for a custom listbox and implement its managed focus,
directional navigation, type-ahead, and selection behavior. Use native selection
controls when they satisfy the task.

## Example

Use a multi-select listbox to assign several existing team members to a project.
