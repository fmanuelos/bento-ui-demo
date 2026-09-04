# Status badge

## Status

Specified; the demo contains an inline example but no reusable React component.

## Intent

Status badges communicate persistent entity or workflow state. They do not
communicate transient operation feedback.

## Variants

- **Positive:** Active, Approved, Completed, Healthy
- **Warning:** Pending, Paused, At risk, Needs review
- **Negative:** Failed, Blocked, Rejected, Overdue
- **Info:** In review, Processing, Scheduled
- **Neutral:** Draft, Inactive, Archived, Unknown

Each variant uses the matching `status-*` foreground, background, and border with
`label-sm` typography and `rounded.full`.

## States and responsive behavior

Badges are informational and do not have hover or active states. Preserve the
label rather than reducing a badge to an unexplained dot on narrow screens.

## Accessibility

Always include text. If an icon or dot is present, treat it as decorative unless
it contributes an accessible name. Do not rely on color alone.

## Example

An Active project uses positive status; “Changes saved” uses feedback success
instead of a status badge.
