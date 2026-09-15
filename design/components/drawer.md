# Drawer and sheet

## Status

Contract complete for modal drawers, non-modal inspectors, and modal bottom
sheets.

## Intent

A drawer or sheet presents a task surface from a viewport edge while preserving
the user's relationship to the current context. Use it for work that is too long,
wide, or interactive for a Popover but does not require a full page. Use a
standard Dialog for short centered tasks and avoid edge panels as a generic
container for persistent page layout.

Modal variants extend the shared [`dialog and modal contract`](modal.md).
Non-modal inspectors preserve access to surrounding content and follow the
non-modal dialog requirements only when they are focused dialog tasks.

## Anatomy and variants

1. Optional blocking backdrop
2. Edge-attached task surface
3. Title and optional description
4. Optional close control
5. Scrollable task content
6. Optional status or error region
7. Optional persistent action area

- **Modal drawer:** Enters from logical inline-start or inline-end and blocks the
  surrounding task.
- **Non-modal inspector:** Remains beside primary content when both regions have
  sufficient space and interaction remains understandable.
- **Bottom sheet:** Enters from block-end for a focused touch-oriented task and is
  modal unless an explicitly non-modal platform convention provides equivalent
  clarity.

Temporary navigation may use a modal drawer but continues to follow the
[`Navigation contract`](navigation.md) for destinations and current location.

## Sizes and semantic token mapping

The surface uses `surface-raised`, `text-primary`, and `border-secondary`. Modal
variants use `background-overlay`. Use `rounded.shape-xl` on exposed corners; an edge
flush with the viewport does not need an artificial outer radius. A modal drawer
or sheet uses modal-surface depth. A temporary non-modal inspector that overlaps
content uses floating-surface depth; a persistent inspector beside content uses
raised-surface depth. The `surface-raised` color role does not determine these
elevation levels.

Choose a useful width based on content, up to `container-readable` for complex
reading or forms. A narrow focused task may use `container-narrow`. Bottom sheets
use available inline width and preserve safe-area and page-padding clearance.

No separate frontmatter entry is required while Drawer and Sheet compose existing
surface, overlay, shape, and dialog roles.

## States

Support closed, opening, open, resizing when user-controlled, busy, error, and
closing states. A modal remains blocking throughout opening and closing. Busy
state preserves the title, values, status, and a cancellation path unless
cancellation is unsafe.

A responsive change between drawer, sheet, inspector, and page preserves task
state and focus. It does not close and reopen as a new task merely because the
viewport crosses a named range.

## Behavior

Opening, initial focus, modal containment, Escape, backdrop dismissal, unsaved
work, and return focus follow Dialog. A non-modal inspector does not trap focus;
users move predictably between it and the primary content. Closing restores focus
to its trigger or nearest logical continuation.

Keep one principal scrolling region inside the panel. A persistent header or
action area may remain visible when doing so does not reduce the content viewport
below a usable size. Background page scrolling is contained only for modal
variants.

A drag handle may supplement resizing or dismissal on touch platforms, but every
drag action has a named non-drag alternative. Accidental edge gestures do not
discard entered information.

## Responsive behavior

Use a non-modal inspector only while it and the primary task retain useful widths.
Transform it into a modal drawer, sheet, or page when available space, zoom,
translation length, or input capability requires it. A bottom sheet does not
cover essential system controls or ignore safe-area insets.

Content, labels, validation, and actions wrap without horizontal scrolling.
Actions stack when needed. Logical start and end placement responds to writing
direction; product meaning, not a fixed physical edge, determines placement.

## Accessibility

Expose the panel name, optional description, modality, busy or error state, and
available actions. Modal focus containment and background inertness are testable.
Non-modal variants expose a predictable route between the panel and the content
they inspect.

The panel boundary and close action remain perceivable in high-contrast modes.
Motion is not the only indication that a panel opened. Reduced motion makes the
edge transition effectively immediate while preserving focus and modal state.

### Web adapter

A modal drawer or sheet uses the native dialog element when it satisfies the
contract, or exposes `role="dialog"` with `aria-modal="true"`. A focused non-modal
dialog exposes a dialog role without modal state. A persistent complementary
inspector may instead use a labelled complementary region when it is part of the
page rather than a dialog task.

Use inert background behavior and scroll containment only for modal variants.
CSS logical properties determine edge placement. Preserve the panel in a stable
DOM and accessibility relationship when its presentation changes responsively.

## Example

Selecting a project opens a non-modal details inspector beside a wide dashboard.
When the workspace becomes constrained, the same task becomes a modal end drawer
with the same title, selected project, form values, and return-focus destination.
