# Action hierarchy and emphasis

## Intent

Action hierarchy and emphasis help people recognize the action or destination
that best advances the current decision while retaining clear access to
supporting, safe, recovery, and navigation choices. Prominence follows task
meaning rather than business preference, visual novelty, or component position.

## Use when

Apply this perceptual pattern when two or more actions share a decision region,
when actions in adjacent or nested regions could compete, or when responsive or
state changes could alter which action appears most important.

Common contexts include Public Site calls to action, forms, dialogs, empty
states, navigation, toolbars, selected-record actions, asynchronous recovery,
and persistent action areas. Define the decision region and its current user
outcome before choosing action variants, order, size, or placement.

## Do not use when

Do not use visual emphasis to change an action's semantics. Choose
[`Button`](../components/button.md) for an immediate action and
[`Link`](../components/link.md) for navigation before choosing their treatment.
Current location, selection, status, validation severity, and progress are not
primary actions.

An isolated action with no competing choice follows its component contract and
does not require a new local hierarchy. Do not manufacture alternatives merely
to make a region appear balanced. Do not use primary or destructive treatment to
increase conversion pressure, disguise a risky outcome, or make an unavailable
action appear possible.

## Participating components and related patterns

[`Button`](../components/button.md) owns activation, variants, sizes, and bounded
states. [`Button Group`](../components/button-group.md) owns the arrangement of a
small set of related independent actions. [`Link`](../components/link.md) retains
destination semantics even when it consumes a Button presentation.

[`Input Group`](../components/input-group.md),
[`Empty state`](../components/empty-state.md),
[`Public-site navigation`](../components/site-navigation.md),
[`Dialog and modal`](../components/modal.md), and
[`Alert dialog`](../components/alert-dialog.md) provide bounded regions in which
actions may participate. This pattern owns the priority relationships among
those actions and between nearby regions; it does not replace their anatomy,
state, focus, or interaction contracts.

Apply [forms and validation](forms-and-validation.md) to submission,
[task continuity and unsaved work](task-continuity.md) to save and discard,
[asynchronous feedback](async-feedback.md) to pending and recovery actions,
[destructive actions](destructive-actions.md) to consequential loss,
[selection and bulk actions](selection-and-bulk-actions.md) to record scope, and
[responsive density](responsive-density.md) when presentation transforms.

## States and sequence

Establish action hierarchy from the current decision and preserve it through
component states and workflow transitions.

1. Name the decision region and the outcome it supports.
2. Classify each control as the primary action, a supporting action, an
   alternative, a utility, navigation, or a destructive commitment.
3. Keep at most one primary action in that region. Use secondary, outline,
   ghost, or link treatment for supporting actions according to their relative
   importance and surrounding context.
4. Check nearby and nested regions together. Independent regions may each have a
   primary action, but containment, headings, spacing, and quieter nested
   treatment must make their scopes unambiguous.
5. Preserve the logical hierarchy while an action is hovered, focused, active,
   loading, disabled, expanded, or pressed. Component state does not silently
   promote a supporting action.
6. Re-evaluate the hierarchy only when the user's decision or available outcome
   materially changes, such as after successful commitment, a permission
   change, or entry into an explicit recovery state.

Primary means the most important appropriate route toward the current region's
outcome, not the first control in source order or the only visually saturated
element on a page.
A form or dialog normally places its commitment at the logical end of its action
group; a Public Site call-to-action group may place the main destination at the
logical start. Do not reverse source order to obtain either presentation.

A destructive action uses the destructive variant only when its outcome
involves removal or loss. Before final commitment it remains subordinate to the
safe path. At final commitment, destructive treatment identifies the focal risky
action without also applying primary styling; the safe alternative remains
available and initial focus normally favors safety.

Loading preserves the initiating action's label, location, and hierarchy while
preventing duplicate activation. If the primary action becomes unavailable,
retain enough context to identify the intended outcome and explain the reason or
recovery path. Do not promote Cancel, Close, or an unrelated supporting action
simply because the primary action is temporarily disabled or busy.

