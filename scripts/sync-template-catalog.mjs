import { writeFileSync } from 'node:fs'
import { readTemplateCatalog } from './template-catalog.mjs'

writeFileSync(
  'src/docs/content/template-catalog.json',
  JSON.stringify(readTemplateCatalog(process.cwd()), null, 2) + '\n',
)
console.log('Updated generated template catalog from normative contracts.')
