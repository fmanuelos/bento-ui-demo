import { readdirSync, readFileSync } from 'node:fs'
import { extname, join, relative } from 'node:path'

const root = process.cwd()
const sourceDirectory = join(root, 'src')
const iconDirectory = join(sourceDirectory, 'icons')
const iconIndex = readFileSync(join(iconDirectory, 'index.ts'), 'utf8')
const catalog = readFileSync(join(iconDirectory, 'catalog.ts'), 'utf8')
const failures = []

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
      `${relative(root, path)} contains inline SVG; add an owned glyph under src/icons instead`,
    )
  }
}

const glyphFiles = readdirSync(iconDirectory)
  .filter((file) => file.endsWith('Icon.tsx') && file !== 'Icon.tsx')
  .sort()

for (const file of glyphFiles) {
  const exportPath = `./${file.replace(/\.tsx$/, '')}`
  const componentName = file.replace(/\.tsx$/, '')
  if (!iconIndex.includes(`'${exportPath}'`)) {
    failures.push(`${file} is not exported from src/icons/index.ts`)
  }
  if (!catalog.includes(`import { ${componentName} } from '${exportPath}'`)) {
    failures.push(`${file} is not imported by src/icons/catalog.ts`)
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
