# Avatar

## Status

Contract complete for person images, initials, and generic fallbacks. Organization,
workspace, and product-logo avatars are not included.

## Intent

An avatar is a compact visual reference to a person. It supports recognition but
does not replace a visible name when identity is important to the task. An avatar
is non-interactive by default; navigation, selection, editing, or account actions
come from a separately named Link or Button.

Presence, availability, and workflow status are separate meanings. Do not attach
an unexplained colored dot or reuse the [`Status Badge`](status-badge.md) as part
of the base avatar.

Person images inherit the shared
[`Images and media`](../../DESIGN.md#images-and-media) foundation. This contract
adds identity-specific fallback, naming, sizing, and composition requirements.

## Anatomy and variants

1. Circular visual container
2. Person image or fallback content
3. Optional external visible identity text

- **Image:** Uses an approved person image and preserves a recognizable crop.
- **Initials fallback:** Uses stable, locale-aware initials derived from the
  displayed person name.
- **Generic fallback:** Uses a neutral person glyph when neither a usable image
  nor meaningful initials are available.

Only one image or fallback presentation appears at a time. Decorative badges,
editing affordances, and presence indicators are outside this contract.

## Sizes and semantic token mapping

| Size   | Dimension              | Typography | Use                                      |
| ------ | ---------------------- | ---------- | ---------------------------------------- |
| Small  | `control-height-tiny`  | `label-sm` | Dense lists, tables, and compact groups  |
| Medium | `control-height-small` | `label-md` | Default application and account context  |
| Large  | `control-height-large` | `label-lg` | Profile summaries and prominent identity |

The fallback uses the `avatar-fallback` frontmatter mapping:
`brand-background-subtle`, `brand-foreground`, and `rounded.shape-full`. Image and
fallback presentations share the selected size and circular boundary. The dark
theme uses the related `avatar-fallback-dark` color mapping.

Do not invent smaller avatars merely to fit more identities. Do not enlarge this
compact identity reference into profile photography or a decorative hero image.

## States

Support unresolved, image loading, image available, initials fallback, generic
fallback, and image unavailable states. Loading retains a stable fallback rather
than replacing identity with an unnamed spinner or skeleton placeholder. A
delayed or failed image does not repeatedly alternate between image and fallback.

Hover, focus, active, selected, disabled, and busy are not Avatar states. They
belong to an interactive wrapper or surrounding control. A restricted image uses
the same deterministic fallback without exposing the reason as visual noise.

## Behavior

Resolve content in this order: usable image, meaningful initials, then generic
fallback. Once shown in a stable view, fallback content does not change because
of an unrelated render or image retry. Retry an unavailable image only according
to the containing data-loading policy.

Initials follow the displayed name and the current locale rather than assuming
that every name has a Western given-name and family-name structure. Limit the
visible fallback to the shortest useful representation; the full identity
remains available in adjacent text or its accessible relationship.

When wrapped by a Link or Button, the wrapper owns hover, focus, activation,
availability, and its action-oriented name. The avatar does not create a nested
interactive target. The wrapper meets `touch-target-min` without overlapping an
adjacent action.

## Responsive behavior

Use only the supported sizes. Promote or demote between them when surrounding
density changes, but preserve the same person, fallback decision, and accessible
identity. Do not stretch, distort, or reduce an avatar below the small size.

The circular boundary remains intact at high zoom. Adjacent names wrap without
overlapping the avatar. Initials remain centered and readable in right-to-left
and vertical writing contexts; their character order follows the person's
localized display name.

## Accessibility

Expose a person's identity once. When an adjacent visible name already provides
the same identity, treat the avatar image or fallback as decorative. When the
avatar is the only identity representation, provide the person's displayed name
as its accessible alternative. Do not use “avatar,” “photo,” or “image” as the
only alternative text.

Initials and a generic glyph are visual fallbacks, not sufficient accessible
names by themselves. Color and photography are never the only way to distinguish
people when the task requires an exact choice. High-contrast modes retain the
circular boundary and fallback text. Avatar loading introduces no required
motion, and reduced-motion settings require no alternate behavior.

### Web adapter

Use an image with meaningful `alt` text only when the image supplies identity not
already expressed by adjacent content. Otherwise use an empty `alt` value for the
image and hide fallback glyphs from assistive technology. A text fallback may be
visually rendered while a separate accessible name supplies the full person name.
When the fallback alone conveys identity, its container may expose image semantics
named with that full person name; omit those semantics when it is decorative.

Use a native link or button outside the avatar when it opens a profile or account
action. Preserve the image's focal area with an appropriate crop without changing
its intrinsic proportions.

## Example

A project row shows a medium avatar beside “Morgan Lee.” The image has an empty
alternative because the adjacent text already identifies Morgan. If the image
fails, the same circle shows “ML” without changing the row's accessible name.
