# Verification guide

## Purpose and authority

Use this guide to review Bento UI implementations in representative workflows and
adverse conditions. It complements the normative rules in [`DESIGN.md`](../../DESIGN.md),
the [`component contracts`](../components/), the [`block contracts`](../blocks/), and
the [`experience patterns`](../patterns/), [`experience mode contracts`](../experiences/),
[`template contracts`](../templates/), and
[`product-domain guidance`](../product-domains.md); it does not redefine them or
prescribe one layout.

The normative contracts define the required outcomes. This guide defines baseline
conditions, representative workflows, and cross-cutting stress tests for checking
whether an implementation preserves those outcomes.

## How to use this guide

1. Record the experience mode, applicable variant and template, primary and
   material secondary domains, audience, and authoritative state owner.
2. Identify every workflow scenario and cross-cutting stress test that the change
   affects.
3. Apply all relevant baseline environments, states, and invariants to those
   workflows.
4. Add every participating component, block, and pattern contract.
5. When an individual check is not applicable, explain why rather than marking an
   entire category as unsupported.

The scenario checklists emphasize risks that are especially important to a
workflow. They do not replace the baseline validation requirements.

## Guide contents

- [Baseline validation](baseline.md): classification, environments, states, and core invariants.
- [Workflow scenarios](workflows.md): checks for representative user journeys.
- [Cross-cutting stress tests](stress-tests.md): checks that apply across workflows.
- [Recording evidence](evidence.md): coverage, results, and known limitations.

## Applicability index

Several rows can apply to one change.

| Change involves                                                      | Apply                                                                                                            |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Marketing, acquisition, or another first-visit page                  | [Public landing](workflows.md#public-landing)                                                                    |
| Articles, policies, documentation, or other long-form content        | [Public content](workflows.md#public-content)                                                                    |
| Authentication, onboarding, checkout, setup, or another bounded task | [Focused Flow](workflows.md#focused-flow)                                                                        |
| Persistent or temporary application navigation and recurring work    | [Application Workspace](workflows.md#application-workspace)                                                      |
| Metrics or several independently loaded data regions                 | [Dashboard overview](workflows.md#dashboard-overview), an Application Workspace page scenario                    |
| Charts, plots, or compact analytical trends                          | [Data visualization](stress-tests.md#data-visualization)                                                         |
| Search, filtering, tables, pagination, or bulk operations            | [Data management](workflows.md#data-management)                                                                  |
| Entering, editing, validating, or saving user-provided data          | [Form workflow](workflows.md#form-workflow)                                                                      |
| Inspecting record facts or chronological events                      | [Record inspection and history](workflows.md#record-inspection-and-history)                                      |
| Checking a pending commitment or interpreting its confirmed result   | [Review and completion](workflows.md#review-and-completion)                                                      |
| Contextual guides, resources, or related destinations                | [Related content discovery](workflows.md#related-content-discovery)                                              |
| Public pricing or account upgrade comparisons                        | [Plan selection](workflows.md#plan-selection)                                                                    |
| Attributed customer quotations or reported outcomes                  | [Customer evidence assessment](workflows.md#customer-evidence-assessment)                                        |
| Permanent, broad-scope, or otherwise consequential loss              | [Destructive workflow](workflows.md#destructive-workflow)                                                        |
| Meaningful images, charts, illustrations, video, or animation        | [Images and media](stress-tests.md#images-and-media)                                                             |
| Competing, nested, destructive, or changing actions                  | [Action hierarchy and emphasis](stress-tests.md#action-hierarchy-and-emphasis)                                   |
| A reusable page or section composition                               | [Block composition and reflow](stress-tests.md#block-composition-and-reflow)                                     |
| Selecting a mode or moving between mode boundaries                   | [Experience classification and mode transitions](stress-tests.md#experience-classification-and-mode-transitions) |
| A shared template, product instance, or reference page               | [Template conformance](stress-tests.md#template-conformance)                                                     |
| Adding, changing, or assigning a business capability                 | [Product-domain classification](stress-tests.md#product-domain-classification)                                   |

Checkout additionally uses the [payment and order workflow](workflows.md#checkout)
and its [implementation record](checkout-evidence.md).
