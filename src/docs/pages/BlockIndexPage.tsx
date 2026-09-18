import { Link } from 'react-router-dom'
import { linkStyles } from '../../components'
import { DocsBackToTop } from '../components/DocsBackToTop'
import { PageIntro } from '../components/DocsSection'
import { blockNavigation } from '../navigation'

export function BlockIndexPage() {
  return (
    <>
      <PageIntro
        eyebrow="Library"
        title="Blocks"
        summary="Reusable local arrangements of components and content, with stable hierarchy, reflow, and accessibility outcomes."
      />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(16rem,100%),1fr))] gap-scale-3">
        {blockNavigation.map((block) => (
          <Link
            key={block.path}
            to={block.path}
            className={linkStyles({
              variant: 'navigation',
              className:
                'group rounded-shape-lg border border-border-secondary bg-surface-primary p-scale-4 transition hover:border-border-focus',
            })}
          >
            <h2 className="m-0 text-heading-sm font-semibold text-text-primary group-hover:text-text-accent">
              {block.title}
            </h2>
            <p className="mt-scale-2 mb-0 text-body-sm leading-relaxed text-text-secondary">
              {block.description}
            </p>
          </Link>
        ))}
      </div>
      <DocsBackToTop />
    </>
  )
}
