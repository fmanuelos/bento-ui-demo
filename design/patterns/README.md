# Experience patterns

These patterns are normative extensions of [`DESIGN.md`](../../DESIGN.md). They
coordinate multiple components around a user outcome and remain independent of
CSS methodology, UI framework, component library, and build system.

The [composition model](../../DESIGN.md#composition-model) connects foundations,
components, compositions, experience patterns, templates, and reference pages.
The [pattern language](../../DESIGN.md#pattern-language) distinguishes functional
patterns from perceptual patterns without separating them into independent
systems.

| Pattern                                         | Classification | Purpose                                                             |
| ----------------------------------------------- | -------------- | ------------------------------------------------------------------- |
| [Forms and validation](forms-and-validation.md) | Functional     | Labels, requirements, validation, submission, and recovery          |
| [Asynchronous feedback](async-feedback.md)      | Functional     | Loading, progress, completion, error, retry, and announcements      |
| [Destructive actions](destructive-actions.md)   | Functional     | Prevention, confirmation, undo, and recovery                        |
| [Navigation shell](navigation-shell.md)         | Functional     | Persistent and temporary application navigation                     |
| [Data display](data-display.md)                 | Functional     | Tables, grids, charts, empty states, and data freshness             |
| [Responsive density](responsive-density.md)     | Cross-cutting  | Space-driven adaptation, input capability, reflow, and localization |

Responsive density changes perceptual rhythm to preserve functional
comprehension and operability. It therefore constrains every applicable pattern
instead of forming a separate visual system.

## Pattern contract

Every experience pattern defines or makes directly recoverable from its linked
contracts:

1. The recurring problem and intended user outcome.
2. Applicable contexts, triggers, exclusions, and participating components.
3. Meaningful states, sequence, persistence, interruption, and recovery.
4. Content, responsive, overflow, and localization behavior.
5. Keyboard, screen-reader, touch, high-contrast, and reduced-motion outcomes.
6. The perceptual relationships that communicate hierarchy and state without
   prescribing an implementation technology.

A pattern may combine these concerns under broader headings when the requirements
remain unambiguous. [Reference contexts](../reference-contexts/) provide concrete
examples and adverse conditions; they validate a pattern but do not redefine it.

Platform mechanics belong in [`design/adapters/`](../adapters/). Runtime examples
may illustrate a pattern but do not redefine it.
