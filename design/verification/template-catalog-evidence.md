# Template catalog implementation and validation record

This is implementation evidence, not a normative contract or a claim that Draft
templates are complete. It covers the October 5, 2026 working-tree changes based
on revision `1bce8e8`; the accompanying Git diff identifies the implementation.

## Scope

The [template inventory](../templates/README.md) now includes eight Draft
contracts across Public Site, Focused Flow, and Application Workspace. Six new
contracts cover Record Collection, Record Detail, Settings, Product Landing,
Public Content, and Account Recovery. Each contains the required 14 sections,
representative uses, exclusions, and applicable validation requirements.

Generated template metadata drives the documentation gallery and detail routes.
Separately authored reference metadata preserves the four existing login,
reauthentication, registration, and invited-registration links. The six new
contracts have no interactive references and display that limitation explicitly.
Authentication and Registration retain the limits in the
[Focused Flow record](focused-flow-evidence.md).

## Automated checks

Environment: Node 24.16.0, pnpm 11.22.0, repository dependencies, macOS.

- `pnpm check` passed formatting, design lint, architecture migration, block and
  template checks, 11 template-validator tests, four authentication-model tests,
  component and icon checks, focus-style checks, ESLint, TypeScript, and build.
- Design lint reported zero errors and the documented 129-warning baseline.
  The production build retained a main-chunk warning above 500 kB.
- Validator tests cover valid mode/workflow combinations, unknown or duplicate
  primary modes, wrong mode links and workflows, missing sections or maturity,
  absent inventory entries, stale generated metadata, broken dependency paths
  and heading anchors, and reference links without implemented routes.
- After the final validator guard and Settings wording corrections, targeted
  template checks, all 11 template tests, affected-script lint, and diff whitespace
  checks passed. The Settings correction uses checkboxes for deferred boolean
  changes and respects the Switch contract's immediate-commit semantics.

These checks establish structural consistency and compilation, not complete
contract conformance or behavioral accessibility.

## Browser observations

Used the Codex in-app browser against the local Vite server. Inspected the
existing dark theme with English content and left-to-right reading direction.

- The gallery displayed all eight contracts grouped by the three modes, with
  Draft maturity and independent reference-availability labels.
- All eight detail routes loaded their intended title and contract content.
  The six new entries exposed no reference links; Authentication and Registration
  each exposed two. The Settings page contained all 14 contract headings.
- The reauthentication link opened the session-expiry context and the invited
  registration link opened the invitation context.
- An unknown template slug displayed the documentation not-found page.
- The gallery fit at 1440 by 1000 and 390 by 844 viewport sizes without horizontal
  document overflow. The Settings detail page also fit at 390 by 844.
- No browser console errors were captured during the eight detail-page checks.

These observations check documentation rendering and navigation. They do not
revalidate the existing simulated account operations or exercise the proposed
record, settings, public-content, or recovery workflows.

## Outstanding validation

The next reference-page milestone must implement representative and adverse
instances for the six new contracts and record the exact states tested. Required
coverage includes keyboard and screen-reader behavior, light theme, forced
colors, zoom and text expansion, RTL and translated content, loading and failure,
permission changes, interruption, restoration, and cross-mode handoffs as applicable.
No assistive-technology or complete accessibility conformance is claimed here.

Live data, identity providers, authorization, persistence, token handling,
configuration conflicts, and real delivery remain consumer integration work.
Contract maturity stays Draft until its completion criteria and evidence are met.
