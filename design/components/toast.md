# Toast and notification region

## Status

Contract complete.

## Intent

A toast communicates a brief asynchronous outcome without replacing the current
task or moving focus. The notification region coordinates toast order,
announcements, persistence, and dismissal. Use an inline Alert when feedback must
remain near affected content, an Empty State when content cannot be presented,
and an Alert Dialog when a decision blocks progress.

Toast follows the asynchronous-feedback pattern and reuses the semantic variants
of the [`Alert contract`](alert.md).

## Anatomy and variants

1. Persistent notification region
2. Optional semantic icon
3. Concise outcome title
4. Optional supporting message
5. Optional single recovery or follow-up action
6. Optional dismissal control

- **Transient toast:** Confirms a completed, non-critical outcome and may dismiss
  after sufficient reading time.
- **Persistent toast:** Communicates a warning, failure, or outcome with an action
  that remains until dismissed or resolved.
- **Progress toast:** Represents a background operation only when the operation
  remains understandable outside its originating region. It follows the
  [`Progress`](progress.md) contract and becomes outcome feedback when complete.

Do not use a toast for validation, required instructions, or information users
must remember after it disappears.

## Sizes and semantic token mapping

Success, warning, danger, and info use the matching `alert-*` frontmatter mapping
and `feedback-*` foreground, background, and border roles. Toast width is bounded
to a readable line length and adapts to available inline space. Internal actions
use compact Button or Link treatment while preserving touch targets. Because a
toast temporarily overlaps the current layout, it follows the floating-surface
depth guidance while retaining its semantic feedback border.

No separate frontmatter entry is required because Toast reuses the Alert visual
mapping. Placement and queue behavior remain contract-defined rather than token
properties.

## States

Support queued, entering, visible, paused, updating, dismissing, dismissed, and
resolved states. The region normally exposes no more than three visible toasts;
additional messages remain queued unless combining equivalent outcomes is more
useful. Urgent failures are never hidden behind routine confirmations.

Pause automatic dismissal while the toast or its region has pointer hover, focus,
or another active reading interaction. Updating an existing operation preserves
its position and does not create repeated announcements for immaterial progress.

## Behavior

Add one toast for one meaningful outcome. Deduplicate repeated messages from the
same operation and combine high-volume routine outcomes into a useful summary.
Order visible toasts predictably, with the newest announcement discoverable
without visually rearranging a toast that currently contains focus.

Transient dismissal allows enough time for the message to be perceived and is not
used when the toast contains an action. Persistent toasts provide explicit
dismissal unless the message must remain until its condition resolves. Dismissal
does not cancel the underlying operation unless the control explicitly says so.

Toast appearance and removal do not move focus. If a user dismisses a focused
toast, move focus to the next toast action, the notification-region control, or
the nearest logical element. If a toast action changes location, follow that
destination's focus behavior.

## Responsive behavior

Place the region where it does not obscure primary navigation, focused controls,
form errors, or system dialogs. A logical block-end and inline-end position is a
common default, but safe areas and persistent application chrome take precedence.

On narrow surfaces, use available width with page padding and stack toast content
and actions when needed. Text wraps without truncation. The queue remains usable
at 200% zoom without creating horizontal page scrolling. Logical placement adapts
to right-to-left direction.

## Accessibility

Announce each meaningful outcome once with urgency appropriate to its content.
Routine success and information are non-urgent; a failure is urgent only when
immediate awareness is necessary. Do not make every toast an interrupting alert.

The notification region is discoverable without requiring focus to move into it.
Toast actions and dismiss controls have contextual names. Color, icon, placement,
and motion are supporting cues rather than the only indication of severity.

High-contrast modes preserve boundaries, text, and controls. Reduced motion
removes sliding, stacking, or fading animations. Automatic dismissal behavior
does not depend on whether animation is enabled.

### Web adapter

Create stable live-region containers before inserting toast content. Use
`role="status"` or polite live behavior for routine outcomes and `role="alert"`
only for urgent dynamically inserted failures. Do not recreate the region or
reannounce unchanged toasts after unrelated renders.

Keep actionable persistent toasts in ordinary focus order while visible. A
separate “Notifications” control or region label may provide access when the
visual placement is not adjacent to the current task.

## Example

After a background export starts, one persistent toast says “Exporting report”
with progress and a Cancel action. It updates in place to “Report ready” with a
Download action rather than adding a second announcement and leaving stale
progress visible.
