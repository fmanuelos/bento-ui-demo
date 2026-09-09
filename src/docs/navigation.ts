import { componentDocs } from './content/components'
import { foundationDocs } from './content/foundations'

export type DocsNavigationItem = {
  title: string
  path: string
  description: string
  slug?: string
}

export type DocsNavigationSection = {
  title: string
  items: readonly DocsNavigationItem[]
}

export const foundationNavigation: readonly DocsNavigationItem[] = foundationDocs.map(
  (foundation) => ({
    title: foundation.title === 'Foundations' ? 'Foundations overview' : foundation.title,
    path: foundation.path,
    description: foundation.summary,
  }),
)

export const componentNavigation: readonly DocsNavigationItem[] = componentDocs.map(
  (component) => ({
    title: component.title,
    slug: component.slug,
    path: `/docs/components/${component.slug}`,
    description: component.summary,
  }),
)

export const docsNavigation: readonly DocsNavigationSection[] = [
  {
    title: 'Start',
    items: [
      {
        title: 'Overview',
        path: '/docs',
        description: 'Design-system principles and where to begin.',
      },
    ],
  },
  { title: 'Foundations', items: foundationNavigation },
  {
    title: 'Components',
    items: [
      {
        title: 'Component index',
        path: '/docs/components',
        description: 'Browse the complete component library.',
      },
      ...componentNavigation,
    ],
  },
]
