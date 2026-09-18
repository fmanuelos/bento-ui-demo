# Form Section block

## Status

Draft until representative Public Site and Application Workspace implementations
validate field grouping, section-level guidance, validation relationships,
progressive disclosure, and responsive action placement.

## Intent

A Form Section groups related fields and guidance under one meaningful heading
so a user can understand and complete one coherent part of a larger data-entry
task. It composes established field, message, and action components without
owning their validation, submission, persistence, or recovery behavior.

The block owns the local section hierarchy and arrangement. Individual form
controls own their bounded semantics, while the forms, continuity, and
asynchronous patterns own the complete task sequence.

## Use when

Use a Form Section when a form contains a meaningful group of related inputs
that benefits from a visible heading, optional explanation, and a stable
relationship to section-specific status or actions. Use multiple sections when
their headings help people scan, understand, or resume a longer form.

## Do not use when

Do not add a Form Section around a single self-explanatory field solely for
visual containment. Use a Form Field and its description for local guidance.
Do not use Form Sections as steps unless the task has a separately defined
multi-step sequence, navigation, persistence, and recovery model.

Form-level submission, cancellation, error summaries, unsaved-work warnings,
and final destructive commitment belong to the containing form and applicable
experience patterns. Do not repeat them in every section.

## Anatomy

1. Required section heading or native group legend
2. Optional concise section description
3. Optional section-level status, warning, or instruction
4. Required group of one or more related fields
5. Optional section-specific supporting action
6. Optional section-specific feedback or recovery adjacent to its scope

The logical order remains heading, description, status or instruction, fields in
task order, then section-specific actions and feedback. When a status must be
understood before a field can be completed, place it before that field in both
reading and visual order.

## Variants

- **Open:** Uses heading and spacing to distinguish a section within one form.
  This is the default.
- **Contained:** Uses an existing surface and boundary when the section must be
  distinguished from adjacent editable or read-only regions.
- **Repeatable:** Applies the same section contract to user-created peer groups,
  with explicit add and remove operations and a persistent identity for each
  group.

Variants preserve the same section purpose and field semantics. Repeatable does
not define collection limits, removal consequences, ordering, or persistence;
the consuming workflow must define those decisions.

## Participating components and related patterns

Fields follow the applicable contracts for
[`Input`](../components/input.md), [`Textarea`](../components/textarea.md),
[`Select`](../components/select.md), [`Checkbox`](../components/checkbox.md),
[`Radio`](../components/radio.md), [`Switch`](../components/switch.md), and other
controls. Closely related controls may use
[`Input Group`](../components/input-group.md) where its contract applies.
Section messages use [`Alert`](../components/alert.md), and related section
actions may use [`Button Group`](../components/button-group.md).

Apply [`Forms and validation`](../patterns/forms-and-validation.md) to field and
submission outcomes, [`Task continuity and unsaved work`](../patterns/task-continuity.md)
to persistence and interruption, [`Asynchronous feedback`](../patterns/async-feedback.md)
to remote work, [`Action hierarchy and emphasis`](../patterns/action-hierarchy-and-emphasis.md)
to actions, and [`Responsive density`](../patterns/responsive-density.md) to
reflow. The block does not copy their state machines.

## Content requirements

The heading names the shared subject of the fields, such as “Billing address” or
“Notification preferences.” The description explains section-wide context or
consequences and does not repeat individual field labels. Requirements remain
attached to the narrowest applicable scope: form-wide once, section-wide near
the section heading, and field-specific beside the field.

Every field retains a persistent visible label, required or optional indication,
format guidance, unit, and error relationship as required by its component and
the forms pattern. Placeholder text is not a label or the only example.

Section status and warnings name their scope and the safe next step. An action
label states its result, such as “Verify address” or “Add another contact.” A
section action must not appear to submit or save the complete form unless it
actually owns that complete operation.

For Repeatable sections, give each group a distinguishable visible identity.
Removal language names the group and explains meaningful loss before commitment.

## Layout and semantic token mapping

Use the applicable Public Site or Application Workspace container, readable-width, grid,
spacing, and density roles from [`DESIGN.md`](../../DESIGN.md). Keep labels,
guidance, controls, units, messages, and actions within a readable line length
and a visibly coherent section.

Use the shared layout grid for genuinely related side-by-side fields only when
each retains a useful width and their logical order is clear. Do not use columns
to imply a relationship that labels and grouping do not establish. Long or
high-risk inputs receive sufficient width rather than being forced into a
symmetrical grid.

