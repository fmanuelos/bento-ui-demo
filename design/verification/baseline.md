# Baseline validation

Apply these requirements to every relevant [workflow scenario](workflows.md) and
[cross-cutting stress test](stress-tests.md). Start with the
[verification guide](README.md) to determine scope and use the
[evidence guidance](evidence.md) to record coverage and results.

## Classification record

Before rendered validation, record:

- One primary experience mode and the user goal that justifies it.
- The applicable experience variant and whether it is Proposed or governed by a
  dedicated contract.
- The shared template, or why the structure remains product-specific.
- One primary product domain and only material secondary domains.
- The audience, permissions, authoritative state, saved boundary, and evidence
  owner.

Treat this record as validation scope, not supported `DESIGN.md` frontmatter.
Authentication, route location, team ownership, a sidebar, cards, or visual
density do not determine the mode. A domain does not determine the mode, variant,
template, or visual system.

## Test environments

| Dimension       | Required coverage                                                                                              |
| --------------- | -------------------------------------------------------------------------------------------------------------- |
| Available space | Mobile, tablet, desktop, and wide layouts, including content-driven transformations                            |
| Input           | Keyboard, pointer, and touch; hover is an enhancement only                                                     |
| Text            | 200% text enlargement, increased text spacing, long valid values, and at least 60% label expansion             |
| Direction       | Left-to-right and right-to-left order; directional icons mirror only when their meaning depends on direction   |
| Locale          | Locale-aware names, dates, times, numbers, units, and currency using at least two materially different formats |
| Presentation    | Light, dark, inverse when used, forced colors or high contrast, and reduced motion                             |
| Media           | Decorative, informative, complex, missing, slow, failed, cropped, and motion-sensitive media where applicable  |

## State coverage

Exercise every state relevant to the workflow, including:

- Loading and background refresh.
- Empty and no-result outcomes.
- Partial, stale, and unavailable data.
- Offline and interrupted operation.
- Missing permission or changed access.
- Validation, warning, and blocked states.
- Success, failure, recovery, and unknown outcomes.

State changes must preserve usable content and task context whenever the
normative contract requires them to remain available.

## Core invariants

- Preserve meaningful reading order, visible focus, a bypass route, freedom from
  keyboard traps, and predictable focus restoration.
- Do not clip essential text or make truncation inaccessible.
- Do not communicate meaning through color alone.
- Do not destructively lose valid work.
- Keep necessary meaning and operation available when optional media is missing,
  fails, or changes presentation.
