# File Upload

## Status

Draft. Shared selection and per-file lifecycle are implemented with an
attachment-bearing service application and a gallery example. Production
transport and complete assistive-technology validation remain outstanding. See
the [implementation record](../verification/input-content-evidence.md).

## Intent

Let people select files, understand constraints, and manage upload outcomes without
confusing local selection, completed transfer, and application submission.

## Anatomy

1. Visible label, requirement, constraints, and destination or simulation context.
2. Native file-selection control.
3. Selected-file list with full name, size, status, and scoped rejection or error.
4. Upload/retry, cancellation, and removal actions named for their file.
5. Per-file progress while transferring and meaningful accessible feedback.

Follow [Form field](form-field.md), [Button](button.md),
[Progress](progress.md), [Forms and validation](../patterns/forms-and-validation.md),
and [Asynchronous feedback](../patterns/async-feedback.md).

## Variants and sizes

Single and multiple selection share one lifecycle. Use the containing field's
width and medium touch-friendly actions. Drag and drop, directory selection,
resumable chunks, previews, and remote file browsing are not implemented. File
selection must never require dragging.

## States

Support empty, selected, rejected, uploading, uploaded, failed, cancelled, removed,
disabled, and form-invalid states. Selected does not mean uploaded. Uploaded means
the transport supplied a receipt, not that the containing application was submitted
or approved. Rejection explains type, size, count, empty-file, or duplicate policy.
Rejected files cannot start uploading and remain removable. Cancellation retains
the local file for deliberate retry. Removal releases the local selection.

## Semantic token mapping

Reuse field surface, primary/secondary borders, heading/body text, feedback, group
spacing, and global focus tokens. Use Progress's roles for activity. Status words
and corrective messages remain meaningful without color; no upload-specific tokens
or frontmatter entries are needed.

## Behavior and transitions

Show allowed types, maximum bytes per file, and maximum count before selection.
Client checks provide guidance only: the server owns content inspection, authority,
storage, and acceptance. The runtime accepts configured extension/MIME pairs and
allows an absent MIME only when the extension matches. It rejects zero-byte files.
Duplicate guidance uses matching name, size, and modification time; it does not
prove byte-level identity. Accepted files consume capacity; rejected entries do not.

Selection appends entries without discarding valid peers. Clear the native selector
after handling selection so the same file can be selected again after removal.
Upload starts explicitly. Lock duplicate starts per file, retain valid selections
after failure, and give retry a new request identity. Abort cancellation/removal
and ignore all progress and outcomes from superseded, removed, or disposed requests.
Cancellation of local transfer does not prove the server rolled back stored data.

Use determinate progress only for measured bytes with a reliable total; otherwise
use indeterminate progress. Completion requires transport confirmation, not 100%
alone. Do not announce every progress update. The included simulator uses
indeterminate progress and never reads or transmits file contents.

The consumer owns remote deletion, detachment, orphan cleanup, retention, and
authorization. Explain whether Remove detaches or deletes before using it in a
real product. The reference removes only a local sample attachment. Keep controls
unavailable while the containing submission is committed or unresolved.

Files and upload receipts are not browser-draft data. The service reference saves
no file bytes, names, or receipts. Restoring a draft requires reselection/upload
before review and submission; never reconstruct a successful upload from metadata.

## Responsive and localization behavior

Wrap full filenames, constraints, actions, and rejection reasons. Isolate filenames
in mixed-direction text. Stack actions at narrow widths and support long names,
RTL, 200% text, expanded translations, and text spacing without page overflow.

## Accessibility

Associate requirement, constraints, and errors with the file control. Expose an
ordered reading sequence of each file and its controls, including textual status.
Use file-specific action names. Announce selection and meaningful outcomes once,
with rejection reasons available as text. Starting, cancelling, or removing an
entry deliberately returns focus to the selector so a disappearing action does
not lose focus. Background completion does not move focus. Support keyboard,
screen readers, touch, forced colors, themes, and reduced motion.

### Web adapter

Use native `input type="file"`, `accept`, and `multiple` as selection hints, with
a visible label and described constraints. `accept` is not security validation.
The composite's required state is exposed accessibly; the owning form validates
completed attachments rather than a cleared native input's file list. Use a semantic
list and named native buttons. AbortSignal and per-request identity guard the
adapter lifecycle. Keep File objects in memory, outside persisted draft payloads.

## Examples and validation

The service application requires at least one completed PDF or text upload, up to
two files of 2 MiB each. The gallery exposes success and failure simulations.
Test rejection, replacement after removal, duplicate metadata, count/size limits,
cancel/retry, late callbacks, unavailable transport, unmount, form submission,
draft restore, long names, and focus recovery. Apply
[Attachment and date entry](../verification/workflows.md#attachment-and-date-entry)
and the [baseline](../verification/baseline.md).
