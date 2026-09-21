# Icon system

## Status

Foundation contract complete.

## Intent

The Bento UI icon system provides a small, coherent set of interface glyphs for
actions, navigation, feedback, system controls, and familiar objects. Icons
support recognition and hierarchy; they do not replace essential labels,
component semantics, or product-specific illustration.

The icon system owns glyph geometry, names, sizes, directionality, visual style,
accessibility defaults, metadata, and lifecycle. Components continue to own
interaction, state, accessible names, target size, and semantic color.

## Boundary

An icon is a visual foundation, not an interactive control. It never accepts an
activation behavior or becomes focusable. Buttons, links, form controls, status
components, and navigation components own the behavior of any icon they contain.

Brand marks, product logos, flags, avatars, data visualizations, emoji, and
content illustrations are outside this system. Simple brand-adjacent decorative
symbols may be catalogued when they follow this contract and are not used as a
substitute for an official logo.

## Drawing model

- Author every glyph on a `24 × 24` coordinate grid.
- Keep essential geometry inside a two-unit safe area unless an optical
  correction requires a documented exception.
- Use a `1.8` unit stroke for interface outlines, with round caps and joins.
- Align related icons to consistent optical centers and apparent weight rather
  than forcing identical mathematical bounds.
- Minimize path count and remove editor metadata, embedded styles, masks, IDs,
  and transforms when an equivalent direct path is practical.
- Use outline treatment by default. Filled treatment is reserved for brand-like
  marks, simple status shapes, selection emphasis, or decorative emphasis.
- Do not mix outline and filled variants of the same concept without recording
  a distinct state or semantic purpose.

## Sizes

| API key | Display name | Rendered size | Use                                                                       |
| ------- | ------------ | ------------- | ------------------------------------------------------------------------- |
| `xs`    | Extra small  | 12px          | Non-interactive indicators, compact metadata, and exceptionally dense UI  |
| `sm`    | Small        | 16px          | Tiny and small controls, compact metadata, and dense utilities            |
| `md`    | Medium       | 20px          | Default controls, navigation, fields, and standalone interface use        |
| `lg`    | Large        | 24px          | Extra-large controls, prominent feedback, and spacious compositions       |
| `xl`    | Extra large  | 32px          | Prominent standalone emphasis, empty states, and compact feature callouts |

`md` is the standalone default. API keys are intentionally compact; documentation
and authoring tools show the corresponding display name and pixel value. The
containing component chooses the icon size when its own size determines the
mapping. Consumers do not scale interface icons to arbitrary values to create
hierarchy; use component emphasis, typography, and semantic color instead. `xs`
icons never serve as icon-only controls or sole status cues. `xl` icons remain
simple system glyphs; more detailed or larger pictorial treatment belongs to
illustration.

## Color and semantic tokens

Every glyph uses `currentColor`. An icon beside text inherits that text's
foreground. An icon inside a component inherits the component's semantic
foreground, including disabled and inverse states. Standalone neutral icons use
`text-primary`, `text-secondary`, or `text-tertiary` according to emphasis.

Semantic success, warning, danger, and information colors apply only when the
icon communicates that meaning. Color is never the only cue for a status or
action. The public icon API does not expose a separate color or stroke-width
property.

## Naming and catalog metadata

Name glyphs for their intended concept when that meaning is stable, such as
`Search`, `Close`, or `User`. Use a shape-qualified name such as `Info circle`
when the shape distinguishes it from another supported expression. Avoid
version numbers and drawing-oriented names.

Each catalog entry records:

1. A stable kebab-case identifier and exported PascalCase component name.
2. Category: action, feedback, navigation, object, or system.
3. Whether the glyph responds to writing direction.
4. Lifecycle status: Proposed, Stable, or Deprecated.
5. Search aliases and, when deprecated, its replacement.

Names and identifiers remain stable after release. A materially different
meaning receives a new icon. Deprecated icons remain available for a documented
migration window and identify their replacement.

## Directionality and localization

