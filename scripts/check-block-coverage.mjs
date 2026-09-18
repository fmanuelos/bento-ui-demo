import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'

const root = process.cwd()
const blockDirectory = join(root, 'design/blocks')
const inventoryPath = join(blockDirectory, 'README.md')
const acceptedStatuses = ['Proposed', 'Draft', 'Complete', 'Deprecated']
const acceptedClassifications = ['Shared', 'Public Site', 'Application Workspace']
const requiredHeadings = [
  'Status',
  'Intent',
  'Use when',
  'Do not use when',
  'Anatomy',
  'Variants',
  'Participating components and related patterns',
  'Content requirements',
  'Layout and semantic token mapping',
  'States and behavior',
  'Responsive and localization behavior',
  'Accessibility',
  'Representative example',
  'Validation scenarios',
]

const failures = []
const inventorySource = readFileSync(inventoryPath, 'utf8')
const contracts = readdirSync(blockDirectory)
  .filter((file) => file.endsWith('.md') && file !== 'README.md')
  .sort()

function section(source, heading) {
  const marker = `## ${heading}`
  const start = source.indexOf(marker)
  if (start === -1) return ''
  const bodyStart = start + marker.length
  const next = source.indexOf('\n## ', bodyStart)
  return source.slice(bodyStart, next === -1 ? source.length : next)
}

