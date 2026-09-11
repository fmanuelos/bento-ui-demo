import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = process.cwd()
const sourceDirectory = join(root, 'src')
const failures = []

const designSource = readFileSync(join(root, 'DESIGN.md'), 'utf8')
const themeSource = readFileSync(join(root, 'src/theme.css'), 'utf8')
const designTokens = JSON.parse(readFileSync(join(root, 'tokens.json'), 'utf8'))

if (!/^  focus-ring-width: 3px$/m.test(designSource)) {
  failures.push('DESIGN.md must define focus-ring-width as 3px')
}
if (!/^  focus-ring-offset-width: 2px$/m.test(designSource)) {
  failures.push('DESIGN.md must define focus-ring-offset-width as 2px')
}
if (!themeSource.includes('--spacing-focus-ring-width: 3px;')) {
  failures.push('src/theme.css must export --spacing-focus-ring-width as 3px')
}
if (!themeSource.includes('--spacing-focus-ring-offset-width: 2px;')) {
  failures.push('src/theme.css must export --spacing-focus-ring-offset-width as 2px')
}
if (designTokens.spacing?.['focus-ring-width']?.$value?.value !== 3) {
  failures.push('tokens.json must export focus-ring-width as 3px')
}
if (designTokens.spacing?.['focus-ring-offset-width']?.$value?.value !== 2) {
  failures.push('tokens.json must export focus-ring-offset-width as 2px')
}

function sourceFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) return sourceFiles(path)
    return /\.tsx?$/.test(entry.name) ? [path] : []
  })
}

for (const path of sourceFiles(sourceDirectory)) {
  const lines = readFileSync(path, 'utf8').split('\n')

  lines.forEach((line, index) => {
    const widthMatches = [...line.matchAll(/((?:peer-)?focus-visible):outline-(\d+)/g)]

    for (const [, variant, width] of widthMatches) {
      const location = `${relative(root, path)}:${index + 1}`
      if (width !== '3') {
        failures.push(`${location} uses ${variant}:outline-${width}; expected outline-3`)
        continue
      }

      const required = [
        `${variant}:outline-offset-2`,
        `${variant}:outline-focus-ring`,
        `${variant}:outline-solid`,
      ]

      for (const className of required) {
        if (!line.includes(className)) failures.push(`${location} is missing ${className}`)
      }
    }
  })
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'))
  process.exitCode = 1
} else {
  console.log('Focus outlines consistently use a 3px ring with a 2px offset.')
}
