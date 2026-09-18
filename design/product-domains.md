# Product-domain guidance

Product domains identify the business capability represented by an experience.
They are independent of experience mode, experience variant, template, route,
audience, team, and visual presentation.

This guidance is a normative extension of the
[`experience architecture`](../DESIGN.md#experience-architecture). It defines the
shared domain vocabulary and classification rules. Consuming products retain
ownership of their real business rules, data, permissions, policies, and
domain-specific content.

## Relationship to the architecture

`Experience mode → Experience variant → Template → Product page or flow step`

Product domains classify capability across that hierarchy:

```text
Product domain ─────────→ mode, variant, template, page, or flow step
```

The same domain may appear in several modes and variants. The same workspace may
contain several domains. Neither relationship creates a new experience mode or
requires a separate visual system.

For example, Help & Support can appear as public documentation on a Public Site,
a support-request flow, customer self-service in Customer Portal, or case work in
Support Workspace. The domain remains stable while navigation, density,
permissions, actions, and task continuity adapt to the experience context.

## Catalog status

| Status         | Meaning                                                                        |
| -------------- | ------------------------------------------------------------------------------ |
| **Active**     | The domain name and scope are approved for shared classification.              |
| **Proposed**   | A candidate capability is being evaluated for distinct scope and repeated use. |
| **Deprecated** | A replacement, affected classifications, and migration path are documented.    |

Status describes the shared catalog entry. It does not indicate that a product
implements the domain or that every related page has been classified.

## Current product domains

| Domain                | Identifier        | Status | Scope                                                                                                           |
| --------------------- | ----------------- | ------ | --------------------------------------------------------------------------------------------------------------- |
| **Marketing**         | `marketing`       | Active | Positioning, acquisition, campaigns, product communication, pricing presentation, and conversion.               |
| **Identity & Access** | `identity-access` | Active | Identity proof, authentication, credentials, sessions, authorization, roles, permissions, and access recovery.  |
| **Publishing**        | `publishing`      | Active | Content creation, editing, review, approval, scheduling, publication, distribution, and content lifecycle.      |
| **Analytics**         | `analytics`       | Active | Measurement, reporting, trends, exploration, attribution, performance monitoring, and data export.              |
| **Administration**    | `administration`  | Active | Organization or system configuration, governance, policy, audit, operational controls, and managed resources.   |
| **Account**           | `account`         | Active | Customer or user profile, preferences, relationship details, personal settings, and account-level self-service. |
| **Help & Support**    | `help-support`    | Active | Guidance, troubleshooting, service requests, support cases, resolution, and service communication.              |

Use the display names in product discussion and documentation. Use the lowercase
hyphenated identifiers in portable classification metadata.

## Domain boundaries

### Marketing and Publishing

Marketing owns the message, offer, acquisition purpose, campaign, and conversion
outcome. Publishing owns the workflow used to create, govern, schedule, and
distribute content.

A product landing page normally has Marketing as its primary domain. The editor
used to produce that page normally has Publishing as its primary domain, even
when the content itself is marketing material.

### Identity & Access and Account

Identity & Access owns authentication, credentials, sessions, identity
verification, authorization, roles, permissions, and access recovery. Account
owns the person's or customer's profile, preferences, relationship details, and
self-service account management.

A password change or active-session review normally belongs to Identity & Access.
A display-name or communication-preference change normally belongs to Account.
An account settings page may use Account as primary and Identity & Access as
secondary when it contains both kinds of capability.

Organization membership belongs to Identity & Access when the main decision is
access or permission. It may belong to Account when the main task is managing the
customer relationship and membership carries no separate authorization model.

### Analytics and Administration

Analytics owns interpreting measurements, reports, trends, attribution, and
performance. Administration owns configuring what the organization or system
permits, retains, governs, or operates.

An audit-log viewer normally belongs to Administration because its main purpose
is governance and accountability, even if it contains filters and charts. A
report about usage trends normally belongs to Analytics. A configuration page
that controls analytics retention is Administration with Analytics as a possible
secondary domain.

### Help & Support and Publishing

Help & Support owns the outcome of understanding, troubleshooting, requesting
service, or resolving a case. Publishing owns the authoring and governance
workflow used to produce help content.

A public help article belongs to Help & Support. The workspace used to author and
publish that article belongs to Publishing, with Help & Support as a secondary
domain only when its terminology or rules materially affect the workflow.

### Administration and Identity & Access

Administration owns organizational governance and configuration. Identity &
Access owns the access model and permission-bearing identities. A role editor is
normally Identity & Access; an organization policy page is normally
Administration. A policy that directly defines authorization can use
Administration as primary and Identity & Access as secondary, or the reverse,
according to the page's principal decision.

## Primary and secondary assignment

Assign one primary domain when a page or flow has a clear business purpose. The
primary domain answers:

> If this experience succeeds, what business capability did the person use or
> advance?

Use a secondary domain only when it materially changes at least one of:

- User-facing terminology or instructions.
- Eligibility, authorization, or permission behavior.
- Required data, metadata, or freshness.
- State, sequence, commitment, or recovery behavior.
- Policy, privacy, retention, safety, or compliance obligations.
- Validation coverage.

Do not assign a secondary domain merely because data originated there, a team
contributed code, a navigation link points there, or a shared component is used.
Most pages should have one primary domain and no more than a small number of
material secondary domains.

When two domains appear equally primary, first determine whether the experience
contains two decisions that should be separate pages, steps, or regions. Retain a
cross-domain experience only when one coherent user outcome genuinely requires
both capabilities together.

## Domains, modes, and variants

Modes describe behavior and presentation. Variants describe a recurring
environment or journey. Domains describe capability. Keep all three explicit.

| Example                  | Mode                  | Variant               | Template                  | Primary domain    | Secondary domain  |
| ------------------------ | --------------------- | --------------------- | ------------------------- | ----------------- | ----------------- |
| Product landing page     | Public Site           | Marketing Site        | Product landing           | Marketing         | —                 |
| Public help article      | Public Site           | Help Center           | Public content            | Help & Support    | —                 |
| Password reset           | Focused Flow          | Account Recovery Flow | Account recovery          | Identity & Access | Account           |
| Customer onboarding      | Focused Flow          | Onboarding Flow       | Account onboarding        | Account           | Identity & Access |
| Article editor           | Application Workspace | Publishing Workspace  | Content editor            | Publishing        | —                 |
| Performance report       | Application Workspace | Analytics Workspace   | Workspace overview        | Analytics         | —                 |
| Role management          | Application Workspace | Admin Console         | Administrative management | Identity & Access | Administration    |
| Organization settings    | Application Workspace | Admin Console         | Settings                  | Administration    | Account           |
| Customer profile         | Application Workspace | Customer Portal       | Settings                  | Account           | —                 |
| Customer support request | Application Workspace | Customer Portal       | Support request           | Help & Support    | Account           |
| Support case queue       | Application Workspace | Support Workspace     | Record collection         | Help & Support    | —                 |
| Help article editor      | Application Workspace | Publishing Workspace  | Content editor            | Publishing        | Help & Support    |

A workspace variant does not reserve a domain. Analytics may appear in Customer
Portal, Operations Workspace, Publishing Workspace, Admin Console, or Support
Workspace when those contexts expose meaningful measurement. Customer Portal may
contain Account, Identity & Access, Analytics, Administration, or Help & Support
without becoming five separate workspaces.

## Naming rules

Domain names describe stable business capabilities rather than organizational or
interface structures.

- Use concise nouns or noun phrases.
- Use sentence case in prose and lowercase hyphenated identifiers in metadata.
- Prefer language that remains valid if teams, routes, or technologies change.
- Do not include `Site`, `Flow`, `Portal`, `Workspace`, `Console`, `Page`, or
  `Dashboard`; those terms classify experience or structure.
- Do not create synonyms for an active domain. Use its canonical name and define
  necessary subdomains in product documentation.
- Do not rename a domain to match one product's navigation label when its shared
  capability remains unchanged.

Navigation labels may be more task-specific than domain names. A domain named
Identity & Access can contain destinations labeled “Sign in,” “Security,”
“Sessions,” “Roles,” or “Permissions.”

## Domain implications for the design system

A product domain does not automatically create:

- A color family, theme, type scale, spacing system, or layout token.
- A component variant or domain-prefixed component.
- An experience mode or workspace variant.
- A template fork.
- A navigation destination.
- A permission boundary.

Use existing semantic tokens according to purpose. When a domain exposes a
recurring semantic role, interaction model, cross-component sequence, or complete
page structure that the system does not yet cover, classify the need at the
correct system level before extending it.

For example, a recurring publishing approval sequence may justify an experience
pattern, while a recurring editor structure may justify a template. Neither
justifies `publishing-blue` or a renamed Button.

## Adding or changing a domain

Propose a new shared domain only when all of the following are true:

- It represents a distinct business capability rather than a team, audience,
  route, experience variant, or visual area.
- Its scope remains meaningful across more than one page, flow, or product
  context.
- Existing domains cannot classify it without repeated ambiguity or misleading
  ownership.
- Its terminology, data, policy, state, or validation needs are durable enough to
  document.
- Clear boundaries and representative cross-mode examples can be provided.

Before adding a domain, consider whether the concept is better represented as a
subdomain in product documentation, a secondary domain, an experience variant,
or a template.

A domain rename, merge, split, or removal is a classification migration. Record
the rationale, affected templates and product instances, metadata changes,
navigation implications, and validation impact. Deprecated identifiers remain
documented for an explicit migration window when external consumers require it.

## Classification metadata

A product page or flow may record:

```yaml
page:
  name: Organization access settings
experience:
  mode: application-workspace
  variant: admin-console
template: settings
domains:
  primary: identity-access
  secondary:
    - administration
```

A shared template may record domains in which its contract has been validated
without making one domain primary for every product instance:

```yaml
template:
  name: record-collection
experience:
  mode: application-workspace
domains:
  validated:
    - publishing
    - administration
    - help-support
```

These examples are product and contract metadata. They are not supported Google
DESIGN.md frontmatter groups and must not be added to the frontmatter of
`DESIGN.md`.

## Validation

Apply the shared baseline and
[`Product-domain classification`](VALIDATION.md#product-domain-classification)
when assigning a primary or secondary domain or changing the shared catalog.
Apply
[`Experience classification and mode transitions`](VALIDATION.md#experience-classification-and-mode-transitions)
when the same capability appears across modes or a journey crosses their
boundaries. Record ambiguous boundary decisions and the material reason for each
secondary domain in the durable review evidence.

## Localization, accessibility, and policy

Domain terminology follows the active locale and the product's accurate legal,
policy, security, and technical language. A translated domain label does not
change its identifier or scope. Avoid abbreviations and internal terminology
unless the intended audience understands them and the complete meaning remains
available.

Domain classification never weakens shared accessibility outcomes. Permissions,
status, risk, eligibility, freshness, and consequences remain understandable
without color, position, or domain familiarity. When domain policy limits an
action or disclosure, provide an understandable state or alternative without
exposing restricted information.

## Ownership boundaries

| Concern                                                    | Normative owner                                                        |
| ---------------------------------------------------------- | ---------------------------------------------------------------------- |
| Shared domain names, identifiers, and classification rules | This guidance                                                          |
| Experience behavior and presentation                       | An [experience mode contract](experiences/)                            |
| Complete reusable page or flow structure                   | A [template contract](templates/)                                      |
| Component, block, and pattern semantics                    | Their respective contracts                                             |
| Real business rules, data, policy, and domain content      | The consuming product                                                  |
| Domain-specific route and navigation labels                | The consuming product within shared navigation and content rules       |
| Exact semantic token values                                | [`DESIGN.md`](../DESIGN.md) frontmatter                                |
| Representative workflow checks                             | [`design/VALIDATION.md`](VALIDATION.md) plus product-specific evidence |

## Classification review

Before approving a template or product page, verify:

- One primary domain expresses the principal capability.
- Every secondary domain materially changes the experience.
- Mode and variant names have not been used as domain names.
- Domain classification does not introduce visual or component semantics.
- Cross-domain decisions have clear state, permission, and recovery ownership.
- Terminology is accurate, localizable, and understandable to the intended
  audience.
- Applicable privacy, security, safety, retention, and compliance conditions are
  recorded by the consuming product.
- Validation covers the domain conditions that materially affect the shared
  template or experience contract.