Error and empty regions may have a local primary recovery or creation action.
Its emphasis belongs to that contained condition and must not compete with a
higher-level commitment for the same task. When the condition resolves, remove
its actions without moving focus unexpectedly.

## Persistence, interruption, and recovery

Preserve action meaning, relative priority, source order, and availability when
a region reflows, moves into a suitable temporary surface, reloads, restores
work, or resumes after authentication. A temporary presentation change does not
create a second primary action or duplicate the underlying operation.

Save, draft, and discard actions retain the version and recovery meaning defined
by task continuity. Pending, failed, partial, and unknown outcomes retain the
operation meaning defined by asynchronous feedback. When an outcome may be
unknown, do not emphasize a retry that could duplicate a consequential action;
offer verification or another safe continuation first.

If successful commitment removes the initiating control or region, move focus to
the nearest logical continuation according to the owning workflow. If an action
becomes unavailable because permissions or prerequisites changed, preserve the
person's valid context and make the reason and next available step discoverable.

Avoid rendering duplicate controls for one operation in both the content and a
sticky action area. When persistence is necessary, move or transform one logical
action region while preserving state and focus order rather than creating
competing focus targets.

## Content and localization

Begin action labels with a specific verb and name the object or outcome when the
surrounding context does not make it unambiguous. Prefer “Publish report,” “Save
draft,” “Discard changes,” or “Try loading projects again” to “Yes,” “OK,”
“Submit,” or a generic “Continue.” Supporting actions must be distinguishable by
meaning, not only by visual treatment.

Labels, descriptions, counts, and object names support expansion,
pluralization, locale-aware formatting, and different writing directions.
Action priority does not depend on capitalization, punctuation, English word
order, a directional instruction, or an icon whose meaning is not shared across
locales. Do not replace an essential label with an unexplained icon when space
becomes constrained.

Promotional language may explain value but must not overstate urgency, hide
conditions, or make a supporting action visually louder than the current safe
commitment. Destructive and recovery labels describe the actual consequence or
scope.

## Responsive behavior

Preserve semantics, relative emphasis, source order, and access to every
essential action as available space, text size, language, or input capability
changes. A separated action group may wrap or stack according to the Button
Group contract. It never visually reverses its controls or changes which action
is primary merely to match a physical edge.

Keep commitment, cancellation when needed, safety, and recovery actions visible
or directly reachable. Lower-priority utilities may move into a clearly named
overflow control only when doing so does not hide the path required to complete,
understand, or recover the task. Do not move a destructive action into overflow
when concealment would make the remaining visible action misleading.

When adjacent regions stack, their headings, containment, and spacing continue
to identify which primary action belongs to which decision. Sticky action areas
must not obscure focused controls, validation, status, or content at 200% zoom
or while an on-screen keyboard is present.

## Accessibility

Communicate priority through specific labels, semantic controls, grouping,
document structure, and context in addition to color, size, contrast, or
position. Assistive-technology users must be able to determine each action's
purpose and region without needing a special “primary” announcement.

Keyboard and reading order follow the logical decision sequence and remain
stable across responsive presentations. Focus is visible on every variant and
does not move to the primary action merely because it is visually prominent.
Initial focus, containment, and restoration remain owned by the applicable
dialog or workflow contract.

Forced colors and high contrast preserve boundaries, focus, destructive
meaning, and relationships between alternatives. Touch targets remain distinct,
and label expansion does not create overlapping targets. Motion is never the
only indication that priority, availability, or action state changed; reduced
motion does not change the hierarchy.

## Validation scenarios

Apply the shared matrix and every check in
[`Action hierarchy`](../VALIDATION.md#action-hierarchy). Include Public Site,
form, dialog, empty, toolbar, destructive, loading, unavailable, failed, nested,
and responsive regions. Test more than one independent region on screen, removal
of optional actions, 60% label expansion, 200% text, right-to-left direction,
keyboard order, touch targets, forced colors, reduced motion, pending and unknown
outcomes, and a primary action that becomes unavailable.
