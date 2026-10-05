import { writeFileSync } from 'node:fs'
import { readBlockCatalog } from './block-catalog.mjs'
writeFileSync(
  'src/docs/content/block-catalog.json',
  JSON.stringify(readBlockCatalog(process.cwd()), null, 2) + '\n',
)
console.log('Updated generated block catalog from normative contracts.')
