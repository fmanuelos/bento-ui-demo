# Overlay foundation

## Status

Contract complete for anchored, non-modal overlay behavior.

## Intent

An overlay places a temporary surface in a layer above the current content while
keeping it associated with an anchor or trigger. It defines placement, viewport
fit, dismissal, and focus coordination; it does not assign the surface a role.
[`Tooltip`](tooltip.md), [`Popover`](popover.md), action menu,
[`Listbox`](listbox.md), and [`Combobox`](combobox.md) contracts provide their own
semantics and keyboard behavior.

Use the [`Dialog foundation`](modal.md) for blocking interaction or a page or
[`Drawer or Sheet`](drawer.md) when a task cannot remain understandable and
operable in an anchored surface.

## Anatomy and variants

1. Anchor or controlling trigger
2. Optional relationship indicator
3. Layer boundary
4. Raised popup surface
5. Pattern-specific content
6. Optional dismissal control when the content requires one

An overlay may open without moving focus, move focus into its content, or keep
DOM focus on its controller while managing an active descendant. The dependent
component contract chooses exactly one focus model.

Placement uses logical directions such as block-start, block-end, inline-start,
and inline-end. Preferred alignment is not a guarantee: the surface may shift or
flip to remain usable within the available viewport or containing boundary.

## Semantic token mapping

Raised popup surfaces use the `dropdown` frontmatter mapping:
`surface-raised`, `text-primary`, `rounded.md`, and `spacing.space-2`. Use
`border-secondary` or the active theme's equivalent quiet edge. Apply the raised
popup depth described in DESIGN.md when tonal separation and a border do not
provide enough distinction.

Pattern-specific items continue to use their action, selection, feedback, or
status roles. The overlay surface does not turn selected values into actions or
ordinary content into menu items.

## States

Support closed, opening, open, repositioning, and closing states where a visible
transition is useful. Opening and closing transitions do not delay operability or
focus restoration. Repositioning preserves focus, active item, selection, input
value, and announcement state.

An anchor becoming unavailable while open closes the overlay and places focus at
the nearest logical continuation when focus restoration is needed. Busy content
remains dismissible unless cancellation would cause data loss or interrupt an
essential operation defined by the dependent contract.

## Behavior

The overlay remains visually associated with its anchor while staying within the
available boundary. Reposition before clipping; constrain the surface and allow
appropriate internal scrolling only when repositioning cannot keep all content
visible. The anchor and essential surface content remain reachable at high zoom.

Escape dismisses a non-modal overlay when the dependent pattern does not reserve
Escape for a more immediate operation. Dismissal restores focus to the trigger
when focus moved into the overlay. When focus remained on the controller,
dismissal preserves it there.

Completed activation outside may dismiss when doing so cannot discard data or
cause an unrelated control to activate incorrectly. Determine outside activation
across the trigger and portalled surface as one logical boundary. Do not close on
an initial pointer press when doing so would remove the intended release target.

Nested overlays define one clear dismissal order: Escape closes the innermost
eligible surface first. Closing a parent also closes its descendants and restores
focus according to the parent's contract. Scrolling, resizing, or changing text
direction must not create a detached, unreachable surface.

## Responsive behavior

An anchored surface may change side or alignment as space changes without
changing its semantic role. Long labels and values wrap or expose an equivalent
complete representation. Avoid simultaneous horizontal and vertical scrolling
inside a small popup.

On narrow touch surfaces, promote content to a Dialog, Drawer, or Sheet when
targets, text, or tasks cannot remain comfortable in the anchored presentation.
That transformation follows the related contract and preserves the same value,
selection, actions, and return focus rather than opening a separate workflow.

## Accessibility

The trigger exposes its expanded state and the relationship or popup type
required by the dependent component. The surface has the name and role defined by
that component; the overlay foundation itself introduces no generic ARIA role.

Keyboard and assistive-technology users receive the same content, actions,
dismissal, and state as pointer users. Focus remains visible across the trigger
and surface. High-contrast modes retain a perceivable surface edge and active
item. Reduced motion makes placement and open or close transitions effectively
immediate while preserving state changes.

### Web adapter

An implementation may render the surface in a portal if programmatic controller,
ownership, naming, and active-descendant relationships remain valid. Positioning
logic accounts for viewport edges, scrolling containers, zoom, writing direction,
and the surface's rendered size.

Use `aria-expanded`, `aria-controls`, and `aria-haspopup` only when required by
the dependent pattern. A tooltip uses its description relationship; a menu,
listbox, combobox, and dialog use their corresponding web patterns. Do not add
`role="menu"` merely because a surface resembles a dropdown.

## Example

An action menu prefers block-end alignment with its trigger. Near the viewport
edge it shifts or opens on the opposite side, keeps focus on a valid menu item,
and restores focus to the trigger after Escape dismissal.
