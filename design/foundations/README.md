# Foundation contracts

Foundation contracts define system-owned visual and semantic rules that apply
across components, blocks, patterns, templates, and experience modes. Exact token
values remain in [`DESIGN.md`](../../DESIGN.md); a foundation contract exists when
a shared system needs governance or behavior beyond a token definition.

## Current contracts

| Foundation              | Status   | Owns                                                                                           |
| ----------------------- | -------- | ---------------------------------------------------------------------------------------------- |
| [Icon system](icons.md) | Complete | Glyph geometry, naming, sizes, directionality, accessibility defaults, metadata, and lifecycle |

Foundations do not absorb interaction or semantic behavior owned by components.
For example, the icon system owns a Close glyph, while Button owns activation,
focus, target size, and the accessible name of a close button.
