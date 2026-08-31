# Modal

## Intent

Modals pause the current flow for a short, focused decision. They are not a substitute for a full page or a container for long-form content.

## Anatomy

1. Dimmed backdrop
2. Surface panel
3. Title and optional description
4. Close button
5. Content
6. Right-aligned action row

## Behavior

Opening focuses the close button. Escape and the backdrop close the modal. Closing restores focus to the element that opened it. Page scrolling is locked while open.

## Accessibility

The panel uses `role="dialog"`, `aria-modal="true"`, and a programmatically connected title. Buttons remain reachable by keyboard.
