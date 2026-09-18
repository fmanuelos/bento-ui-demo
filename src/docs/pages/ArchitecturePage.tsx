import { Link } from 'react-router-dom'
import { Card, linkStyles } from '../../components'
import { CodeBlock } from '../components/CodeBlock'
import { DocsBackToTop } from '../components/DocsBackToTop'
import { DocsSection, PageIntro } from '../components/DocsSection'

const experienceStages = [
  {
    title: 'Experience mode',
    description:
      'Sets navigation, density, continuity, responsive behavior, and interaction context.',
  },
  {
    title: 'Experience variant',
    description: 'Specializes a mode for a recurring environment or journey.',
  },
  {
    title: 'Template',
    description: 'Defines a durable page or flow structure and coordinates the required contracts.',
  },
  {
    title: 'Product page or flow step',
    description: 'Supplies real content, data, routes, permissions, state, and business rules.',
  },
] as const

const compositionStages = [
  'Foundations',
  'Components',
  'Blocks',
  'Experience patterns',
  'Templates',
  'Reference pages',
] as const

const classificationExample = `name: Customer support request
experience:
  mode: application-workspace
  variant: customer-portal
template: support-request
domains:
  primary: help-support
  secondary:
    - account
audience: customer`

export function ArchitecturePage() {
  return (
    <>
      <PageIntro
        eyebrow="Architecture"
        title="Classify context before composing the interface"
        summary="Experience modes describe how an experience behaves. Templates describe its durable structure. Product domains describe the business capability it supports."
      />

      <DocsSection id="experience-architecture" title="Experience architecture">
        <div className="grid gap-scale-3 lg:grid-cols-4">
          {experienceStages.map((stage, index) => (
            <Card compact key={stage.title} className="relative">
              <span className="text-label-sm font-semibold text-text-accent">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-scale-2 mb-scale-2 text-heading-sm font-semibold text-text-primary">
                {stage.title}
              </h3>
              <p className="m-0 text-body-sm leading-relaxed text-text-secondary">
                {stage.description}
              </p>
            </Card>
          ))}
        </div>
        <div className="mt-scale-4 rounded-shape-lg border border-border-accent bg-background-accent p-scale-4 text-text-primary">
          <strong>Product domain crosses the complete sequence.</strong>{' '}
          <span className="text-text-secondary">
            It classifies capability without becoming another structural level or visual system.
          </span>
        </div>
      </DocsSection>

      <DocsSection id="composition-model" title="Composition model">
        <p>
          The experience architecture classifies context. The composition model describes how the
          design system is assembled. The two views meet at templates.
        </p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(10rem,100%),1fr))] gap-scale-2">
          {compositionStages.map((stage, index) => (
            <div
              key={stage}
              className="rounded-shape-md border border-border-secondary bg-surface-primary p-scale-3"
            >
              <span className="block text-label-sm font-semibold text-text-tertiary">
                Level {index + 1}
              </span>
              <strong className="mt-scale-1 block text-body-sm text-text-primary">{stage}</strong>
            </div>
          ))}
        </div>
        <p>
          A product page is not a new design-system level. It is a product-owned template instance.
          A reference page is a design-system-owned instance used as validation evidence.
        </p>
      </DocsSection>

      <DocsSection id="classification" title="Classification record">
        <p>
          Record each concern independently. A domain does not determine the mode, and a route,
          audience, or owning team does not determine either one.
        </p>
        <CodeBlock code={classificationExample} label="Example product metadata" />
      </DocsSection>

      <DocsSection id="continue" title="Continue with the architecture">
        <div className="grid gap-scale-3 sm:grid-cols-3">
          {[
            {
              title: 'Choose an experience mode',
              description: 'Select the behavioral context from the person’s current goal.',
              path: '/docs/experience-modes',
            },
            {
              title: 'Evaluate a template',
              description: 'Decide whether a recurring page or flow deserves a shared contract.',
              path: '/docs/templates',
            },
            {
              title: 'Assign product domains',
              description: 'Classify the business capability independently from presentation.',
              path: '/docs/product-domains',
            },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={linkStyles({
                variant: 'navigation',
                className:
                  'rounded-shape-lg border border-border-secondary bg-surface-primary p-scale-4 hover:border-border-focus',
              })}
            >
              <strong className="block text-heading-sm text-text-primary">{item.title}</strong>
              <span className="mt-scale-2 block text-body-sm text-text-secondary">
                {item.description}
              </span>
            </Link>
          ))}
        </div>
      </DocsSection>
      <DocsBackToTop />
    </>
  )
}
