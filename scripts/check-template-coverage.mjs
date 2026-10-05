import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import {
  catalogIsCurrent,
  readTemplateCatalog,
  validateTemplateSource,
} from './template-catalog.mjs'

const root = process.cwd()
const directory = join(root, 'design/templates')
const inventory = readFileSync(join(directory, 'README.md'), 'utf8')
const catalog = readTemplateCatalog(root)
const failures = []
const slugify = (heading) =>
  heading
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s/g, '-')

for (const template of catalog) {
  const file = `${template.slug}.md`
  const path = join(directory, file)
  const source = readFileSync(path, 'utf8')
  failures.push(
    ...validateTemplateSource(source, template.slug, inventory).map(
      (failure) => `${file}: ${failure}`,
    ),
  )
  for (const [, target] of source.matchAll(/\]\(([^)]+)\)/g)) {
    if (/^[a-z]+:/i.test(target)) continue
    const [relative, anchor] = target.split('#')
    const destination = relative ? resolve(dirname(path), relative) : path
    if (!existsSync(destination)) failures.push(`${file}: broken link ${target}`)
    else if (anchor && destination.endsWith('.md')) {
      const headings = [...readFileSync(destination, 'utf8').matchAll(/^#{1,6} (.+)$/gm)]
      if (!headings.some(([, heading]) => slugify(heading) === anchor))
        failures.push(`${file}: broken anchor ${target}`)
    }
  }
}

const generatedPath = join(root, 'src/docs/content/template-catalog.json')
if (
  !existsSync(generatedPath) ||
  !catalogIsCurrent(catalog, JSON.parse(readFileSync(generatedPath, 'utf8')))
)
  failures.push('Template catalog is stale; run pnpm templates:catalog')

const references = JSON.parse(
  readFileSync(join(root, 'src/docs/content/template-references.json'), 'utf8'),
)
const app = readFileSync(join(root, 'src/App.tsx'), 'utf8')
let referenceCount = 0
for (const [slug, entry] of Object.entries(references)) {
  if (!catalog.some((template) => template.slug === slug))
    failures.push(`${slug}: reference has no contract`)
  if (!entry.note || !entry.references?.length)
    failures.push(`${slug}: reference description or links missing`)
  for (const reference of entry.references ?? []) {
    const route = reference.href?.split('?')[0]
    if (!reference.label || !route?.startsWith('/examples/') || !app.includes(`path="${route}"`))
      failures.push(`${slug}: missing or invalid reference route ${reference.href}`)
    referenceCount++
  }
}
for (const slug of ['authentication', 'registration']) {
  if (!catalog.some((template) => template.slug === slug) || !references[slug])
    failures.push(`${slug}: existing contract or references missing`)
}

if (failures.length) {
  console.error(failures.join('\n'))
  process.exitCode = 1
} else
  console.log(
    `Template structure verified: ${catalog.length} contracts and ${referenceCount} reference links. Behavioral validation is separate.`,
  )