function inventoryEntries(source) {
  const currentContracts = section(source, 'Current contracts')
  const entries = []

  for (const line of currentContracts.split(/\r?\n/)) {
    if (!line.startsWith('| [')) continue
    const cells = line
      .slice(1, -1)
      .split('|')
      .map((cell) => cell.trim())
    if (cells.length !== 5) {
      failures.push(`block inventory row has ${cells.length} cells instead of 5: ${line}`)
      continue
    }

    const contractMatch = cells[0].match(/^\[([^\]]+)\]\(([^)#]+\.md)\)$/)
    if (!contractMatch) {
      failures.push(`block inventory has an invalid contract link: ${cells[0]}`)
      continue
    }

    const status = cells[2].replaceAll('**', '')
    entries.push({
      name: contractMatch[1],
      file: contractMatch[2],
      classification: cells[1],
      status,
      validation: cells[4],
    })
  }

  return entries
}

function githubSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/<[^>]+>/g, '')
    .replace(/[`*_~]/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s/g, '-')
}

function headingAnchors(source) {
  const anchors = new Set()
  const counts = new Map()

  for (const match of source.matchAll(/^#{1,6} (.+?)(?:\s+#+)?$/gm)) {
    const base = githubSlug(match[1])
    const count = counts.get(base) ?? 0
    anchors.add(count === 0 ? base : `${base}-${count}`)
    counts.set(base, count + 1)
  }

  return anchors
}

function checkLocalLinks(file, source) {
  for (const match of source.matchAll(/\]\(([^)]+)\)/g)) {
    const rawTarget = match[1].replace(/^<|>$/g, '')
    if (/^[a-z][a-z+.-]*:/i.test(rawTarget) || rawTarget.startsWith('//')) continue

    const hashIndex = rawTarget.indexOf('#')
    const rawPath = hashIndex === -1 ? rawTarget : rawTarget.slice(0, hashIndex)
    const rawAnchor = hashIndex === -1 ? '' : rawTarget.slice(hashIndex + 1)
    let linkPath
    let anchor

    try {
      linkPath = decodeURIComponent(rawPath)
      anchor = decodeURIComponent(rawAnchor)
    } catch {
      failures.push(`${file} has an invalid encoded link: ${rawTarget}`)
      continue
    }

    const targetPath = linkPath ? resolve(dirname(file), linkPath) : file
    if (!existsSync(targetPath)) {
      failures.push(`${file} has a broken local link: ${rawTarget}`)
      continue
    }

    if (!anchor || !statSync(targetPath).isFile() || !targetPath.endsWith('.md')) continue
    const anchors = headingAnchors(readFileSync(targetPath, 'utf8'))
    if (!anchors.has(anchor)) failures.push(`${file} has a broken heading link: ${rawTarget}`)
  }
}

const entries = inventoryEntries(inventorySource)
const entriesByFile = new Map()

for (const entry of entries) {
  if (entriesByFile.has(entry.file)) {
    failures.push(`${entry.file} appears more than once in the block inventory`)
    continue
  }
  entriesByFile.set(entry.file, entry)

  if (!acceptedStatuses.includes(entry.status)) {
    failures.push(`${entry.file} has unsupported inventory status “${entry.status}”`)
  }
  if (!acceptedClassifications.includes(entry.classification)) {
    failures.push(
      `${entry.file} has unsupported classification “${entry.classification}”; use ${acceptedClassifications.join(', ')}`,
    )
  }

  const targetPath = resolve(blockDirectory, entry.file)
  if (dirname(targetPath) !== blockDirectory || !existsSync(targetPath)) {
    failures.push(`${entry.file} in the block inventory does not resolve to a contract`)
  }
}

for (const contract of contracts) {
  const entry = entriesByFile.get(contract)
  const contractPath = join(blockDirectory, contract)
  const source = readFileSync(contractPath, 'utf8')

  if (!entry) failures.push(`${contract} is missing from the block inventory`)

  const title = source.match(/^# (.+) block$/m)?.[1]
  if (!title) failures.push(`${contract} must begin with “# <name> block”`)
  else if (entry && entry.name !== title) {
    failures.push(`${contract} is named “${title}” but its inventory name is “${entry.name}”`)
  }

  const headings = [...source.matchAll(/^## (.+)$/gm)].map((match) => match[1])
  if (JSON.stringify(headings) !== JSON.stringify(requiredHeadings)) {
    failures.push(
      `${contract} headings must be ordered as: ${requiredHeadings.join(' → ')}; found: ${headings.join(' → ')}`,
    )
  }

  const webAdapters = [...source.matchAll(/^### Web adapter$/gm)]
  const accessibilityIndex = source.indexOf('## Accessibility')
  const webAdapterIndex = source.indexOf('### Web adapter')
  const exampleIndex = source.indexOf('## Representative example')
  if (webAdapters.length !== 1)
    failures.push(`${contract} must contain exactly one “### Web adapter”`)
  else if (!(webAdapterIndex > accessibilityIndex && webAdapterIndex < exampleIndex)) {
    failures.push(`${contract} must place “### Web adapter” under Accessibility before the example`)
  }

  const statusText = section(source, 'Status')
  const statuses = acceptedStatuses.filter((status) =>
    new RegExp(`\\b${status}\\b`).test(statusText),
  )
  if (statuses.length !== 1) {
    failures.push(`${contract} Status must name exactly one of: ${acceptedStatuses.join(', ')}`)
  } else if (entry && entry.status !== statuses[0]) {
    failures.push(
      `${contract} declares ${statuses[0]} but the block inventory declares ${entry.status}`,
    )
  }

  if (statuses[0] === 'Complete') {
    const validation = section(source, 'Validation scenarios')
    if (!/\]\(\.\.\/VALIDATION\.md#[^)]+\)/.test(validation)) {
      failures.push(`${contract} is Complete but has no linked validation-guide scenario`)
    }
    if (!entry?.validation.includes('../VALIDATION.md#')) {
      failures.push(`${contract} is Complete but its inventory row has no validation coverage link`)
    }
  }

  checkLocalLinks(contractPath, source)
}

for (const entry of entries) {
  if (!contracts.includes(entry.file)) {
    failures.push(`${entry.file} is listed in the block inventory but is not a block contract`)
  }
}

checkLocalLinks(inventoryPath, inventorySource)

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'))
  process.exitCode = 1
} else {
  console.log(
    `Block coverage is complete: ${contracts.length} contracts, ${entries.length} inventory entries.`,
  )
}
