# Bento UI governance

This document defines how Bento UI decisions are proposed, approved, introduced,
deprecated, and excepted. It governs the normative design contract in
[`DESIGN.md`](../DESIGN.md), its [component contracts](components/), and its
[experience patterns](patterns/). Repository commands and generated-file policy
remain in [`design/README.md`](README.md).

## Roles and accountability

| Role                            | Accountability                                                                                                                           |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Design System Owner**         | Protects semantic integrity, brand character, accessibility outcomes, system scope, and the final decision on breaking changes.          |
| **Maintainer**                  | Reviews proposals, keeps normative sources aligned, verifies evidence, and maintains documentation and validation baselines.             |
| **Adapter or product reviewer** | Verifies consequences for an affected platform, adapter, implementation, or consuming product without redefining the normative contract. |
| **Contributor**                 | Identifies a recurring problem, supplies evidence, proposes a scoped solution, and completes the required documentation and validation.  |

Record the person or group assigned to each active role in repository ownership
settings or `CODEOWNERS` when those mechanisms are established. Until a Design
System Owner is formally assigned, the maintainer who accepts a change assumes
that accountability for the change.

When only one maintainer is active, documented self-review is permitted. The
change record must still contain the decision rationale, affected contracts and
consumers, migration impact, known risks, and validation evidence. Self-review
does not waive any contract or test requirement.

## Change classification and approval

| Classification    | Meaning                                                                                                                          | Required approval                                                                                                               |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Guidance-only** | Clarifies non-normative explanation without changing token values, required behavior, supported states, or semantic meaning.     | One maintainer.                                                                                                                 |
| **Additive**      | Adds a token, component, variant, pattern, or rule without changing the meaning or conformance of an existing contract.          | Design System Owner or delegated maintainer; affected adapter or product review when implementation or consumer work is needed. |
| **Breaking**      | Removes, renames, or changes a normative value, meaning, state, behavior, accessibility outcome, or previously conforming usage. | Design System Owner plus an affected adapter or product reviewer when that role exists, with migration and deprecation plans.   |

A change that appears visual but alters hierarchy, contrast, state recognition,
brand expression, layout compatibility, or generated consumer output is
normative rather than guidance-only. Split mixed proposals by classification
when doing so makes review, adoption, or rollback safer.

Security, privacy, safety, and accessibility corrections may be expedited when
retaining old behavior creates material harm. The expedited path still requires
an accountable owner, rationale, consumer-impact review, migration guidance, and
all relevant validation.

## Proposal requirements

Before adding or changing a shared decision, document:

1. The user or product problem and evidence that it recurs.
2. The applicable composition level and functional or perceptual pattern.
3. Why an existing token, component, composition, or pattern cannot satisfy the
   need without semantic distortion.
4. Affected experience modes, themes, platforms, input methods, locales, states,
   contracts, adapters, and consuming products.
5. Accessibility, content, responsive, interruption, error, and recovery
   outcomes.
6. Alternatives considered and the reason for the chosen scope.
7. Adoption, compatibility, migration, and deprecation impact.
8. Documentation, [reference-context](reference-contexts/), and validation updates
   required for the decision.

The proposal may be recorded in the change description, issue, or another durable
review record. A runtime implementation is evidence for a proposal; it does not
establish the design-system decision by itself.

## Decision and implementation sequence

1. Classify the change and identify the accountable approver.
2. Search the shared language for an existing purpose and contract before naming
   a new concept.
3. Define or update the technology-neutral token, component, pattern, or system
   contract.
4. Update affected adapters without moving implementation details into the
   normative vocabulary.
5. Implement and migrate consumers when the scoped change includes runtime work.
6. Run the validation required by [`design/README.md`](README.md) and record the
   results in [`CONFORMANCE.md`](CONFORMANCE.md) when they support a conformance
   claim.
7. Review the applicable [representative and adverse
   contexts](reference-contexts/) before marking a contract complete or removing
   a deprecated decision.

When sources disagree, resolve the normative contract first. Generated files and
runtime code are never used to silently overwrite design intent.

## Exceptions

An exception is appropriate only when a product or platform cannot satisfy a
shared contract within the current scope. Record:

- The owner, affected product or adapter, and exact contract being excepted.
- The user or technical reason and evidence.
- The smallest affected surface, state, platform, or time period.
- User impact, accessibility and localization risks, and any compensating
  behavior.
- The review date or event that ends the exception.
- The migration, remediation, or upstream system proposal.

An exception does not rename a shared token, component, state, or pattern for one
consumer. It cannot silently waive an accessibility or semantic outcome; when
equivalent behavior is impossible, document the limitation and its user impact.

Repeated exceptions for the same need trigger a review of the shared contract.
Expired exceptions are removed or renewed through the same approval level as the
original decision.

## Compatibility and deprecation

While Bento UI is Draft and the package version is `0.0.0`, a breaking decision
must migrate every in-repository consumer in the same change.

After the first stable release:

- Introduce and document the replacement before deprecating the old decision.
- Keep the replacement and deprecated path together for at least one minor
  release and 90 days, whichever is longer.
- Identify affected consumers and provide explicit migration guidance.
- Remove the deprecated path only in a major release after validation of the
  supported consumer set.
- Shorten the window only for a documented security, privacy, safety, or
  accessibility correction whose old behavior creates material harm.

Contract maturity and runtime availability remain separate. A complete design
contract can lack an implementation, and a runtime component can fail to conform
to a complete contract.

## Validation evidence

Every normative change records the checks appropriate to its risk. At minimum:

- Run `pnpm design:lint` and preserve zero errors.
- Verify local documentation links.
- Run component coverage when a component contract or documentation entry
  changes.
- Regenerate and inspect Tailwind and DTCG outputs only when frontmatter token
  values change.
- Test affected states, modes, themes, responsive transformations, keyboard and
  pointer operation, focus, reflow, high contrast, reduced motion, and supported
  locales in rendered context when applicable.
- Record any warning added, removed, or reclassified and its reviewed
  interpretation.

Passing a build or token linter is necessary evidence, not proof of design-system
conformance. Scope and record claims using [`CONFORMANCE.md`](CONFORMANCE.md).
