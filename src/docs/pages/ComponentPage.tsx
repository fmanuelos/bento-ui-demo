import { Link, Navigate, useParams } from 'react-router-dom'
import { componentNavigation } from '../navigation'
import { CodeBlock } from '../components/CodeBlock'
import { DocsSection, PageIntro } from '../components/DocsSection'
import { PropsTable } from '../components/PropsTable'
import { componentDocsBySlug } from '../content/components'

export function ComponentPage() {
  const { slug } = useParams()
  const documentation = slug ? componentDocsBySlug.get(slug) : undefined
  if (!documentation) return <Navigate to="/docs/not-found" replace />

  return (
    <>
      <PageIntro eyebrow="Component" title={documentation.title} summary={documentation.summary} />
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
      <DocsSection id="related" title="Related components">
        <div className="flex flex-wrap gap-space-2">
          {documentation.related.map((relatedSlug) => {
            const item = componentNavigation.find((entry) => entry.slug === relatedSlug)
            return item ? (
              <Link
                key={item.path}
                to={item.path}
                className="rounded-shape-md border border-border-primary bg-surface-primary px-space-3 py-space-2 no-underline hover:border-border-focus"
              >
                {item.title}
              </Link>
            ) : null
          })}
        </div>
      </DocsSection>
    </>
  )
}
