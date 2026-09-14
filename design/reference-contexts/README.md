# Reference contexts

Reference contexts instantiate Bento UI templates with representative content,
normal states, and adverse conditions. They test whether foundations, components,
compositions, and experience patterns remain coherent when used together.

These documents are validation contracts, not fixed page designs. Their user
outcomes, state coverage, and acceptance criteria are normative for the context;
their sample names, organizations, metrics, and records are fictional test data
and are not approved product content. A screenshot or runtime implementation may
provide evidence but does not redefine the design system.

## Context index

| Reference context                               | Mode                     | Primary system concerns                                                |
| ----------------------------------------------- | ------------------------ | ---------------------------------------------------------------------- |
| [Public landing page](public-landing.md)        | Public Site              | Orientation, trust, content hierarchy, navigation, and calls to action |
| [Public content page](public-content.md)        | Public Site              | Long-form reading, navigation, deep structure, and resilient content   |
| [Dashboard overview](dashboard-overview.md)     | Dashboard                | Orientation, priority, summary data, freshness, and partial failure    |
| [Data management](data-management.md)           | Dashboard                | Comparison, filtering, selection, pagination, and bulk action          |
| [Form workflow](form-workflow.md)               | Dashboard or application | Entry, validation, submission, interruption, and recovery              |
| [Destructive workflow](destructive-workflow.md) | Dashboard or application | Risk communication, confirmation, undo, failure, and focus recovery    |

## Reference-context contract

Every context defines:

1. A scenario, intended audience, and user outcome.
2. A template structure that supplies page or flow context without fixing one
   visual layout.
3. Participating functional patterns, perceptual patterns, and component
   contracts.
4. Representative content concrete enough to expose hierarchy and language
   problems.
5. Required states, transitions, interruptions, and recovery paths.
6. Context-specific stress conditions in addition to the shared matrix below.
7. Observable acceptance outcomes that can be reviewed independently of the
   implementation technology.

## Shared validation matrix

Every implemented reference page is reviewed in the applicable combinations:

| Dimension         | Required coverage                                                                                                    |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| Available space   | Mobile, tablet, desktop, and wide defaults plus content-driven transformations between them                          |
| Input             | Keyboard, pointer, and touch; hover is enhancement only                                                              |
| Text              | 200% text enlargement, increased text spacing, long unbroken values where valid, and at least 60% label expansion    |
| Direction         | Left-to-right and right-to-left reading order; directional icons mirror only when their meaning depends on direction |
| Locale            | Locale-aware names, dates, times, numbers, units, and currency using at least two materially different formats       |
| Presentation      | Light, dark, inverse when used, high contrast or forced colors, and reduced motion                                   |
| Navigation        | Meaningful reading order, visible focus, bypass route, no keyboard trap, and predictable focus restoration           |
| State             | Relevant loading, empty, partial, stale, offline, permission, validation, success, and failure conditions            |
| Content integrity | No clipped essential text, inaccessible truncation, color-only meaning, or destructive loss of valid work            |

When a combination is not applicable, record why. Do not mark an entire dimension
inapplicable merely because the first implementation does not support it.

## Evidence and use

Evidence may include automated test output, keyboard and assistive-technology
notes, screenshots at named conditions, contrast results, localization samples,
or a recorded exception. Record the implementation and version being reviewed;
passing one implementation does not certify every adapter or consuming product.

Use a failed context to locate the responsible level in the
[composition model](../../DESIGN.md#composition-model). Correct a shared
foundation, component, or pattern when the failure recurs. Keep a solution in the
template or product when the need is genuinely contextual. Changes and exceptions
follow [`design/GOVERNANCE.md`](../GOVERNANCE.md).
