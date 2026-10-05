# Design repository workflow

This file documents the current repository integration. It is non-normative:
packages, commands, generated formats, and runtime structure may change without
changing the meaning of the Bento UI design contract.

[`DESIGN.md`](../DESIGN.md) is the only hand-edited source of exact token values.
Its Markdown body, the [`component contracts`](components/), the
[`block contracts`](blocks/), the [`experience patterns`](patterns/), and the
[`experience mode contracts`](experiences/), [`template contracts`](templates/),
the foundation rules in `DESIGN.md`, and
[`product-domain guidance`](product-domains.md) define intended use. The
[`adapter documentation`](adapters/) translates that contract for specific
platforms and tools. [`verification guide`](verification/README.md) collects representative
workflow and adverse-condition checks without redefining design intent. The
[`architecture migration record`](MIGRATION.md) documents the completed
terminology and layout-token migration and its verification boundary.

## Generated files

- `src/theme.css` is the Tailwind v4 `@theme` export.
- `tokens.json` is the DTCG/W3C design-token export.

Both files are generated artifacts. Never edit them directly.

## Commands

```sh
pnpm design:lint
pnpm migration:check
pnpm blocks:catalog
pnpm blocks:check
pnpm templates:catalog
pnpm templates:check
pnpm test:templates
pnpm test:auth
pnpm components:check
pnpm icons:check
pnpm design:build
```

The repository pins `@google/design.md` 0.4.0. `design:lint` runs that local CLI
and reports its findings directly. `blocks:check` verifies block inventory
coverage, maturity, required structure, local links, validation references, and
implemented block documentation. `components:check` verifies that every
component contract has a corresponding documentation entry and implementation.
`migration:check` verifies the canonical architecture vocabulary, required
contracts and documentation routes, workspace-token exports and runtime use, and
the absence of removed names outside the historical migration record.
`icons:check` verifies that every icon implementation is exported and catalogued
and prevents unmanaged inline SVG from entering application source.

