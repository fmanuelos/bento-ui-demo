import { Link } from 'react-router-dom'
import { PageIntro } from '../components/DocsSection'

export function NotFoundPage() {
  return (
    <>
      <PageIntro
        eyebrow="404"
        title="Documentation page not found"
        summary="That route is not part of the Bento UI Admin documentation."
      />
      <div>
        <Link
          to="/docs"
          className="inline-flex h-control-height-medium items-center rounded-shape-md bg-action-primary-background-default px-space-3 text-label-md font-semibold text-action-primary-foreground no-underline outline-none hover:bg-action-primary-background-hover focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus-ring focus-visible:outline-solid"
        >
          Return to documentation
        </Link>
      </div>
    </>
  )
}
