# Progress indicators and spinner

## Status

Contract complete for linear determinate progress, linear indeterminate progress,
and a compact spinner. Circular determinate progress is not yet part of the
contract.

## Intent

Progress indicators communicate that an operation is underway. Use determinate
progress when a reliable total and current value are available. Use an
indeterminate indicator when progress cannot be measured. A spinner is the
compact indeterminate presentation for a control or small local region; it is not
a generic decoration or a substitute for an operation label.

Follow the asynchronous-feedback pattern. Preserve usable content during a
background refresh and use page-level progress only when the entire task is
unavailable.

## Anatomy and variants

1. Operation label or surrounding labelled context
2. Optional visible value or percentage for determinate progress
3. Track for linear progress
4. Indicator showing current or indeterminate activity
5. Optional supporting status or cancellation action

- **Determinate linear:** Shows a current value within a known minimum and
  maximum. Prefer a visible value when precision helps the task.
- **Indeterminate linear:** Shows continuing activity without implying a
  percentage or remaining duration.
- **Spinner:** Uses compact motion beside an existing label or inside a named
  control. A standalone spinner requires nearby visible status text.

Do not switch from determinate to indeterminate merely because progress has
paused. Do not show fictional percentage changes to create a sense of movement.

## Sizes and semantic token mapping

The spinner uses the icon size associated with its containing control. A local
linear indicator fits its container; page-level progress spans the task region,
not automatically the viewport.

Generic progress uses `feedback-info-background` for the track and
`feedback-info-foreground` for the indicator. Text uses `text-primary` and
`text-secondary`. A completed or failed operation changes to the appropriate
feedback message instead of recoloring an active progress indicator as the only
completion cue.

No frontmatter component entry is required yet: the current component schema
cannot represent track and indicator roles as separate parts without misleading
mappings. Add entries only if an approved representation can express both roles.

## States

Support delayed, active, paused when meaningful, completing, completed, failed,
and cancelled states at the experience level. The progress component presents
only an active measurable or indeterminate operation; completion, failure, and
cancellation transition to visible feedback appropriate to their outcome.
When the originating region is no longer visible, use the
[`Toast and notification region`](toast.md) contract for transient completion
feedback.

Delay an indicator when an operation normally completes immediately and a brief
appearance would create distracting flicker. Once shown, keep the operation label
stable. A stalled operation provides an explanation or recovery path when the
delay becomes actionable.

## Behavior

Determinate values move monotonically unless the operation explicitly restarts or
its total changes. When the total changes, preserve an understandable visible
value and do not announce every small update. Prevent duplicate activation at the
initiating control while keeping its label or an equivalent status available.

Starting or completing progress does not move focus by default. If the operation
replaces focused content, move focus to the nearest logical continuation.
Cancellation is offered only when the operation can stop safely and its label
states what will be cancelled.

## Responsive behavior

Labels, values, and cancellation actions wrap without obscuring the indicator.
On narrow surfaces, place supporting text and actions below a linear indicator
rather than shrinking text. The indicator remains perceivable at 200% zoom and
does not cause horizontal page scrolling.

Localization may change value formatting and label length. Do not encode progress
direction solely through left-to-right movement; logical progress direction
follows the writing system when appropriate, while numeric values remain
locale-aware.

## Accessibility

Expose the operation name and, for determinate progress, its minimum, maximum,
and current value. For indeterminate progress, expose busy status without a
fictional numeric value. The containing region or initiating control exposes its
busy state when the operation makes that context unavailable.

Announce meaningful milestones, completion, failure, or a material delay rather
than every animation frame or value change. Motion is not the only indication of
activity. Under reduced motion, use a static or effectively immediate visual
change while retaining the busy state and visible label.

High-contrast modes preserve the track and indicator distinction. Do not rely on
color alone to distinguish active, completed, or failed outcomes.

### Web adapter

Use a native progress element when its semantics and styling satisfy the
contract, or expose the progressbar role with an accessible name and determinate
value properties. Omit numeric value properties for an indeterminate indicator.
Use `aria-busy` on the affected region or initiating control as appropriate; the
spinner itself does not need a duplicate live-region announcement.

## Example

An export with a reliable item count shows “Exporting report,” a linear indicator,
and “40 of 100 items.” A short Save button uses a compact spinner beside the
unchanged “Save” label and announces the final outcome once.
