# Input

## Status

The standard input is implemented in `src/components/Input.tsx`. Compact and
search variants are specified by tokens but not implemented as reusable variants.

## Intent

Inputs collect short, structured text. Every input has a visible label; placeholder copy is an example, not a replacement for the label.

## Anatomy

1. Label
2. Optional hint
3. 44px input control
4. Optional helper or error message

## Variants and sizes

- **Standard:** `control-height-lg` for forms and general data entry.
- **Compact:** `control-height-md` for dense desktop filters.
- **Search:** Uses `surface-secondary` to distinguish utility search.

## States

The default border uses `border-primary`. Focus uses `border-focus` with the global `focus-ring`. Invalid fields use the danger border and text tokens. Disabled fields keep their label and use the disabled background, border, and text tokens.

## Responsive behavior

Inputs fill their container up to the form's chosen content width. Compact inputs
return to standard touch-friendly sizing in touch-oriented layouts.

## Accessibility

Labels are programmatically associated with their controls. Helper and error messages use `aria-describedby`; invalid fields expose `aria-invalid`.

## Example

Use helper text for persistent guidance and error text for the current invalid
state. Do not show both in the same message slot.
