# Component contracts

Component files define behavior and accessibility that cannot be represented in
DESIGN.md frontmatter. These contracts are normative and independent of CSS
methodology, UI framework, component library, and build system. A frontmatter
entry or runtime component does not by itself prove conformance.

## Contract maturity

| Status         | Meaning                                                                                                          |
| -------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Proposed**   | A system need and intended scope are recorded, but normative behavior is not yet defined.                        |
| **Draft**      | The contract is being defined and may contain unresolved decisions or incomplete required sections.              |
| **Complete**   | Every required section is normative, internally consistent, and ready for implementation and conformance review. |
| **Deprecated** | A replacement and migration path are documented for an established deprecation window.                           |

Contract maturity does not indicate that a reusable implementation exists or has
passed conformance review. Track implementation, platform support, and test
status outside this technology-neutral contract index.

## Current contracts

| Component or foundation                            | DESIGN.md coverage                | Contract status | Depends on                             |
| -------------------------------------------------- | --------------------------------- | --------------- | -------------------------------------- |
| [Form field](form-field.md)                        | Shared prose and semantic roles   | Complete        | Forms-and-validation pattern           |
| [Overlay foundation](overlay.md)                   | Shared prose and dropdown style   | Complete        | Elevation and shared state model       |
| [Progress indicators and spinner](progress.md)     | Shared prose and async pattern    | Complete        | Asynchronous-feedback pattern          |
| [Empty state](empty-state.md)                      | Shared prose and data pattern     | Complete        | Data display, asynchronous feedback    |
| [Tooltip](tooltip.md)                              | Shared prose and layer ordering   | Complete        | Overlay                                |
| [Alert dialog](alert-dialog.md)                    | Shared prose and risk pattern     | Complete        | Dialog, Button, destructive actions    |
| [Disclosure](disclosure.md)                        | Shared prose and popup taxonomy   | Complete        | Overlay only when visually layered     |
| [Pagination](pagination.md)                        | Shared prose and data pattern     | Complete        | Collection model, async feedback       |
| [Popover](popover.md)                              | Shared prose and layer ordering   | Complete        | Overlay                                |
| [Toast and notification region](toast.md)          | Shared prose and async pattern    | Complete        | Alert, progress, async feedback        |
| [Drawer and sheet](drawer.md)                      | Shared prose and dialog family    | Complete        | Dialog                                 |
| [Public-site navigation](site-navigation.md)       | Shared prose and Public Site mode | Complete        | Disclosure, Dialog when modal          |
| [Button](button.md)                                | Frontmatter and prose             | Complete        | Shared state model                     |
| [Text field](input.md)                             | Frontmatter and prose             | Complete        | Form field                             |
| [Textarea](textarea.md)                            | Prose and contract                | Complete        | Form field, text field                 |
| [Select](select.md)                                | Prose and contract                | Complete        | Form field                             |
| [Listbox](listbox.md)                              | Prose and contract                | Complete        | Overlay when popup, collection model   |
| [Combobox](combobox.md)                            | Prose and contract                | Complete        | Form field, overlay, collection model  |
| [Checkbox](checkbox.md)                            | Prose and contract                | Complete        | Form field                             |
| [Radio group](radio.md)                            | Prose and contract                | Complete        | Form field, collection model           |
| [Switch](switch.md)                                | Prose and contract                | Complete        | Form field, asynchronous feedback      |
| [Dialog and modal](modal.md)                       | Frontmatter and prose             | Complete        | Shared state and destructive actions   |
| [Tabs](tabs.md)                                    | Frontmatter and prose             | Complete        | Collection model                       |
| [Data table](table.md)                             | Frontmatter and prose             | Complete        | Data-display pattern                   |
| [Data grid](data-grid.md)                          | Prose and contract                | Complete        | Collection model, data-display pattern |
| [Status badge](status-badge.md)                    | Frontmatter and prose             | Complete        | Shared state model                     |
| [Alert](alert.md)                                  | Frontmatter and prose             | Complete        | Asynchronous-feedback pattern          |
| [Popup surface and dropdown patterns](dropdown.md) | Frontmatter and prose             | Complete        | Overlay, collection model              |
| [Navigation shell](navigation.md)                  | Frontmatter and prose             | Complete        | Dialog when modal, navigation pattern  |
| [Card](card.md)                                    | Frontmatter and prose             | Complete        | Data-display pattern when data-bearing |

