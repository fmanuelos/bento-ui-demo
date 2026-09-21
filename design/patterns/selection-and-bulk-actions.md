# Selection and bulk actions

## Intent

Selection and bulk actions help people choose records, understand the exact scope
of that choice, and apply one action to the intended set without confusing focus,
visibility, eligibility, or query membership with commitment.

## Use when

Use this pattern when people may select multiple records and compare, export,
move, update, archive, delete, or otherwise act on the selection as one task.
Apply it when selection persists across sorting, filtering, pagination, refresh,
or responsive transformation, or when one operation can produce different
outcomes for individual records.

Use explicit record selection for a known set of identities. Use whole-query
selection only when acting on every record matching one applied query is a real
product capability and its changing scope can be communicated safely.

## Do not use when

Do not use dataset selection for independent form choices, choosing one value,
switching views, or identifying current location. Checkbox groups, Radio groups,
Listboxes, Tabs, and navigation retain their own value and selection models.

Do not introduce multi-selection when each record requires a separate decision,
when eligibility cannot be determined or explained, or when individual outcomes
cannot be recovered. A visually highlighted, focused, expanded, active, or
recently opened record is not selected unless the workflow explicitly provides
selection.

Cell-range selection used only for grid navigation, editing, copying, or another
bounded spreadsheet-like interaction remains owned by the Data grid contract.
Apply this pattern when selected records leave that bounded interaction or become
the scope of a grouped operation.

## Participating components and related patterns

[`Checkbox`](../components/checkbox.md) may select individual records and expose
a visible-set summary. [`Data table`](../components/table.md) and
[`Data grid`](../components/data-grid.md) present selectable records while
retaining their distinct navigation models. [`Pagination`](../components/pagination.md)
changes the visible portion without owning selection.

Every square record-selection control uses the Checkbox contract's shared
unchecked, checked, indeterminate, focus, and disabled presentation. Components
retain their own semantics and focus behavior rather than inferring those from
the shared appearance.

[`Button Group`](../components/button-group.md) may arrange available bulk
actions. [`Alert dialog`](../components/alert-dialog.md) may confirm a
consequential operation. [`Progress`](../components/progress.md),
[`Alert`](../components/alert.md),
[`Toast and notification region`](../components/toast.md), and
[`Empty state`](../blocks/empty-state.md) may communicate operation status
and outcomes through their component contracts.

Apply [search, filtering, and results](search-filtering-and-results.md) to the
query that defines result membership, [data display](data-display.md) to record
meaning, [asynchronous feedback](async-feedback.md) to the operation, and
[destructive actions](destructive-actions.md) when the bulk outcome removes data,
access, or progress. Apply
[action hierarchy and emphasis](action-hierarchy-and-emphasis.md) to the visible
bulk commitment, alternatives, utilities, and recovery actions.

## States and sequence

A selection may contain none, some, all visible, or all matching records. It may
also contain explicit exclusions, hidden selections, or records that became
unavailable. A bulk workflow may proceed through unavailable, ready, reviewing,
committing, succeeded, partially succeeded, failed, outcome unknown, and undone
states.

- Focus identifies the element receiving input, an active cell belongs to a
  managed grid, and selection identifies committed records. Changing one does
  not imply changing the others unless a component contract explicitly couples
  them.
- Associate explicit selection with stable record identity rather than row
  position, display order, label, or current page index.
- An individual selection control names its record. A visible-set summary
  represents only the records currently rendered or loaded and exposes checked,
  unchecked, or mixed state accurately.
- A select-all control inside a table or grid selects or clears the visible or
  loaded set defined by that component. Selecting every matching record requires
  a separate, explicit action that names the complete query scope and count when
  known.
- Whole-query selection is bound to the exact applied query that established it.
  Changing search terms, filters, authorization scope, or other membership rules
  does not silently add newly matching records. Clear the selection or require an
  explicit decision for the new scope.
- Sorting never changes record selection. Pagination, filtering, refresh, and
  responsive transformation retain valid explicit selections even when some are
  not visible, and communicate the hidden selected count when it affects action
  scope.
- The available actions reflect the complete selection. When records have mixed
  eligibility, either limit the action to an explicitly described eligible set
  or block it and identify what must change; never silently skip ineligible
  records before commitment.
