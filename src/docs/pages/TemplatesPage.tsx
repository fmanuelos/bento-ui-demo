import { Card, StatusBadge } from '../../components'
import { DocsBackToTop } from '../components/DocsBackToTop'
import { DocsSection, PageIntro } from '../components/DocsSection'

const templateCategories = [
  {
    mode: 'Public Site',
    kind: 'Page templates',
    candidates:
      'Product or service landing, public content, comparison, help article, public status overview',
  },
  {
    mode: 'Focused Flow',
    kind: 'Flow templates',
    candidates:
      'Authentication, account recovery, onboarding, checkout, application submission, initial setup',
  },
  {
    mode: 'Application Workspace',
    kind: 'Workspace templates',
    candidates:
      'Workspace overview or dashboard, record collection, record detail, editor, settings, administrative management',
  },
] as const

export function TemplatesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Architecture"
        title="Templates"
        summary="A template is a durable page- or flow-level contract. It applies one primary experience mode and coordinates components, blocks, patterns, states, and responsive behavior without prescribing product content."
      />

      <div className="rounded-shape-lg border border-border-warning bg-feedback-warning-background p-scale-4 text-feedback-warning-foreground">
        <StatusBadge variant="warning">Governance established</StatusBadge>
        <p className="mt-scale-3 mb-0 text-body-sm leading-relaxed">
          The names below are candidate scopes. No shared template has completed admission and
          reference-page validation yet.
        </p>
      </div>

      <DocsSection id="categories" title="Template categories">
        <div className="grid gap-scale-3 lg:grid-cols-3">
          {templateCategories.map((category) => (
            <Card compact key={category.mode}>
              <span className="text-label-sm font-semibold text-text-accent">{category.mode}</span>
              <h3 className="mt-scale-2 mb-scale-2 text-heading-sm font-semibold text-text-primary">
                {category.kind}
              </h3>
              <p className="m-0 text-body-sm leading-relaxed text-text-secondary">
                {category.candidates}
              </p>
            </Card>
          ))}
        </div>
      </DocsSection>

      <DocsSection id="boundaries" title="Template, product page, and reference page">
        <div className="grid gap-scale-3 md:grid-cols-3">
          <Card compact as="article">
            <h3 className="m-0 text-heading-sm font-semibold text-text-primary">Template</h3>
            <p className="mt-scale-2 mb-0 text-body-sm text-text-secondary">
              A normative reusable structure with mode, regions, actions, state, continuity,
              responsive, and accessibility requirements.
            </p>
          </Card>
          <Card compact as="article">
            <h3 className="m-0 text-heading-sm font-semibold text-text-primary">
              Product page or flow step
            </h3>
            <p className="mt-scale-2 mb-0 text-body-sm text-text-secondary">
              A product-owned instance containing real content, data, routes, permissions, domain
              language, and business rules.
            </p>
          </Card>
          <Card compact as="article">
            <h3 className="m-0 text-heading-sm font-semibold text-text-primary">Reference page</h3>
            <p className="mt-scale-2 mb-0 text-body-sm text-text-secondary">
              A design-system-owned instance that exercises representative and adverse conditions as
              validation evidence.
            </p>
          </Card>
        </div>
      </DocsSection>

      <DocsSection id="admission" title="Admission criteria">
        <p>Create a shared template only when all of these conditions are true:</p>
        <ul>
          <li>It solves a recurring, named user problem.</li>
          <li>Its complete structure remains stable across at least two representative uses.</li>
          <li>One primary experience mode can be selected unambiguously.</li>
          <li>Components, blocks, and patterns retain their existing ownership.</li>
          <li>
            Normal, adverse, responsive, localized, and accessibility states can be specified.
          </li>
          <li>Reuse does not conceal different outcomes, commitments, or recovery models.</li>
        </ul>
        <p>
          A shared header, sidebar, grid, route prefix, or visual arrangement is not enough. Keep a
          one-off structure with its product until repeated use reveals a stable contract.
        </p>
      </DocsSection>

      <DocsSection id="naming" title="Naming and classification">
        <p>
          Name templates by durable purpose or information structure: <code>record collection</code>
          , <code>content editor</code>, or <code>account recovery</code>. Avoid names based on
          visual position, team, technology, or sample content.
        </p>
        <p>
          Every template declares one primary experience mode. Product domains describe where the
          template has been validated; they do not force a separate template for each capability.
          Dashboard remains the specific name for a workspace overview centered on metrics,
          summaries, status, or attention.
        </p>
      </DocsSection>
      <DocsBackToTop />
    </>
  )
}
