# Task continuity and unsaved work

## Intent

Task continuity preserves meaningful work and an understandable return path when
editing, saving, navigation, connectivity, authentication, or presentation is
interrupted. It communicates truthfully what is only entered, stored locally,
queued, durably saved, conflicted, committed, or discarded.

## Use when

Use this pattern when a task can outlive one uninterrupted interaction or when
losing entered work would be consequential. It applies to manual save, autosave,
drafts, offline edits, session expiry, navigation away, reload or closure,
conflicting remote changes, and restoration after interruption.

Define the continuity model before choosing feedback or storage behavior. State
what is preserved, where it is preserved, how long it remains available, who can
recover it, and which event makes it durable or committed.

## Do not use when

Do not add drafts, leave confirmation, or persistent save status to an immediate,
easily repeated action whose current state is already authoritative. Do not
retain sensitive values merely to avoid re-entry when storage, ownership,
expiration, or access cannot be made safe and understandable.

Do not use a transient toast as the only indication of unsaved work, failed
autosave, offline changes, or conflict. Do not label a value “saved” when it is
only present in the interface, held in temporary device storage, queued for
transmission, or accepted by a service that has not provided the product's
promised durability.

## Participating components and related patterns

Form controls collect and edit values through the
[`Form field`](../components/form-field.md) and their individual component
contracts. [`Button`](../components/button.md) and
[`Button Group`](../components/button-group.md) may provide Save, Save draft,
Discard, Cancel, or commitment actions. [`Alert`](../components/alert.md) may
present durable save failure or conflict; the
[`Toast and notification region`](../components/toast.md) may confirm a completed
non-critical save but does not own persistent continuity state.

[`Dialog and modal`](../components/modal.md),
[`Alert dialog`](../components/alert-dialog.md), and
[`Drawer and sheet`](../components/drawer.md) may contain editing or an explicit
leave decision. The [`Navigation shell`](../components/navigation.md) provides
destinations but does not decide whether work can be abandoned.

Apply [forms and validation](forms-and-validation.md) to entered values and
errors, [asynchronous feedback](async-feedback.md) to save operations,
[navigation shell](navigation-shell.md) to destination restoration,
[destructive actions](destructive-actions.md) to explicit discard, and
[responsive density](responsive-density.md) when the task surface transforms.
Apply [action hierarchy and emphasis](action-hierarchy-and-emphasis.md) to Save,
Save draft, final commitment, Cancel, Discard, and recovery relationships.

## States and sequence

A task may be unchanged, edited with unsaved work, saving, saved, save failed,
offline with pending work, conflicted, restored, expired, or discarded. Draft,
published, approved, submitted, and similar domain states remain distinct from
whether the current edits are durably saved.

- Define the authoritative saved version and compare edits against it. Reverting
  every meaningful change to that version removes the unsaved state without
  requiring a redundant save.
- A save operation owns one identifiable snapshot of the task. Edits made while
  that snapshot is pending remain unsaved after it succeeds and must not be
  concealed by a stale “Saved” result.
- Apply only the latest relevant save result to current status. A late success or
  failure for an older snapshot does not overwrite the status, errors, or values
  of a newer version.
- Manual save remains available when it is the promised commitment mechanism.
  Autosave follows a predictable trigger and never prevents continued entry
  unless conflicting edits would be unsafe.
- “Save draft” preserves work without implying publication, submission,
  approval, or another final commitment. A later commitment validates and acts
  on the intended saved version rather than an ambiguous mixture of versions.
- Save failure preserves the current values and identifies whether retry can use
  the same snapshot or must incorporate later edits.
- Offline behavior distinguishes unsaved values held only in the interface,
  recoverable device storage, queued synchronization, and remotely durable data.
  Moving between these states does not overstate durability.
- A conflict occurs when the current work and an authoritative newer version
  cannot both be accepted silently. Preserve both versions and require an
  understandable review, merge, replacement, or cancellation path.
- Discard is an explicit destructive transition that names which work will be
  lost. Cancel or close does not imply discard unless that consequence is stated
  before activation.

