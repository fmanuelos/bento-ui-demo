# Hero block

## Status

Example block contract. Draft until the shared block inventory, implementation,
and validation coverage are established.

## Intent

A Hero introduces the primary subject of a page or major page section and gives
people a clear next step when one is useful. It combines content, actions, and
optional media into a responsive composition without creating new semantics for
the components it contains.

Use a Hero when a page needs a prominent introduction that explains its purpose,
value, or current context. Do not use a Hero merely to make ordinary content
larger, to repeat page navigation, or to place promotional content ahead of a
more important task.

A Hero is a block-level composition, not a component. Its heading, copy, actions,
and media retain their existing semantic and behavioral ownership. Product data
loading, campaign targeting, form submission, and multi-step interaction belong
to the consuming product or an applicable experience pattern.

## Anatomy

1. Optional eyebrow, category, or genuine status label
2. Required heading
3. Optional supporting description
4. Optional action group with one primary and one secondary action
5. Optional media, illustration, or product preview
6. Optional supplemental context, such as a concise trust statement

The heading is the only required element. Omit optional regions rather than
leaving empty wrappers or placeholder content. The content order remains label,
heading, description, actions, supplemental context, and media in the logical
reading sequence, even when the visual layout places media beside the copy.

Do not create Heading or Description components solely to complete the anatomy.
Use the platform's native document structure unless a reusable component adds a
distinct semantic or behavioral contract.

## Variants

- **Split:** Places the content and media in adjacent regions when both retain a
  useful width. This is the default media-bearing presentation.
- **Centered:** Centers a bounded text region and optional actions. Use only when
  the content is brief and the next step remains unambiguous.
- **Text only:** Omits media and gives the content region the appropriate readable
  width. It must not reserve blank space for an absent asset.

Alignment and media presence are presentation variants, not different Hero
meanings. Add a new variant only when repeated use demonstrates a stable content
or layout requirement that the existing variants cannot preserve.

## Participating components and related patterns

Actions follow the [`Button`](../components/button.md) or
[`Link`](../components/link.md) contract according to whether they perform an
in-place action or navigate. Two adjacent actions may use
[`Button Group`](../components/button-group.md) when its grouping behavior is
appropriate.

Use [`Status badge`](../components/status-badge.md) only when the label communicates
a genuine status. A category, release label, or promotional eyebrow is ordinary
text unless another bounded component contract applies.

Apply [`Action hierarchy and emphasis`](../patterns/action-hierarchy-and-emphasis.md)
to the relationship between actions and
[`Responsive density`](../patterns/responsive-density.md) when the composition
transforms. Participating components retain ownership of their focus, loading,
disabled, pressed, and other interactive states.

## Content requirements

The heading names the page subject or communicates its primary value without
depending on the image. The description adds useful context and does not merely
repeat the heading. Keep both understandable when read outside the visual layout.

Use at most one primary action in the Hero decision region. A secondary action
must offer a distinct supporting route rather than duplicate the primary action.
Use specific labels that describe the destination or outcome. Do not use a Hero
to make an unrelated business objective compete with the page's primary task.

Supplemental context remains concise and subordinate to the description and
actions. Claims, prices, dates, and eligibility conditions must be accurate and
must not be hidden in media or fine print.

Media supports the message but is not the only source of essential information.
Decorative artwork may be removed at constrained sizes. Product screenshots and
other informative media need an equivalent text description when their meaning
is not already present in nearby copy.

## Layout and semantic token mapping

Use the Public Site container, page-padding, grid-gutter, readable-width, and
section-spacing roles defined in [`DESIGN.md`](../../DESIGN.md). A Hero may use a
full-width background while its content remains aligned to the page container.

Use semantic surface and text roles that preserve the selected experience mode.
Actions use their component token mappings. Do not introduce Hero-specific color,
spacing, type, or breakpoint values when an existing semantic role expresses the
same purpose.

The content region uses a readable line length. In a split layout, neither region
receives a fixed width that causes translated copy, enlarged text, or media to
clip. Media cropping preserves the subject and does not conceal embedded product
information.

## States and behavior

