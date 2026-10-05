import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

export function readBlockCatalog(root) {
  const section = (source, heading) =>
    source.split(`## ${heading}\n`)[1]?.split('\n## ')[0].trim() ?? ''
  return readdirSync(join(root, 'design/blocks'))
    .filter((file) => file.endsWith('.md') && file !== 'README.md')
    .map((file) => {
      const source = readFileSync(join(root, 'design/blocks', file), 'utf8')
      return {
        slug: file.replace('.md', ''),
        path: `/design/blocks/${file}`,
        title: source.match(/^# (.+) block/m)?.[1],
        status: section(source, 'Status').match(/\b(Proposed|Draft|Complete|Deprecated)\b/)?.[1],
        modes: (section(source, 'Use when').match(/^Supported modes: (.+)\.$/m)?.[1] ?? '').split(
          '; ',
        ),
        summary: section(source, 'Intent').split('\n\n')[0].replace(/\n/g, ' '),
      }
    })
    .sort((a, b) => a.title.localeCompare(b.title))
}
