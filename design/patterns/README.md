# Experience patterns

These patterns are normative extensions of [`DESIGN.md`](../../DESIGN.md). They
coordinate multiple components around a user outcome and remain independent of
CSS methodology, UI framework, component library, and build system.

The [composition model](../../DESIGN.md#composition-model) connects foundations,
components, compositions, experience patterns, templates, and reference pages.
The [pattern language](../../DESIGN.md#pattern-language) distinguishes functional
patterns from perceptual patterns without separating them into independent
systems.

Reusable shared compositions are documented in the
[`block index`](../blocks/README.md). Product-specific arrangements remain with
their consuming template or product until reuse justifies promotion.

## Classifications

- **Functional patterns** coordinate components, content, state, and sequence so
  people can accomplish a recurring goal or recover from a meaningful change.
- **Perceptual patterns** coordinate emphasis, rhythm, containment, motion, and
  language so hierarchy and state remain recognizable across contexts.
- **Cross-cutting patterns** constrain several functional and perceptual patterns
  when a shared condition, such as available space or input capability, changes
  how their outcomes are preserved.

Classify a pattern by its primary responsibility. A classification does not
prevent the pattern from containing requirements from the other two perspectives.

| Pattern                                                           | Classification | Purpose                                                             |
| ----------------------------------------------------------------- | -------------- | ------------------------------------------------------------------- |
| [Forms and validation](forms-and-validation.md)                   | Functional     | Labels, requirements, validation, submission, and recovery          |
| [Task continuity and unsaved work](task-continuity.md)            | Functional     | Saving, drafts, interruption, restoration, conflicts, and discard   |
| [Asynchronous feedback](async-feedback.md)                        | Functional     | Loading, progress, completion, error, retry, and announcements      |
| [Destructive actions](destructive-actions.md)                     | Functional     | Prevention, confirmation, undo, and recovery                        |
| [Navigation shell](navigation-shell.md)                           | Functional     | Persistent and temporary application navigation                     |
| [Data display](data-display.md)                                   | Functional     | Tables, grids, charts, empty states, and data freshness             |
| [Search, filtering, and results](search-filtering-and-results.md) | Functional     | Query criteria, result context, refinement, and restoration         |
| [Selection and bulk actions](selection-and-bulk-actions.md)       | Functional     | Selection scope, group operations, partial outcomes, and recovery   |
| [Action hierarchy and emphasis](action-hierarchy-and-emphasis.md) | Perceptual     | Priority, safe commitment, supporting actions, and stable emphasis  |
| [Responsive density](responsive-density.md)                       | Cross-cutting  | Space-driven adaptation, input capability, reflow, and localization |

Responsive density changes perceptual rhythm to preserve functional
comprehension and operability. It therefore constrains every applicable pattern
instead of forming a separate visual system.

## Admission criteria

Create a named experience pattern only when a recurring problem introduces at
least one of the following:

- A distinct user outcome that several components must support together.
- A cross-component interaction or state sequence.
- A persistence, interruption, or recovery model not owned by one component.
- An accessibility outcome that depends on the complete workflow.
- A reusable composition rule whose meaning survives changes in page position,
  visual treatment, technology, and product-specific content.

Do not create an experience pattern solely because multiple pages look similar,
a component needs another visual variant, or one product needs a local
arrangement. Keep those decisions in the appropriate component, composition,
template, reference page, or product documentation until a reusable contract is
demonstrated.

Before adding a pattern, identify its related components and patterns, explain
why none of them already owns the outcome, and record explicit exclusions. Extend
an existing pattern when its purpose and behavior remain stable.

## Required structure

Every experience pattern uses the following structure. A section may be combined
with an adjacent section only when all of its required outcomes remain explicit.

1. **Intent** — State the recurring problem and intended user outcome.
2. **Use when** — Define applicable contexts, prerequisites, and triggers.
3. **Do not use when** — Define exclusions and direct readers to the appropriate
   alternative.
4. **Participating components and related patterns** — Name dependencies and
   preserve their existing semantic and behavioral ownership.
5. **States and sequence** — Define meaningful states, entry and exit conditions,
   transitions, and the order of consequential events.
6. **Persistence, interruption, and recovery** — Explain what survives change,
   how interrupted work resumes, and what people can safely do after failure or
   an unknown outcome.
7. **Content and localization** — Define necessary labels, instructions, status,
   consequences, wrapping, expansion, formatting, and writing-direction behavior.
8. **Responsive behavior** — Define transformations, overflow, input-capability
   considerations, and the information and actions that must remain available.
9. **Accessibility** — Define keyboard, screen-reader, touch, focus,
   high-contrast, reduced-motion, reading-order, and announcement outcomes.
10. **Validation scenarios** — Link to or state representative normal, boundary,
    interrupted, and adverse conditions that demonstrate the contract.

The perceptual relationships that communicate hierarchy and state belong in the
applicable sections without prescribing an implementation technology.

## Ownership boundaries

| Concern                          | Normative owner                                                                                                      |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Shared values and principles     | [`DESIGN.md`](../../DESIGN.md) foundations and system contract                                                       |
| One bounded semantic unit        | A contract in [`design/components/`](../components/)                                                                 |
| One reusable local arrangement   | A contract in [`design/blocks/`](../blocks/)                                                                         |
| One product-specific arrangement | Its consuming template or product until reuse justifies promotion                                                    |
| Cross-component user outcome     | An experience pattern in this directory                                                                              |
| Page or flow structure           | A [template contract](../templates/)                                                                                 |
| Concrete representative content  | A reference page                                                                                                     |
| Platform mechanics               | [`design/adapters/`](../adapters/)                                                                                   |
| Representative workflow checks   | [`design/VALIDATION.md`](../VALIDATION.md), which tests the normative contract without introducing new design intent |

Patterns reference component contracts instead of copying their anatomy,
individual keyboard commands, token mappings, or platform semantics. When a
requirement applies to several components only because they participate in one
workflow, the pattern owns the coordinated outcome and each component retains its
bounded behavior.

## Definition of complete

A pattern is complete when:

- Its intended outcome, applicable contexts, and exclusions are unambiguous.
- Every meaningful state has an entry, exit, and safe continuation or recovery.
- Required content, persistence, responsive transformation, and accessibility
  outcomes are explicit.
- Every normative requirement has a clear owner and is not contradicted or
  unnecessarily repeated by a linked contract.
- Platform-specific mechanics remain in adapters.
- Representative validation scenarios test the contract without becoming a new
  source of design intent.
- Links between the pattern, its dependencies, and its validation coverage work
  in both directions where that relationship aids discovery.

Runtime examples may illustrate a pattern but do not redefine it. A pattern's
documentation status does not prove that an implementation exists or has passed
product validation.
