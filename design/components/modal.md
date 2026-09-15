# Dialog and modal dialog

## Status

Contract complete for the shared dialog foundation and modal dialog. Alert Dialog
and Drawer or Sheet provide dedicated specializations.

## Intent

A dialog is a focused surface associated with the current task. A modal dialog
blocks interaction outside itself; a non-modal dialog permits interaction with
the surrounding context when that interaction remains understandable and safe.
A dialog is not a substitute for a full page or a container for unrelated or
long-form content.

Use an alert dialog for a short decision whose consequences require immediate
acknowledgement and follow the dedicated
[`alert-dialog contract`](alert-dialog.md). Use a page, drawer, or sheet for long,
multi-step, or frequently referenced work and follow the
[`drawer-and-sheet contract`](drawer.md) for an edge-attached presentation.

## Anatomy and variants

1. Optional dimmed backdrop for a modal presentation
2. Floating or modal semantic surface according to modality
3. Title and optional description
4. Optional close button
5. Task content
6. Optional status or error region
7. Action row

Every dialog has a programmatically determinable title even when the visual
design does not repeat it prominently. The description explains purpose or
consequence; it does not duplicate all interactive content.

- **Non-modal dialog:** Keeps surrounding content operable. Use only when users
  need to compare or act on that context while the dialog remains open.
- **Modal dialog:** Makes background content inert and contains interaction until
  the task is completed or dismissed.

Modality is behavioral, not visual. A backdrop alone does not make a dialog
modal, and a modal remains modal if its backdrop is visually subtle.

## Semantic token mapping

The modal backdrop uses `background-overlay`. The panel uses the `modal`
frontmatter mapping: `surface-raised`, `text-primary`, `rounded.shape-xl`, and
`spacing.space-6`, with `border-secondary` as its quiet edge. A non-modal dialog
uses floating-surface depth; a modal dialog uses modal-surface depth above its
blocking backdrop. The `surface-raised` color role does not determine either
elevation level. Preserve the quiet edge and tonal step even when the platform
adapter supplies a shadow.

Titles use an appropriate heading role based on hierarchy and available space;
the visual typography role does not determine the document heading level.
Actions use the Button contract. Destructive emphasis follows the destructive-
actions pattern rather than changing the dialog surface to a danger color.

## States

Support closed, opening, open, busy, error, and closing states as relevant.
Opening and closing states do not expose premature background interaction. A busy
state preserves the dialog name, current values, status, and a cancellation path
unless cancellation is explicitly unsafe.

An error remains associated with the failed operation and provides retry or
recovery when one exists. Repeated activation of a trigger does not open duplicate
instances of the same dialog task.

## Behavior

Opening moves focus inside the dialog. Initial focus goes to the element that best
supports comprehension or the primary task. The close button is a suitable
default for short informational dialogs. A destructive confirmation follows the
destructive-actions pattern and normally favors a safe action.

Focus remains within a modal dialog. A non-modal dialog does not trap focus, but
its position in the focus order and its return path remain predictable. Opening a
non-modal dialog must not make the surrounding task ambiguous or cause focus to
cycle unexpectedly between distant regions.

Escape closes when doing so cannot cause uncommunicated data loss or interrupt an
essential operation. Backdrop activation closes only a modal whose content can be
safely abandoned. Otherwise provide explicit cancel and close actions and explain
unsaved changes. A close icon is not a substitute for an explicit Cancel action
when users must understand that entered work will be discarded.

Closing restores focus to the invoking control. If that control no longer exists,
move focus to the nearest logical continuation. Modal background content is inert
and page movement is contained while the dialog is open. Nested modal dialogs are
avoided; when unavoidable, dismissal and focus restoration operate from the
innermost dialog outward.

## Responsive behavior

The standard panel fills the available width up to `container-narrow` and retains
at least `spacing.space-4` viewport clearance. Width is a useful maximum, not a
reason to shrink labels or create horizontal scrolling. Long content remains
reachable through one clear vertical scrolling region.

Action labels wrap or actions stack when they do not fit. Preserve action order
and keep the safe exit available. When a task becomes too long, too wide, or too
dependent on surrounding context, transform it into a page, drawer, or sheet
without losing entered values or task progress. Edge-attached transformations
follow the [`Drawer and Sheet contract`](drawer.md).

The logical reading and focus order remains stable in right-to-left layouts.
Directional placement and motion mirror only when their meaning is directional.

## Accessibility

Expose the dialog name, optional description, modality, current status, and
available actions. Every action remains operable without pointer input. Focus
entry, containment when modal, dismissal, restoration, and background inertness
are testable parts of the contract.

At 200% zoom and with increased text spacing, titles, descriptions, values,
errors, and actions remain reachable without two-dimensional page scrolling.
High-contrast modes preserve the panel boundary, backdrop distinction, focus,
and action hierarchy. Reduced motion makes open and close transitions effectively
immediate without exposing background interaction early.

### Web adapter

Use the native dialog element where its behavior satisfies the contract, or
expose `role="dialog"`. A modal exposes `aria-modal="true"`; a non-modal dialog
does not. Connect the title with `aria-labelledby` or provide an equivalent
accessible name, and connect a concise description with `aria-describedby` when
appropriate.

Tab and Shift+Tab remain inside a modal. Escape follows the dismissal policy
above. Make background regions inert while modal and contain page scrolling
without preventing scrolling inside long dialog content. A non-modal dialog
retains an explicit close path and participates predictably in page focus order.

## Example

Use a modal dialog for a short project-creation form that returns users to the
invoking project list. Use a non-modal dialog only when users must safely compare
the form with surrounding information while editing.
