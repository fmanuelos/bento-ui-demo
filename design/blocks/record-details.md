# Record Details block

## Status

Draft. The two representative uses below establish the intended shared scope;
rendered validation of missing values, permission changes, and local edit actions
remains outstanding. They are design examples, not implementation evidence.

## Intent

Record Details presents grouped facts about one existing record so a person can
inspect its attributes and find an appropriate local action. It owns the
relationship among the section heading, label-value groups, context, and actions.
The product owns record identity, authority, permissions, and editing behavior.

## Use when

Supported modes: Application Workspace.

Use in Application Workspace for customer profile details, support-case details,
or another record whose attributes need named groups and scoped actions. The
record must be identifiable from the containing page or the block heading.

## Do not use when

Use [Page Header](page-header.md) for page identity and page-wide actions,
[Form Section](form-section.md) for editable fields, and
[Review Summary](review-summary.md) for a pending commitment. Use a
[Table](../components/table.md) to compare several records. A single obvious
label-value pair needs no block wrapper.

## Anatomy

1. Required section heading identifying the group of record facts
2. Optional description, record context, status, or freshness
3. Required one or more groups of labelled values, with subgroup headings as needed
4. Optional fact-specific or group-specific actions beside their subjects
5. Optional scoped availability message or recovery

Reading order is heading, context, then each group and its values and actions.
Keep a value and its label together when the presentation changes.

## Variants

No variants are established. Inline and stacked label-value arrangements are
responsive presentations of the same relationships. Optional Card containment
does not change the contract.

## Participating components and related patterns

Use [Link](../components/link.md) for edit destinations,
[Button](../components/button.md) for in-place actions,
[Status Badge](../components/status-badge.md) for persistent record state,
[Alert](../components/alert.md) for scoped feedback, and
[Card](../components/card.md) only when a boundary improves comprehension.
Native description lists provide label-value semantics without a new component.

Apply [Data display](../patterns/data-display.md),
[Asynchronous feedback](../patterns/async-feedback.md),
[Task continuity](../patterns/task-continuity.md),
[Action hierarchy](../patterns/action-hierarchy-and-emphasis.md), and
[Responsive density](../patterns/responsive-density.md). These dependencies own
data state, recovery, navigation continuity, and action behavior.

## Content requirements

Use stable domain labels and complete, locale-aware values. Distinguish zero,
not provided, unknown, not applicable, restricted, and retrieval failure in text.
Do not expose a restricted value through a tooltip, accessible name, or stale
cached presentation. The product determines whether a restricted fact's existence
may be disclosed.

Identify an edit action's subject, such as “Edit contact details.” Avoid repeated
unqualified “Edit” links. Long addresses and identifiers remain fully available;
do not abbreviate essential values solely to align rows. Freshness describes the
displayed data, not merely when the page rendered.

## Layout and semantic token mapping

Use [Application Workspace](../../DESIGN.md#application-workspace-mode) container
and workspace-padding roles, shared group spacing, heading and body type, and
semantic text, surface, border, and focus roles. Keep value regions flexible and
allow labels to wrap. Use ordinary text roles for facts rather than large metric
typography. Introduce no Record Details-specific values or fixed label widths.

## States and behavior

The block reflects the owning data pattern's loading, current, refreshing, stale,
partial, unavailable, and failed states. Keep stable headings and known labels
while values load. Preserve safe usable values during refresh; never show a
placeholder as a fact. Place a retry beside the affected group when recovery is
available, preserving successful peers.

Local edits return to the same record context under the continuity pattern.
Refresh must not change the action's target or move focus. When access is revoked,
remove newly restricted data and resolve focus if its action disappears according
to the containing task's policy. A missing record is a page-level condition,
not an invented set of empty attributes.

## Responsive and localization behavior

Stack labels, values, and actions before any loses useful width. Multiple groups
may share columns only while source and reading order remain coherent. Support
60% text expansion, 200% text enlargement, increased spacing, multiple writing
systems, and right-to-left direction with logical spacing. Wrap long values
without altering their copyable content or hiding action labels.

## Accessibility

Associate the region and subgroups with native headings at the document's
required levels. Expose each label-value relationship independently of columns,
borders, and color. Actions have distinguishable names and visible focus.
Keep keyboard and reading order aligned, targets usable, and feedback scoped.
High contrast and forced colors preserve boundaries and focus; reduced motion
removes nonessential transitions without delaying data availability.

### Web adapter

Use a named `section` with native headings and `dl`, `dt`, and `dd` for facts.
Use anchors for edit destinations and buttons for in-place actions. A responsive
grid does not require table or grid roles. Isolate mixed-direction identifiers
when needed without changing the stored value. Do not make the entire facts
region a live region during refresh.

## Representative example

These two design examples share the same hierarchy:

- A customer profile has a “Contact details” section with Name, Email, and
  Address, freshness context, and “Edit contact details.” An absent optional
  address reads “Not provided.”
- A support case has a “Case details” section with Priority, Assigned team, and
  Opened date, plus “Change assigned team.” A failed team lookup keeps the other
  facts available and places recovery beside that value.

Neither example makes the block a complete record page or an inline editor.

## Validation scenarios

Validate both representative uses with minimum and complete anatomy, several
groups, removed optional regions, long values, duplicate labels in distinct
groups, all missing-value conditions, initial loading, stale data, partial
failure, out-of-order refresh, permission loss, and return from editing.

Apply [Record inspection and history](../verification/workflows.md#record-inspection-and-history),
[Block composition and reflow](../verification/stress-tests.md#block-composition-and-reflow),
and the [baseline](../verification/baseline.md) across light and dark themes,
keyboard, touch, screen readers, forced colors, reduced motion, expanded text,
and RTL. Record implementation evidence separately from contract maturity.
