import { blockDocs, componentDocs } from './content/library'
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

export const componentNavigation: readonly DocsNavigationItem[] = [...componentDocs]
  .sort((a, b) => a.title.localeCompare(b.title))
  .map((component) => ({
    title: component.title,
    slug: component.slug,
    path: `/docs/components/${component.slug}`,
    description: component.summary,
  }))

export const blockNavigation: readonly DocsNavigationItem[] = [...blockDocs]
  .sort((a, b) => a.title.localeCompare(b.title))
  .map((block) => ({
    title: block.title,
    slug: block.slug,
    path: `/docs/blocks/${block.slug}`,
    description: block.summary,
  }))

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
  {
    title: 'Architecture',
    items: [
      {
        title: 'Experience architecture',
        path: '/docs/architecture',
        description: 'Understand modes, variants, templates, pages, and domains.',
      },
      {
        title: 'Experience modes',
        path: '/docs/experience-modes',
        description: 'Choose Public Site, Focused Flow, or Application Workspace.',
      },
      {
        title: 'Templates',
        path: '/docs/templates',
        description: 'Define durable page- and flow-level structures.',
      },
      {
        title: 'Product domains',
        path: '/docs/product-domains',
        description: 'Classify the business capability independently from presentation.',
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
  {
    title: 'Blocks',
    items: [
      {
        title: 'Block index',
        path: '/docs/blocks',
        description: 'Browse reusable component and content arrangements.',
      },
      ...blockNavigation,
    ],
  },
]
