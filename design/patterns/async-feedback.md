# Asynchronous feedback

## Intent

Asynchronous feedback explains what is happening, what completed, what failed,
and what the user can do next without creating unnecessary interruption.

## Contract

- Preserve usable content while a background refresh occurs.
- Use a local busy state for a local operation and a page-level state only when
  the entire task is unavailable.
- Prevent duplicate submissions while retaining the action label and context.
- Show determinate progress when reliable progress is available; otherwise use a
  non-determinate busy indication.
- Distinguish loading, empty, partial, stale, offline, permission-denied, and
  failed states.
- Completion feedback identifies the completed outcome. Error feedback provides a
  recovery action when one exists.
- Retry does not discard valid user input or reset unrelated state.
- Announce a meaningful change once. Routine background refreshes remain quiet
  unless they affect the current task.

## Focus and motion

Starting or completing an asynchronous operation does not move focus by default.
If focused content disappears, place focus at the nearest logical continuation.
Loading motion is not the only indication of activity and becomes static or
effectively immediate under a reduced-motion preference.
