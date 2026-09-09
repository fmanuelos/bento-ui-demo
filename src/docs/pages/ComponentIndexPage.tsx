import { Link } from 'react-router-dom'
import { PageIntro } from '../components/DocsSection'
import { componentNavigation } from '../navigation'

export function ComponentIndexPage() {
  return (
    <>
      <PageIntro
        eyebrow="Library"
        title="Components"
        summary="Every component defined by the design contract is implemented once in the production library and rendered here directly."
      />
      <div className="grid gap-md sm:grid-cols-2 xl:grid-cols-3">
        {componentNavigation.map((component) => (
          <Link
            key={component.path}
            to={component.path}
            className="group rounded-lg border border-border-secondary bg-surface-primary p-lg no-underline transition outline-none hover:border-border-focus focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-focus-ring"
          >
            <h2 className="m-0 text-heading-sm font-semibold text-text-primary group-hover:text-text-accent">
              {component.title}
            </h2>
            <p className="mt-sm mb-0 text-body-sm leading-relaxed text-text-secondary">
              {component.description}
            </p>
          </Link>
        ))}
      </div>
    </>
  )
}
