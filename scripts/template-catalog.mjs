import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

export const templateHeadings = [
  'Status',
  'Intent',
  'Use when',
  'Do not use when',
  'Classification',
  'Regions and hierarchy',
  'Participating contracts',
  'Actions and permissions',
  'States, sequence, and continuity',
  'Content and data requirements',
  'Responsive and localization behavior',
  'Accessibility',
  'Product instantiation',
  'Reference pages and validation',
]

const modes = {
  'Public Site': {
    file: 'public-site',
    workflows: ['public-landing', 'public-content', 'public-status'],
  },
  'Focused Flow': { file: 'focused-flow', workflows: ['focused-flow'] },
  'Application Workspace': { file: 'application-workspace', workflows: ['application-workspace'] },
}
const section = (source, heading) =>
  source.split(`## ${heading}\n`)[1]?.split('\n## ')[0].trim() ?? ''

export function templateMetadata(source, slug) {
  const classification = section(source, 'Classification')
  return {
    slug,
    path: `/design/templates/${slug}.md`,
    title: source.match(/^# (.+) template$/m)?.[1] ?? '',
    status: section(source, 'Status').match(/^(Proposed|Draft|Complete|Deprecated)\b/)?.[1] ?? '',
    mode: classification.match(/^- Primary mode: \[([^\]]+)\]/m)?.[1] ?? '',
    summary: section(source, 'Intent').split('\n\n')[0].replace(/\n/g, ' '),
  }
}

export function validateTemplateSource(source, slug, inventory) {
  const failures = []
  const metadata = templateMetadata(source, slug)
  const actual = [...source.matchAll(/^## (.+)$/gm)].map((match) => match[1])
  if (JSON.stringify(actual) !== JSON.stringify(templateHeadings))
    failures.push('required headings missing or out of order')
  if (!inventory.includes(`](${slug}.md)`)) failures.push('not in template inventory')
  if (!metadata.title || !metadata.status || !metadata.summary)
    failures.push('missing title, maturity, or intent')
  const classification = section(source, 'Classification')
  const mode = Object.hasOwn(modes, metadata.mode) ? modes[metadata.mode] : undefined
  if (
    !mode ||
    (classification.match(/Primary mode:/g) ?? []).length !== 1 ||
    !classification.includes(`- Primary mode: [${metadata.mode}](../experiences/${mode.file}.md).`)
  )
    failures.push('declare exactly one canonical primary mode with its contract link')
  const validation = section(source, 'Reference pages and validation')
  if (
    mode &&
    !mode.workflows.some((anchor) => validation.includes(`../verification/workflows.md#${anchor})`))
  )
    failures.push('missing workflow validation for its primary mode')
  for (const target of [
    '../verification/baseline.md',
    '../verification/stress-tests.md#template-conformance',
  ]) {
    if (!validation.includes(`](${target})`)) failures.push(`missing validation: ${target}`)
  }
  return failures
}

export function readTemplateCatalog(root) {
  return readdirSync(join(root, 'design/templates'))
    .filter((file) => file.endsWith('.md') && file !== 'README.md')
    .map((file) =>
      templateMetadata(
        readFileSync(join(root, 'design/templates', file), 'utf8'),
        file.slice(0, -3),
      ),
    )
    .sort((a, b) => a.title.localeCompare(b.title))
}

export function catalogIsCurrent(expected, actual) {
  return JSON.stringify(expected) === JSON.stringify(actual)
}
