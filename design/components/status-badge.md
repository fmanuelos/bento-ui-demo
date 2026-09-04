# Status badge

## Status

Contract complete. Current implementation evidence is tracked in the
[`component index`](README.md).

## Intent

Status badges communicate persistent entity or workflow state. They do not
communicate transient operation feedback.

## Anatomy

1. Required text label
2. Optional decorative or semantic icon

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
When status changes dynamically, update the visible label and use the surrounding
experience pattern to determine whether an announcement is needed.

## Behavior

A status badge is informational and does not activate, navigate, filter, or open
content. If the experience needs one of those actions, place the badge beside an
appropriately named control or use a separately specified interactive component.

## Accessibility

Always include text. If an icon or dot is present, treat it as decorative unless
it contributes information not already in the label. Do not rely on color alone.
The badge does not become interactive merely because it resembles a control.

### Web adapter

Decorative icons are hidden from assistive technology. A status change that is
important but does not move focus uses the asynchronous-feedback announcement
pattern rather than assigning a live-region role to every badge.

## Example

An Active project uses positive status; “Changes saved” uses feedback success
instead of a status badge.
