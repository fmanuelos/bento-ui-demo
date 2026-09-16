import { Link } from 'react-router-dom'
import { Card, StatusBadge, linkStyles } from '../../components'
import { DocsBackToTop } from '../components/DocsBackToTop'
import { PageIntro, DocsSection } from '../components/DocsSection'

export function OverviewPage() {
  return (
    <>
      <PageIntro
        eyebrow="Bento UI"
        title="Calm foundations for purposeful work"
        summary="A semantic design language for public sites, applications, and information-dense operational experiences."
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
          <StatusBadge>40 contracts</StatusBadge>
          <h2 className="mt-space-4 mb-space-2 text-heading-sm">Built for reuse</h2>
          <p className="m-0 text-body-sm leading-relaxed text-text-secondary">
            Typed components stay independent of product content and business logic.
          </p>
        </Card>
      </div>
      <DocsSection id="principles" title="Design principles">
        <ol>
          <li>
            <strong>Purpose before pattern.</strong> Begin with the user’s goal and context.
          </li>
          <li>
            <strong>Calm surfaces, clear priorities.</strong> Keep emphasis available for what
            matters.
          </li>
          <li>
            <strong>Clarity before compression.</strong> Add density only when it improves the task.
          </li>
          <li>
            <strong>Reveal complexity when useful.</strong> Keep advanced capability discoverable.
          </li>
          <li>
            <strong>One language, context-aware expression.</strong> Adapt composition without
            semantic drift.
          </li>
          <li>
            <strong>Preserve continuity through change.</strong> Retain content, state, focus, and
            recovery.
          </li>
          <li>
            <strong>Accessibility defines the experience.</strong> Equivalent appearance without
            equivalent access does not satisfy the system.
          </li>
        </ol>
      </DocsSection>
      <DocsSection id="start" title="Where to start">
        <div className="grid gap-space-3 sm:grid-cols-2">
          <Link
            className={linkStyles({
              variant: 'navigation',
              className:
                'rounded-shape-lg border border-border-secondary bg-surface-primary p-space-6 hover:border-border-focus',
            })}
            to="/docs/foundations"
          >
            <strong className="block text-heading-sm text-text-primary">Explore foundations</strong>
            <span className="mt-space-2 block text-body-sm text-text-secondary">
              Color, typography, layout, themes, and accessibility.
            </span>
          </Link>
          <Link
            className={linkStyles({
              variant: 'navigation',
              className:
                'rounded-shape-lg border border-border-secondary bg-surface-primary p-space-6 hover:border-border-focus',
            })}
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
          The authored light and dark themes are normative. Inverse surfaces provide stable local
          emphasis, and the web adapter maps all themes while targeting WCAG 2.2 Level AA outcomes.
          Exact browser, device, assistive-technology, and locale support is declared by each
          consuming product before it claims support.
        </p>
      </DocsSection>
      <DocsBackToTop />
    </>
  )
}
