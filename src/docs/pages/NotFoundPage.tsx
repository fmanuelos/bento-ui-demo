import { Link } from 'react-router-dom'
import { buttonStyles } from '../../components'
import { PageIntro } from '../components/DocsSection'

export function NotFoundPage() {
  return (
    <>
      <PageIntro
        eyebrow="404"
        title="Documentation page not found"
        summary="That route is not part of the Bento UI documentation."
      />
      <div>
        <Link
          to="/docs"
          className={buttonStyles({ variant: 'primary', className: 'no-underline' })}
        >
          Return to documentation
        </Link>
      </div>
    </>
  )
}