The Hero itself has no hover, pressed, selected, disabled, or loading state.
Those states belong to its participating components or media. Changing an action
state must not reflow the heading or move the action group unexpectedly.

If optional content is unavailable, omit that region and let the remaining
composition reflow. Do not show a broken-image placeholder, empty action group,
or skeleton indefinitely. When meaningful Hero content is loaded asynchronously,
follow the [`Asynchronous feedback`](../patterns/async-feedback.md) pattern and
reserve enough space to avoid disruptive movement.

A Hero does not become sticky and does not trap focus. Animations are optional,
decorative, and never delay access to the heading or actions. Do not autoplay
audio. Autoplaying video must be muted, nonessential, pausable when it continues,
and absent or static when reduced motion is requested.

## Responsive and localization behavior

Transform based on available space, content length, text size, writing direction,
and input capability rather than device labels alone.

The split variant becomes a single-column composition before either region loses
a useful width. Content precedes media in the logical reading order unless the
media is necessary to understand the content, in which case the authored order
must make that dependency clear. Do not use CSS visual reordering to contradict
the reading or focus order.

Actions wrap or stack without reversing their source order. The primary and
secondary actions remain distinguishable after transformation. Decorative media
may simplify or disappear; informative media remains available without requiring
horizontal page scrolling.

Headings, descriptions, labels, and action text wrap without clipping at 200%
zoom and with increased text spacing. Support substantial text expansion,
locale-aware values, and right-to-left direction. Mirror media only when its
meaning is directional and the localized asset is intentionally designed to
mirror.

## Accessibility

The Hero uses a meaningful heading at the level required by the containing page.
A page-leading Hero normally contains the page's `h1`; a Hero introducing a
major section uses the correct lower heading level. Styling does not determine
heading rank, and the block must not produce a second page heading by default.

The accessible reading order communicates label, heading, description, actions,
supplemental context, and informative media coherently. Action purpose is clear
from its label and context. Focus order follows the same logical sequence and
every interactive component retains its visible focus treatment.

Decorative images have no accessible name. Informative images have concise
alternative text that conveys their purpose without repeating nearby prose.
Complex screenshots or diagrams provide a longer adjacent explanation when a
short alternative cannot communicate the relevant information.

Text and controls retain required contrast across every supported background,
including media overlays. Do not depend on a gradient or an unpredictable part
of an image to provide contrast. High-contrast modes preserve content and action
boundaries. Reduced motion removes nonessential entrance, parallax, background
video, and media transitions without changing access to content.

### Web adapter

Use a `section` when the Hero introduces a distinct page region and associate it
with its heading. A page header may be appropriate when the Hero introduces the
document itself. Do not add a landmark role when native structure already
communicates the region or when another unnamed region would add navigation
noise.

Use native heading and paragraph elements. Use links for destinations and
buttons for in-place actions. Render images with meaningful `alt` text or
`alt=""` when decorative. Reserve intrinsic media dimensions or an aspect ratio
to reduce layout shift. Background images that carry information require an
equivalent accessible alternative in the document.

## Representative example

A product landing page uses a split Hero with:

- The eyebrow “Workflow automation” as ordinary text
- The `h1` “Make room for better work”
- A short description of the product outcome
- A primary “Start free” destination and secondary “View demo” destination
- A decorative product illustration that disappears on narrow layouts

When the translated heading and action labels expand, the content wraps and the
actions stack before the split layout becomes too narrow. The illustration moves
below the content and is ignored by assistive technology because it adds no
information beyond the copy.

## Validation scenarios

Validate the Hero with:

- Heading only, heading with description, and the complete anatomy
- No media, decorative media, informative media, missing media, and slow media
- No actions, one action, and two actions with long labels
- Short content and at least 60% text expansion
- Page-leading `h1` and section-level heading contexts
- Narrow and wide containers, 200% zoom, and increased text spacing
- Right-to-left direction and directional media
- Keyboard navigation, visible focus, and logical focus order
- Light, dark, forced-color, and high-contrast presentations
- Reduced motion and disabled autoplaying decorative motion

The block is ready for shared use when every supported variant preserves content
hierarchy, action meaning, readable order, and access without redefining its
participating components.
