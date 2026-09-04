# Dropdown and menu

## Status

Specified; no reusable React component exists.

## Intent

Dropdowns reveal a short list of choices or actions attached to a trigger. Use a
dialog, page, or side panel for complex tasks.

## Anatomy and variants

1. Trigger
2. Raised menu surface
3. Menu items with optional leading icon or trailing metadata
4. Optional separators or section labels

Use `surface-raised`, `text-primary`, `rounded.md`, and `spacing.sm`. Use quiet
borders or restrained elevation to separate the menu from its anchor surface.

## States

Support closed, open, item hover, item focus, selected, and disabled states.
Opening moves focus according to the selected interaction pattern; closing
restores it to the trigger.

## Responsive behavior

Keep the menu within the viewport and reposition before clipping. On narrow touch
screens, use a bottom sheet or dialog when menu targets cannot remain comfortable.

## Accessibility

Choose native controls for simple selection. For custom action menus, implement
the ARIA menu keyboard pattern, Escape handling, and an accessible trigger name.

## Example

Use an action menu for Rename, Duplicate, Archive, and Delete commands on a record.
