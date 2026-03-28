/**
 * One-off generator: ExtraPages.tsx → StitchPageShell + chunks/stitchChunk*.tsx + manifest.
 * Run: node scripts/split-extrapages-to-chunks.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const stitchDir = path.join(root, 'src/pages/stitch')
const extraPath = path.join(stitchDir, 'ExtraPages.tsx')
const chunksDir = path.join(stitchDir, 'chunks')
const NUM_CHUNKS = 6

const src = fs.readFileSync(extraPath, 'utf8')
const firstExportIdx = src.indexOf('export function AiCreativeAnalysisPage')
if (firstExportIdx < 0) throw new Error('Could not find first export function')
const preamble = src.slice(0, firstExportIdx).trimEnd()
const rest = src.slice(firstExportIdx)

const re = /export function (\w+)\(/g
const indices = []
let m
while ((m = re.exec(rest)) !== null) {
  indices.push({ name: m[1], start: m.index })
}

const parts = []
for (let i = 0; i < indices.length; i++) {
  const start = indices[i].start
  const end = i + 1 < indices.length ? indices[i + 1].start : rest.length
  parts.push(rest.slice(start, end).trim())
}

if (!fs.existsSync(chunksDir)) fs.mkdirSync(chunksDir, { recursive: true })

// StitchPageShell: types + exported Page helper
const shellBody = preamble
  .replace(/React\.ReactNode/g, 'ReactNode')
  .replace(/^type PageProps/m, 'export type PageProps')
  .replace(/^function Page\b/m, 'export function Page')
const shellPath = path.join(stitchDir, 'StitchPageShell.tsx')
fs.writeFileSync(
  shellPath,
  `import type { ReactNode } from 'react'\n\n${shellBody}\n`,
  'utf8',
)

const manifest = {}
const chunkFiles = []

for (let c = 0; c < NUM_CHUNKS; c++) {
  const chunkParts = parts.filter((_, idx) => idx % NUM_CHUNKS === c)
  const chunkName = `stitchChunk${c}`
  const names = []
  for (let idx = c; idx < parts.length; idx += NUM_CHUNKS) {
    const name = indices[idx].name
    names.push(name)
    manifest[name] = chunkName
  }
  if (chunkParts.length === 0) continue
  const body = chunkParts.join('\n\n')
  const out = `import { Page } from '../StitchPageShell'\n\n${body}\n`
  const outPath = path.join(chunksDir, `${chunkName}.tsx`)
  fs.writeFileSync(outPath, out, 'utf8')
  chunkFiles.push(chunkName)
}

fs.writeFileSync(
  path.join(chunksDir, 'stitch-chunk-manifest.json'),
  JSON.stringify(manifest, null, 2),
  'utf8',
)

const barrelExports = chunkFiles.map((f) => `export * from './chunks/${f}'`).join('\n')
const newExtra = `/**\n * Stitch 페이지 배럴 — lazy 청크는 chunks/*.tsx\n */\nexport * from './StitchPageShell'\n${barrelExports}\n`
fs.writeFileSync(extraPath, newExtra, 'utf8')

const lazyPath = path.join(root, 'src/app/lazy/stitchLazyPages.ts')
const oldLazy = fs.readFileSync(lazyPath, 'utf8')
const exportLines = []
const reLazy = /export const (\w+)\s*=\s*stitchLazy\(\s*'([^']+)'\s*\)/g
let ml
while ((ml = reLazy.exec(oldLazy)) !== null) {
  const varName = ml[1]
  const compName = ml[2]
  const chunk = manifest[compName]
  if (!chunk) throw new Error(`manifest missing ${compName}`)
  exportLines.push(
    `export const ${varName} = stitchLazyFrom('${compName}', () => import('../../pages/stitch/chunks/${chunk}'))`,
  )
}

const lazyHeader = `import { lazy, type ComponentType } from 'react'

function stitchLazyFrom(
  name: string,
  importer: () => Promise<Record<string, ComponentType<object>>>,
) {
  return lazy(() =>
    importer().then((m) => {
      const C = (m as Record<string, ComponentType<object>>)[name]
      if (!C) throw new Error(\`Stitch chunk missing export: \${name}\`)
      return { default: C }
    }),
  )
}

`

fs.writeFileSync(lazyPath, lazyHeader + exportLines.join('\n\n') + '\n', 'utf8')

console.log('Wrote StitchPageShell.tsx,', chunkFiles.length, 'chunks, manifest, ExtraPages, stitchLazyPages')