## Persistence, interruption, and recovery

Preserve valid values, validation context, the current section or step, focus
destination, and useful scroll context to the extent that the declared recovery
model safely supports them. Restoration returns to the same task identity and
does not submit, publish, or repeat another consequential operation.

Browser navigation, reload, window closure, application suspension, a changed
responsive presentation, and authentication expiry follow one documented leave
and recovery policy. Warn before leaving only when meaningful work would actually
be lost. If work is already durably saved or recoverable as promised, do not
present a false loss warning.

After authentication expiry, preserve work only in storage appropriate to its
sensitivity and ownership. Return to the intended task after successful
authentication, then verify that its permissions and authoritative version are
still valid before applying or committing recovered edits.

Recovered work is identified as recovered when its age, source, or divergence
matters. Show the last durable save and any newer pending edits without silently
combining incompatible versions. A recovery failure preserves any copy still
available and offers export or another safe continuation when the product can
support it.

Drafts have an explicit ownership, retention, expiration, and deletion model.
Expiration is communicated before work becomes unrecoverable when practical. Do
not restore another person's draft, a draft from an unauthorized account, or
values whose meaning cannot be migrated safely.

## Content and localization

Use status language that matches the actual state: “Unsaved changes,” “Saving,”
“Saved,” “Save failed,” “Offline—stored on this device,” “Waiting to sync,” or
“Conflict needs review.” Do not use “All changes saved” while a newer edit, failed
field, offline queue, or unresolved conflict remains.

Save, retry, discard, restore, replace, merge, and commitment actions name their
actual outcome. A leave decision names the task or changes that would be lost and
offers a safe continuation. Avoid making people infer the difference between
closing a surface and discarding its contents.

Dates and times identify the relevant event, such as last durable save or draft
expiration, and use locale-aware formatting. Status and action labels support
expansion, pluralization, multiple writing systems, and right-to-left
presentation. Do not rely on relative time alone when ambiguity would affect a
recovery decision.

## Responsive behavior

Save state, persistent errors, and the actions needed to continue or recover
remain visible or directly reachable when a task changes columns, moves between
page and overlay presentations, or adopts a denser layout. Transformation does
not create another draft, trigger a save, or reset the unsaved baseline.

Sticky save or action regions must not cover focused fields, validation,
conflicts, or recovery content at zoom or with an on-screen keyboard. Actions
stack without reversing their semantic or focus order. Long status text wraps
rather than collapsing to a color or unexplained icon.

If a dialog or drawer becomes a page, preserve the task identity, values,
continuity state, focus destination, and return location. A viewport change alone
does not close the task or invoke its leave policy.

## Accessibility

Expose save state and material transitions in text without relying on color,
animation, an icon, or disabled controls. Keep focus at the edited field or
initiating action during routine saving and restoration. Move focus only when a
conflict, leave decision, or recovery surface requires interaction, following
that component's focus contract.

Announce settled transitions such as save failure, durable save, offline queue,
conflict, and successful restoration once. Do not announce every keystroke,
autosave timer, intermediate request, or repeated “Saving” update. A visible
persistent status remains discoverable after its announcement.

Keyboard, touch, pointer, speech, and assistive-technology users can save, review
status, retry, restore, resolve conflicts, continue editing, or discard. Leave
confirmation never traps focus outside its decision surface. High-contrast
presentation preserves state and action distinctions; reduced motion removes
save and restoration transitions without delaying the underlying operation.

## Validation scenarios

Apply the shared matrix and the continuity checks in
[`Form workflow`](../VALIDATION.md#form-workflow),
[`Dashboard overview`](../VALIDATION.md#dashboard-overview), and
[`Destructive workflow`](../VALIDATION.md#destructive-workflow). Include manual
save, autosave, Save draft, edits during a pending save, late responses, failure
and retry, offline entry, device-only recovery, queued synchronization, reload,
Back and Forward, task closure, responsive transformation, session expiry,
permission change, simultaneous editing, remote conflict, restored and expired
drafts, sensitive fields, storage failure, discard, and final commitment after
recovery.