Contained presentation uses existing surface, border, shape, and elevation
roles. Do not add Form Section-specific spacing, colors, field widths, or
breakpoints. Component states retain their semantic token mappings.

## States and behavior

The Form Section may expose a scoped ready, incomplete, validating, warning,
invalid, saving, saved, save-failed, unavailable, or permission-limited
condition only when that condition applies coherently to the section. It must
not infer a state by aggregating field color or replace field-level messages.

Validation preserves valid values and distinguishes a field problem from a
section-wide dependency or service failure. A section-level summary links or
moves predictably to affected controls only when the forms pattern requires it.
Do not announce every keystroke or duplicate the same error at several scopes.

Section-specific asynchronous actions prevent duplicate commitment while
preserving labels, values, and context. A stale response cannot overwrite newer
edits or mark them saved. Removing a Repeatable group follows the destructive
and continuity behavior appropriate to the actual loss.

Disabling or hiding a section must follow a declared business rule. Preserve or
clear previously entered values according to that rule and communicate the
effect before it causes meaningful loss.

## Responsive and localization behavior

Side-by-side fields stack before their labels, controls, descriptions, or errors
lose a useful width. Source order remains task order. Section actions wrap or
stack without reversing priority, and an on-screen keyboard does not obscure
the active field, its error, or the action needed to continue.

Headings, labels, guidance, values, units, messages, and actions support at least
60% expansion, 200% text, increased spacing, multiple writing systems, and
right-to-left direction without clipping. Use logical alignment; do not infer
field order from left and right terminology.

Locale-aware names, addresses, dates, numbers, and units follow product rules.
Do not impose one culture's name or address structure on every locale. Responsive
transformation must not remount controls, discard edits, or reset validation.

## Accessibility

Use native grouping and naming semantics appropriate to the controls. The
section heading or legend names the group without replacing individual labels.
Descriptions, requirements, units, warnings, and errors are programmatically
associated with the scope they describe.

Keyboard and reading order follow the task sequence. Focus does not move merely
because validation completes; on submission or an explicit review action,
follow the forms pattern for summaries and affected controls. Dynamically added
or removed Repeatable sections receive predictable focus without unexpectedly
moving past unresolved content.

Required, invalid, pending, saved, and unavailable conditions remain
understandable without color or icons. Focus indicators, control boundaries,
messages, and text retain contrast in all supported themes and forced colors.
Touch targets remain adequate, and reduced motion removes section transitions
without concealing changes.

### Web adapter

Use `fieldset` and `legend` when native form controls form one semantic group,
especially radio buttons or related checkboxes. Use a `section` associated with
a heading when broader form content and several independently grouped controls
share one topic. Do not use `fieldset` solely as a styling wrapper.

Preserve stable control identifiers, `label` associations, and description and
error references. Use live-region behavior only for settled messages that need
announcement. When adding or removing Repeatable sections, update labels and
group names without making position the only identity.

## Representative example

An account form contains a Form Section titled “Notification preferences” with
a description of how account and service messages differ. It contains a Switch
for product updates, a Checkbox group for digest topics, a Select for frequency,
and a section-specific “Send test notification” action. Final “Save changes” and
“Cancel” actions remain at form scope outside the section.

At narrow widths the fields and test action stack in task order. A failed test
notification appears beside that action without marking the preference fields
invalid, and changing layout does not discard unsaved selections.

## Validation scenarios

Validate the Form Section with:

- Open, contained, and Repeatable presentations
- One field, a typical group, and the supported field-count boundary
- Required, optional, read-only, dependent, and permission-limited fields
- Section-wide guidance, warnings, status, errors, and recovery
- Field validation plus section-level and form-level errors without duplication
- Pending, saved, failed, offline, stale-response, and conflict conditions
- Adding, naming, reordering where supported, and removing Repeatable groups
- Side-by-side fields immediately before and after they stack
- 60% expansion, 200% text, on-screen keyboard, locale variation, and RTL
- Keyboard, touch, speech, screen reader, forced colors, and reduced motion

Apply [`Form workflow`](../VALIDATION.md#form-workflow),
[`Action hierarchy`](../VALIDATION.md#action-hierarchy-and-emphasis), and
[`Block composition and reflow`](../VALIDATION.md#block-composition-and-reflow).
The block is ready for shared use when field grouping, requirements, messages,
edits, and section actions remain correctly scoped through validation, reflow,
interruption, and recovery.
