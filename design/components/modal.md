# Modal

## Status

Implemented in `src/components/Modal.tsx`.

## Intent

Modals pause the current flow for a short, focused decision. They are not a substitute for a full page or a container for long-form content.

## Anatomy

1. Dimmed backdrop
2. Raised semantic surface
3. Title and optional description
4. Close button
5. Content
6. Right-aligned action row

The backdrop uses `background-overlay`; the panel uses `surface-raised`, `border-secondary`, and the extra-large radius token.

## Behavior

Opening focuses the close button. Tab and Shift+Tab remain within the dialog.
Escape and direct backdrop interaction close the modal. Closing restores focus
to the element that opened it. Page scrolling is locked and background content
is inert while open.

Callers provide the trigger reference when browser pointer-focus behavior does
not make the invoking control the active element.

## Responsive behavior

The panel fills the available width up to `content-narrow` and retains at least
`spacing.lg` viewport padding. Use a page or side panel for long or multi-step
work.

## Accessibility

The panel uses `role="dialog"`, `aria-modal="true"`, and a programmatically
connected title. Optional description text uses `aria-describedby`. Every action
remains keyboard reachable.

## Example

Use a modal for a short confirmation or focused form whose completion returns the
user to the invoking context.
