# Completion Summary block

## Status

Draft. Review of receipt and partial-result scope remains open. A shared runtime
is available; validation evidence and limitations are recorded separately in the
[implementation record](../verification/focused-flow-evidence.md).

## Intent

Completion Summary explains a confirmed task outcome, its useful reference
information, and what can happen next. It owns the local relationship among
outcome, details, expectations, and actions. The product and asynchronous patterns
determine the authoritative outcome and whether the operation is complete.

## Use when

Supported modes: Focused Flow; Application Workspace.

Use in Focused Flow after a confirmed application submission and in Application
Workspace after a finished operation such as a data import. Classification is
Shared across those two modes. The result must be known and sufficiently durable
to support the displayed completion claim.

## Do not use when

Use [Progress](../components/progress.md) and
[Asynchronous feedback](../patterns/async-feedback.md) for ongoing or unknown
work, [Alert](../components/alert.md) or [Toast](../components/toast.md) for small
local feedback, and [Empty State](empty-state.md) for absent expected content.
Use [Review Summary](review-summary.md) before commitment. The block is not a
complete confirmation page or a promotional [Call to Action](call-to-action.md).

## Anatomy

1. Required heading stating the confirmed outcome
2. Required concise explanation of the completed scope
3. Optional reference, timestamp, receipt, or result details
4. Required next-step expectations when further work or waiting is necessary
5. Optional primary continuation and supporting receipt, result, or help actions

The reading order is outcome, scope, details, expectations, then actions. Omit
unnecessary optional regions. A next action is not required when the task is done
and no useful continuation exists.

## Variants

No variants are established. A terminal partial result needs explicit completed
and unsuccessful scope within the same anatomy; it must not be styled or worded
as unconditional success.

## Participating components and related patterns

Use [Link](../components/link.md), [Button](../components/button.md), and
[Button Group](../components/button-group.md) for continuation and utilities,
[Alert](../components/alert.md) for material qualifications, and
[Card](../components/card.md) only when containment is useful.

Apply [Asynchronous feedback](../patterns/async-feedback.md),
[Task continuity](../patterns/task-continuity.md),
[Data display](../patterns/data-display.md),
[Action hierarchy](../patterns/action-hierarchy-and-emphasis.md), and
[Responsive density](../patterns/responsive-density.md). Retry eligibility,
deduplication, navigation restoration, and result authority remain with the
owning product and patterns.

## Content requirements

Name exactly what completed. “Application received” must not imply approval;
“Import finished: 18 imported, 2 rejected” must not imply every record succeeded.
Reference identifiers, result counts, and timestamps come from the confirmed
operation, not generated placeholders or a browser clock assumption.

Explain the next responsible party, expected timing when known, and any user
action required. Distinguish an unknown timeframe from an invented promise.
Label destinations and downloads by purpose. Sensitive references and receipts
follow product access and retention rules. Do not require a transient toast or
email delivery to understand the outcome.

## Layout and semantic token mapping

Use [Focused Flow](../../DESIGN.md#focused-flow-mode) or
[Application Workspace](../../DESIGN.md#application-workspace-mode) containers,
padding, and spacing appropriate to the containing task. Use existing heading,
body, surface, text, feedback, and focus roles. A success icon or surface is
optional supporting emphasis and never the sole outcome indication. No new
completion-specific colors, widths, or type scales are needed.

## States and behavior

Show this block only when the authoritative outcome meets its completion claim.
A queued request or uncertain network response retains the owning workflow's
pending or unknown presentation. A confirmed receipt may complete a submission
task while clearly stating that processing or approval is still pending.

The confirmed outcome remains visible if an optional receipt download fails;
place recovery beside that utility. Refresh, Back, Forward, or direct entry must
not resubmit the operation. The product supplies a safe result retrieval and
access policy; if the result cannot be recovered, show an honest unavailable
condition instead of reconstructing a success claim. Partial results identify
which items can safely be retried under the owning pattern.

## Responsive and localization behavior

Keep the outcome, qualifiers, reference, and next steps in the same order as
regions stack. Wrap long identifiers without changing their copyable content.
Support 60% expansion, 200% text, increased spacing, localized dates and counts,
multiple writing systems, and RTL. Do not hide qualifications to keep an action
above the fold or constrain the summary to a fixed height.

## Accessibility

Expose a meaningful heading at the level required by the containing page or
task surface. State success, partial result, or remaining work in text independent
of color and icons. A completion transition follows the workflow's focus and
announcement policy; the block does not automatically both move focus and announce
the entire result. Preserve visible focus, target size, and reading order.
Forced colors and reduced motion retain the complete outcome without animation.

### Web adapter

Use native headings and paragraphs within a named section when appropriate.
Use a description list for reference details and `time` for an actual timestamp.
Use anchors for destinations and downloads, buttons for in-place operations.
Decorative success marks are hidden from assistive technology. A static page
loaded with a confirmed result does not need an automatic alert.

## Representative example

- A Focused Flow application receipt states “Application received,” shows its
  service reference, explains that review is pending, and offers a receipt link.
- An Application Workspace import result states “Import finished,” reports
  18 imported and 2 rejected records, and offers “View imported records” plus a
  rejection report. The import has ended, but the text never claims all records
  were accepted.

Both use outcome, scope, details, next expectations, and optional actions without
defining the whole result page.

## Validation scenarios

Test both modes with minimum and complete anatomy, no next action, long references,
confirmed receipt before processing, terminal partial results, unavailable
downloads, permission changes, reload, direct entry, and Back and Forward.
Verify pending and unknown operations never show an unearned completion claim.

Apply [Review and completion](../verification/workflows.md#review-and-completion),
[Focused Flow](../verification/workflows.md#focused-flow) when applicable,
[Block composition and reflow](../verification/stress-tests.md#block-composition-and-reflow),
and the [baseline](../verification/baseline.md), including both themes, RTL,
expanded text, keyboard, touch, screen readers, forced colors, and reduced motion.
