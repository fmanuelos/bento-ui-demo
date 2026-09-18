import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const contractDirectory = join(root, 'design/components')
const docsSource = readFileSync(join(root, 'src/docs/content/library.tsx'), 'utf8')
const exportsSource = readFileSync(join(root, 'src/components/index.ts'), 'utf8')

const slugOverrides = new Map([['radio', 'radio-group']])

const implementationFiles = new Map([
  ['form-field', 'internal/Field'],
  ['overlay', 'internal/Overlay'],
  ['alert-dialog', 'AlertDialog'],
  ['avatar-group', 'AvatarGroup'],
  ['data-grid', 'DataGrid'],
  ['empty-state', 'EmptyState'],
  ['navigation', 'NavigationShell'],
  ['radio', 'RadioGroup'],
  ['site-navigation', 'SiteNavigation'],
  ['status-badge', 'StatusBadge'],
  ...[
    'accordion',
    'alert',
    'avatar',
    'back-to-top',
    'breadcrumb',
    'button',
    'button-group',
    'card',
    'checkbox',
    'combobox',
    'disclosure',
    'drawer',
    'dropdown',
    'input',
    'input-group',
    'listbox',
    'link',
    'modal',
    'pagination',
    'popover',
    'progress',
    'select',
    'skip-link',
    'slider',
    'switch',
    'table',
    'tabs',
    'textarea',
    'toast',
    'tooltip',
  ].map((slug) => [
    slug,
    slug.replace(/(^|-)([a-z])/g, (_, _separator, letter) => letter.toUpperCase()),
  ]),
])

const contracts = readdirSync(contractDirectory)
  .filter((file) => file.endsWith('.md') && file !== 'README.md')
  .map((file) => file.replace(/\.md$/, ''))
  .sort()
const blockSlugSource = docsSource.match(/export const blockSlugs = \[([^\]]+)\]/s)?.[1] ?? ''
const blockSlugs = new Set([...blockSlugSource.matchAll(/'([^']+)'/g)].map((match) => match[1]))
const documented = new Set(
  [...docsSource.matchAll(/slug: '([^']+)'/g)]
    .map((match) => match[1])
    .filter((slug) => !blockSlugs.has(slug)),
)
const failures = []

for (const contract of contracts) {
  const slug = slugOverrides.get(contract) ?? contract
  if (!documented.has(slug))
    failures.push(`${contract}.md has no documentation entry for “${slug}”`)

  const implementation = implementationFiles.get(contract)
  if (!implementation) {
    failures.push(`${contract}.md has no implementation mapping`)
    continue
  }
  const implementationPath = join(root, 'src/components', `${implementation}.tsx`)
  try {
    readFileSync(implementationPath)
  } catch {
    failures.push(`${contract}.md is missing ${implementationPath}`)
  }
  if (!implementation.startsWith('internal/') && !exportsSource.includes(`'./${implementation}'`)) {
    failures.push(`${implementation}.tsx is not exported from src/components/index.ts`)
  }
}

for (const slug of documented) {
  if (!contracts.includes([...slugOverrides].find(([, value]) => value === slug)?.[0] ?? slug)) {
    failures.push(`documentation entry “${slug}” has no design contract`)
  }
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'))
  process.exitCode = 1
} else {
  console.log(
    `Component coverage is complete: ${contracts.length} contracts, ${documented.size} docs entries.`,
  )
}
