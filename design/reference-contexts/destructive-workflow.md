# Destructive workflow

**Mode:** Dashboard or application  
**Primary audience:** A user removing data, access, or progress with consequences
that range from reversible to permanent.

## Scenario and outcome

The fictional project “Coastal service transition” supports two destructive
actions:

- **Archive project** removes it from active work but can be undone for 30 days.
- **Delete project permanently** removes project content and member access with no
  system-provided recovery.

A user should understand the object, scope, consequence, and recovery before the
final commitment. The system should prevent accidental loss without forcing the
same confirmation burden on every destructive action.

The 30-day period is fictional scenario data, not a Bento retention policy.

## Template structure

1. An originating project or settings context that identifies the object.
2. A clearly labelled destructive action separated from routine primary actions.
3. Proportionate confirmation only when the risk warrants interruption.
4. A final commitment area that preserves a visible safe alternative.
5. Busy, partial, success, and failure feedback tied to the operation.
6. Undo or recovery when the product can genuinely provide it.
7. A predictable destination and focus location when the originating object no
   longer exists.

## Participating system contracts

- Functional patterns: [destructive actions](../patterns/destructive-actions.md),
  [asynchronous feedback](../patterns/async-feedback.md), and
  [responsive density](../patterns/responsive-density.md).
- Components: [Button](../components/button.md),
  [Alert dialog](../components/alert-dialog.md),
  [Dialog](../components/modal.md), [Alert](../components/alert.md),
  [Progress](../components/progress.md), and [Toast](../components/toast.md).
- Perceptual patterns: danger as supporting semantic emphasis, explicit object and
  consequence language, stable safe-action placement, and restrained feedback.

## Required states and transitions

### Reversible archive

1. “Archive project” identifies the action and object from context; danger color
   does not carry the meaning alone.
2. Confirmation is omitted when undo is reliable and accidental activation is
   otherwise unlikely. If confirmation is needed because scope or collaborators
   increase risk, it names those consequences.
3. Busy state prevents duplicate activation without reporting completion.
4. Success removes the project from active results, announces the outcome once,
   and offers “Undo archive” for the actual recovery period.
5. Undo restores the project and the nearest useful context. Failure preserves or
   restores the prior state and offers retry when safe.

### Permanent deletion

1. Confirmation names the exact project, affected people or data, permanence, and
   any prerequisite export or handoff.
2. Initial focus favors the safe action. Typed confirmation is used only when
   evidence shows the exceptional impact warrants it.
3. The final label says “Delete project permanently,” not “Yes” or “Continue.”
4. Backdrop activation does not commit or silently discard entered confirmation.
5. Success moves focus to a logical surviving destination and announces removal.
   Failure keeps the dialog or affected context understandable and recoverable.

## Context-specific stress conditions

- Use two projects with similar names and one name longer than 100 characters.
- Test a user who lacks deletion permission but may archive, and a project whose
  policy prevents both actions.
- Lose the network before commitment, during the request, and after the server
  succeeds but before the client receives confirmation.
- Return partial success for a bulk archive in which one record is already
  archived, one succeeds, and one is denied.
- Expand all consequence text and action labels by 60% at 200% text enlargement
  in a narrow modal presentation.
- Test Escape, explicit cancel, backdrop interaction, browser navigation, and
  return focus without allowing an accidental commit.

## Acceptance outcomes

- The user can identify the action, object, scope, permanence, and recovery before
  commitment without relying on color.
- Reversible work receives less interruption than permanent or broad-scope loss.
- One activation creates at most one operation; ambiguous network outcomes do not
  encourage unsafe duplicate submission.
- Cancel remains available and visually distinct from the destructive commitment.
- Focus entry, containment, dismissal, restoration, and post-removal movement are
  predictable for keyboard and assistive-technology users.
- Partial and failed outcomes identify what changed, what did not, and what can be
  attempted next.
