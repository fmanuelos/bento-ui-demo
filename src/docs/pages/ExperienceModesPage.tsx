import { Card, StatusBadge } from '../../components'
import { DocsBackToTop } from '../components/DocsBackToTop'
import { DocsSection, PageIntro } from '../components/DocsSection'

const modes = [
  {
    name: 'Public Site',
    identifier: 'public-site',
    purpose: 'Public-facing, content-led discovery, understanding, trust, and navigation.',
    chooseWhen: 'The main goal is to discover, understand, evaluate, compare, or read information.',
    navigation: 'Global public-site navigation with clear destinations and a visible primary path.',
    layout:
      'Readable containers, page padding, spacious section rhythm, and content-led hierarchy.',
    variants: 'Marketing Site, Information Site, Help Center, Documentation Site, Status Site',
  },
  {
    name: 'Focused Flow',
    identifier: 'focused-flow',
    purpose: 'One bounded outcome with unrelated choices reduced and continuity protected.',
    chooseWhen:
      'The person needs to complete a focused task such as sign-in, onboarding, or checkout.',
    navigation:
      'Task-local identity, context, progress when meaningful, and a safe exit or return.',
    layout:
      'Narrow or readable container, one column by default, explicit validation and recovery.',
    variants:
      'Authentication Flow, Onboarding Flow, Checkout Flow, Application Flow, Account Recovery Flow, Setup Flow',
  },
  {
    name: 'Application Workspace',
    identifier: 'application-workspace',
    purpose: 'Recurring operational, administrative, analytical, or record-oriented work.',
    chooseWhen: 'The main goal requires related destinations, records, settings, tools, or data.',
    navigation:
      'Persistent or temporary workspace navigation with current location and task context.',
    layout:
      'Workspace padding, efficient grouping, fluid data regions, and task-appropriate density.',
    variants:
      'Customer Portal, Operations Workspace, Publishing Workspace, Analytics Workspace, Admin Console, Support Workspace',
  },
] as const

export function ExperienceModesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Architecture"
        title="Experience modes"
        summary="Choose the mode from the person’s current goal and the behavior required to support it—not from authentication, route location, owning team, or visual appearance."
      />

      <div className="grid gap-scale-4 xl:grid-cols-3">
        {modes.map((mode) => (
          <Card as="article" key={mode.identifier} className="flex flex-col">
            <div>
              <StatusBadge variant="info">Draft contract</StatusBadge>
              <code className="mt-scale-3 block w-fit break-all">{mode.identifier}</code>
            </div>
            <h2 className="mt-scale-4 mb-scale-2 text-heading-md font-semibold">{mode.name}</h2>
            <p className="m-0 text-body-sm leading-relaxed text-text-secondary">{mode.purpose}</p>
            <dl className="mt-scale-5 grid gap-scale-4 text-body-sm">
              <div>
                <dt className="font-semibold text-text-primary">Choose when</dt>
                <dd className="mt-scale-1 ml-0 text-text-secondary">{mode.chooseWhen}</dd>
              </div>
              <div>
                <dt className="font-semibold text-text-primary">Navigation</dt>
                <dd className="mt-scale-1 ml-0 text-text-secondary">{mode.navigation}</dd>
              </div>
              <div>
                <dt className="font-semibold text-text-primary">Layout</dt>
                <dd className="mt-scale-1 ml-0 text-text-secondary">{mode.layout}</dd>
              </div>
              <div>
                <dt className="font-semibold text-text-primary">Proposed variants</dt>
                <dd className="mt-scale-1 ml-0 text-text-secondary">{mode.variants}</dd>
              </div>
            </dl>
          </Card>
        ))}
      </div>

      <DocsSection id="selection" title="Selection questions">
        <ol>
          <li>
            Is the main goal public discovery, understanding, evaluation, or reading? Choose{' '}
            <strong>Public Site</strong>.
          </li>
          <li>
            Is the main goal one bounded outcome with unrelated choices reduced? Choose{' '}
            <strong>Focused Flow</strong>.
          </li>
          <li>
            Is the main goal recurring work across related destinations, records, or data? Choose{' '}
            <strong>Application Workspace</strong>.
          </li>
        </ol>
        <p>
          A page or route has one primary mode. If a Focused Flow begins inside another mode, define
          the boundary, exit behavior, return context, focus restoration, and state ownership.
        </p>
      </DocsSection>

      <DocsSection id="working-together" title="How the modes work together">
        <div className="grid gap-scale-3 md:grid-cols-3">
          <Card compact>
            <strong className="block text-text-primary">1. Public Site</strong>
            <span className="mt-scale-1 block text-body-sm text-text-secondary">
              Explain the offer and establish a trustworthy next step.
            </span>
          </Card>
          <Card compact>
            <strong className="block text-text-primary">2. Focused Flow</strong>
            <span className="mt-scale-1 block text-body-sm text-text-secondary">
              Complete sign-up, verification, recovery, purchase, or setup.
            </span>
          </Card>
          <Card compact>
            <strong className="block text-text-primary">3. Application Workspace</strong>
            <span className="mt-scale-1 block text-body-sm text-text-secondary">
              Continue recurring work with records, tools, settings, and data.
            </span>
          </Card>
        </div>
        <p>
          This is a common journey, not a mandatory sequence. Preserve destination meaning and task
          state whenever a journey crosses a mode boundary.
        </p>
      </DocsSection>

      <DocsSection id="dashboard" title="Where dashboard fits">
        <p>
          A dashboard is an Application Workspace overview template centered on metrics, summaries,
          status, or attention. It is not an experience mode, a synonym for every authenticated
          page, or a layout-token family.
        </p>
      </DocsSection>
      <DocsBackToTop />
    </>
  )
}
