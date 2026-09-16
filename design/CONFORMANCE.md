# Bento UI conformance record

This record reports the evidence available for Bento UI on September 15, 2026.
It is non-normative: [`DESIGN.md`](../DESIGN.md) defines the portable kernel,
component and pattern contracts define behavior, and this file records how far a
named implementation has demonstrated those requirements.

## Current claim

The repository can currently claim **Format-valid** conformance for `DESIGN.md`.
It does not yet claim that the reference implementation is Contract-conformant,
Adapter-conformant, or Product-validated.

| Level                   | Status                                                   | Evidence or missing proof                                                                                                                      |
| ----------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Format-valid**        | Pass                                                     | `@google/design.md` 0.4.0 reports zero errors against the repository's pinned format baseline.                                                 |
| **Kernel-aligned**      | Documentation reviewed; no complete implementation claim | Repository documentation and visible product naming were reconciled with the kernel. Complete rendered-state evidence has not been recorded.   |
| **Contract-conformant** | Not claimed                                              | All 40 contracts have documentation and implementation mappings, but coverage does not prove behavioral conformance.                           |
| **Adapter-conformant**  | Not claimed                                              | Web and Tailwind mappings are documented, but no versioned browser, device, input, assistive-technology, theme, and locale test record exists. |
| **Product-validated**   | Not claimed                                              | Six reference contexts are specified, but no named product has recorded a completed context matrix and exceptions.                             |

Claims are cumulative. A higher-level claim requires the evidence for every
preceding level and must name the implementation or product, version or revision,
applicable support matrix, test date, and unresolved exceptions.

## Portable-kernel review

The portable kernel now contains enough local guidance to make a bounded design
decision without depending on repository-only prose:

| Area                              | Result   | Review note                                                                                                 |
| --------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| Purpose, audiences, and outcomes  | Present  | Public Site and Dashboard modes state different priorities while sharing one semantic system.               |
| Brand and content character       | Present  | Visual character, voice, hierarchy, and restraint are expressed as decision rules.                          |
| Tokens and themes                 | Present  | Exact light and dark values are portable; inverse and high-contrast behavior are described in the body.     |
| Composition and pattern model     | Present  | Foundations, components, compositions, templates, functional patterns, and perceptual patterns are related. |
| Component selection               | Present  | Similar-looking controls are distinguished by purpose, state model, focus, keyboard behavior, and content.  |
| States and accessibility          | Present  | Shared state vocabulary and WCAG 2.2 AA outcomes apply across implementations.                              |
| Boundaries and source routing     | Present  | The kernel identifies what linked contracts add and what cannot be claimed when they are unavailable.       |
| Governance and validation context | External | Detailed workflow and executable evidence stay linked and non-normative so the kernel remains portable.     |

Repository contracts may narrow or strengthen the kernel but may not contradict
it. If a linked contract is unavailable, use the simplest native semantic pattern
that preserves the kernel and limit the claim to Kernel-aligned.

## Repository evidence

The Phase 6 review records:

- Format and schema: zero lint errors and 134 reviewed warnings with
  `@google/design.md` 0.4.0. Six are context-dependent contrast findings; the
  remainder are tokens not referenced by a property supported by the alpha
  component schema.
- Contract inventory: 37 component or foundation contracts, 37 rendered
  documentation entries, and an implementation mapping for every contract.
- Reference inventory: six normative reference contexts covering public,
  dashboard, data-management, form, and destructive workflows.
- Source reconciliation: visible repository and documentation naming uses
  “Bento UI”; light and dark themes are described as authored mappings rather
  than treating dark mode as a demo-only extension.
- Generated artifacts: no frontmatter token value changed during this review, so
  `src/theme.css` and `tokens.json` were not regenerated.

These checks establish structural completeness and remove known documentation
drift. They do not establish rendered behavior or user outcomes.

## Open evidence gaps

Before making a higher claim, record:

1. Rendered tests for every applicable contract state, including keyboard and
   pointer behavior, focus entry and restoration, accessible names and state,
   reflow, touch targets, forced colors, reduced motion, and both themes.
2. An exact Web adapter support matrix with browser and operating-system
   versions, devices, input methods, assistive technologies, locales, writing
   directions, themes, and known limitations.
3. Completed evidence for each applicable
   [reference context](reference-contexts/), including stress conditions,
   screenshots or automated output, review date, implementation revision, and
   exceptions.
4. Rendered contrast verification for transparent controls and disabled states;
   the token linter cannot resolve their full context.
5. A durable assignment for the Design System Owner and other active governance
   roles when repository ownership settings are established.

## Recording a future claim

Add one dated record per implementation or product. Include:

- Claim level and exact scope.
- Product, adapter, package, and source revision.
- Test environments and applicable reference contexts.
- Automated results and manual review evidence.
- Known limitations, approved exceptions, owners, and review dates.

Never promote a claim solely because parsing, generation, compilation, component
inventory, or visual inspection succeeds. Follow the approval and exception
rules in [`GOVERNANCE.md`](GOVERNANCE.md).
