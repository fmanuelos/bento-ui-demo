import { Navigate, useParams } from 'react-router-dom'
import { Link } from '../../components'
import { ContractLoader } from '../components/ContractContent'
import { PageIntro } from '../components/DocsSection'
import { templateCatalogBySlug } from '../content/contracts'

export function TemplatePage() {
  const { slug } = useParams()
  const template = slug ? templateCatalogBySlug.get(slug) : undefined
  if (!template) return <Navigate to="/docs/not-found" replace />
  return (
    <>
      <PageIntro
        eyebrow={`${template.mode} template · ${template.status}`}
        title={template.title}
        summary={template.summary}
      />
      {template.reference ? (
        <>
          <div className="flex flex-wrap gap-scale-4 rounded-shape-md border border-border-secondary bg-surface-primary p-scale-4">
            {template.reference.references.map((reference) => (
              <Link key={reference.href} href={reference.href}>
                {reference.label}
              </Link>
            ))}
          </div>
          <p className="text-body-sm text-text-secondary">{template.reference.note}</p>
        </>
      ) : (
        <p className="rounded-shape-md border border-border-secondary bg-surface-primary p-scale-4 text-body-sm text-text-secondary">
          Contract only. Interactive reference pages and behavioral validation remain outstanding.
          The contract specifies the representative uses and conditions to validate.
        </p>
      )}
      <ContractLoader key={template.path} sourcePath={template.path} />
    </>
  )
}
