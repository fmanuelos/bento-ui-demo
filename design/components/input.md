# Input

## Intent

Inputs collect short, structured text. Every input has a visible label; placeholder copy is an example, not a replacement for the label.

## Anatomy

1. Label
2. Optional hint
3. 48px input control
4. Optional helper or error message

## States

The default border uses Line. Focus uses a Coral outline. Invalid fields use Coral for the border and message. Disabled fields keep their label but visibly reduce contrast.

## Accessibility

Labels are programmatically associated with their controls. Helper and error messages use `aria-describedby`; invalid fields expose `aria-invalid`.
