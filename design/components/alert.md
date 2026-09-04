# Alert

## Status

Specified; no reusable React component exists.

## Intent

Alerts communicate an event, outcome, warning, error, or contextual notice.

## Anatomy and variants

1. Optional semantic icon
2. Concise title
3. Message
4. Optional action or dismissal control

Success, warning, danger, and info variants use the corresponding `feedback-*`
foreground, background, and border.

## States and responsive behavior

Dismissible alerts require a labelled close button and visible focus. Actions
stack below the message when horizontal space is insufficient.

## Accessibility

Use `role="alert"` only for urgent, dynamically inserted information. Use a
labelled region or `role="status"` for non-urgent updates. Keep essential text in
the accessibility tree and never rely on color alone.

## Example

“Report generation failed” uses danger feedback; “Data refreshes every 30
minutes” uses info feedback.
