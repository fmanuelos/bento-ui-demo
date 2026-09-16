import { Link } from 'react-router-dom'
import { linkStyles } from '../../components'
import { DocsBackToTop } from '../components/DocsBackToTop'
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
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(16rem,100%),1fr))] gap-space-3">
        {componentNavigation.map((component) => (
          <Link
            key={component.path}
            to={component.path}
            className={linkStyles({
              variant: 'navigation',
              className:
                'group rounded-shape-lg border border-border-secondary bg-surface-primary p-space-4 transition hover:border-border-focus',
            })}
          >
            <h2 className="m-0 text-heading-sm font-semibold text-text-primary group-hover:text-text-accent">
              {component.title}
            </h2>
            <p className="mt-space-2 mb-0 text-body-sm leading-relaxed text-text-secondary">
              {component.description}
            </p>
          </Link>
        ))}
      </div>
      <DocsBackToTop />
    </>
  )
}