## Proposed contracts

No additional component contract is currently scheduled. Avatar and Avatar
Group, Container, Accordion, and richer interactive-card variants remain deferred
until product requirements establish behavior that is not already covered by the
current contracts.

Add a proposed file only when work begins on its normative contract. Move it to
Draft until every required section and dependency is resolved; move it to
Complete only after the contract and index agree.

## Required sections

Every specification includes:

1. Status and intent.
2. Anatomy.
3. Variants and sizes, when relevant.
4. Supported, unsupported, and non-applicable states.
5. Semantic token mapping.
6. Behavior, events, transitions, and state precedence.
7. Responsive, overflow, and localization behavior.
8. Accessibility outcomes for keyboard, screen reader, touch, high contrast, and
   reduced motion.
9. Web-specific semantics in a clearly labelled adapter subsection.
10. A representative example.

Update the contract status when its normative requirements materially change.

## Shared requirements

All contracts inherit the shared state, accessibility, terminology, collection,
and adapter rules in [`DESIGN.md`](../../DESIGN.md#components). A contract only
needs to repeat a shared rule when it narrows or strengthens it.

HTML elements, ARIA attributes, CSS behavior, SVG techniques, and framework file
paths are web or repository mappings. They are not the component's conceptual
definition. Each adapter may choose different native mechanisms while preserving
the same name, role, value, state, focus, and interaction outcomes.

Create a dedicated contract when a concept has its own semantic role, state
model, interaction model, accessibility behavior, or composition rules. Keep a
presentation in an existing contract when it only narrows behavior or changes
appearance. Reuse foundation contracts instead of restating shared behavior.

## Frontmatter coverage

Frontmatter component entries are visual mappings, not the component inventory.
Add an entry only for an approved mapping that the current DESIGN.md schema can
represent honestly.

| Frontmatter family        | Normative contracts                                                                   | Contract-only coverage                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Buttons                   | Button                                                                                | Focus, loading, pressed, expanded, activation, and icon-only behavior                           |
| Input and search          | Form field, Text field                                                                | Boundary mappings, read-only, validation, description, and message behavior                     |
| Cards and statistic cards | Card                                                                                  | Static, interactive, loading, empty, and error behavior                                         |
| Navigation and tabs       | Navigation shell, Public-site navigation, Tabs                                        | Focus, current semantics, responsive disclosure, temporary navigation, and managed tab behavior |
| Table                     | Data table, Data grid, Pagination                                                     | Sorting, selection, loading, paging, empty, stale, error, editing, and managed grid behavior    |
| Alerts and badges         | Alert, Toast and notification region, Status badge                                    | Announcement, queueing, dismissal, dynamic status, and distinction between feedback and status  |
| Dropdown surface          | Overlay, Popup and dropdown patterns, Listbox, Combobox, Tooltip, Popover, Disclosure | Placement, focus, selection, dismissal, active item, viewport fit, and transformation           |
| Modal surface             | Dialog and modal, Alert dialog, Drawer and sheet                                      | Modality, focus entry and containment, dismissal, inertness, busy state, and recovery           |
| Other form controls       | Form field, Textarea, Select, Checkbox, Radio group, Switch                           | Complete behavior remains contract-only until an honest visual mapping is approved              |

## Frontmatter state coverage

Existing flat entries cover states whose background or foreground changes can be
expressed by the current DESIGN.md component schema. Do not add duplicate entries
for states whose requirements are behavior, boundary, focus indicator,
announcement, or motion.

Each supported light-theme color entry has a related `*-dark` entry for dark-mode
contrast validation. Dark entries override `backgroundColor` and `textColor`
only; typography, shape, spacing, sizing, behavior, and accessibility remain
shared with the unqualified component or state.

Adding an unsupported component property only to reference an otherwise orphaned
token would create a misleading mapping and is prohibited.
