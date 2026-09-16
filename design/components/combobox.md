# Combobox

## Status

Contract complete.

## Intent

A combobox combines text entry with a related popup of suggestions or selectable
values. Use a select when entry is not editable and a text field when suggestions
are unnecessary.
It follows the shared [`form-field`](form-field.md),
[`overlay`](overlay.md), and collection rules in DESIGN.md.

Filtering the Combobox's own suggestions remains component behavior. When a
Combobox supplies one criterion for a page or dataset, the surrounding query and
result workflow follows the
[`Search, filtering, and results pattern`](../patterns/search-filtering-and-results.md).

## Anatomy and variants

1. Visible label and optional description
2. Editable or select-only value field
3. Optional popup trigger
4. Listbox or grid popup
5. Optional helper, loading, empty, or validation message

Autocomplete behavior is explicitly one of none, list suggestions, or inline
completion.

The field uses the text-field token mapping. The popup uses the shared dropdown
surface, and its options use listbox state mappings.

## States and behavior

Support collapsed, expanded, typing, loading, active suggestion, selected,
invalid, empty-results, error, and disabled states. Text editing keeps native
cursor and selection behavior. Directional commands navigate suggestions only
when the popup is active. Escape closes the popup and follows the documented value
restoration policy. Selection commits one value; free-form values are accepted
only when the variant explicitly allows them.
Loading presentation follows the [`progress-indicator contract`](progress.md).
No-results, unavailable, and failed results follow the compact
[`empty-state contract`](empty-state.md) without becoming selectable options.

## Responsive behavior

The popup remains anchored and reachable within available space. Long suggestions
wrap or expose complete text without obscuring the input value.

## Accessibility

Expose the name, current value, expanded state, popup type, active suggestion,
selection, requirement, description, and validation. Result-count changes are
announced without repeating every directional movement.

### Web adapter

Use the ARIA combobox pattern with an associated listbox or grid popup. Preserve
native text-field key behavior and expose expanded, controlled, autocomplete, and
active-descendant relationships as appropriate.

## Example

Use a combobox to search and select a project owner from a large directory.
