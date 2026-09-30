import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = process.cwd()
const sourceDirectory = join(root, 'src')
const failures = []

const designSource = readFileSync(join(root, 'DESIGN.md'), 'utf8')
const themeSource = readFileSync(join(root, 'src/theme.css'), 'utf8')
const designTokens = JSON.parse(readFileSync(join(root, 'tokens.json'), 'utf8'))

function tokenHex(name) {
  return designTokens.color?.[name]?.$value?.hex
}

function relativeLuminance(hex) {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)
    .map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) => (channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4))

  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
}

function contrastRatio(first, second) {
  const firstLuminance = relativeLuminance(first)
  const secondLuminance = relativeLuminance(second)
  const lighter = Math.max(firstLuminance, secondLuminance)
  const darker = Math.min(firstLuminance, secondLuminance)

  return (lighter + 0.05) / (darker + 0.05)
}

function requireContrast(foregroundName, backgroundNames) {
  const foreground = tokenHex(foregroundName)

  if (!foreground) {
    failures.push(`tokens.json must export ${foregroundName} as a hex color`)
    return
  }

  for (const backgroundName of backgroundNames) {
    const background = tokenHex(backgroundName)

    if (!background) {
      failures.push(`tokens.json must export ${backgroundName} as a hex color`)
      continue
    }

    const ratio = contrastRatio(foreground, background)
    if (ratio < 3) {
      failures.push(
        `${foregroundName} ${foreground} has ${ratio.toFixed(2)}:1 contrast against ${backgroundName} ${background}; expected at least 3:1`,
      )
    }
  }
}

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

const lightSurfaces = [
  'background-primary',
  'background-secondary',
  'background-tertiary',
  'background-accent',
  'surface-primary',
  'surface-secondary',
  'surface-raised',
]
const darkSurfaces = [
  'dark-background-primary',
  'dark-background-secondary',
  'dark-background-tertiary',
  'dark-background-accent',
  'dark-surface-primary',
  'dark-surface-secondary',
  'dark-surface-raised',
]

requireContrast('focus-ring', lightSurfaces)
requireContrast('border-focus', lightSurfaces)
requireContrast('dark-focus-ring', darkSurfaces)
requireContrast('dark-border-focus', darkSurfaces)

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
  console.log(
    'Focus outlines consistently use a 3px ring with a 2px offset and at least 3:1 surface contrast.',
  )
}
