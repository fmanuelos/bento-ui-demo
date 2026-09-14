# Public content page

**Mode:** Public Site  
**Primary audience:** A visitor reading or locating detailed guidance, including
someone arriving at a deep link rather than through the landing page.

## Scenario and outcome

The fictional article “Move a project without interrupting your team” explains a
multi-step migration. A reader should identify the subject and freshness of the
guidance, navigate its structure, understand warnings and comparisons, and reach
related help without losing their place.

Representative metadata includes an updated date, an eight-minute reading-time
estimate, and the content owner “Workspace support.” The article contains five
heading levels, ordered steps, an informational callout, a warning, a comparison
table, code-style identifiers, links, and a disclosure-based question section.

## Template structure

1. Initial bypass route and public-site navigation.
2. Breadcrumb or equivalent location composition where the hierarchy requires it.
3. Article title, summary, owner, and freshness metadata.
4. Bounded readable column with semantic headings and in-page navigation when it
   materially shortens movement.
5. Inline alerts, lists, comparison data, and optional media in meaningful order.
6. Related guidance and footer navigation.
7. Optional back-to-top navigation for the long page.

## Participating system contracts

- Functional patterns: [navigation](../patterns/navigation-shell.md),
  [data display](../patterns/data-display.md), and
  [responsive density](../patterns/responsive-density.md).
- Components: [Public-site navigation](../components/site-navigation.md),
  [Skip link](../components/skip-link.md), [Alert](../components/alert.md),
  [Data table](../components/table.md), [Disclosure](../components/disclosure.md),
  [Accordion](../components/accordion.md), and
  [Back to top](../components/back-to-top.md).
- Perceptual patterns: readable measure, visible document hierarchy, restrained
  emphasis, content-led spacing, and direct instructional language.

## Required states and transitions

- The current location and article outline remain understandable without color.
- In-page navigation identifies its destination and does not obscure the focused
  heading behind sticky content.
- Alerts preserve severity, title, message, and action meaning in light, dark, and
  high-contrast presentation.
- A wide comparison table uses contained horizontal scrolling only when a stacked
  or prioritized presentation would destroy its relationships.
- Back-to-top activation returns visible and navigation focus to the named page
  destination.
- Removing optional media does not remove instructions, captions needed for
  understanding, or the sequence of the article.

## Context-specific stress conditions

- Use at least 8,000 words with repeated heading labels that remain uniquely
  addressable.
- Test a 120-character title, a two-line owner name, long link text, and valid
  identifiers that cannot break at arbitrary characters.
- Expand prose and navigation labels by 60%, enlarge text to 200%, and increase
  user text spacing together.
- Render the article in right-to-left direction while retaining correct number,
  code, table, and directional-icon behavior.
- Include a six-column comparison table, a missing optional image, and an alert
  whose recovery link wraps to multiple lines.
- Update the freshness metadata asynchronously without moving focus or announcing
  routine refresh more than once.

## Acceptance outcomes

- The document outline communicates structure independently of visual type roles.
- Reading measure, line height, and section spacing remain comfortable without
  hiding the relationship between headings and content.
- Every link describes its destination or action in context.
- Essential comparison data and alert meaning remain available without color,
  hover, imagery, or two-dimensional page scrolling.
- A reader can navigate into, through, and away from the article using keyboard or
  assistive-technology reading modes without losing place.
