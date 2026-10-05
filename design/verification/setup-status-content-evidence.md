# Setup, status, and content implementation record

This record covers the October 5, 2026 second broader-journeys batch in the working
tree. Contracts remain Draft. Implementation, automated checks, and browser
observations are separate from full product and accessibility validation.

## Scope and admission decision

Initial Setup and Public Status Overview are new template contracts with two
reference contexts each: organization/project and single/multiple services.
Public Content now has guide and versioned-policy references. Help Article is
not admitted separately: static prerequisites, ordered instructions, expected
results, and support destinations retain Public Content's reading outcome.
Branching troubleshooting and interactive acknowledgement remain outside that scope.

Contents Navigation and Service Status Summary are new block contracts with
exported runtimes and documentation. Activity History extends to Public Site using
the same subject, ordering, and event relationships; its runtime also demonstrates
workspace publication history. No new primitive component is needed. File Upload,
Date Input and Code Block remain conditional scope. Order Summary and Checkout
are implemented in the [third batch](checkout-evidence.md); no admitted reference
requires the conditional components.

## Reference boundaries

Setup simulates provisioning in memory. No resources are created. Reload and
departure reset the preview; unload warnings are best effort. A partial result
retains a stable fictional resource identifier and retries unfinished defaults.
Unknown results block submission; checking returns fixed simulated success.
There is no real authorization, idempotency service, durable resume, or rollback.

Status uses explicitly fictional fixed snapshots and synchronous scenario controls.
No real incident, polling, uptime calculation, or notification subscription exists.
Loading the operational sample is a sample replacement, not a live refresh.
Public incident history omits private responders and internal diagnostics.

Guide and policy are fictional reading content. Native fragment links target
focusable section headings. Archived, unavailable, and optional-media-failure
scenarios exercise local content states. No publication backend or real policy is
implemented. The public footer is a local composition, not a shared block runtime.

## Validation

Using Node 24.16.0, pnpm 11.22.0, and the repository dependencies on macOS:

- `pnpm check` passed formatting, design lint, migration, block/template coverage,
  all 31 model and catalog tests, component/icon/focus checks, ESLint, TypeScript,
  and the production build. Seven tests cover the new setup and status models;
  the template suite now also accepts Initial Setup and the public-status workflow.
- Model tests cover required configuration, unsupported regions, duplicate
  prevention, late results, failure correction, partial retries preserving identity,
  unknown reconciliation, and aggregation under missing or stale service data.
- Design lint retains zero errors and 129 known warnings. The existing bundle-size
  warning remains; the main production bundle is approximately 751 kB minified.

In the Codex in-app browser against the local Vite server:

- Organization setup focused its required-input summary and then the review heading.
  Partial creation preserved the resource identifier; retrying defaults reached
  completion with the same identifier. Exit confirmation initially focused Keep
  working, and cancellation preserved the partial result.
- Project setup exercised failure before creation, retained configuration, an
  unknown retry outcome with no resubmit action, and explicit result reconciliation.
- Single-service and portfolio references rendered. Operational, degraded,
  disruption, maintenance, unknown, stale, loading, and failed scenarios retained
  distinct wording. Loading supplied no fabricated conditions. Failed retrieval
  now explicitly states that no snapshot or freshness information was received.
  Loading the operational sample updated the polite status message.
- Guide and policy references rendered with native contents links. Keyboard
  activation focused the matching heading; Tab continued to the following link,
  and browser Back restored the preceding fragment state. Archived content was
  labelled, optional-media failure retained the text, and unavailable articles
  removed the contents navigation and body. Policy metadata identifies its version.
- At 390 by 844, setup, status, and policy content had no measured horizontal
  overflow with RTL and 200% text (page headings doubled to 80 px). Light and dark
  references were inspected. Anchor targets remained in the viewport. Desktop
  documentation was also inspected at 1440 by 1000. These are bounded observations,
  not a full translated-content or assistive-technology audit.
- The gallery shows 13 templates and reference availability independently of Draft
  maturity. Activity History documentation exposes both supported modes, a live
  workspace example, unknown-time wording, and the evidence link. No browser
  console errors were captured during these checks.

## Remaining validation

Screen readers, forced colors, real translations, user text spacing, mobile
keyboards, production permissions, provider integration, durable provisioning,
refresh continuity, independent history failure, older-event paging, and publication
version routing remain outstanding. The reference implementations cover bounded
subsets of the block contracts; they do not demonstrate every contract state.
