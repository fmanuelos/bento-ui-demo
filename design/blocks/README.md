# Block contracts

Blocks are shared compositions: local arrangements of components that solve one
part of a page or task without creating new component semantics. They are
normative extensions of the
[`composition model`](../../DESIGN.md#composition-model) and remain independent
of CSS methodology, UI framework, component library, and build system.

A block contract defines stable content relationships, hierarchy, layout
transformation, and accessibility outcomes. Its participating components retain
ownership of their semantics, interaction, state, and platform behavior.

## Relationship to the system

| Level              | Responsibility                                                                   |
| ------------------ | -------------------------------------------------------------------------------- |
| Foundation         | Shared semantic values and system-wide rules.                                    |
| Component          | One bounded semantic or interactive unit.                                        |
| Block              | One reusable local arrangement of components and content.                        |
| Experience pattern | A cross-component user outcome, state sequence, or recovery model.               |
| Template           | A [durable page- or flow-level structure](../templates/).                        |
| Reference page     | A design-system-owned template instance with representative and adverse content. |

A block may participate in an experience pattern, but it does not absorb that
pattern's state sequence or recovery behavior. Several blocks may appear in a
template, but a block does not prescribe the complete page structure.

## Contract maturity

| Status         | Meaning                                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Proposed**   | A recurring composition need and intended scope are recorded, but the contract has not been defined.                  |
| **Draft**      | The contract is being defined and may contain unresolved decisions or incomplete required sections.                   |
| **Complete**   | The contract is internally consistent, covers every required section, and is ready for implementation and validation. |
| **Deprecated** | A replacement and migration path are documented for an established deprecation window.                                |

Contract maturity does not indicate that a reusable implementation exists or
has passed product validation. Track implementation, adapter support, and test
evidence outside this technology-neutral inventory.

## Classifications

- **Shared** blocks retain the same purpose in Public Site and Application
  Workspace modes, while density and presentation may adapt.
- **Public Site** blocks support public-facing commercial, marketing, or
  informational content.
- **Application Workspace** blocks support authenticated, task-oriented,
  administrative, operational, or data-heavy work.

Classify a block by every mode in which its purpose and content relationships
remain valid. Do not label a block Shared merely because its visual treatment
could be reused in both modes.

## Current contracts

| Block                                 | Classification        | Status | Depends on                                                                                                                        | Validation coverage                                                                                                                                                                                                                                                                                     |
| ------------------------------------- | --------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Hero](hero.md)                       | Public Site           | Draft  | Button or Link; Button Group; Status Badge; Action hierarchy; Responsive density; Asynchronous feedback; Images and media         | [Public landing](../VALIDATION.md#public-landing), [Images and media](../VALIDATION.md#images-and-media), [Block composition](../VALIDATION.md#block-composition-and-reflow)                                                                                                                            |
| [Page Header](page-header.md)         | Shared                | Draft  | Breadcrumb; Status Badge; Button or Link; Button Group; Action hierarchy; Responsive density; Asynchronous feedback               | [Public content](../VALIDATION.md#public-content), [Dashboard overview](../VALIDATION.md#dashboard-overview), [Block composition](../VALIDATION.md#block-composition-and-reflow)                                                                                                                        |
| [Section Header](section-header.md)   | Shared                | Draft  | Button or Link; Button Group; Status Badge; Action hierarchy; Responsive density; Asynchronous feedback                           | [Public landing](../VALIDATION.md#public-landing), [Public content](../VALIDATION.md#public-content), [Dashboard overview](../VALIDATION.md#dashboard-overview), [Action hierarchy](../VALIDATION.md#action-hierarchy-and-emphasis), [Block composition](../VALIDATION.md#block-composition-and-reflow) |
| [Call to Action](call-to-action.md)   | Public Site           | Draft  | Button or Link; Button Group; Action hierarchy; Responsive density; Asynchronous feedback; Forms and validation; Images and media | [Public landing](../VALIDATION.md#public-landing), [Images and media](../VALIDATION.md#images-and-media), [Block composition](../VALIDATION.md#block-composition-and-reflow)                                                                                                                            |
| [Metric Overview](metric-overview.md) | Application Workspace | Draft  | Card; Status Badge; Alert; Empty State; Progress; Data display; Asynchronous feedback; Responsive density; Action hierarchy       | [Dashboard overview](../VALIDATION.md#dashboard-overview), [Data management](../VALIDATION.md#data-management), [Block composition](../VALIDATION.md#block-composition-and-reflow)                                                                                                                      |
| [Feature Grid](feature-grid.md)       | Public Site           | Draft  | Card; Button or Link; Button Group; Images and media; Responsive density; Action hierarchy; Asynchronous feedback                 | [Public landing](../VALIDATION.md#public-landing), [Images and media](../VALIDATION.md#images-and-media), [Action hierarchy](../VALIDATION.md#action-hierarchy-and-emphasis), [Block composition](../VALIDATION.md#block-composition-and-reflow)                                                        |
| [Site Footer](site-footer.md)         | Public Site           | Draft  | Link; Disclosure; Accordion; Site Navigation; Navigation shell; Responsive density; Asynchronous feedback                         | [Public landing](../VALIDATION.md#public-landing), [Public content](../VALIDATION.md#public-content), [Block composition](../VALIDATION.md#block-composition-and-reflow)                                                                                                                                |
| [Form Section](form-section.md)       | Shared                | Draft  | Form controls; Alert; Button Group; Forms and validation; Task continuity; Asynchronous feedback; Responsive density              | [Form workflow](../VALIDATION.md#form-workflow), [Action hierarchy](../VALIDATION.md#action-hierarchy-and-emphasis), [Block composition](../VALIDATION.md#block-composition-and-reflow)                                                                                                                 |
| [Results Toolbar](results-toolbar.md) | Application Workspace | Draft  | Form controls; Button Group; Table or Data Grid; Search and filtering; Data display; Selection; Asynchronous feedback             | [Data management](../VALIDATION.md#data-management), [Action hierarchy](../VALIDATION.md#action-hierarchy-and-emphasis), [Block composition](../VALIDATION.md#block-composition-and-reflow)                                                                                                             |

## Admission criteria

Add a shared block contract only when all of the following are true:

- The arrangement solves a recurring, named part of a page or task.
- Its purpose and essential content relationships remain stable across at least
  two representative uses.
- Existing foundations, components, and experience patterns do not already own
  the decision.
- Participating components can retain their existing semantics and behavior.
- The contract can state meaningful responsive, localization, accessibility,
  and adverse-content outcomes.
- The composition is smaller than a page or flow template and more durable than
  a product-specific arrangement.

Keep an arrangement in its consuming product or template when it has only one
known use. Extend an existing block when purpose and content relationships remain
stable. Add a variant only for a repeated presentation need; create a different
block when the user-facing purpose or required content relationship changes.

Do not create a block solely because several elements share a background, grid,
or visual style. Names describe purpose rather than shape, color, position, or
implementation. For example, prefer `Metric overview` to `Four-card row`.

## Required structure

Every block contract uses these headings in this order:

1. **Status** — State contract maturity and any known unresolved scope.
2. **Intent** — Define the composition's purpose and the outcome it supports.
3. **Use when** — Define applicable contexts and prerequisites.
4. **Do not use when** — Define explicit exclusions and direct readers to the
   appropriate component, block, pattern, template, or product-level solution.
5. **Anatomy** — Identify required and optional regions in meaningful reading
   order.
6. **Variants** — Define only stable presentation or composition differences;
   state that no variants are established when none are justified.
7. **Participating components and related patterns** — Link dependencies and
   preserve their existing ownership.
8. **Content requirements** — Define necessary hierarchy, labels, limits,
   metadata, media, and adverse-content behavior.
9. **Layout and semantic token mapping** — Use existing container, spacing,
   surface, type, and experience-mode roles without inventing block-specific
   values when a semantic role already exists.
10. **States and behavior** — Identify which conditions belong to the block and
    which remain owned by components, patterns, or the consuming product.
11. **Responsive and localization behavior** — Define reflow, wrapping, overflow,
    text expansion, writing direction, and content-priority outcomes.
12. **Accessibility** — Define heading, reading, focus, contrast, motion, media,
    touch, and assistive-technology outcomes applicable to the composition.
13. **Web adapter** — Use a level-three subsection under Accessibility to
    describe web mechanics required to preserve the technology-neutral contract.
14. **Representative example** — Use realistic content that demonstrates the
    intended hierarchy without becoming a product template.
15. **Validation scenarios** — Cover minimal, complete, boundary, missing,
    loading, localized, responsive, themed, and accessibility-relevant cases as
    applicable.

Keep the headings explicit even when a section is brief or states that no
variants or block-owned states apply. This consistency makes scope, exclusions,
ownership, and validation reviewable across the inventory. Update the status
when the normative scope materially changes.

## Ownership boundaries

| Concern                                                   | Normative owner                                                   |
| --------------------------------------------------------- | ----------------------------------------------------------------- |
| Shared values, modes, and principles                      | [`DESIGN.md`](../../DESIGN.md) foundations and system contract    |
| One bounded semantic or interactive unit                  | A contract in [`design/components/`](../components/)              |
| One reusable local arrangement                            | A block contract in this directory                                |
| One product-specific local arrangement                    | Its consuming product or template until reuse justifies promotion |
| Cross-component state, sequence, persistence, or recovery | An [experience pattern](../patterns/)                             |
| Page or flow structure                                    | A [template contract](../templates/)                              |
| Concrete representative content                           | A reference page                                                  |
| Platform mechanics                                        | An adapter in [`design/adapters/`](../adapters/)                  |
| Representative workflow checks                            | [`design/VALIDATION.md`](../VALIDATION.md)                        |

Blocks reference component and pattern contracts instead of copying their
keyboard commands, state machines, announcements, or platform semantics. When a
block needs behavior that no dependency owns, classify that behavior before
adding it: extend a component for a bounded unit, extend or add an experience
pattern for a coordinated outcome, or leave product-specific behavior with the
consumer.

## Definition of complete

A block contract is Complete when:

- Its purpose, applicable contexts, and exclusions distinguish it from existing
  blocks, components, patterns, and templates.
- Required and optional anatomy have a meaningful reading order.
- Variants preserve one purpose and do not conceal different semantics.
- Every participating component and experience pattern is linked and retains a
  clear responsibility.
- Content, missing-content behavior, responsive transformation, localization,
  and accessibility outcomes are explicit.
- Existing semantic tokens express the design, or a separate foundation change
  records why a new role is necessary.
- Representative validation covers normal, minimal, boundary, and adverse
  conditions in every supported experience mode.
- The contract and this inventory agree on name, classification, maturity,
  dependencies, and validation coverage.

Runtime examples may illustrate a block but do not redefine it. Passing lint,
build, or visual review does not by itself demonstrate contract or product
validation.
