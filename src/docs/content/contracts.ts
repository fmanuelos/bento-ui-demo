import catalog from './block-catalog.json'
import implementations from './block-implementations.json'

const sources = import.meta.glob<string>(['/design/blocks/*.md', '/design/templates/*.md'], {
  query: '?raw',
  import: 'default',
})
const sourceUrls = import.meta.glob<string>(['/design/**/*.md', '/DESIGN.md'], {
  eager: true,
  query: '?url',
  import: 'default',
})
type Implementation = { component: string; validation: string }
const implementationMap: Record<string, Implementation> = implementations
const sourceCache = new Map<string, Promise<string>>()
export function loadContract(path: string) {
  if (!sourceCache.has(path)) {
    const loader = sources[path]
    if (!loader) return Promise.reject(new Error('Contract unavailable'))
    sourceCache.set(
      path,
      loader().catch((error: unknown) => {
        sourceCache.delete(path)
        throw error
      }),
    )
  }
  return sourceCache.get(path)!
}
export const blockCatalog = catalog.map((block) => ({
  ...block,
  implementation: implementationMap[block.slug],
}))
export const blockCatalogBySlug = new Map(blockCatalog.map((block) => [block.slug, block]))

/** Resolve authored links without assuming Markdown files are served at runtime. */
export function contractLink(target: string, sourcePath: string) {
  if (/^https?:\/\//.test(target)) return target
  const resolved = new URL(target, `https://contracts.local${sourcePath}`)
  const block = resolved.pathname.match(/^\/design\/blocks\/([^/]+)\.md$/)?.[1]
  if (block)
    return block === 'README'
      ? '/docs/blocks'
      : `/docs/blocks/${block}${resolved.hash ? '#contract-' + resolved.hash.slice(1) : ''}`
  const template = resolved.pathname.match(/^\/design\/templates\/([^/]+)\.md$/)?.[1]
  if (template)
    return template === 'README'
      ? '/docs/templates'
      : `/docs/templates/${template}${resolved.hash ? '#contract-' + resolved.hash.slice(1) : ''}`
  // Other contracts are available as source assets, including the verification record.
  return (
    sourceUrls[resolved.pathname] ??
    sourceUrls[`${resolved.pathname}README.md`] ??
    '/docs/architecture'
  )
}

export const focusedFlowEvidenceUrl = sourceUrls['/design/verification/focused-flow-evidence.md']
