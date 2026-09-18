# Template contracts

Templates are durable page- or flow-level structures that apply an
[`experience mode`](../experiences/), assemble components and
[`blocks`](../blocks/), and coordinate applicable
[`experience patterns`](../patterns/) without prescribing product-specific
content. They are normative extensions of the
[`composition model`](../../DESIGN.md#composition-model).

A template defines the stable structure and outcomes of a recurring page or
flow. A product page or flow step instantiates that structure with real content,
data, actions, permissions, routes, and business rules. A reference page is a
separate design-system-owned instance maintained to validate the template with
representative and adverse content.

## Relationship to the experience architecture

`Experience mode → Experience variant → Template → Product page or flow step`

Product domains classify business capability across the hierarchy rather than
forming a structural level within it.

| Concept                | Responsibility                                                                                        |
| ---------------------- | ----------------------------------------------------------------------------------------------------- |
| Experience mode        | Defines the navigation, density, continuity, responsive, and accessibility context.                   |
| Experience variant     | Specializes the mode for a recurring environment or journey.                                          |
| Template               | Defines the complete reusable page or flow structure and coordinates its required contracts.          |
| Product page/flow step | Supplies real content, data, permissions, routes, state, and domain rules.                            |
| Reference page         | Exercises a template with representative and adverse conditions as design-system validation evidence. |
| Product domain         | Identifies the business capability independently of the template's presentation or mode.              |

A template declares one primary experience mode. It may name applicable
experience variants, but a team name, route prefix, audience, or domain does not
change the mode. When one user journey moves between modes, use explicit template
boundaries and define entry, exit, return context, focus, and state ownership.

## Contract maturity

| Status         | Meaning                                                                                                      |
| -------------- | ------------------------------------------------------------------------------------------------------------ |
| **Proposed**   | A recurring page or flow need and intended scope are recorded, but the template contract is not yet defined. |
| **Draft**      | The structure is being defined and may contain unresolved decisions or incomplete reference-page coverage.   |
| **Complete**   | Every required section is normative, internally consistent, and ready for implementation and validation.     |
| **Deprecated** | A replacement and migration path are documented for an established deprecation window.                       |

Maturity describes the template contract. It does not prove that a product page
exists, an adapter implements it, or a reference page has passed validation.

## Template categories

### Public Site page templates

Page templates support content-led discovery, comprehension, comparison, trust,
and navigation under the [Public Site](../experiences/public-site.md) contract.
Candidate templates include:

- Product or service landing page.
- Public content or article page.
- Comparison page.
- Help or documentation article.
- Public status overview.

### Focused Flow templates

Flow templates define a bounded task, its meaningful states or steps,
persistence, commitment, exit, and recovery under the
[Focused Flow](../experiences/focused-flow.md) contract. Candidate templates
include:

- Authentication and reauthentication.
- Account recovery.
- Onboarding.
- Checkout or transactional commitment.
- Application submission.
- Initial setup.

A flow template may have one step or several. Do not divide a simple task into
artificial steps merely to match another flow.

### Application Workspace templates

Workspace templates support recurring work across related destinations, records,
settings, or data under the
[Application Workspace](../experiences/application-workspace.md) contract.
Candidate templates include:

- Workspace overview or dashboard.
- Record collection.
- Record detail.
- Editor.
- Settings.
- Administrative management.

A dashboard is an overview template centered on metrics, summaries, status, or
attention. It is not the general name for every authenticated template.

Candidate names describe possible admission scope, not approved contracts. Add a
template file and inventory entry only after its repeated structure and outcome
satisfy the admission criteria.

## Admission criteria

Create a shared template contract only when all of the following are true:

- The page or flow solves a recurring, named user problem.
- Its complete structure remains stable across at least two representative uses.
- One experience mode and the applicable variant rules can be selected
  unambiguously.
- Participating components, blocks, and patterns retain their existing ownership.
- Meaningful normal, boundary, loading, empty, error, permission, interruption,
  responsive, localized, and accessibility conditions can be specified.
- Reuse does not require hiding materially different user goals, state models,
  commitments, or recovery behavior behind one layout.

Keep a one-off structure with its consuming product until repeated use reveals a
stable contract. Extend an existing template when purpose, sequence, and state
behavior remain equivalent. Create a different template when the primary outcome,
commitment model, or complete information architecture changes.

Do not create a template solely because several pages share a header, sidebar,
grid, or visual arrangement. Those similarities may belong to an experience
mode, block, or adapter instead.

## Naming rules

Name templates by durable user purpose or information structure rather than
appearance, route, team, technology, or sample content. Prefer `record collection`,
`content editor`, or `account recovery` to `three-column page`, `admin screen`, or
`version two form`.

Use `page` when the structure is primarily one content destination, `flow` when
the contract coordinates a bounded sequence or state transition, and `workspace`
only when the structure itself governs a persistent multi-region working context.
Do not append those words when the name is already unambiguous.

## Required contract structure

Every template contract contains these sections:

1. **Status** — State maturity and unresolved scope.
2. **Intent** — Define the recurring user problem and intended outcome.
3. **Use when** — Define applicable contexts, prerequisites, and representative
   uses.
4. **Do not use when** — Define exclusions and direct readers to the correct
   template, block, pattern, or product-specific solution.
5. **Classification** — Declare the primary experience mode, applicable variants,
   intended audiences, and supported or excluded domain contexts.
6. **Regions and hierarchy** — Define required and optional page or flow regions
   in meaningful reading order.
7. **Participating contracts** — Link required components, blocks, experience
   patterns, and mode rules without copying their owned behavior.
8. **Actions and permissions** — Define action regions, commitment boundaries,
   eligibility, authorization, and unavailable behavior.
9. **States, sequence, and continuity** — Define loading, empty, error, stale,
   partial, permission, interruption, restoration, completion, and unknown states
   that apply to the whole structure.
10. **Content and data requirements** — Define necessary content relationships,
    metadata, freshness, limits, missing-content behavior, and adverse examples.
11. **Responsive and localization behavior** — Define transformations, priority,
    overflow, text expansion, formats, and bidirectional behavior.
12. **Accessibility** — Define page or flow naming, headings, landmarks, reading
    and focus order, bypass, announcements, input, zoom, contrast, and motion
    outcomes.
13. **Product instantiation** — Identify the content, routes, permissions,
    business rules, and domain decisions each product instance must supply.
14. **Reference pages and validation** — Define the representative and adverse
    instances needed to exercise the template and link applicable workflow checks.

Keep every section explicit, even when it states that a condition is unsupported
or remains product-owned. This makes reuse boundaries and incomplete decisions
reviewable.

## Regions and composition

A template defines complete structural relationships without absorbing the
semantics of its parts. Name regions by purpose, such as primary content, task
context, supporting information, filters, results, inspector, or completion
summary. Do not encode a visual position into a region name unless that position
is essential to its meaning across supported layouts.

Required regions are necessary for the template outcome. Optional regions may be
omitted without leaving an empty wrapper, broken heading sequence, inaccessible
destination, or unexplained action. A template may constrain the order or
coexistence of blocks while each block retains its local composition contract.

The rendered reading order, focus order, and task sequence remain compatible.
Responsive reordering does not create a different semantic sequence merely to
preserve a preferred desktop arrangement.

## States, continuity, and permissions

Templates coordinate conditions that affect the complete page or flow. A
component continues to own its bounded states, and an experience pattern owns a
reusable cross-component sequence. The template identifies which contracts
participate and how their outcomes coexist in this structure.

Define what remains available during initial loading, independent loading,
background refresh, partial failure, stale data, offline operation, missing
permission, changed access, and unknown completion. Preserve valid work, focus,
selection, query, scroll, and return context when the applicable pattern requires
it.

Permission changes never expose stale unauthorized content or silently select an
unrelated destination. When an action is unavailable, the product instance
supplies an appropriate explanation or alternative without fabricating access.

## Product domains

The [`product-domain guidance`](../product-domains.md) owns shared names,
boundaries, and assignment rules. A shared template may be domain-neutral or
declare domains in which its contract has been validated. A product instance
assigns one primary domain when it has a clear business purpose and lists
secondary domains only when they materially affect terminology, permissions,
data, or behavior.

Do not fork a template solely to apply domain branding or rename generic regions.
Do fork or specialize it when domain rules change the user outcome, required
information, commitment, state sequence, or recovery model.

## Product pages, flow steps, and reference pages

A product page or flow step is owned by the consuming product. It supplies:

- Route and destination behavior.
- Real titles, labels, instructions, records, and media.
- Permissions, eligibility, policy, and business rules.
- Data ownership, freshness, persistence, and retention.
- Primary and secondary domain classification.
- Product-specific analytics, privacy, safety, and support requirements.

A reference page is owned by the design system. It deliberately uses
representative and adverse content to test the template, participating contracts,
and mode rules. Reference pages are validation evidence; they are not canonical
product content, required route structures, or visual snapshots to reproduce.

Maintain enough reference instances to cover materially different states rather
than creating one idealized example. A product screenshot does not become a
reference page unless the design system adopts and maintains it for that purpose.

## Classification record

A template contract may use an equivalent metadata block in its Markdown body:

```yaml
template:
  name: content-editor
  category: workspace
  status: draft
experience:
  mode: application-workspace
  variants:
    - publishing-workspace
domains:
  validated:
    - publishing
```

A product instance adds its concrete page and domain information:

```yaml
page:
  name: Article editor
  route: /content/articles/:articleId
template: content-editor
experience:
  mode: application-workspace
  variant: publishing-workspace
domains:
  primary: publishing
  secondary:
    - identity-access
```

These blocks illustrate portable classification metadata. They are not supported
Google DESIGN.md frontmatter groups and must not be added to the frontmatter of
`DESIGN.md`.

## Ownership boundaries

| Concern                                                     | Normative owner                                    |
| ----------------------------------------------------------- | -------------------------------------------------- |
| Shared values and composition model                         | [`DESIGN.md`](../../DESIGN.md)                     |
| Mode-level navigation, density, and continuity              | An [experience mode contract](../experiences/)     |
| One bounded semantic or interactive unit                    | A [component contract](../components/)             |
| One reusable local arrangement                              | A [block contract](../blocks/)                     |
| Cross-component outcome, sequence, or recovery              | An [experience pattern](../patterns/)              |
| Complete reusable page or flow structure                    | A template contract in this directory              |
| Real content, data, routes, permissions, and business rules | The consuming product page or flow step            |
| Representative and adverse system-validation content        | A reference page governed by its template contract |
| Platform mechanics                                          | An [adapter](../adapters/)                         |
| Representative workflow checks                              | [`design/VALIDATION.md`](../VALIDATION.md)         |

Apply the shared baseline and
[`Template conformance`](../VALIDATION.md#template-conformance) whenever a
template is proposed, changed, implemented, instantiated, or exercised through a
reference page. Add every workflow and cross-cutting scenario required by its
declared mode, content, state, actions, and domains.

## Definition of complete

A template contract is Complete when:

- Its intended outcome, primary mode, applicable variants, and exclusions are
  unambiguous.
- Required and optional regions have a meaningful hierarchy and explicit
  missing-content behavior.
- Participating contracts retain clear ownership without duplicated or
  contradictory requirements.
- Actions, permissions, complete-structure states, continuity, and recovery are
  defined.
- Responsive, localization, input, theme, accessibility, and adverse-content
  outcomes are explicit.
- Product instances know which content, data, routes, permissions, and domain
  rules they must provide.
- Reference pages cover representative, boundary, interrupted, unauthorized,
  localized, responsive, and accessibility-relevant conditions.
- Links among the template, its dependencies, mode contract, and validation
  scenarios work in both directions where that aids discovery.

Runtime implementations, product pages, screenshots, and successful builds are
evidence. None independently redefines the template contract or proves complete
product validation.
