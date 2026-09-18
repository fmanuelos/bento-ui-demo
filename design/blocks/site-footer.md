# Site Footer block

## Status

Draft until representative Public Site implementations validate navigation
grouping, legal and policy access, optional controls, responsive transformation,
and end-of-page landmark behavior.

## Intent

A Site Footer gives visitors a predictable end-of-page region for supporting
destinations, organizational identity, legal information, and durable site-wide
preferences. It composes several established controls and navigation groups
without becoming a second primary navigation system or a container for unrelated
content.

The block owns footer hierarchy, grouping, and reflow. Links, disclosures,
preference controls, and navigation behavior remain owned by their component and
pattern contracts.

## Use when

Use a Site Footer on a Public Site when visitors need persistent access to
supporting site destinations, legal or policy information, organizational
identity, or site-wide locale and preference controls at the end of pages.

## Do not use when

Do not use a Site Footer as the primary way to discover essential task
navigation, as an unbounded sitemap, or as a dumping ground for secondary
actions. Use [`Site Navigation`](../components/site-navigation.md) for primary
public navigation and the Navigation Shell for authenticated application
navigation.

Keep page-specific related content, form submission, status, and recovery near
the content or operation they affect. A promotional decision region belongs in
[`Call to Action`](call-to-action.md), even when it appears immediately before
the footer.

## Anatomy

1. Optional organizational identity and concise context
2. Required one or more named navigation groups
3. Optional site-wide preference or locale controls
4. Required legal identity or copyright statement
5. Required legal and policy destinations applicable to the site
6. Optional accessibility, contact, or support destination

The logical order remains identity, grouped supporting navigation, preferences,
then legal and support information. A product may place legal content visually
below or beside other regions, but source and reading order preserve the same
hierarchy.

## Variants

- **Standard:** Shows navigation groups simultaneously when they fit without
  excessive scanning or wrapping.
- **Disclosure:** Collapses navigation groups at constrained widths when each
  trigger remains named and the same destinations remain available.
- **Minimal:** Includes only identity, required policy destinations, and legal
  information for a narrowly scoped site with no durable supporting navigation.

The Disclosure variant is a responsive presentation of the same groups, not a
different information architecture. Minimal is valid only when omitted groups
do not exist; it must not hide available destinations to achieve a smaller
footer.

## Participating components and related patterns

Destinations follow [`Link`](../components/link.md). Collapsible groups follow
[`Disclosure`](../components/disclosure.md) or
[`Accordion`](../components/accordion.md) only when their coordinated behavior is
needed. Locale or preference controls use the appropriate Select, Button,
Popover, or other established component contract.

Apply [`Responsive density`](../patterns/responsive-density.md) to transformation,
[`Navigation shell`](../patterns/navigation-shell.md) only when the footer
participates in a broader navigation continuity decision, and
[`Asynchronous feedback`](../patterns/async-feedback.md) when changing a
preference requires remote work. The footer does not redefine any of those
behaviors.

## Content requirements

Group destinations by user-recognizable purpose and provide a concise visible
group name. Link labels identify their destination without relying on group
position. Avoid duplicate links unless they serve a documented, materially
different navigation context.

Identity content uses the current organization or site name. Legal and policy
labels use plain, accurate names and remain available wherever required. A year
range, ownership statement, company identifier, or jurisdictional notice follows
product and legal requirements rather than a visual template.

Preference controls state what they change. A language control names the current
language in that language when appropriate; region, currency, theme, privacy,
and accessibility preferences remain distinct concepts. Do not imply that a
preference is saved until durable completion is known.

Social destinations use visible or accessible service and purpose names. Icons
alone cannot carry an unfamiliar destination or legal meaning.

## Layout and semantic token mapping

