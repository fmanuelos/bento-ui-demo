import { Navigate, useLocation } from 'react-router-dom'
import { DocsSection, PageIntro } from '../components/DocsSection'
import { foundationDocsByPath } from '../content/foundations'

export function FoundationPage() {
  const { pathname } = useLocation()
  const documentation = foundationDocsByPath.get(pathname)
  if (!documentation) return <Navigate to="/docs/not-found" replace />
  return (
    <>
      <PageIntro eyebrow="Foundation" title={documentation.title} summary={documentation.summary} />
      {documentation.sections.map((section) => (
        <DocsSection
          key={section.title}
          id={section.title.toLocaleLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}
          title={section.title}
        >
          {section.body}
        </DocsSection>
      ))}
    </>
  )
}
