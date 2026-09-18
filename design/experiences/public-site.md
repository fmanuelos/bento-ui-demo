# Public Site

## Status

Draft. This contract consolidates the current Public Site rules while experience
architecture and validation coverage are being expanded.

## Intent

Public Site supports public-facing, content-led experiences in which people need
to discover, understand, evaluate, or read information and identify a sensible
next step without first learning an application interface.

## Use when

Use Public Site when the primary outcome is orientation, comprehension, trust,
comparison, or navigation through public information. Common contexts include
marketing, product information, editorial content, documentation, public help,
policies, and service status.

## Do not use when

Use [Focused Flow](focused-flow.md) when the primary experience is one bounded
task whose unrelated choices should be reduced. Use
[Application Workspace](application-workspace.md) for recurring work across
authenticated destinations, records, operational tools, or data.

Authentication state alone does not prevent a content-led page from using Public
Site. A public visual style does not make an operational task a Public Site.

## Audience and outcomes

Visitors may be unfamiliar with the organization, subject, terminology, or
available destinations. They can:

- Understand the page purpose and source.
- Establish appropriate trust from accurate content and visible context.
- Find primary and supporting destinations.
- Read and compare without unnecessary application density.
- Enter a focused task or application workspace without losing destination
  meaning.

## Experience variants

Candidate variants include Marketing Site, Information Site, Help Center,
Documentation Site, and Status Site. These labels classify recurring contexts;
they do not introduce requirements beyond this parent contract until a dedicated
variant contract is approved.

## Navigation model

Use the [`Public-site navigation`](../components/site-navigation.md) contract for
global destinations. Keep identity and the primary destination or action
available when navigation transforms. Use Breadcrumb only for canonical
hierarchy, not click history. Long-form pages may add local in-page navigation
without replacing the global location model.

When a destination starts a Focused Flow or enters an Application Workspace, its
label communicates the destination or outcome. Preserve a predictable return or
exit path when the following experience requires one.

## Layout and density

Use page padding, readable content widths, and section spacing from
[`DESIGN.md`](../../DESIGN.md#public-site-mode). Public Sites are generally
spacious and content-led, but spacing must continue to express hierarchy rather
than decoration.

Full-width backgrounds may extend to the viewport while their content remains
aligned to the applicable container. Keep prose within a readable measure. Use
wider containers for mixed content, comparison, or media only when the content
benefits.

## Content hierarchy

Lead with the page purpose and information necessary for the next decision.
Headings reflect the semantic document outline independently of their visual type
role. Evidence, details, media, related destinations, and calls to action follow a
meaningful reading order that survives responsive reflow and missing optional
content.

Public content identifies material freshness, source, eligibility, pricing,
limitations, and consequences where applicable. Imagery never carries essential
instructions or claims without an equivalent.

## Action hierarchy

Apply [`Action hierarchy and emphasis`](../patterns/action-hierarchy-and-emphasis.md).
Keep at most one primary action in a decision region. Destination links retain
link semantics even when presented like buttons. Supporting actions remain
available without competing with the main content or conversion decision.

## Task continuity and states

Public content distinguishes loading, unavailable, restricted, stale, and failed
states when they affect meaning. Keep successfully loaded content usable when an
independent region fails.

When a public page contains meaningful input or launches an asynchronous action,
apply [`Forms and validation`](../patterns/forms-and-validation.md),
[`Asynchronous feedback`](../patterns/async-feedback.md), and
[`Task continuity and unsaved work`](../patterns/task-continuity.md) as
applicable. Do not discard valid input because navigation changes presentation.

## Templates, pages, and domains

Public Site templates define durable structures such as a landing page,
long-form content page, comparison page, or public status view. Product pages
supply real content, destinations, data, and domain language. A template may
serve several domains when its user outcome and behavior remain equivalent.

Marketing, Help & Support, Publishing, Analytics, or another domain does not
determine the mode by itself. Classify the page from its current user purpose.

## Responsive and localization behavior

Use a single-column content order by default. Introduce columns only when every
region retains useful width at increased text size and with expanded labels.
Navigation uses an accessible disclosure when destinations do not fit. Calls to
action wrap before they overflow, and media may simplify only when doing so does
not remove meaning.

Support bidirectional layout, locale-aware formats, longer translations, and
writing systems with different metrics. Do not use position, casing, or English
word order as the only source of meaning.

## Accessibility

Preserve a semantic document outline, meaningful reading and focus order,
descriptive destinations, visible focus, adequate target size, and a bypass route
past repeated regions. Content survives 200% text enlargement, increased text
spacing, high contrast, forced colors, reduced motion, and missing media.

Dynamic content announces material changes without repeatedly interrupting
reading. Sticky navigation and in-page destinations do not obscure focused
content. Decorative media remains excluded from the accessibility tree, while
informative and complex media provides an appropriate equivalent.

## Participating components and related patterns

Common dependencies include Public-site Navigation, Link, Button, Button Group,
Breadcrumb, Skip Link, Accordion, Alert, Card, and applicable media foundations.
Common blocks include Hero, Page Header, Section Header, Call to Action, Feature
Grid, and Site Footer.

Apply action hierarchy, responsive density, asynchronous feedback, forms and
validation, task continuity, and destructive actions when their conditions are
present. Each dependency retains its own semantic and behavioral ownership.

## Validation scenarios

Apply the shared baseline and relevant scenarios in
[`VALIDATION.md`](../VALIDATION.md), especially
[`Public landing`](../VALIDATION.md#public-landing),
[`Public content`](../VALIDATION.md#public-content),
[`Images and media`](../VALIDATION.md#images-and-media), and
[`Block composition and reflow`](../VALIDATION.md#block-composition-and-reflow).
Apply
[`Experience classification and mode transitions`](../VALIDATION.md#experience-classification-and-mode-transitions)
when a destination enters another mode.
Include direct entry, navigation transformation, long and missing content, failed
media, unavailable regions, 200% text, 60% expansion, RTL, theme changes, and
entry into a Focused Flow or Application Workspace.
