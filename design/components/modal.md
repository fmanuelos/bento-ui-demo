# Dialog and modal dialog

## Status

Contract complete for a modal dialog.

## Intent

A dialog is a focused surface associated with the current task. A modal dialog
blocks interaction outside itself. It is not a substitute for a full page or a
container for long-form content.

## Anatomy

1. Dimmed backdrop
2. Raised semantic surface
3. Title and optional description
4. Close button
5. Content
6. Right-aligned action row

The backdrop uses `background-overlay`; the panel uses `surface-raised`, `border-secondary`, and the extra-large radius token.

## Behavior

Opening moves focus inside the dialog. Initial focus goes to the element that best
supports comprehension or the primary task; the close button is a suitable
default for short, non-destructive dialogs. Focus remains within a modal dialog.

Escape closes the dialog unless doing so would cause uncommunicated data loss or
interrupt an essential operation. Backdrop activation closes only dialogs whose
content can be safely abandoned. Otherwise, provide explicit cancel and close
actions and explain unsaved changes. Closing restores focus to the invoking
control or to the next logical location when that control no longer exists.

Background content is inert and page movement is contained while modal. Repeated
activation cannot open duplicate instances.

## States

Support closed, opening, open, busy, closing, and error states as relevant.
Opening and closing states do not expose background interaction. A busy state does
not remove the dialog's name, current values, or cancellation path unless
cancellation is unsafe.

## Responsive behavior

The panel fills the available width up to `content-narrow` and retains at least
`spacing.lg` viewport padding. Use a page or side panel for long or multi-step
work.

## Accessibility

The dialog has a programmatically determinable name and optional description.
Every action remains operable without pointer input. Focus entry, containment,
dismissal, restoration, and background inertness are testable parts of the
contract. Enlarged text and long content remain reachable without two-dimensional
page scrolling.

### Web adapter

Use the native dialog element where its behavior satisfies the contract, or expose
`role="dialog"` with `aria-modal="true"`. Connect the title with
`aria-labelledby` or an equivalent accessible name and optional description with
`aria-describedby`. Tab and Shift+Tab remain inside the modal; Escape follows the
dismissal policy above.

## Example

Use a modal for a short confirmation or focused form whose completion returns the
user to the invoking context.
