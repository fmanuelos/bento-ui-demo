import { readdirSync, readFileSync } from 'node:fs'
import { extname, join, relative } from 'node:path'

const root = process.cwd()
const sourceDirectory = join(root, 'src')
const iconDirectory = join(sourceDirectory, 'components/icons')
const iconIndex = readFileSync(join(iconDirectory, 'index.ts'), 'utf8')
const catalog = readFileSync(join(iconDirectory, 'catalog.ts'), 'utf8')
const iconSource = readFileSync(join(iconDirectory, 'Icon.tsx'), 'utf8')
const sizeSource = readFileSync(join(iconDirectory, 'sizes.ts'), 'utf8')
const componentDocs = readFileSync(join(sourceDirectory, 'docs/content/examples.tsx'), 'utf8')
const failures = []

const requiredSizes = [
  { key: 'xs', label: 'Extra small', pixels: 12, className: 'size-scale-3' },
  { key: 'sm', label: 'Small', pixels: 16, className: 'size-scale-4' },
  { key: 'md', label: 'Medium', pixels: 20, className: 'size-scale-5' },
  { key: 'lg', label: 'Large', pixels: 24, className: 'size-scale-6' },
  { key: 'xl', label: 'Extra large', pixels: 32, className: 'size-scale-8' },
]

function sourceFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) return sourceFiles(path)
    return ['.ts', '.tsx'].includes(extname(entry.name)) ? [path] : []
  })
}

for (const path of sourceFiles(sourceDirectory)) {
  if (path === join(iconDirectory, 'Icon.tsx')) continue
  const source = readFileSync(path, 'utf8')
  if (source.includes('<svg')) {
    failures.push(
      `${relative(root, path)} contains inline SVG; add an owned glyph under src/components/icons instead`,
    )
  }
  const longSizeMatch = source.match(
    /<[A-Z][A-Za-z]*Icon\b[^>]*\bsize=["'](extra-small|small|medium|large|extra-large)["']/s,
  )
  if (longSizeMatch) {
    failures.push(
      `${relative(root, path)} uses legacy icon size “${longSizeMatch[1]}”; use xs, sm, md, lg, or xl`,
    )
  }
}

for (const size of requiredSizes) {
  const entryPattern = new RegExp(`\\b${size.key}: \\{([\\s\\S]*?)\\n  \\},`)
  const entry = sizeSource.match(entryPattern)?.[1]
  if (!entry) {
    failures.push(`Icon size metadata is missing “${size.key}”`)
    continue
  }
  if (!entry.includes(`label: '${size.label}'`))
    failures.push(`Icon size “${size.key}” must use display label “${size.label}”`)
  if (!entry.includes(`pixels: ${size.pixels}`))
    failures.push(`Icon size “${size.key}” must render at ${size.pixels}px`)
  if (!entry.includes(`className: '${size.className}'`))
    failures.push(`Icon size “${size.key}” must use ${size.className}`)
}

if (!iconSource.includes("size = 'md'")) failures.push('The default icon size must be md')
if (!componentDocs.includes('iconSizeKeys.map'))
  failures.push('The component gallery must render from iconSizeKeys')
if (!componentDocs.includes('iconSizes[size]'))
  failures.push('The component gallery must display shared iconSizes metadata')

const glyphFiles = readdirSync(iconDirectory)
  .filter((file) => file.endsWith('Icon.tsx') && file !== 'Icon.tsx')
  .sort()

for (const file of glyphFiles) {
  const exportPath = `./${file.replace(/\.tsx$/, '')}`
  const componentName = file.replace(/\.tsx$/, '')
  if (!iconIndex.includes(`'${exportPath}'`)) {
    failures.push(`${file} is not exported from src/components/icons/index.ts`)
  }
  if (!catalog.includes(`import { ${componentName} } from '${exportPath}'`)) {
    failures.push(`${file} is not imported by src/components/icons/catalog.ts`)
  }
  if (!catalog.includes(`Icon: ${componentName}`)) {
    failures.push(`${file} has no catalog entry`)
  }
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'))
  process.exitCode = 1
} else {
  console.log(`Icon system is managed: ${glyphFiles.length} catalogued glyphs and no inline SVG.`)
}
