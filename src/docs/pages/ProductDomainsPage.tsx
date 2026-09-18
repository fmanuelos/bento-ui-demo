import { Card, StatusBadge } from '../../components'
import { DocsBackToTop } from '../components/DocsBackToTop'
import { DocsSection, PageIntro } from '../components/DocsSection'

const domains = [
  {
    name: 'Marketing',
    identifier: 'marketing',
    scope:
      'Positioning, acquisition, campaigns, product communication, pricing presentation, and conversion.',
  },
  {
    name: 'Identity & Access',
    identifier: 'identity-access',
    scope:
      'Identity proof, authentication, credentials, sessions, authorization, roles, permissions, and access recovery.',
  },
  {
    name: 'Publishing',
    identifier: 'publishing',
    scope:
      'Content creation, editing, review, approval, scheduling, publication, distribution, and lifecycle.',
  },
  {
    name: 'Analytics',
    identifier: 'analytics',
    scope:
      'Measurement, reporting, trends, exploration, attribution, performance monitoring, and data export.',
  },
  {
    name: 'Administration',
    identifier: 'administration',
    scope:
      'Organization or system configuration, governance, policy, audit, operational controls, and managed resources.',
  },
  {
    name: 'Account',
    identifier: 'account',
    scope:
      'Customer or user profile, preferences, relationship details, personal settings, and account self-service.',
  },
  {
    name: 'Help & Support',
    identifier: 'help-support',
    scope:
      'Guidance, troubleshooting, service requests, support cases, resolution, and service communication.',
  },
] as const

const examples = [
  ['Product landing page', 'Public Site', 'Marketing Site', 'Marketing'],
  ['Password reset', 'Focused Flow', 'Account Recovery Flow', 'Identity & Access'],
  ['Article editor', 'Application Workspace', 'Publishing Workspace', 'Publishing'],
  ['Customer support request', 'Application Workspace', 'Customer Portal', 'Help & Support'],
  ['Support case queue', 'Application Workspace', 'Support Workspace', 'Help & Support'],
] as const

export function ProductDomainsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Architecture"
        title="Product domains"
        summary="Domains identify the business capability represented by an experience. They remain independent of mode, variant, template, route, audience, team, and visual presentation."
      />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(18rem,100%),1fr))] gap-scale-3">
        {domains.map((domain) => (
          <Card as="article" compact key={domain.identifier}>
            <div className="flex flex-wrap items-center justify-between gap-scale-2">
              <h2 className="m-0 text-heading-sm font-semibold">{domain.name}</h2>
              <StatusBadge variant="positive">Active</StatusBadge>
            </div>
            <code className="mt-scale-2 inline-block">{domain.identifier}</code>
            <p className="mt-scale-3 mb-0 text-body-sm leading-relaxed text-text-secondary">
              {domain.scope}
            </p>
          </Card>
        ))}
      </div>

      <DocsSection id="assignment" title="Primary and secondary assignment">
        <p>
          Assign one primary domain by asking:{' '}
          <strong>
            If this experience succeeds, what business capability did the person use or advance?
          </strong>
        </p>
        <p>
          Add a secondary domain only when it materially changes terminology, permissions, required
          data, sequence, recovery, policy, or validation. Data origin, team contribution, shared
          components, and outbound links are not sufficient reasons.
        </p>
      </DocsSection>

      <DocsSection id="examples" title="Domains across experience modes">
        <div className="overflow-x-auto rounded-shape-lg border border-border-secondary bg-surface-primary">
          <table className="w-full min-w-[46rem] border-collapse text-left text-body-sm">
            <thead>
              <tr className="border-b border-table-border bg-table-header-background">
                {['Example', 'Mode', 'Variant', 'Primary domain'].map((heading) => (
                  <th
                    key={heading}
                    className="px-scale-4 py-scale-3 font-semibold text-text-primary"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {examples.map((row) => (
                <tr key={row[0]} className="border-b border-table-border last:border-0">
                  {row.map((cell, index) => (
                    <td
                      key={cell}
                      className={`px-scale-4 py-scale-3 ${index === 0 ? 'font-semibold text-text-primary' : 'text-text-secondary'}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          The same domain can appear in several modes and variants. A workspace can also contain
          several domains without becoming several separate workspaces.
        </p>
      </DocsSection>

      <DocsSection id="boundaries" title="Useful boundary checks">
        <ul>
          <li>
            <strong>Marketing or Publishing:</strong> Is the outcome acquisition and communication,
            or the workflow used to create and govern content?
          </li>
          <li>
            <strong>Identity & Access or Account:</strong> Is the decision about authentication and
            permission, or profile, preferences, and relationship details?
          </li>
          <li>
            <strong>Analytics or Administration:</strong> Is the person interpreting measurement, or
            configuring what the organization permits, retains, or governs?
          </li>
          <li>
            <strong>Help & Support or Publishing:</strong> Is the outcome assistance and resolution,
            or authoring and governing the help content?
          </li>
        </ul>
      </DocsSection>

      <DocsSection id="implications" title="What a domain does not create">
        <p>A domain does not automatically create:</p>
        <ul>
          <li>A color family, theme, type scale, spacing system, or layout token.</li>
          <li>A domain-prefixed component or component variant.</li>
          <li>An experience mode, workspace variant, template fork, or navigation destination.</li>
          <li>A permission boundary.</li>
        </ul>
        <p>
          Classify a recurring need at the correct system level before extending the design system.
        </p>
      </DocsSection>
      <DocsBackToTop />
    </>
  )
}
