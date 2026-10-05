import { Link, Navigate, useParams } from 'react-router-dom'
import { linkStyles } from '../../components'
import { CodeBlock } from '../components/CodeBlock'
import { DocsBackToTop } from '../components/DocsBackToTop'
import { DocsSection, PageIntro } from '../components/DocsSection'
import { PropsTable } from '../components/PropsTable'
import { ContractLoader } from '../components/ContractContent'
import { blockCatalogBySlug, focusedFlowEvidenceUrl } from '../content/contracts'
import { blockDocsBySlug } from '../content/library'
import { blockNavigation, componentNavigation } from '../navigation'

export function BlockPage() {
  const { slug } = useParams()
  const documentation = slug ? blockDocsBySlug.get(slug) : undefined
  const contract = slug ? blockCatalogBySlug.get(slug) : undefined
  if (!contract) return <Navigate to="/docs/not-found" replace />
  const availability = (
    <div className="rounded-shape-md border border-border-secondary bg-surface-secondary p-scale-4 text-body-sm text-text-secondary">
      <p className="m-0">
        Contract: {contract.status} · {contract.implementation ? 'Implemented' : 'Contract only'}
      </p>
      <p className="mt-scale-2 mb-0">Supported modes: {contract.modes.join(', ')}</p>
      <p className="mt-scale-2 mb-0">
        Validation: {contract.implementation?.validation ?? 'Not recorded'}.{' '}
        <a
          className={linkStyles()}
          href={contract.implementation?.evidenceUrl ?? focusedFlowEvidenceUrl}
        >
          Read evidence and limitations
        </a>
      </p>
    </div>
  )
  if (!documentation)
    return (
      <>
        <PageIntro eyebrow="Block contract" title={contract.title} summary={contract.summary} />
        {availability}
        <ContractLoader key={contract.path} sourcePath={contract.path} />
        <DocsBackToTop />
      </>
    )

  return (
    <>
      <PageIntro eyebrow="Block" title={documentation.title} summary={documentation.summary} />
      {availability}
      <DocsSection id="purpose" title="Purpose and recommended use">
        <ul>
          {documentation.useCases.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </DocsSection>
      <DocsSection id="import" title="Import">
        <CodeBlock code={documentation.importCode} label="Import" language="TypeScript" />
      </DocsSection>
      <DocsSection id="usage" title="Basic usage">
        <CodeBlock code={documentation.basicCode} language="TSX" />
      </DocsSection>
      <DocsSection id="examples" title="Live example" preview>
        {documentation.example}
      </DocsSection>
      <DocsSection id="api" title="Props and API">
        <PropsTable props={documentation.props} />
      </DocsSection>
      <DocsSection id="variants" title="Variants, sizes, and states">
        <ul>
          {documentation.variants.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </DocsSection>
      <DocsSection id="accessibility" title="Accessibility and keyboard behavior">
        <ul>
          {documentation.accessibility.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </DocsSection>
      <DocsSection id="responsive" title="Responsive and theme behavior">
        <p>{documentation.responsive}</p>
        <p>{documentation.theme}</p>
      </DocsSection>
      <DocsSection id="recommendations" title="Common mistakes and recommendations">
        <ul>
          {documentation.mistakes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </DocsSection>
      <DocsSection id="related" title="Related components and blocks">
        <div className="flex flex-wrap gap-scale-2">
          {documentation.related.map((relatedSlug) => {
            const item = [...componentNavigation, ...blockNavigation].find(
              (entry) => entry.slug === relatedSlug,
            )
            return item ? (
              <Link
                key={item.path}
                to={item.path}
                className={linkStyles({
                  variant: 'navigation',
                  className:
                    'rounded-shape-md border border-border-primary bg-surface-primary px-scale-3 py-scale-2 hover:border-border-focus',
                })}
              >
                {item.title}
              </Link>
            ) : null
          })}
        </div>
      </DocsSection>
      <details className="rounded-shape-md border border-border-secondary p-scale-4">
        <summary className="cursor-pointer text-label-md font-semibold">
          Read the full design contract
        </summary>
        <div className="mt-scale-5">
          <ContractLoader key={contract.path} sourcePath={contract.path} />
        </div>
      </details>
      <DocsBackToTop />
    </>
  )
}
