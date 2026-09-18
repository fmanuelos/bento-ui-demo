# Responsive density

## Intent

Responsive density adapts composition to available space, content, localization,
zoom, and input capability without shrinking essential text or targets or losing
the relationships needed to understand and operate a task.

## Use when

Apply this cross-cutting pattern whenever a component, composition, pattern, or
template must remain comprehensible and operable as space, content, text size,
writing direction, or input capability changes.

Use the system ranges for page padding, navigation shells, and major composition.
Use component or container fit for cards, forms, toolbars, tables, data grids,
and feature grids.

## Do not use when

Do not infer device type, user ability, or input method from viewport width. Do
not reduce text, targets, labels, or instructions merely to preserve a preferred
arrangement. Do not use a wide layout only to add more columns when the extra
space solves no documented comprehension or task problem.

## Participating components and related patterns

Every applicable component and experience pattern participates while retaining
its own semantics, state, focus, and content requirements. Navigation shell,
forms and validation, task continuity and unsaved work, asynchronous feedback,
destructive actions, and data display define the task information and controls
that a transformation must preserve.
[Action hierarchy and emphasis](action-hierarchy-and-emphasis.md) defines the
relative priority, order, and availability that action regions must retain.

Adapters may map system ranges and capability queries to platform mechanisms,
but they do not replace the fit and outcome rules defined here.

## States and sequence

Responsive presentation is derived from current constraints rather than treated
as a device identity or irreversible workflow state. A composition may remain in
one presentation, reflow, reorder visually, collapse optional detail, replace a
persistent region with a temporary one, or move work to a more suitable task
surface.

- Transform when content no longer fits or the task becomes difficult to
  understand or complete, not solely at a range boundary.
- Preserve meaningful reading and focus order across visual rearrangement.
- Preserve component semantics, current task state, and action consequences when
  presentation changes.
- Keep hover as an enhancement; all information and actions remain available
  through focus, activation, or persistent presentation.
- Compact controls are allowed only when target size, spacing, and available
  input methods remain appropriate.
- A capability change, such as connecting a pointer or opening an on-screen
  keyboard, must not reset content or move focus without a task reason.

## Persistence, interruption, and recovery

Preserve values, validation, query, selection, expanded state, progress, focus,
and useful scroll context through transformation. Moving content into or out of
an overlay does not create a second task, discard work, or duplicate an
operation.

When an exact focus target no longer exists in the new presentation, continue at
the equivalent control or nearest logical location. If optional content is
collapsed, preserve its state and provide an understandable route back to it.

## Content and localization

Allow labels, values, instructions, validation messages, status, and actions to
wrap. Support longer translations, locale-specific formats, multiple writing
systems, and right-to-left direction without clipping content or reversing
meaning.

Prioritize content by task importance rather than source-language length or
visual position. Directional icons mirror only when their meaning depends on
direction. Truncation may support scanning but never removes the only access to
essential content.

## Responsive behavior

The default page-composition ranges are:

- Mobile: below 40rem / 640px.
- Tablet: 40rem through below 64rem / 640–1023px.
- Desktop: 64rem through below 80rem / 1024–1279px.
- Wide: 80rem / 1280px and above.

These are layout ranges rather than device detection. Adapters may map them to
platform-specific capabilities while preserving the transformation rules.

Avoid simultaneous horizontal and vertical page scrolling. Contained
two-dimensional scrolling is acceptable when the content's meaning requires it
and the surrounding page still reflows. Toolbars expose essential actions before
moving lower-priority actions into an appropriate overflow control. Sticky
regions must not obscure focused content, headings, messages, or recovery actions
at zoom or while an on-screen keyboard is present.

Wide behavior must solve a documented layout problem, such as preserving a
secondary workspace panel or exposing additional essential data columns.

## Accessibility

Reading order, focus order, accessible names, roles, values, states, and
relationships remain equivalent across presentations. Visual rearrangement does
not create a misleading keyboard or assistive-technology sequence.

Support keyboard, touch, pointer, speech, 200% text enlargement, increased text
spacing, high contrast, reduced motion, and changes between available input
methods. Target size and spacing remain sufficient for the active presentation.
Focus stays visible and is not covered by sticky regions, overlays, or the
on-screen keyboard.

Responsive transitions are not the only indication that content moved or
changed. Reduced motion removes unnecessary spatial animation without delaying
the transformation or changing its outcome.

## Validation scenarios

Apply every dimension in the
[`baseline validation`](../VALIDATION.md#baseline-validation) to each
applicable workflow. Include the boundaries immediately above and below each
system range, content-driven transformation away from a range boundary, 200%
text, increased spacing, 60% label expansion, RTL, keyboard-only operation,
touch, pointer changes, an on-screen keyboard, high contrast, reduced motion,
sticky regions, and nested overflow.
