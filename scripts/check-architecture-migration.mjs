import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = process.cwd()
const failures = []

function read(path) {
  const absolutePath = join(root, path)
  if (!existsSync(absolutePath)) {
    failures.push(`${path} is missing`)
    return ''
  }
  return readFileSync(absolutePath, 'utf8')
}

function requireText(path, source, expected) {
  if (!source.includes(expected)) failures.push(`${path} is missing “${expected}”`)
}

const designSource = read('DESIGN.md')
const experienceIndex = read('design/experiences/README.md')
const templateIndex = read('design/templates/README.md')
const domainGuidance = read('design/product-domains.md')
const validationGuide = read('design/VALIDATION.md')
const repositoryGuide = read('design/README.md')
const migrationRecord = read('design/MIGRATION.md')
const navigationSource = read('src/docs/navigation.ts')
const routesSource = read('src/docs/routes.tsx')
const navigationShellSource = read('src/components/NavigationShell.tsx')
const themeSource = read('src/theme.css')
const packageSource = read('package.json')

const modes = [
  ['Public Site', 'public-site', 'public-site.md'],
  ['Focused Flow', 'focused-flow', 'focused-flow.md'],
  ['Application Workspace', 'application-workspace', 'application-workspace.md'],
]

for (const [name, identifier, file] of modes) {
  requireText('DESIGN.md', designSource, `**${name}**`)
  requireText('design/experiences/README.md', experienceIndex, `| [${name}](${file})`)
  requireText('design/experiences/README.md', experienceIndex, `\`${identifier}\``)
  read(`design/experiences/${file}`)
}

for (const heading of [
  '## Template categories',
  '## Required contract structure',
  '## Product pages, flow steps, and reference pages',
  '## Classification record',
  '## Definition of complete',
]) {
  requireText('design/templates/README.md', templateIndex, heading)
}

const domains = [
  ['Marketing', 'marketing'],
  ['Identity & Access', 'identity-access'],
  ['Publishing', 'publishing'],
  ['Analytics', 'analytics'],
  ['Administration', 'administration'],
  ['Account', 'account'],
  ['Help & Support', 'help-support'],
]

for (const [name, identifier] of domains) {
  requireText('design/product-domains.md', domainGuidance, `**${name}**`)
  requireText('design/product-domains.md', domainGuidance, `\`${identifier}\``)
}

for (const heading of [
  '### Classification record',
  '### Focused Flow',
  '### Application Workspace',
  '### Experience classification and mode transitions',
  '### Template conformance',
  '### Product-domain classification',
]) {
  requireText('design/VALIDATION.md', validationGuide, heading)
}

const documentationRoutes = [
  ['/docs/architecture', 'ArchitecturePage'],
  ['/docs/experience-modes', 'ExperienceModesPage'],
  ['/docs/templates', 'TemplatesPage'],
  ['/docs/product-domains', 'ProductDomainsPage'],
]

for (const [route, page] of documentationRoutes) {
  requireText('src/docs/navigation.ts', navigationSource, `path: '${route}'`)
  requireText('src/docs/routes.tsx', routesSource, `<${page} />`)
  read(`src/docs/pages/${page}.tsx`)
}

const expectedDimensions = new Map([
  ['workspace-padding-mobile', [1, 'rem']],
  ['workspace-padding-tablet', [1.25, 'rem']],
  ['workspace-padding-desktop', [1.5, 'rem']],
  ['container-workspace', [100, 'rem']],
])

let designTokens = {}
try {
  designTokens = JSON.parse(read('tokens.json'))
} catch (error) {
  failures.push(`tokens.json could not be parsed: ${error.message}`)
}

for (const [token, [value, unit]] of expectedDimensions) {
  requireText('DESIGN.md', designSource, `  ${token}: ${value}${unit}`)
  requireText('src/theme.css', themeSource, `--spacing-${token}: ${value}${unit};`)

  const exportedValue = designTokens.spacing?.[token]?.$value
  if (exportedValue?.value !== value || exportedValue?.unit !== unit) {
    failures.push(`tokens.json must export spacing.${token} as ${value}${unit}`)
  }
}

for (const className of [
  'px-workspace-padding-mobile',
  'sm:px-workspace-padding-tablet',
  'lg:px-workspace-padding-desktop',
]) {
  requireText('src/components/NavigationShell.tsx', navigationShellSource, className)
}

requireText('design/README.md', repositoryGuide, '[`architecture migration record`](MIGRATION.md)')
requireText('design/MIGRATION.md', migrationRecord, 'Status: **Verified**')
requireText('DESIGN.md', designSource, '[`architecture migration record`](design/MIGRATION.md)')
requireText('package.json', packageSource, '"migration:check"')

const scannedExtensions = new Set(['.css', '.json', '.md', '.mjs', '.ts', '.tsx'])
const excludedDirectories = new Set(['.git', 'dist', 'node_modules'])
const legacyRecord = 'design/MIGRATION.md'
const checker = 'scripts/check-architecture-migration.mjs'
const legacyIdentifiers = [
  'dashboard' + '-padding-mobile',
  'dashboard' + '-padding-tablet',
  'dashboard' + '-padding-desktop',
  'container-' + 'dashboard',
]
const deprecatedTaxonomy = [/\bdashboard mode\b/i, /\bdashboard workspace\b/i]

function sourceFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (excludedDirectories.has(entry.name)) return []
    const path = join(directory, entry.name)
    if (entry.isDirectory()) return sourceFiles(path)
    const extension = entry.name.slice(entry.name.lastIndexOf('.'))
    return scannedExtensions.has(extension) ? [path] : []
  })
}

for (const path of sourceFiles(root)) {
  const repositoryPath = relative(root, path)
  if (repositoryPath === legacyRecord || repositoryPath === checker) continue

  const source = readFileSync(path, 'utf8')
  for (const identifier of legacyIdentifiers) {
    if (source.includes(identifier)) {
      failures.push(`${repositoryPath} still uses legacy identifier “${identifier}”`)
    }
  }
  for (const pattern of deprecatedTaxonomy) {
    if (pattern.test(source)) {
      failures.push(`${repositoryPath} still uses Dashboard as a general experience category`)
    }
  }
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'))
  process.exitCode = 1
} else {
  console.log(
    `Architecture migration is complete: ${modes.length} modes, ${domains.length} domains, ${expectedDimensions.size} renamed layout tokens, and ${documentationRoutes.length} documentation routes verified.`,
  )
}
