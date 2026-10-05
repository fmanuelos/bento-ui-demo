# Settings template

## Status

Draft. Personal preferences and organization configuration define the initial
scope. This draft supports explicit section-level saving. Autosave, live backend
conflicts, interactive references, and behavioral validation are not established.

## Intent

Help people review and change persistent preferences or configuration with clear
save boundaries, understandable consequences, and protection for unsaved work.

## Use when

Use for personal notification preferences and organization configuration when
both organize related values into named sections with an explicit save decision.
A single section can use the same contract without section navigation.

## Do not use when

Use [Registration](registration.md) for account creation and
[Account Recovery](account-recovery.md) for restoring access. Initial provisioning,
complex permission assignment, rich authoring, and irreversible multi-stage
operations need their own flows or templates. A general record view belongs to
[Record Detail](record-detail.md).

## Classification

- Primary mode: [Application Workspace](../experiences/application-workspace.md).
- Applicable candidate variants: Customer Portal; Admin Console.
- Domains: Account or Administration according to the consumer's principal capability.
- Audience: people authorized to read or change the affected settings scope.
- Excluded scope: autosave and bounded initial setup.

## Regions and hierarchy

1. Workspace navigation and [Page Header](../blocks/page-header.md) naming the settings scope.
2. Optional labelled section navigation for multiple meaningful sections.
3. Active section heading, consequences, and permission guidance.
4. [Form Section](../blocks/form-section.md) groups with current editable or read-only values.
5. Field errors and a submission error summary when applicable.
6. Section-specific save and discard actions followed by scoped outcome feedback.

Identify whether settings affect a person, organization, or resource before any
change. Each section is a separate save boundary; never imply that its Save
commits unsaved values in other sections.

## Participating contracts

Apply [Application Navigation](../blocks/application-navigation.md),
[Form Field](../components/form-field.md), [Input](../components/input.md),
[Select](../components/select.md), [Checkbox](../components/checkbox.md),
[Alert](../components/alert.md),
[Forms and validation](../patterns/forms-and-validation.md),
[Task continuity](../patterns/task-continuity.md), and
[Asynchronous feedback](../patterns/async-feedback.md). Use checkboxes for boolean values committed by Save.
[Switch](../components/switch.md) owns immediate persistent changes and is excluded
from this draft's deferred-save form.

## Actions and permissions

Save names or clearly inherits the section scope. Discard restores the last
confirmed values after resolving any meaningful-loss confirmation. Read-only
values must remain understandable without appearing editable. Recheck authority
and configuration version on save. Separate destructive operations from ordinary
preferences and apply [Destructive actions](../patterns/destructive-actions.md)
without folding them into an unrelated Save action.

## States, sequence, and continuity

Support loading, unchanged, edited, invalid, saving, saved, failed, conflicting,
unknown outcome, and lost access. Never show defaults as loaded values while
fetching. Disable duplicate commitment while saving and explain pending status.
Keep valid edits through recoverable failures. A conflict presents current and
entered values as permitted and offers reload or deliberate reconciliation;
never silently overwrite newer server values.

Switching section, changing settings scope, or leaving with meaningful edits
must offer a way to continue editing or deliberately discard. Preserve drafts
only within the consumer's retention policy; persistence across reload is not
implied. Cancelled exit restores focus and entered values. After access changes,
remove restricted values and retain only authorized work. Resolve an unknown save
through an authoritative read or status check before claiming success or retrying.

## Content and data requirements

Provide current values, labels, help, validation rules, allowed options,
configuration version, and consequences of a change. Distinguish inherited,
overridden, unavailable, and explicitly empty values where those concepts apply.
Sensitive values require product-defined masking and retention. Exercise long
labels, obsolete options, required dependencies, and partially unavailable sections.

## Responsive and localization behavior

Transform section navigation into a labelled compact navigation control when
needed; maintain location and dirty-state context. Keep labels, help, errors,
and save scope associated when actions stack. Support virtual keyboards, 200%
text, expanded translations, localized values, and RTL. Sticky actions must not
obscure focused controls or error messages.

## Accessibility

Use one page heading, labelled section navigation, named forms, and meaningful
fieldsets. Provide native control labels and associated errors. On invalid save,
focus an error summary or the first invalid field; error-summary links must work.
Announce confirmed save without forcing focus away from continuing work. Any
unsaved-work dialog follows its component's focus and dismissal contract. Support
keyboard, screen readers, visible focus, themes, forced colors, and reduced motion.

## Product instantiation

Supply settings scope, sections, current data, validation, versioning, permissions,
save endpoints, retention policy, and exit behavior. Specify which changes take
effect immediately after confirmed saving and which require another action.
Personal preferences and organization settings use the same save model; broader
approval or deployment semantics require an explicit separate boundary.

## Reference pages and validation

Plan personal-preference and organization-configuration references with multiple
sections, validation failure, failed saving with retained edits, conflicting
versions, dirty navigation, read-only access, and changed permissions. These
references are not implemented; autosave remains excluded.

Apply [Application Workspace](../verification/workflows.md#application-workspace),
[Form workflow](../verification/workflows.md#form-workflow),
[Template conformance](../verification/stress-tests.md#template-conformance), and
[baseline validation](../verification/baseline.md). Record actual tested states,
platforms, accessibility results, and remaining integration work.
