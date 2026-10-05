import { Navigate, useParams } from 'react-router-dom'
import { Link } from '../../components'
import { ContractLoader } from '../components/ContractContent'
import { PageIntro } from '../components/DocsSection'

export function TemplatePage() {
  const { slug } = useParams()
  if (slug !== 'authentication' && slug !== 'registration')
    return <Navigate to="/docs/not-found" replace />
  const sourcePath = `/design/templates/${slug}.md`
  const title = slug === 'authentication' ? 'Authentication' : 'Registration'
  return (
    <>
      <PageIntro
        eyebrow="Focused Flow template · Draft"
        title={title}
        summary="A bounded account task with explicit entry, actions, feedback, recovery, and continuation."
      />
      <div className="flex flex-wrap gap-scale-4 rounded-shape-md border border-border-secondary bg-surface-primary p-scale-4">
        <Link href={`/examples/${slug}`}>
          Open {slug === 'authentication' ? 'login' : 'registration'} reference
        </Link>
        <Link
          href={`/examples/${slug}?context=${slug === 'authentication' ? 'reauthentication' : 'invitation'}`}
        >
          Open {slug === 'authentication' ? 'reauthentication' : 'invited registration'} reference
        </Link>
      </div>
      <p className="text-body-sm text-text-secondary">
        These reference screens simulate outcomes. They do not create accounts, send messages, or
        connect to an identity provider.
      </p>
      <ContractLoader key={sourcePath} sourcePath={sourcePath} />
    </>
  )
}
