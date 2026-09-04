# Experience patterns

These patterns are normative extensions of [`DESIGN.md`](../../DESIGN.md). They
coordinate multiple components around a user outcome and remain independent of
CSS methodology, UI framework, component library, and build system.

| Pattern | Purpose |
| --- | --- |
| [Forms and validation](forms-and-validation.md) | Labels, requirements, validation, submission, and recovery |
| [Asynchronous feedback](async-feedback.md) | Loading, progress, completion, error, retry, and announcements |
| [Destructive actions](destructive-actions.md) | Prevention, confirmation, undo, and recovery |
| [Navigation shell](navigation-shell.md) | Persistent and temporary application navigation |
| [Data display](data-display.md) | Tables, grids, charts, empty states, and data freshness |
| [Responsive density](responsive-density.md) | Space-driven adaptation, input capability, reflow, and localization |

Platform mechanics belong in [`design/adapters/`](../adapters/). Runtime examples
may illustrate a pattern but do not redefine it.
