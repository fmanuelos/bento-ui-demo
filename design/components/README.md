# Component contracts

Component files define behavior and accessibility that cannot be represented in
DESIGN.md frontmatter. These contracts are normative and independent of CSS
methodology, UI framework, component library, and build system. A frontmatter
entry or runtime component does not by itself prove conformance.

## Status

| Component | Contract status | Current demo evidence — non-normative |
| --- | --- | --- |
| [Button](button.md) | Complete | `src/components/Button.tsx` |
| [Text field](input.md) | Complete | `src/components/Input.tsx`; compact and search variants are not reusable. |
| [Textarea](textarea.md) | Complete | No reusable component. |
| [Select](select.md) | Complete | No reusable component. |
| [Listbox](listbox.md) | Complete | No reusable component. |
| [Combobox](combobox.md) | Complete | No reusable component. |
| [Checkbox](checkbox.md) | Complete | No reusable component. |
| [Radio group](radio.md) | Complete | No reusable component. |
| [Switch](switch.md) | Complete | No reusable component. |
| [Dialog and modal](modal.md) | Complete | `src/components/Modal.tsx` |
| [Tabs](tabs.md) | Complete | Demo navigation is not a tab implementation. |
| [Data table](table.md) | Complete | No reusable component. |
| [Data grid](data-grid.md) | Complete | No reusable component. |
| [Status badge](status-badge.md) | Complete | Inline demo example only. |
| [Alert](alert.md) | Complete | No reusable component. |
| [Popup surface and dropdown patterns](dropdown.md) | Complete | No reusable component. |
| [Navigation shell](navigation.md) | Complete | Inline top navigation; no reusable sidebar. |
| [Card](card.md) | Complete | Inline demo examples only. |

`Complete` means the technology-neutral contract is ready for implementation.
The last column records repository evidence only. Runtime coverage does not
change the normative component definition.

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

Update the status and runtime path in this index whenever coverage changes.

## Shared requirements

All contracts inherit the shared state, accessibility, terminology, and adapter
rules in [`DESIGN.md`](../../DESIGN.md#components). A contract only needs to
repeat a shared rule when it narrows or strengthens it.

HTML elements, ARIA attributes, CSS behavior, SVG techniques, and framework file
paths are web or repository mappings. They are not the component's conceptual
definition. Each adapter may choose different native mechanisms while preserving
the same name, role, value, state, focus, and interaction outcomes.

## Frontmatter state coverage

The frontmatter has been audited against the shared state model. Existing flat
entries cover states whose background or foreground changes can be expressed by
the current DESIGN.md component schema. No duplicate entries are added for states
whose only requirements are behavior, boundary, focus indicator, announcement,
or motion.

| Component family | Frontmatter coverage | Contract-only coverage |
| --- | --- | --- |
| Buttons | Default, compact, hover, active, disabled | Focus, loading, pressed, expanded, activation behavior |
| Text field | Default, compact, search, focus, disabled | Boundary mappings, read-only, invalid, warning, success, validation behavior |
| Other form controls | None | Textarea, select, listbox, combobox, checkbox, radio, and switch contracts; add frontmatter only when supported visual mappings are approved |
| Navigation and tabs | Default, hover, selected, collapsed shell | Focus, current semantics, expanded behavior, disabled tabs |
| Table | Header, row, hover, selected | Focus, sorting, loading, empty, stale, error, grid behavior |
| Alerts and badges | Semantic variants | Announcement, dismissal, dynamic-status behavior |
| Popup and dialog surfaces | Base surfaces | Open/closed, focus, selection, dismissal, modal behavior |

Adding an unsupported component property only to reference an otherwise orphaned
token would create a misleading mapping and is prohibited.
