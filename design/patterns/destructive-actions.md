# Destructive actions

## Intent

Destructive actions remove data, access, or progress. The pattern prevents
accidental loss and provides proportionate confirmation or recovery.

## Contract

- The action label names the outcome; color is supporting emphasis only.
- Prefer undo or a reversible soft-delete flow when practical.
- Require confirmation when the action is difficult to reverse, affects other
  people, has broad scope, or is easy to trigger accidentally.
- Confirmation identifies the object, scope, and consequence. Do not ask users to
  confirm routine reversible actions without a clear risk.
- Typed confirmation is reserved for exceptional, high-impact actions.
- A destructive action remains secondary to a safe alternative until the user
  reaches the final commitment step.
- Failure preserves the affected context and offers retry or recovery.
- Success moves focus to the nearest logical location if the initiating object was
  removed.

## Dialog use

When confirmation uses a modal dialog, backdrop activation must not discard the
decision or entered information. Cancel is always available. Initial focus favors
the safe action unless task evidence justifies another placement.
