import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'

const root = process.cwd()
const directory = join(root, 'design/templates')
const inventory = readFileSync(join(directory, 'README.md'), 'utf8')
const headings = [
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
const failures = []
const contracts = readdirSync(directory).filter(
  (file) => file.endsWith('.md') && file !== 'README.md',
)
for (const file of contracts) {
  const path = join(directory, file)
  const source = readFileSync(path, 'utf8')
  const actual = [...source.matchAll(/^## (.+)$/gm)].map((match) => match[1])
  if (JSON.stringify(actual) !== JSON.stringify(headings))
    failures.push(`${file}: required headings missing or out of order`)
  if (!inventory.includes(`](${file})`)) failures.push(`${file}: not in template inventory`)
  if (!source.includes('Primary mode: [Focused Flow]'))
    failures.push(`${file}: declare its supported primary mode`)
  if (!source.includes('../verification/workflows.md#focused-flow'))
    failures.push(`${file}: missing flow validation`)
  for (const [, target] of source.matchAll(/\]\(([^)]+)\)/g)) {
    if (/^[a-z]+:/i.test(target)) continue
    const [relative] = target.split('#')
    if (relative && !existsSync(resolve(dirname(path), relative)))
      failures.push(`${file}: broken link ${target}`)
  }
}
for (const slug of ['authentication', 'registration']) {
  if (!contracts.includes(`${slug}.md`)) failures.push(`${slug}: missing template`)
  const app = readFileSync(join(root, 'src/App.tsx'), 'utf8')
  if (!app.includes(`path="/examples/${slug}"`)) failures.push(`${slug}: missing reference route`)
}
if (failures.length) {
  console.error(failures.join('\n'))
  process.exitCode = 1
} else
  console.log(
    `Template coverage is complete: ${contracts.length} contracts and two reference routes.`,
  )
