import { Link } from 'react-router-dom'
import { Card, StatusBadge } from '../../components'
import { DocsBackToTop } from '../components/DocsBackToTop'
import { PageIntro, DocsSection } from '../components/DocsSection'

export function OverviewPage() {
  return (
    <>
      <PageIntro
        eyebrow="Bento UI Admin"
        title="Calm foundations for serious work"
        summary="A semantic React component library and design language for public sites, applications, and information-dense admin experiences."
      />
      <div className="grid gap-space-4 sm:grid-cols-3">
        <Card compact>
          <StatusBadge variant="info">Draft contract</StatusBadge>
          <h2 className="mt-space-4 mb-space-2 text-heading-sm">Semantic by default</h2>
          <p className="m-0 text-body-sm leading-relaxed text-text-secondary">
            Components consume purpose-led tokens instead of raw visual values.
          </p>
        </Card>
        <Card compact>
          <StatusBadge variant="positive">WCAG 2.2 AA</StatusBadge>
          <h2 className="mt-space-4 mb-space-2 text-heading-sm">Accessible outcomes</h2>
          <p className="m-0 text-body-sm leading-relaxed text-text-secondary">
            Focus, keyboard, touch, reflow, and announcements are part of each contract.
          </p>
        </Card>
        <Card compact>
          <StatusBadge>18 components</StatusBadge>
          <h2 className="mt-space-4 mb-space-2 text-heading-sm">Built for reuse</h2>
          <p className="m-0 text-body-sm leading-relaxed text-text-secondary">
            Typed components stay independent of product content and business logic.
          </p>
        </Card>
      </div>
      <DocsSection id="principles" title="Design principles">
        <ol>
          <li>Use semantic tokens rather than raw visual values.</li>
          <li>Keep action, feedback, status, navigation, and selection meanings distinct.</li>
          <li>Prefer tonal surfaces and borders before elevation.</li>
          <li>Preserve visible focus and non-color cues.</li>
          <li>Adapt components to available space while keeping one coherent system.</li>
        </ol>
      </DocsSection>
      <DocsSection id="start" title="Where to start">
        <div className="grid gap-space-3 sm:grid-cols-2">
          <Link
            className="rounded-shape-lg border border-border-secondary bg-surface-primary p-space-6 no-underline hover:border-border-focus"
            to="/docs/foundations"
          >
            <strong className="block text-heading-sm text-text-primary">Explore foundations</strong>
            <span className="mt-space-2 block text-body-sm text-text-secondary">
              Color, typography, layout, themes, and accessibility.
            </span>
          </Link>
          <Link
            className="rounded-shape-lg border border-border-secondary bg-surface-primary p-space-6 no-underline hover:border-border-focus"
            to="/docs/components"
          >
            <strong className="block text-heading-sm text-text-primary">Browse components</strong>
            <span className="mt-space-2 block text-body-sm text-text-secondary">
              Live examples, APIs, behavior, and guidance.
            </span>
          </Link>
        </div>
      </DocsSection>
      <DocsSection id="scope" title="Theme and platform scope">
        <p>
          The default light theme is normative. Inverse surfaces are supported locally. The current
          dark-mode mapping is a demo extension, documented transparently under Themes, and web
          implementations target modern platform semantics and WCAG 2.2 Level AA.
        </p>
      </DocsSection>
      <DocsBackToTop />
    </>
  )
}
