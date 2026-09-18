# Experience architecture migration record

Status: **Verified**  
Last verified: **September 18, 2026**  
Applies to: **the current `0.0.0` repository working tree**

This record closes the repository migration from a broad Public Site/Dashboard
split to the experience architecture defined in [`DESIGN.md`](../DESIGN.md).
It records the intended replacements, the evidence checked in this repository,
and the limits of that evidence. It is migration history, not a separate source
of design authority.

## Migration outcome

The migration is complete for in-repository contracts, generated token outputs,
runtime consumers, and the documentation application. No compatibility aliases
are exported because the package is pre-release (`0.0.0`) and every known local
consumer was migrated in the same change.

The current architecture separates three concerns:

1. **Experience mode** describes behavioral and presentation context.
2. **Template** describes durable page- or flow-level structure.
3. **Product domain** describes business capability independently of mode and
   structure.

`Dashboard` remains valid only for an actual overview page or template centered
on metrics, summaries, status, or attention. It is no longer the general name
for authenticated experiences, workspace layout, or a token family.

## Terminology mapping

| Previous usage                                        | Current term or treatment                                                                         |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Public Site                                           | Public Site experience mode                                                                       |
| Authentication, onboarding, checkout, or similar task | Focused Flow experience mode, with a task-specific variant when useful                            |
| Dashboard as a general authenticated experience       | Application Workspace experience mode                                                             |
| Dashboard as a metrics/status overview                | Dashboard overview page or template within Application Workspace                                  |
| Customer-facing authenticated area                    | Customer Portal variant of Application Workspace                                                  |
| Publisher area                                        | Publishing Workspace variant; Publishing is the product domain                                    |
| Analytics area                                        | Analytics Workspace variant when it is an environment; Analytics is the product domain            |
| Administration area                                   | Admin Console variant when it is an environment; Administration is the product domain             |
| Customer account capability                           | Account product domain; its mode and variant are classified separately                            |
| Authentication capability                             | Identity & Access product domain; its mode and variant are classified separately                  |
| Help and support capability                           | Help & Support product domain; it may appear across Public Site, Focused Flow, or workspace modes |

## Layout-token mapping

| Removed identifier          | Replacement                 | Value     |
| --------------------------- | --------------------------- | --------- |
| `dashboard-padding-mobile`  | `workspace-padding-mobile`  | `1rem`    |
| `dashboard-padding-tablet`  | `workspace-padding-tablet`  | `1.25rem` |
| `dashboard-padding-desktop` | `workspace-padding-desktop` | `1.5rem`  |
| `container-dashboard`       | `container-workspace`       | `100rem`  |

The removed identifiers may appear in this migration record only. They must not
appear in `DESIGN.md`, generated exports, runtime source, contracts, or the
documentation application. Consumers outside this repository must replace them
directly; there is no deprecation alias or mixed-name transition period.

## Repository evidence

| Area                      | Verified outcome                                                                                                                 |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Portable contract         | `DESIGN.md` defines Public Site, Focused Flow, and Application Workspace and keeps domains independent from modes and templates. |
| Mode contracts            | The experience index and three linked mode contracts define selection, variants, boundaries, layout, continuity, and validation. |
| Template model            | The template index defines admission, required structure, instantiation, reference pages, lifecycle, and completion criteria.    |
| Product domains           | Seven canonical domains have stable names, identifiers, boundaries, assignment rules, and classification validation.             |
| Validation                | Dedicated mode workflows and cross-cutting classification, transition, template, and domain scenarios are present.               |
| Token source and exports  | The four workspace layout tokens agree across `DESIGN.md`, `src/theme.css`, and `tokens.json`.                                   |
| Runtime consumer          | `NavigationShell` uses the workspace padding utilities at mobile, tablet, and desktop ranges.                                    |
| Documentation application | Architecture, experience-mode, template, and product-domain pages are registered in both navigation and routing.                 |
| Legacy-name boundary      | Removed layout identifiers and the deprecated general Dashboard category are absent outside this historical record.              |

Run the focused verification from the repository root:

```sh
pnpm migration:check
```

Run the complete repository verification before merging or releasing:

```sh
pnpm check
```

The focused check is intentionally structural. It verifies canonical files,
vocabulary, tokens, generated exports, runtime usage, documentation routes, and
legacy-name absence. The complete check additionally runs formatting,
DESIGN.md lint, block and component coverage, focus-style checks, ESLint,
TypeScript, and the production build.

## Verification result

On September 18, 2026, both commands passed against the current working tree:

- `pnpm migration:check` verified three canonical modes, seven product domains,
  four renamed layout tokens, and four architecture documentation routes. It
  found no removed identifier or deprecated general Dashboard category outside
  this historical record.
- `pnpm check` passed formatting, migration verification, 9-of-9 block coverage,
  40-of-40 component coverage, focus-style checks, ESLint, TypeScript, and the
  production build. DESIGN.md lint reported 0 errors, 129 warnings, and 1
  informational summary.

The DESIGN.md warnings concern existing contrast calculations and tokens not
referenced by the file-format component mappings. The production build also
reports a non-blocking JavaScript chunk-size warning above 500 kB. Neither
warning category is introduced by or blocks this architecture migration; both
remain visible for separate review.

## Evidence interpretation

A passing migration check proves that this repository uses one coherent
architecture vocabulary and that the renamed tokens are connected from source
through generated output to the current runtime consumer. It does not prove:

- Rendered accessibility or usability for a product workflow.
- Support for an undeclared browser, device, assistive technology, locale, or
  platform adapter.
- That a Draft contract is Complete.
- That a proposed experience variant has a normative contract.
- That a shared template or reference page has been admitted and validated.
- That consumers outside this repository have completed their migration.

Those claims require the applicable scenarios in
[`VALIDATION.md`](VALIDATION.md), product-specific evidence, and the maturity
rules in the relevant contract index.

## Future changes

Keep `pnpm migration:check` in the required repository check until a stable
release policy replaces this one-time migration guard with broader architecture
conformance automation. Any later rename, merge, split, or removal must update
the normative contract first, document consumer impact and a migration path,
regenerate derived artifacts, migrate known consumers, and record new evidence.
