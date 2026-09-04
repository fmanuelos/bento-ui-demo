# Component specifications

Component files define behavior and accessibility that cannot be represented in
DESIGN.md frontmatter. A frontmatter entry does not prove that a reusable React
component exists.

## Status

| Component | Status | Runtime coverage |
| --- | --- | --- |
| [Button](button.md) | Implemented | `src/components/Button.tsx` |
| [Input](input.md) | Implemented | `src/components/Input.tsx` |
| [Modal](modal.md) | Implemented | `src/components/Modal.tsx` |
| [Tabs](tabs.md) | Specified | Demo navigation is not a tab implementation. |
| [Table](table.md) | Specified | No reusable component. |
| [Status badge](status-badge.md) | Specified | Inline demo example only. |
| [Alert](alert.md) | Specified | No reusable component. |
| [Dropdown](dropdown.md) | Specified | No reusable component. |
| [Navigation](navigation.md) | Specified | Inline top navigation; no reusable sidebar. |
| [Card](card.md) | Specified | Inline demo examples only. |

`Implemented` means a reusable component exists and has been checked against the
specification. `Specified` means the contract is ready for implementation.

## Required sections

Every specification includes:

1. Status and intent.
2. Anatomy.
3. Variants and sizes, when relevant.
4. Interaction states.
5. Semantic token mapping.
6. Responsive behavior.
7. Accessibility requirements.
8. A representative example.

Update the status and runtime path in this index whenever coverage changes.
