# Focused Flow implementation and validation record

This is implementation evidence, not a normative contract or a claim that Draft
contracts are complete. It covers the local changes adding authentication and
registration references on October 5, 2026. See the accompanying Git change for
the exact implementation revision.

## Availability

The [block inventory](../blocks/README.md) remains the contract authority.
The runtime implementation map is `src/docs/content/block-implementations.json`.
The gallery uses metadata generated from all 19 contracts and loads their full
text on demand. It distinguishes contract maturity, implementation availability,
and validation status. The remaining 12 blocks have
contracts but no registered shared runtime implementation.

| Runtime           | Contract                                              | Reference coverage                                                             |
| ----------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------ |
| PageHeader        | [Page Header](../blocks/page-header.md)               | Login, renewal, self-service and invited registration                          |
| SectionHeader     | [Section Header](../blocks/section-header.md)         | Registration guidance; standalone documentation example                        |
| FormSection       | [Form Section](../blocks/form-section.md)             | Registration credentials; standalone documentation example                     |
| CompletionSummary | [Completion Summary](../blocks/completion-summary.md) | Active account and verification-required outcomes; application receipt example |

The three pre-existing implementations are EmptyState, SiteNavigation, and
NavigationShell. This change does not claim additional validation for them.

## Reference boundaries

- `/examples/authentication` and `?context=reauthentication` simulate login and renewal.
- `/examples/registration` and `?context=invitation` simulate account creation.
- Preview controls outside the task choose success, rejection, service failure,
  registration verification, theme, reading direction, and 200% text size.
- No credential is sent, stored, logged, or included in a URL. Fields live only
  in React memory; reload starts fresh. The sample password rule is illustrative.
- Registration explicitly confirms internal exit when values exist and requests
  the browser's before-unload prompt on document departure. Browsers control that
  prompt and may suppress it without prior interaction. No resumption is promised.
- Recovery is a local preview; no email is sent. Invitation context does not
  validate a token or grant membership. Completion does not create a real session.

## Checks and results

Local verification on October 5, 2026 used Node 24.16.0, the repository's pinned
pnpm dependencies, and the Codex in-app browser against the Vite development
server. A successful build alone does not establish behavioral conformance.

- `pnpm check`: formatting, design lint, architecture migration, block and
  template coverage, simulated authentication tests, component and icon coverage,
  focus rules, ESLint, TypeScript, and production build pass. Design lint retains
  its documented 129-warning baseline; Vite reports a main bundle above 500 kB.
- Four automated model tests cover required and malformed input, the sample
  registration password rule without imposing it on login, failed outcomes,
  and verification-required versus active-account completion.
- Login and session renewal reach their distinct simulated destinations.
  Self-service verification and invited registration completion show the correct
  outcome and move focus to the result heading. Completion removes password
  fields, and reloading login clears entered values.
- Empty registration focuses the error summary; its correction links focus the
  matching fields. Fields retain invalid associations without additional alert
  regions duplicating the summary's focus announcement.
- Service failure preserves values and focuses feedback. Pending submission
  disables the action and makes inputs read-only. Keyboard Enter submits login;
  rejection preserves entered details. Password reveal retains autocomplete
  semantics.
- Dirty registration exit opens a confirmation with initial focus on “Keep
  editing”; cancelling retains work. Recovery opens a modal, shows a simulated
  result, closes with Escape, and restores focus to its trigger without clearing
  the login password.
- At a 390 × 844 viewport, dark theme, RTL, and 200% text remain usable without
  page-level horizontal overflow. The enlarged-text check confirms actual text
  sizing (80 px page heading and 32 px body), not only increased spacing. Desktop
  light-theme rendering was also inspected.
- The gallery shows 19 contracts, seven implemented blocks, and 12 contract-only
  blocks. Contract-only content, implemented block APIs, lazy contract loading,
  template documentation, and reference links were checked in the browser.

These are local reference checks, not automated browser regression coverage or
assistive-technology certification. Browser-controlled before-unload prompts and
pending-navigation races still need platform-specific integration checks.

## Remaining coverage

Manual screen-reader testing with VoiceOver and NVDA, real password-manager
integrations, mobile virtual keyboards, translated content, real identity
providers, invitation authority, verification tokens and expiry, delivery and
resend, unknown server outcomes, and authorization of return destinations remain
unverified. These require consuming-product integration and representative
platform review before production use. No claim of complete WCAG conformance is
made from this reference work.

Review broader block variants and Public Site/Application Workspace composition
separately; Focused Flow references do not validate all supported uses.
