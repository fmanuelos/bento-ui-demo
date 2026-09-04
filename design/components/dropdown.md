# Popup surface and dropdown patterns

## Status

Shared visual contract complete. Action menu, listbox, combobox, and disclosure
remain distinct behavioral contracts. Current implementation evidence is tracked
in the [`component index`](README.md).

## Intent

`Dropdown` is an umbrella visual term for content revealed near a trigger. It does
not determine behavior. Choose the specific pattern from the content and task:

- Action menu for commands.
- [Listbox](listbox.md) for choosing one or more values.
- [Combobox](combobox.md) for text entry with suggestions or selectable values.
- [Select](select.md) for a compact, non-editable single choice.
- Disclosure for showing or hiding ordinary content.
- Popup surface for presentation only when none of the interactive patterns apply.

Use a dialog, page, or side panel for complex tasks.

## Anatomy and variants

1. Trigger, when the pattern has one
2. Raised popup surface
3. Pattern-specific content and items
4. Optional leading icons, trailing metadata, separators, or section labels

Use `surface-raised`, `text-primary`, `rounded.md`, and `spacing.sm`. Use quiet
borders or restrained elevation to separate the menu from its anchor surface.

## States

Support closed, opening, open, closing, and pattern-specific item states. Items may
have hover, focus, selected, checked, or disabled states only when the chosen
behavior defines them. Opening, focus placement, selection, dismissal, and focus
restoration follow the selected pattern rather than the popup's appearance.

## Behavior

Escape dismisses a non-modal popup and restores focus to its trigger. Activation
outside may dismiss when it cannot cause data loss. Repositioning or resizing does
not change selection or focus. A popup stays within the available viewport and
remains reachable when content is enlarged.

### Action menu

Items perform commands rather than represent a persistent selected value. Opening
moves focus to the first appropriate item; directional commands move between
items. Activation runs one command and normally closes the menu.

### Listbox

Items represent selectable values. Focus and selection are independent unless the
chosen single-selection model explicitly couples them. Multi-selection exposes
every selected value and provides a non-pointer selection method.

### Combobox

The text field retains normal text-entry behavior while the popup presents
suggestions or choices. The current value, active suggestion, expanded state, and
selection are distinct. Closing the popup does not discard typed text unless the
contract states that cancellation restores the prior value.

### Disclosure

Activation shows or hides ordinary content. Focus remains on the trigger, and the
revealed content follows it in meaningful reading order. Disclosure content does
not receive menu or listbox semantics.

### Presentation-only popup

A non-interactive popup provides supplemental content associated with its anchor.
It is dismissible without pointer input and does not take focus unless its content
requires interaction; if interaction is required, choose a defined interactive
pattern instead.

## Responsive behavior

Keep the menu within the viewport and reposition before clipping. On narrow touch
screens, use a bottom sheet or dialog when menu targets cannot remain comfortable.

## Accessibility

Prefer a platform-native selection control when it satisfies the task. Expose the
trigger's name, expanded state, popup type, selection, and active item according
to the chosen pattern. Do not give ordinary navigation or disclosure content menu
semantics.

### Web adapter

For an action menu, implement the ARIA menu-button and menu keyboard patterns. A
combobox or listbox follows its corresponding ARIA pattern instead. The trigger
exposes `aria-expanded` and, where applicable, `aria-haspopup` and
`aria-controls`. Escape closes and restores focus to the trigger.

## Example

Use an action menu for Rename, Duplicate, Archive, and Delete commands on a record.