The format guidance is reviewed against the
[Google Labs DESIGN.md specification at revision
`961439fc`](https://github.com/google-labs-code/design.md/blob/961439fc064335fea10f165e022b10e6e5182e95/docs/spec.md),
dated July 27, 2026. The specification revision describes the intended format;
the pinned CLI version determines actual local lint and export behavior. Review
both baselines independently whenever either one changes.

After changing `DESIGN.md`, run `design:lint`, then `design:build`. Inspect both
generated files and commit the source and generated files together. Review all
reported warnings in their rendered context. `pnpm check` adds application lint
and production build checks.

## CSS entrypoint

`src/index.css` imports Tailwind first and the generated theme second. It contains
application-wide base styles and the class-driven dark-mode adapter mapping.
Exact light and dark values belong in `DESIGN.md`; the adapter only maps each
unqualified runtime variable to its exported `dark-*` semantic counterpart under
`data-theme="dark"`.

## Component documentation

The files in `design/components/` describe component intent, anatomy, states,
behavior, and accessibility without depending on a UI framework.

Use the [`component index`](components/README.md) to track contract maturity. A
component token in `DESIGN.md` does not prove that an implementation exists or
conforms.

Application implementation inventories belong in application or source-code
documentation rather than the design-system contract.

## Block documentation

The files in `design/blocks/` describe reusable local compositions of content
and components. They define stable hierarchy, relationships, transformation, and
accessibility outcomes without absorbing the semantics, state, or behavior owned
by participating components and experience patterns.

Use the [`block index`](blocks/README.md) to review admission criteria, contract
maturity, required structure, ownership boundaries, and validation coverage.
Keep one-off arrangements in their consuming product or template until repeated
use demonstrates a stable shared contract.

Block contracts are normative design sources. Runtime block implementations,
examples, screenshots, and product instances are implementation evidence and do
not redefine their contracts. Run `pnpm blocks:check` after changing a block
contract or its inventory; the full `pnpm check` command runs it automatically.

The seven additional Draft contracts address recurring gaps in record inspection,
task review and completion, event history, contextual resources, offer comparison,
and attributed customer evidence. Named cross-links explain their boundaries.
Page Header, Section Header, and Form Section now explicitly support Focused Flow
in addition to Public Site and Application Workspace. Empty State retains its
Public Site and Application Workspace scope. Extending Feature Grid, Metric
Overview, or Empty State to cover these needs would change their essential
content relationships. Keeping the additions as local
compositions also avoids prescribing complete pages or duplicating workflow state
ownership. No token migration is required. Runtime availability and partial validation are
tracked in the [Focused Flow implementation record](verification/focused-flow-evidence.md);
contract maturity remains independent of those implementation results.

The documentation gallery uses the generated `src/docs/content/block-catalog.json`
for names, modes, maturity, and summaries, loading full contracts only on demand.
Run `pnpm blocks:catalog` after changing those contract fields; `blocks:check`
rejects stale metadata. Runtime availability remains separately authored in
`src/docs/content/block-implementations.json`. `templates:check` checks template
contracts across all three modes, generated
catalog freshness, local links and anchors, and declared reference routes;
`test:templates` exercises catalog and validation regressions. `test:auth` checks
the simulated credential-validation and outcome model.

## Experience mode documentation

The files in `design/experiences/` define the mode-level navigation, layout,
density, continuity, responsive, and accessibility requirements for Public Site,
Focused Flow, and Application Workspace contexts.

Use the [`experience mode index`](experiences/README.md) to select a mode,
classify variants independently from product domains, review contract maturity,
and locate the applicable mode contract. Templates and product pages apply these
contracts; they do not redefine the mode vocabulary.

Experience contracts are normative design sources. Their Draft status records
remaining contract and validation work rather than permission for implementations
to ignore their established requirements.

## Template documentation

The files in `design/templates/` define durable page- and flow-level structures
that apply one experience mode and coordinate components, blocks, and patterns.
They remain independent of product-specific content, routes, data, permissions,
and business rules.

Use the [`template index`](templates/README.md) to review categories, admission
criteria, required contract structure, classification metadata, ownership
boundaries, product instantiation, reference-page responsibilities, and
completion criteria. Keep one-off structures with their consuming product until
repeated use demonstrates a stable shared contract.

Template contracts are normative design sources. Product pages and flow steps
are consuming instances; reference pages are design-system validation evidence.
Neither silently changes the shared template contract.

The gallery reads generated `src/docs/content/template-catalog.json` metadata.
Run `pnpm templates:catalog` after changing titles, Status, Intent, Classification,
or the set of template files. Use `# Name template`, begin Status with a maturity
word, and declare one `Primary mode:` list item in Classification, linking the
canonical mode name to its experience contract and ending with a period. Existing
contracts demonstrate the exact syntax. Keep all 14 required sections in the
documented order.
`templates:check` rejects stale catalog data and invalid mode/workflow combinations.
Public Site contracts link Public landing or Public content as appropriate;
Focused Flow and Application Workspace contracts link their respective mode
workflows plus task-specific checks. Every contract links the baseline and
Template conformance checks.

Reference links and outcome limitations are separately authored in
`src/docs/content/template-references.json`; only add links to implemented routes.
The gallery shows contract-only entries without reference links. The two existing
account references remain simulated. Six additional drafts cover Record
Collection, Record Detail, Settings, Product Landing, Public Content, and Account
Recovery. Their interactive references and behavioral validation remain outstanding.
See the [catalog implementation record](verification/template-catalog-evidence.md)
for the checks performed and their limits.
Keep proposal lists in the template README or outside the contract directory;
every other Markdown file in that directory is treated as a contract.

## Product-domain documentation

[`Product-domain guidance`](product-domains.md) defines the shared names,
identifiers, scopes, boundaries, assignment rules, and extension policy for
Marketing, Identity & Access, Publishing, Analytics, Administration, Account,
and Help & Support.

Domains classify business capability independently of experience modes,
variants, templates, routes, audiences, and teams. Product implementations own
their real business rules and content while using the shared classification
vocabulary consistently.

## Changing the design system

Use these rules for changes to shared design decisions:

1. Treat `DESIGN.md`, the product-domain guidance, and the component, block,
   experience mode, pattern, and template contracts as the normative sources.
   Runtime code and generated files are implementation evidence.
2. Classify a change as a clarification, an additive decision, or a breaking
   decision. Do not hide a change in meaning inside a visual adjustment.
3. Explain the user or product problem, alternatives considered, affected
   contracts and consumers, and the relevant validation evidence in a durable
   review record such as a pull request or issue.
4. Include migration guidance with a breaking change. While the package is
   `0.0.0`, migrate every in-repository consumer in the same change.
5. Never silently waive an accessibility or semantic outcome. Record a necessary
   product limitation, its user impact, compensating behavior, owner, and review
   date.

Security, privacy, safety, and accessibility corrections may be expedited when
retaining old behavior creates material harm, but still require rationale,
consumer-impact review, migration guidance, and relevant validation.

### Architecture migration

The terminology, classification, validation, documentation, and workspace-token
migration is complete for this repository. The
[`architecture migration record`](MIGRATION.md) contains the replacement table,
verification evidence, compatibility decision, and limits of the completed
work. Run `pnpm migration:check` after changing architecture vocabulary, layout
tokens, generated exports, or documentation routes.

## Validation

Use [`verification guide`](verification/README.md) to test applicable workflows across content,
state, layout, input, accessibility preferences, themes, locales, and writing
directions. Record the implementation revision, environments, results, and known
limitations in the pull request, issue, release record, or another durable review
record. Evidence is implementation history, not design authority.

### Current status

The repository currently passes DESIGN.md format validation with the pinned
tooling. The component inventory and runtime documentation are structurally
covered. Block governance and its inventory are established, with the current
block contracts retained as Drafts pending their remaining design review.
Runtime availability and validation evidence are tracked independently. The block inventory now contains 19 contracts, including seven
Draft additions for record details, review, completion, history, related content,
plan comparison, and customer evidence. Each addition records two representative
design uses and linked workflow checks; these are not claims of implemented or
validated reuse. Block classification supports Focused Flow and defines Shared
as two or more explicitly named modes. Experience mode governance and the three
canonical mode contracts are established as Drafts. The repository terminology
migration and expanded architecture validation are complete and guarded by
`migration:check`. Template
governance includes eight Draft contracts across all three modes. Authentication
and Registration have simulated reference pages; the other six are contract-only.
Complete provider and accessibility validation remains open. The initial product-domain catalog and its classification
governance are established. The repository does not claim complete behavioral or
product validation. A successful lint, generation, build, inventory check, or
visual inspection is a prerequisite, not
proof of rendered accessibility or user outcomes.

## Export limitations

With the pinned CLI, Tailwind and DTCG exports omit component entries. Unitless
typography line heights remain quoted in YAML because CLI 0.4.0 otherwise drops
numeric YAML values during export. Re-check this workaround and the component
limitation whenever the CLI version changes.

The alpha DESIGN.md schema has no theme-mode group. Dark colors therefore use
flat `dark-*` semantic names that both current exporters preserve. Do not nest
light and dark maps under `colors`: the current Tailwind exporter turns nested
paths into invalid dotted CSS identifiers.

## Known lint baseline

With `@google/design.md` 0.4.0, the current document has zero lint errors and 129
warnings. Nine are contrast warnings:

| Finding                                              | Interpretation                                                                    | Review rule                                                                                                                                 |
| ---------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Primary, secondary, and destructive disabled buttons | The linter applies its standard text contrast check to disabled components.       | Confirm that disabled controls remain identifiable without relying on low contrast alone; do not change tokens only to silence the warning. |
| Transparent outline and ghost buttons                | The linter cannot resolve the permitted surface through a transparent background. | Verify each foreground and outline border on every supported surface listed in `DESIGN.md`.                                                 |
| Transparent link and tab treatments                  | The linter cannot resolve the permitted surface through a transparent background. | Verify default and state foregrounds on every supported surface.                                                                            |

The remaining warnings identify light or dark color tokens that are not
referenced by a supported component property. Many are intentionally consumed by
prose-defined borders, focus indicators, charts, page backgrounds, theme adapter
mappings, or other concepts that the current component schema cannot encode.
Review them whenever the schema or exporter changes; do not add misleading
component mappings to suppress them.

Treat this as a comparison baseline, not an allowed-error budget. A change must
not add `broken-ref`, `unknown-key`, `token-like-ignored`, `section-order`, or
unknown component-property findings.

## Documentation validation

For a documentation-only change that does not alter token values, run
`pnpm design:lint` and verify local links. Do not regenerate outputs merely because
prose or component contracts changed.

If frontmatter token values change, follow the generated-file workflow above and
review the generated diffs in a separate implementation-aware change.
