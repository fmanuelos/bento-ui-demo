import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import test from 'node:test'
import { readTemplateCatalog, validateTemplateSource } from './template-catalog.mjs'

const root = process.cwd()
const inventory = readFileSync(join(root, 'design/templates/README.md'), 'utf8')
const source = (slug) => readFileSync(join(root, `design/templates/${slug}.md`), 'utf8')

for (const slug of [
  'authentication',
  'product-landing',
  'public-content',
  'public-status-overview',
  'initial-setup',
  'checkout',
  'record-collection',
]) {
  test(`${slug} accepts its own mode and workflows`, () => {
    assert.deepEqual(validateTemplateSource(source(slug), slug, inventory), [])
  })
}

test('rejects unknown modes, incorrect mode links, and multiple primary modes', () => {
  for (const classification of [
    '- Primary mode: [Unknown](../experiences/focused-flow.md).',
    '- Primary mode: [toString](../experiences/focused-flow.md).',
    '- Primary mode: [Public Site](../experiences/focused-flow.md).',
    '- Primary mode: [Focused Flow](../experiences/focused-flow.md).\n- Primary mode: [Public Site](../experiences/public-site.md).',
  ]) {
    const changed = source('authentication').replace(/^- Primary mode: .+$/m, classification)
    assert.ok(
      validateTemplateSource(changed, 'authentication', inventory).some((failure) =>
        failure.includes('canonical primary mode'),
      ),
    )
  }
})

test('rejects workflow links belonging only to a different mode', () => {
  const changed = source('record-collection').replace(
    'workflows.md#application-workspace',
    'workflows.md#focused-flow',
  )
  assert.ok(
    validateTemplateSource(changed, 'record-collection', inventory).includes(
      'missing workflow validation for its primary mode',
    ),
  )
})

test('rejects missing sections, missing inventory membership, and missing maturity', () => {
  const changed = source('authentication')
    .replace('## Accessibility', '### Accessibility')
    .replace('Draft.', 'Undecided.')
  const failures = validateTemplateSource(changed, 'authentication', '')
  assert.ok(failures.includes('required headings missing or out of order'))
  assert.ok(failures.includes('not in template inventory'))
  assert.ok(failures.includes('missing title, maturity, or intent'))
})

function fixture(t) {
  const directory = mkdtempSync(join(tmpdir(), 'bento-template-check-'))
  t.after(() => rmSync(directory, { recursive: true, force: true }))
  cpSync(join(root, 'design'), join(directory, 'design'), { recursive: true })
  for (const file of [
    'src/App.tsx',
    'src/docs/content/template-catalog.json',
    'src/docs/content/template-references.json',
  ]) {
    mkdirSync(dirname(join(directory, file)), { recursive: true })
    cpSync(join(root, file), join(directory, file))
  }
  return directory
}
function check(directory) {
  return spawnSync(process.execPath, [join(root, 'scripts/check-template-coverage.mjs')], {
    cwd: directory,
    encoding: 'utf8',
  })
}

test('checker accepts all contracts without requiring unimplemented reference routes', (t) => {
  const directory = fixture(t)
  const result = check(directory)
  assert.equal(result.status, 0, result.stderr)
  const catalog = readTemplateCatalog(directory)
  assert.equal(catalog.length, readTemplateCatalog(root).length)
  assert.equal(new Set(catalog.map((entry) => entry.mode)).size, 3)
})

test('checker rejects stale generated metadata', (t) => {
  const directory = fixture(t)
  const file = join(directory, 'src/docs/content/template-catalog.json')
  const catalog = JSON.parse(readFileSync(file, 'utf8'))
  catalog[0].status = 'Complete'
  writeFileSync(file, JSON.stringify(catalog))
  const result = check(directory)
  assert.equal(result.status, 1)
  assert.match(result.stderr, /catalog is stale/)
})

test('checker rejects broken dependency paths and heading anchors', (t) => {
  const directory = fixture(t)
  const file = join(directory, 'design/templates/record-detail.md')
  writeFileSync(
    file,
    readFileSync(file, 'utf8') +
      '\n[Missing](../blocks/missing.md) and [Bad anchor](../verification/workflows.md#missing-section).\n',
  )
  const result = check(directory)
  assert.equal(result.status, 1)
  assert.match(result.stderr, /broken link/)
  assert.match(result.stderr, /broken anchor/)
})

test('checker rejects advertised references without implemented routes', (t) => {
  const directory = fixture(t)
  const file = join(directory, 'src/docs/content/template-references.json')
  const references = JSON.parse(readFileSync(file, 'utf8'))
  references.settings = {
    note: 'A proposed example.',
    references: [{ label: 'Open settings', href: '/examples/settings' }],
  }
  writeFileSync(file, JSON.stringify(references))
  const result = check(directory)
  assert.equal(result.status, 1)
  assert.match(result.stderr, /settings: missing or invalid reference route/)
})