- Activating a bulk action creates an immutable operation snapshot containing
  the selected identities or query scope, exclusions, action, and required
  parameters. Later selection changes do not alter an operation already pending.
- One commitment creates at most one logical operation. Prevent duplicate
  activation while preserving the selected scope, action label, and progress.
- Success updates or removes only confirmed records. Partial success, failure,
  and an unknown outcome remain distinct and are reported per record or in an
  equally clear grouped account.

## Persistence, interruption, and recovery

Preserve valid explicit selections through sorting, pagination, refresh, and
temporary filtering. If selected records are outside the current view, retain an
understandable count and provide a route to clear or review the complete
selection when that capability exists.

When a record is removed, becomes unauthorized, or no longer belongs to the
applicable scope, remove or mark it unavailable and explain the changed selection
once. Do not transfer selection to the record that takes its visual position.
When the focused record disappears, continue at the nearest logical record or
collection control.

Selection is task state rather than a durable user preference by default. Do not
restore a previous selection into a later session or shareable location unless
the product can verify every identity, permission, query boundary, and resulting
action scope. Expired or unverifiable selections are cleared with an explanation.

After partial failure, preserve the failed or unknown subset and the operation
context needed for recovery. Retry only records known not to have completed. If
repetition could cause harm, verify current state before enabling retry. Undo is
offered only when every stated record can be restored as promised; otherwise
report the recoverable and permanent subsets separately.

## Content and localization

State the selected count, scope, and action in specific language, such as “12
projects selected” and “Archive 12 projects.” Distinguish “all 25 on this page”
from “all 4,286 matching projects.” When the total is estimated or unknown, do
not present an exact whole-query commitment.

Confirmation names the action, selection scope, affected record types, important
exceptions, consequence, and recovery model. Outcomes say what changed, what did
not, and what can safely happen next. Avoid labels such as “Process selected”
when the actual action can be named.

Counts, record names, dates, and units use locale-aware formatting and
pluralization. Labels and summaries support expansion, multiple writing systems,
and right-to-left presentation. Similar or long record names remain
distinguishable when individual outcomes are reported.

## Responsive behavior

Keep the selected count, scope, and essential bulk actions available when a table
or grid becomes horizontally scrollable, stacked records, or a detail view.
Actions may move into a labelled overflow control, drawer, sheet, or persistent
action region without changing selection or operation state.

A sticky bulk-action region must not cover focused rows, pagination, status,
errors, or recovery controls at zoom or with an on-screen keyboard. Actions stack
when labels do not fit; destructive and safe alternatives retain their semantic
hierarchy and reading order.

Selection controls remain comfortable touch targets and do not depend on row
hover. Presentation changes preserve stable record identity, selected state,
focus, query scope, and the route to clear selection.

## Accessibility

Every selection control exposes its record name and checked state. A summary
control exposes the scope it represents and an accurate checked or mixed state.
Selection remains distinguishable without relying on row color, checkmark shape,
position, or hover alone.

Tables retain ordinary page keyboard behavior; grids retain their managed cell
navigation. This pattern does not add a third keyboard model. Keyboard, touch,
pointer, and speech users can select records, understand hidden selections,
reach bulk actions, review scope, cancel, and recover.

Announce settled changes to the selected count and scope without repeating the
entire collection after every toggle. Opening a bulk action does not move focus
until its component contract or a required confirmation does so. After completion,
keep focus on the initiating action when it remains available; otherwise move to
the nearest logical continuation and announce the material outcome once.

High-contrast presentation preserves focus, checked or mixed state, selected-row
distinction, and action boundaries. Reduced motion removes action-region and row
transitions without delaying state changes or obscuring operation progress.

## Validation scenarios

Apply the shared matrix and the selection and bulk-operation checks in
[`Data management`](../VALIDATION.md#data-management) and
[`Destructive workflow`](../VALIDATION.md#destructive-workflow). Include 0, 1,
all visible, and many cross-page selections; a whole-query selection with exact
and unknown totals; exclusions; sorting and filtering; a changed query; removed
or newly unauthorized records; mixed eligibility; duplicate names; partial and
unknown outcomes; safe retry; duplicate activation; undo; 200% text; touch;
keyboard-only operation; high contrast; RTL; and responsive transformation
during selection and commitment.
