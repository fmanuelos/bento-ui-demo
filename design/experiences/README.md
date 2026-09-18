# Experience mode contracts

These contracts are normative extensions of the
[`experience architecture`](../../DESIGN.md#experience-architecture). They define
the navigation, layout, density, continuity, responsive, and accessibility
expectations that distinguish Public Site, Focused Flow, and Application
Workspace experiences.

An experience mode describes how an experience behaves and is presented. It does
not identify the team that owns it, the technology that implements it, or the
business capability that its content represents.

## Relationship to the system

Experience classification and system composition are complementary:

`Experience mode → Experience variant → Template → Product page or flow step`

| Concept                | Responsibility                                                                                |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| Experience mode        | The foundational presentation and behavioral context defined by a contract in this directory. |
| Experience variant     | A recurring specialization of one mode with stable contextual requirements.                   |
| Product domain         | A business capability that can appear across modes, variants, templates, and pages.           |
| Template               | A durable page- or flow-level structure that applies components, blocks, and patterns.        |
| Product page/flow step | A product-owned instance with real content, data, actions, permissions, routes, and state.    |
| Reference page         | A design-system-owned template instance maintained as representative validation evidence.     |

Modes and variants classify context; they are not extra construction levels
between foundations and components. A template applies the applicable mode
contract while assembling lower-level system decisions into a recurring
structure.

## Contract maturity

| Status         | Meaning                                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Proposed**   | A recurring context and intended scope are recorded, but its normative contract is not yet defined.                   |
| **Draft**      | The contract is being defined and may contain unresolved decisions or incomplete validation coverage.                 |
| **Complete**   | The contract is internally consistent, covers every required section, and is ready for implementation and validation. |
| **Deprecated** | A replacement and migration path are documented for an established deprecation window.                                |

Maturity describes the contract, not runtime availability. Track implementation,
adapter support, and product-validation evidence separately.

## Current mode contracts

| Mode                                              | Identifier              | Status | Primary context                                                               |
| ------------------------------------------------- | ----------------------- | ------ | ----------------------------------------------------------------------------- |
| [Public Site](public-site.md)                     | `public-site`           | Draft  | Public-facing, content-led discovery, understanding, trust, and navigation    |
| [Focused Flow](focused-flow.md)                   | `focused-flow`          | Draft  | A bounded task with one clear outcome and controlled interruption             |
| [Application Workspace](application-workspace.md) | `application-workspace` | Draft  | Authenticated, recurring, operational, administrative, or data-intensive work |

Dashboard is a page or template type, not an experience mode or layout-token
family.

## Selecting a mode

Select a mode from the person's current goal and the behavior required to support
it. Authentication, route location, owning team, and visual appearance alone do
not determine the mode.

| Primary question                                                                 | Select                |
| -------------------------------------------------------------------------------- | --------------------- |
| Is the main goal to discover, understand, evaluate, or read public information?  | Public Site           |
| Is the main goal to complete one bounded outcome with unrelated choices reduced? | Focused Flow          |
| Is the main goal recurring work across related destinations, records, or data?   | Application Workspace |

A product page or route has one primary mode. A bounded flow launched inside an
Application Workspace may apply the Focused Flow contract to its task surface
while the surrounding page retains its workspace context. Document the boundary,
exit behavior, focus restoration, and state ownership rather than blending the
two modes implicitly.

Do not select a mode to obtain a preferred visual treatment. Apply the mode whose
navigation, continuity, and task model matches the user outcome, then adapt its
perceptual expression within that contract.

## Experience variants

A variant specializes one mode for a recurring environment or journey. The
following catalog records candidate names and scope; each remains **Proposed**
until repeated use justifies a dedicated contract.

| Mode                  | Proposed variants                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Public Site           | Marketing Site, Information Site, Help Center, Documentation Site, Status Site                                     |
| Focused Flow          | Authentication Flow, Onboarding Flow, Checkout Flow, Application Flow, Account Recovery Flow, Setup Flow           |
| Application Workspace | Customer Portal, Operations Workspace, Publishing Workspace, Analytics Workspace, Admin Console, Support Workspace |

Use a variant label in product and template classification when it improves
shared understanding. The label does not create requirements beyond its parent
mode until a normative variant contract is approved.

### Variant admission

Create a dedicated variant contract only when repeated use establishes one or
more stable differences in:

- Navigation or orientation.
- Density or information hierarchy.
- Task continuity, interruption, or recovery.
- Permissions, role transitions, or collaboration.
- Responsive transformation.
- Accessibility behavior across the complete environment or journey.

A domain, audience, route prefix, team boundary, or visual theme alone does not
justify a variant. Extend an existing variant when its user outcome and behavior
remain stable.

## Product-domain independence

The [`product-domain guidance`](../product-domains.md) defines the shared domain
catalog and classification rules. Product domains classify what capability an
experience supports. They remain parallel to modes and variants so one capability
can appear in different contexts without inheriting the same navigation or
presentation.

| Example                  | Mode                  | Variant               | Primary domain    |
| ------------------------ | --------------------- | --------------------- | ----------------- |
| Product landing page     | Public Site           | Marketing Site        | Marketing         |
| Password reset           | Focused Flow          | Account Recovery Flow | Identity & Access |
| Article editor           | Application Workspace | Publishing Workspace  | Publishing        |
| Customer support request | Application Workspace | Customer Portal       | Help & Support    |
| Support ticket queue     | Application Workspace | Support Workspace     | Help & Support    |

Assign one primary domain when a page or flow has a clear business purpose. Add
a secondary domain only when it materially affects terminology, permissions,
data, or behavior. Domains do not create domain-specific semantic tokens or
silently redefine component and pattern contracts.

## Classification record

A template or product specification may record classification with equivalent
metadata:

```yaml
name: Customer support request
experience:
  mode: application-workspace
  variant: customer-portal
template: support-request
domains:
  primary: help-support
  secondary:
    - account
audience: customer
```

This example is product metadata, not additional Google DESIGN.md frontmatter.
Do not add unsupported top-level groups to `DESIGN.md` merely to store
classification records.

## Required contract structure

Every mode contract defines:

1. Status and intent.
2. Applicable and excluded contexts.
3. Audience and user outcomes.
4. Candidate experience variants.
5. Navigation and orientation.
6. Layout, density, content hierarchy, and action hierarchy.
7. Task continuity, states, interruption, and recovery.
8. Templates, product pages, and domain relationships.
9. Responsive, localization, and accessibility outcomes.
10. Participating components, blocks, patterns, and validation scenarios.

Mode contracts own cross-page contextual requirements. They reference rather
than copy the detailed semantics, state machines, keyboard behavior, or token
mappings owned by lower-level contracts.

## Ownership boundaries

| Concern                                                     | Normative owner                            |
| ----------------------------------------------------------- | ------------------------------------------ |
| Shared values and architecture vocabulary                   | [`DESIGN.md`](../../DESIGN.md)             |
| Mode-level context, navigation, density, and continuity     | An experience contract in this directory   |
| One bounded semantic or interactive unit                    | A [component contract](../components/)     |
| One reusable local arrangement                              | A [block contract](../blocks/)             |
| Cross-component outcome, sequence, or recovery              | An [experience pattern](../patterns/)      |
| Complete page or flow structure                             | A [template contract](../templates/)       |
| Real content, data, permissions, routes, and business rules | The consuming product page or flow step    |
| Representative adverse template instance                    | A reference page                           |
| Platform mechanics                                          | An [adapter](../adapters/)                 |
| Representative workflow checks                              | [`design/VALIDATION.md`](../VALIDATION.md) |

## Definition of complete

An experience mode contract is Complete when:

- Its purpose, applicable contexts, and exclusions distinguish it from the other
  modes without depending on visual appearance alone.
- Navigation, orientation, density, hierarchy, continuity, and state ownership
  are explicit.
- Responsive, localization, input, theme, accessibility, and adverse-condition
  outcomes are defined.
- Templates and product pages can classify themselves without introducing
  conflicting vocabulary.
- Dependencies retain clear ownership and every normative cross-reference works.
- Representative validation covers normal, boundary, interrupted, unauthorized,
  localized, responsive, and accessibility-relevant conditions.

Passing lint, build, or visual review does not by itself demonstrate experience
contract or product validation.
