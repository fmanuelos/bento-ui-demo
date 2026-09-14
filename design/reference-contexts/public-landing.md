# Public landing page

**Mode:** Public Site  
**Primary audience:** A first-time or infrequent visitor deciding whether the
offering is relevant and trustworthy.

## Scenario and outcome

The fictional Northstar Workspace landing page introduces a collaborative project
service. A visitor should understand the offer, identify evidence that supports
it, explore details, and choose a next step without learning application
navigation.

Representative hero content:

- Eyebrow: “Northstar Workspace”
- Heading: “Plan complex work without losing sight of what matters”
- Summary: “Bring decisions, responsibilities, and progress into one shared view
  so your team can move with confidence.”
- Primary action: “Start a workspace”
- Supporting action: “See how it works”

The names and claims are test content rather than approved product copy.

## Template structure

1. Initial bypass route and public-site navigation.
2. Hero containing one primary action and one supporting route.
3. Credibility or outcome evidence presented as content, not decoration.
4. A small feature composition using cards or content sections.
5. Optional disclosure-based questions and answers.
6. Closing action area followed by footer navigation.
7. Optional back-to-top navigation for the resulting page length.

The structure preserves a meaningful reading order if columns collapse or media
is absent. The visual hero is not allowed to move navigation or proof ahead of the
content that gives either meaning.

## Participating system contracts

- Functional patterns: [navigation](../patterns/navigation-shell.md) and
  [responsive density](../patterns/responsive-density.md).
- Components: [Public-site navigation](../components/site-navigation.md),
  [Skip link](../components/skip-link.md), [Button](../components/button.md),
  [Card](../components/card.md), [Disclosure](../components/disclosure.md),
  [Accordion](../components/accordion.md), and
  [Back to top](../components/back-to-top.md).
- Perceptual patterns: spacious content rhythm, quiet neutral surfaces, decisive
  action emphasis, restrained depth, and direct, trustworthy voice.

## Required states and transitions

- Public navigation transforms between persistent and temporary presentations
  without changing destination names, order, or current-location meaning.
- Opening and closing temporary navigation preserves a predictable focus target
  and prevents background interaction only when the modal form is used.
- Action hover and active states never carry information unavailable to keyboard
  or touch users.
- A missing or failed hero image leaves the heading, summary, and actions complete;
  meaningful imagery has alternative text and decorative imagery is ignored.
- Expanded questions expose their relationships and remain operable after reflow.
- Back to top appears only for sufficient page length and moves focus to the named
  destination after activation.

## Context-specific stress conditions

- Replace the hero heading with a 90-character phrase and expand both action
  labels by 60%.
- Remove every optional image and test one portrait image in a landscape source
  slot without cropping essential meaning.
- Present three credibility statements with materially different lengths.
- Expand the question section to eight items with multi-paragraph answers.
- Place the primary action in loading and failed states when account creation is
  asynchronous; retain its label, context, and recovery.
- Test the inverse hero treatment in both active themes without borrowing
  mismatched light- or dark-theme tokens.

## Acceptance outcomes

- A visitor can explain the offer and identify the primary next step from the
  heading, summary, and actions without relying on imagery.
- There is no more than one primary action in a decision region.
- Navigation, headings, links, and actions retain a logical order at every width.
- Long or translated content wraps without clipping, overlap, or horizontal page
  scrolling.
- Brand emphasis, action emphasis, navigation selection, and status remain
  semantically distinct.
- The page remains calm and recognizable without hiding evidence or interaction.
