# Alert

## Status

Contract complete.

## Intent

Alerts communicate an event, outcome, warning, error, or contextual notice. Use
the [`Toast and notification-region contract`](toast.md) when brief asynchronous
feedback should appear outside the originating layout. Use an inline Alert when
the message must remain near affected content.

Persistent unsaved, save-failed, offline, restoration, or conflict messages
follow the
[`Task continuity and unsaved work pattern`](../patterns/task-continuity.md).
Alert owns their contained presentation, not the persistence or recovery model.

## Anatomy and variants

1. Optional semantic icon
2. Concise title
3. Message
4. Optional action or dismissal control

Success, warning, danger, and info variants use the corresponding `feedback-*`
foreground, background, and border.

## States and responsive behavior

Dismissible alerts require a labelled close button and visible focus. Actions
stack below the message when horizontal space is insufficient. Support appearing,
current, busy, resolved, and dismissed states as relevant. Dismissal does not
discard an unresolved error or the only recovery path.

## Behavior

Classify each message as urgent or non-urgent before choosing announcement
behavior. Announce a newly inserted message once. Do not repeatedly announce the
same content after unrelated renders or updates. Moving focus to an alert is
reserved for tasks that require immediate review or correction. Persistent
messages provide an explicit recovery action when one exists.

## Accessibility

Expose severity, message, current status, actions, and dismissal without relying
on color. Urgent and non-urgent messages produce appropriately different
announcements. A dismissal control has a name that includes enough context when
more than one alert is present.

### Web adapter

Use `role="alert"` only for urgent, dynamically inserted information. Use
`role="status"` or a labelled region for non-urgent updates. Keep essential text
in the accessibility tree and avoid recreating a live region when its message has
not changed.

## Example

“Report generation failed” uses danger feedback; “Data refreshes every 30
minutes” uses info feedback.