Use logical names such as `Start` and `End` when direction follows reading
order. These glyphs mirror automatically in right-to-left presentation. Physical
names such as `Up`, `Down`, `Left`, or `Right` describe a fixed spatial
direction and do not mirror unless their documented meaning requires it.

Do not mirror universal shapes, text-alignment-independent objects, status
symbols, checkmarks, close symbols, or media controls solely because the page is
right-to-left. A consumer must not add a second RTL transform to a catalogued
logical-direction icon.

## Accessibility

Icons are decorative by default and are excluded from the accessibility tree.
When a standalone icon communicates information not already present in adjacent
text, it exposes a concise text alternative and image role.

An icon inside a button, link, menu item, field, alert, badge, or other named
component remains decorative. The containing component owns one clear accessible
name and any state. Do not duplicate that name on the icon. Never rely on an
unexplained icon where a visible label is necessary for comprehension.

Icons never receive keyboard focus. Forced-color presentation may replace their
authored foreground with the inherited system color. Icons do not animate by
default; a containing component that rotates or transitions an icon must preserve
meaning without motion and disable nonessential motion under reduced-motion
preferences.

## Composition

Use one leading or trailing icon when it materially improves recognition. Avoid
decorative icon density, mixing multiple meanings in one control, or composing
new glyphs at the point of use. Request a reviewed system addition when no
catalogued icon communicates the intended concept.

The icon system does not define hit targets. Icon-only controls follow the
containing component's target-size and accessible-name requirements. Removing a
decorative icon must not remove meaning or leave structurally necessary empty
space.

## Web adapter

The React adapter renders a non-focusable SVG with a `0 0 24 24` view box and
maps Extra-small through Extra-large to the system's 12px, 16px, 20px, 24px, and
32px spacing roles.
Stroke icons set `fill="none"`, `stroke="currentColor"`, a `1.8` stroke width,
and round line caps and joins. Approved filled icons use `fill="currentColor"`
without an authored stroke.

The component is `aria-hidden` when no label is supplied. Supplying a label
creates a standalone `img` semantic with that accessible name. Product code
imports named icon components directly. A dynamic name-to-component registry is
reserved for documentation and authoring tools so application bundles can retain
static imports.

## Examples

A Search icon inside a button is decorative; the button has the accessible name
“Search”. An informative standalone Warning triangle beside no equivalent text
uses the label “Payment requires review”. A breadcrumb uses Chevron end, which
mirrors automatically in a right-to-left document. A Back to top link combines a
visible label with the Arrow up icon rather than exposing the icon alone.

## Validation

For every addition or geometry change:

1. Review the glyph at 12px, 16px, 20px, 24px, and 32px on light, dark, and
   inverse surfaces.
2. Compare optical weight, alignment, and bounds with adjacent catalogued icons.
3. Verify decorative and informative accessibility output.
4. Verify logical-direction icons in left-to-right and right-to-left contexts.
5. Verify inherited color, forced-color behavior, zoom, and reduced motion where
   a containing component animates the icon.
6. Add the icon to the typed catalog and documentation gallery.
7. Run the icon-system check so unmanaged inline interface SVG does not enter the
   application source.

## Size-key migration record

The size-key migration is complete. The React API uses only `xs`, `sm`, `md`,
`lg`, and `xl`; former long keys are not retained as aliases because the package
remains at `0.0.0` and every in-repository consumer migrated atomically.

The exported `iconSizes` object is the single source for each API key's display
name, pixel value, spacing-token class, and usage guidance. `IconSize` is derived
from its keys, `iconSizeKeys` provides stable documentation order, and the
documentation gallery reads the same metadata instead of duplicating labels or
values. The default changed from `medium` to `md` without changing its rendered
20px size.

`icons:check` enforces the five approved entries and their 12px, 16px, 20px,
24px, and 32px progression, rejects legacy long keys on owned icon components,
and verifies that the gallery consumes the shared metadata. Future size changes
must update this contract and metadata together and satisfy the validation above.
