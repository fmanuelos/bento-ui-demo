# Avatar Group

## Status

Contract complete for static and expandable groups of person avatars.

## Intent

An Avatar Group gives a compact preview of several people associated with the
same object or activity. It does not replace a complete participant list when
users need names, roles, status, selection, or management actions.

Avatar Group composes the [`Avatar`](avatar.md) contract. An interactive overflow
presentation follows [`Popover`](popover.md) when a small anchored list remains
appropriate, or [`Dialog`](modal.md) or [`Drawer`](drawer.md) when the task becomes
substantial.

## Anatomy and variants

1. Group with a determinable purpose
2. Ordered sequence of Avatars
3. Optional overflow summary
4. Optional named overflow control

- **Static group:** Presents a compact identity summary without interactive
  avatars or overflow.
- **Expandable group:** Uses one explicit overflow control to reveal identities
  not visible in the compact presentation.

Individual avatars remain non-interactive unless each person has a distinct
navigation or action requirement. Do not make a visually overlapping stack
behave like one ambiguous control.

## Sizes and semantic token mapping

Every avatar in one group uses the same supported Avatar size. Small is the
default for dense records; medium is appropriate when the group is a principal
identity summary. Large groups are not supported because the component is a
compact preview.

Overlap may reduce horizontal space but never obscures more than one quarter of
an avatar's diameter or hides the distinction between adjacent identities. The
visible boundary must survive light, dark, and high-contrast surfaces.

No separate frontmatter entry is required. Avatar Group reuses Avatar mappings,
while overlap, ordering, and overflow cannot be represented by the current
DESIGN.md component properties.

## States

Support complete, partially resolved, overflowed, expanding, expanded, and
contracted states as relevant. An unresolved member uses that person's Avatar
fallback without turning the entire group into a loading placeholder.

Empty is not a visible Avatar Group state. When no people exist, omit the group
or use explicit empty text appropriate to the containing experience. Hover,
focus, and active apply only to individually interactive avatars or the overflow
control.

## Behavior

Order people by a documented product rule and keep that order stable while the
group is visible. Do not reorder people based on image-loading completion.
Duplicate records resolve to one identity unless the product explicitly models
distinct memberships that must both remain visible.

The containing context sets a visible limit. People after that limit are replaced
by one summary such as `+3`. If the summary is interactive, its name communicates
the action and hidden count, such as “Show 3 more people.” Expanding reveals the
complete ordered set; it does not silently replace one subset with another.

The overlapping presentation is informational. When individual people require
distinct navigation or actions, use a non-overlapping row or list where each
wrapper has one destination or action, follows Link or Button behavior, and meets
`touch-target-min`.

## Responsive behavior

As inline space contracts, reduce the number of visible people before shrinking
below the selected Avatar size. Retain at least one visible identity plus the
overflow summary when the component remains useful; otherwise replace the visual
group with a concise text summary or an explicit participant-list control.

The group uses logical ordering and overlap direction. Right-to-left presentation
does not reverse the product-defined person order. At high zoom, use a
non-overlapping list or summary control when the compact group no longer fits.

## Accessibility

Expose the group purpose and every identity required to understand the current
context. Choose one non-duplicating model: individually named items or one group
summary associated with a complete textual list. Do not announce image alt text,
initials, tooltip text, and an adjacent name as four versions of the same person.

Static overlap is not conveyed as selection, ranking, or status unless the
product explicitly defines that meaning in text. An overflow control has a
complete name and visible focus. A tooltip may supplement a compact identity but
does not provide the only access to a required participant list.

High-contrast modes preserve avatar boundaries and the overflow control. Reduced
motion removes stacking or expansion animation without delaying access to names.

### Web adapter

Use list semantics when individual people are exposed as separate items. Use a
labelled group and a concise accessible summary when the entire visual stack is
one informational unit. Apply the Avatar image and fallback rules to every item.

An interactive overflow summary is a native button with an action-oriented name.
If it opens a Popover, expose the appropriate expanded and controlled
relationships and follow Popover focus and dismissal behavior.

## Example

A project card shows two small avatars followed by `+3`. The button is named
“Show 3 more project members” and opens a Popover listing all five people in the
same order. The card does not announce the two visible names twice.
