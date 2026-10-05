# Public Content template

## Status

Draft. Informational articles, static procedural guides, and policy pages share
the reading structure. Guide and versioned-policy references are implemented;
complete accessibility and publication-system validation remain outstanding. See
the [scope decision and implementation record](../verification/setup-status-content-evidence.md).

## Intent

Help visitors read, understand, and navigate a durable public information
resource with clear identity, hierarchy, provenance, and related destinations.

## Use when

Use for an informational article, a static procedural guide, and a policy page with a title, structured body,
applicable publication metadata, and supporting navigation. Short content may
omit a contents list and related resources without changing the reading outcome.

## Do not use when

Use [Product Landing](product-landing.md) to assess an offer and choose a
conversion action. A troubleshooting sequence with branching decisions,
authenticated record inspection, search results, or an interactive editor needs
a separate contract when its structure or state model materially differs.

## Classification

- Primary mode: [Public Site](../experiences/public-site.md).
- Applicable candidate variants: Information Site; Help Center; Marketing Site.
- Domains: assigned by the consumer's content purpose; publication alone does not determine the domain.
- Audience: visitors reading public information, including direct-link arrivals.
- Excluded scope: restricted workspace records and interactive task completion.

## Regions and hierarchy

1. [Public-site Navigation](../blocks/public-site-navigation.md) and a main-content bypass.
2. Optional parent navigation or breadcrumb when the hierarchy is meaningful.
3. [Page Header](../blocks/page-header.md) with title, introductory context, and applicable metadata.
4. Optional [Contents Navigation](../blocks/contents-navigation.md) linked to real section headings.
5. Structured article body with headings, paragraphs, lists, and applicable media or tables.
6. Optional [Related Content](../blocks/related-content.md) after primary reading content.
7. [Site Footer](../blocks/site-footer.md).

Metadata identifies authorship, ownership, publication, revision, or effective
status as applicable; do not manufacture a date or author to fill a region.
Contents navigation is useful only when it helps traverse substantive sections.

## Participating contracts

Apply [Breadcrumb](../components/breadcrumb.md), [Link](../components/link.md),
[Table](../components/table.md), [Back to Top](../components/back-to-top.md),
[Navigation shell](../patterns/navigation-shell.md),
[Responsive density](../patterns/responsive-density.md), and
[Asynchronous feedback](../patterns/async-feedback.md). Use disclosure only for
optional supporting material; essential instructions and qualifications remain
available in the primary reading sequence.

## Actions and permissions

Reading and navigation are primary. Name downloads with format and relevant size
or language information when available. Distinguish a document download from a
new page destination. Do not hide policy consequences behind optional actions.
The consumer owns which versions are public; a public shell must not expose a
restricted draft or cached private body after access changes.

## States, sequence, and continuity

Support loading, available, revised, archived, unavailable, and failed supporting
media. Distinguish an unavailable article from a successful empty body. A replaced
or archived version explains its status and links to an authoritative successor
when available. Do not silently display an older policy as the current version.

Preserve browser back behavior, meaningful scroll position, and stable section
anchors. An invalid anchor leaves the document usable. Loading media must not
move the reading position unexpectedly. Supporting-content failure must not erase
an available article. Offline copies, if supplied, identify their version and
freshness; offline availability is not required. Forms or acknowledgements introduce
commitment rules outside this read-only template.

## Content and data requirements

Supply a meaningful title, structured body, language, content owner, stable section
identifiers, and applicable version or effective-date information. Distinguish
original publication from later revision. Missing optional metadata is omitted;
missing essential content produces an understandable unavailable state.
Exercise long headings, nested lists, long URLs, wide data tables, missing media,
and articles with no related resources. Policy wording remains product-owned.

## Responsive and localization behavior

Use a readable measure for long-form text. Move optional contents navigation into
a labelled compact region while retaining working anchors. Wide tables scroll
within their own accessible boundary; images scale without losing meaning.
Support RTL, mixed-direction identifiers, localized dates, expanded text, 200%
text, and user text-spacing overrides. Keep headings visible below sticky navigation.

## Accessibility

Provide a main landmark and an article with one page heading and logical section
headings. Name contents and related navigation distinctly. Use descriptive link
text, meaningful alternatives for media, captions or transcripts as required,
and correctly associated table headers. In-page navigation exposes the target to
keyboard and assistive-technology users. Support a bypass, visible focus, zoom,
themes, forced colors, reduced motion, and keyboard access to downloads and links.

## Product instantiation

Supply routes, hierarchy, version and archive policy, authoritative content,
metadata, translation relationships, media alternatives, and related destinations.
Specify how moved pages and retired section anchors behave. Article and policy
uses share the reading structure; legal or acknowledgement workflows remain
consumer-owned and require an explicit separate commitment boundary.

## Reference pages and validation

Validate procedural guides and versioned policies. Both exercise
Contents Navigation, archived and unavailable content, and optional-media failure.
The guide omits optional publication metadata. Static prerequisites, instructions,
expected results, and support links preserve the reading outcome, so a separate
Help Article contract is not admitted. Branching troubleshooting or interactive
acknowledgement requires a separate review. Wide tables, real translations, and
publication-service integration remain outstanding.

Apply [Public content](../verification/workflows.md#public-content),
[Related content discovery](../verification/workflows.md#related-content-discovery)
when related resources participate,
[Template conformance](../verification/stress-tests.md#template-conformance), and
[baseline validation](../verification/baseline.md). Record actual reading,
anchor-navigation, responsive, localized, and accessibility results.

The technical-guide reference demonstrates
[Code Block](../components/code-block.md) with JSON configuration and HTTP request
examples. Copying is not execution. A denied-copy control exercises manual-copy
feedback; long lines scroll within their code region. See the
[input/content evidence](../verification/input-content-evidence.md).
