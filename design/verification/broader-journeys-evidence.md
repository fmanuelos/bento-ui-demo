# Broader journeys implementation record

This record describes the October 5, 2026 first broader-journeys batch, in the
working-tree changes based on revision `7765210`. Contracts remain Draft.
It is implementation evidence, not a claim of complete product validation.

## Availability

Account Onboarding, Application Submission, and Comparison each have two simulated
reference contexts. Flow Step Navigation, Review Summary, and the offer-summary
presentation of Plan Comparison have exported implementations and gallery examples.
Attribute-matrix comparison and route-based step links are not implemented.

## Reference boundaries

No account, application, invitation, message, purchase, or subscription is created.
Use sample values. Flow drafts are saved only by explicit action in session storage,
scoped to task kind and context, expiring after one hour. They contain no credentials
or real authorization. Reload starts a new task with an offer to resume a valid draft.
Internal Back navigates steps; browser history leaves the reference. Unload protection
is best effort. Unknown-result reconciliation returns a fixed simulated receipt.
Attachments, live eligibility changes, identity providers, durable server drafts,
and payment providers are outside this batch.

## Validation

Using Node 24.16.0, pnpm 11.22.0, and repository dependencies on macOS:

- `pnpm check` passed formatting, design lint, migration, block and template
  coverage, template and authentication tests, seven new journey-model tests,
  component, icon and focus-style checks, ESLint, TypeScript, and build.
- Design lint retained zero errors and the documented 129 warnings. The production
  bundle retained the existing warning above 500 kB; broader code splitting remains
  separate work.
- Model tests exercise required input, blocked direct activation, optional-step
  skipping, branch changes and dependent-value clearing, pending duplicate
  prevention, unknown-result reconciliation, failure retention, stale outcomes,
  and draft context, schema, expiry, and prerequisite checks.

In the Codex in-app browser against the local Vite server:

- Onboarding required-input validation, explicit draft save, reload and resume,
  optional preference skipping, unknown-result checking, and completion worked.
- Membership application required an organization name on that branch. Correction
  to Individual removed the obsolete name and review displayed Not applicable.
  Submission failure preserved values; a deliberate retry reached a receipt
  explicitly distinguished from approval.
- Exit confirmation focused Keep editing; cancelling preserved the task. New step
  headings and completion headings received focus after their transitions.
- Invited onboarding and service-application contexts were also completed. Editing
  after an explicit draft save changed the feedback to unsaved work.
- Comparison changed annual totals and billing labels together, cleared selection
  on a basis change, removed actions for stale offers, supported refresh, retained
  an available peer during partial failure, and showed no prices while loading.
  Both subscription and service-package contexts rendered.
- Inspected desktop comparison at 1440 by 1000 and narrow references at 390 by 844.
  Tested RTL and 200% text; the measured page-heading size doubled to 80 px.
  Fixed clipped comparison action labels and a long step heading, then rechecked
  wrapping and absence of horizontal document overflow. Light and dark preview
  appearances were inspected. This is not a full assistive-technology audit.
- No browser console errors were captured during the tested reference journeys.

Preview appearance controls restore the document's theme and text overrides when
unmounted and do not save a new theme preference. Model and browser observations
are separate from live-service or complete contract conformance.

## Remaining work

Validate with screen readers, real translated content, forced colors, zoom, mobile
virtual keyboards, provider integrations, real interruption and permission changes,
and durable outcome reconciliation. Initial Setup, Public Status Overview, and
the Help Article admission decision are implemented in the
[second batch](setup-status-content-evidence.md). Order Summary and Checkout are implemented in the [third batch](checkout-evidence.md).
Conditional components require a concrete admitted use before implementation. Existing contract-only references remain
separate work.