Use Public Site container, page-padding, grid-gutter, and section spacing roles
from [`DESIGN.md`](../../DESIGN.md#public-site-mode). Use an existing neutral,
subtle, brand, or inverse surface with the corresponding text, link, border, and
focus roles. The selected surface must remain consistent with the footer's
supporting hierarchy.

Navigation groups use the shared layout grid when space permits and reflow from
their minimum useful widths. Legal and preference regions may use tighter
spacing but retain readable labels and adequate targets. Use boundaries or
spacing to distinguish regions; do not rely on color alone.

Do not introduce Site Footer-specific colors, widths, type scales, spacing,
shapes, or breakpoints when existing semantic roles express the hierarchy. A
full-width background retains content alignment with the page container.

## States and behavior

The Site Footer itself has no hover, active, selected, loading, success, or error
state. Links, disclosures, and controls own those states. A current-location link
may expose its component-defined state when the destination can meaningfully be
current.

A disclosure opens only its associated group and follows its component contract.
Responsive transformation must not silently reset a user's expanded state while
the same presentation remains active. When all groups become simultaneously
visible, obsolete disclosure controls disappear without duplicating links in the
reading or focus order.

Preference changes preserve the current page and communicate pending, success,
failure, or reload consequences proportionately. A failed preference change
retains the prior effective value and offers safe recovery.

## Responsive and localization behavior

Navigation groups reflow according to available content space. When simultaneous
groups become too narrow or create confusing multi-line columns, use the
Disclosure variant or a single-column arrangement before clipping or horizontal
scrolling occurs.

Source order remains identity, navigation, preferences, and legal information in
left-to-right and right-to-left presentation. Logical alignment and spacing
mirror with direction, while group priority and link order change only for a
documented localization reason.

Support long organization names, 60% label expansion, 200% text, multiple
writing systems, and locale-specific legal content. Labels and controls wrap
without overlap, and the footer does not impose a viewport-height or equal-column
constraint.

## Accessibility

Expose one content-information landmark for the page. Navigation groups have
unique accessible names, especially when another navigation landmark uses
similar destinations. Visible group headings and programmatic names agree.

Keyboard and reading order follow the logical hierarchy. Every link, disclosure,
and preference control has a visible focus indicator and adequate target. The
footer cannot be the only route to an essential task that precedes it by a long
document unless an earlier equivalent route exists.

Structure and destination meaning remain clear without column position, icons,
color, or expanded presentation. Supported surfaces preserve text, link,
boundary, and focus contrast in forced colors and high contrast. Reduced motion
removes disclosure and preference transitions without delaying state changes.

### Web adapter

Use one `footer` element for the page-level content-information landmark. Use
separately labelled `nav` elements for navigation groups or a single labelled
navigation landmark containing semantic lists when that creates a clearer
landmark model. Avoid many small navigation landmarks with indistinguishable
names.

Use native anchors for destinations and native controls for preferences and
disclosures. When responsive CSS can show and hide the same semantic content,
avoid rendering duplicate desktop and mobile navigation trees. If rendering
changes, ensure only one copy is exposed and focus does not remain in hidden
content.

## Representative example

A publishing service footer presents the Bento identity and a one-sentence
description, followed by named Product, Resources, and Company link groups. A
language control follows the groups. The final region contains the company name,
the current copyright year, Privacy, Terms, Accessibility, and Contact links.

On narrow screens the three link groups become disclosures in the same order.
The legal links remain directly visible. Changing language preserves the current
page when an equivalent localized destination exists and reports a failure
without changing the effective language.

## Validation scenarios

Validate the Site Footer with:

- Standard, Disclosure, and legitimately Minimal presentations
- One, several, and the supported maximum number of navigation groups
- Short and long group names, organization names, and policy labels
- Optional identity, preference, support, and social regions removed separately
- Duplicate destination review and current-location behavior where applicable
- Pending, successful, failed, and reload-requiring preference changes
- Transformations immediately before and after disclosure presentation begins
- 60% expansion, 200% text, multiple writing systems, RTL, and legal variations
- Keyboard, touch, speech, landmark navigation, forced colors, and reduced motion

Apply [`Public landing`](../VALIDATION.md#public-landing),
[`Public content`](../VALIDATION.md#public-content), and
[`Block composition and reflow`](../VALIDATION.md#block-composition-and-reflow).
The block is ready for shared use when supporting navigation, preferences, and
required legal information remain findable and operable without competing with
the page's primary purpose.
