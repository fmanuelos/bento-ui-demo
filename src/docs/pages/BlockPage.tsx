import { Link, Navigate, useParams } from 'react-router-dom'
import { linkStyles } from '../../components'
import { CodeBlock } from '../components/CodeBlock'
import { DocsBackToTop } from '../components/DocsBackToTop'
import { DocsSection, PageIntro } from '../components/DocsSection'
import { PropsTable } from '../components/PropsTable'
import { blockDocsBySlug } from '../content/library'
import { blockNavigation, componentNavigation } from '../navigation'

export function BlockPage() {
  const { slug } = useParams()
  const documentation = slug ? blockDocsBySlug.get(slug) : undefined
  if (!documentation) return <Navigate to="/docs/not-found" replace />

  return (
    <>
      <PageIntro eyebrow="Block" title={documentation.title} summary={documentation.summary} />
      <DocsSection id="purpose" title="Purpose and recommended use">
        <ul>
          {documentation.useCases.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </DocsSection>
      <DocsSection id="import" title="Import">
        <CodeBlock code={documentation.importCode} label="Import" />
      </DocsSection>
      <DocsSection id="usage" title="Basic usage">
        <CodeBlock code={documentation.basicCode} />
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
      <DocsBackToTop />
    </>
  )
}
