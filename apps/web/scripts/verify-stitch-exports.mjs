import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const stitchLazyPath = path.join(root, 'src/app/lazy/stitchLazyPages.ts')
const stitchDir = path.join(root, 'src/pages/stitch')

function extractStitchLazyNames(ts) {
  const names = new Set()
  const patterns = [
    /stitchLazy\(\s*'([^']+)'\s*\)/g,
    /stitchLazyFrom\(\s*'([^']+)'\s*,/g,
  ]
  for (const re of patterns) {
    let m
    while ((m = re.exec(ts)) !== null) names.add(m[1])
  }
  return names
}

function extractExportedPageFunctions(ts) {
  const names = new Set()
  const re = /^export function (\w+)/gm
  let m
  while ((m = re.exec(ts)) !== null) names.add(m[1])
  return names
}

function collectStitchExports() {
  const all = new Set()
  const files = fs.readdirSync(stitchDir, { withFileTypes: true })
  for (const e of files) {
    if (!e.isFile() || !e.name.endsWith('.tsx')) continue
    if (e.name === 'ExtraPages.tsx' && fs.existsSync(path.join(stitchDir, 'chunks'))) {
      // 배럴만 있으면 스킵 가능 — 현재는 배럴+청크 병행 시 chunks만 스캔
    }
    const p = path.join(stitchDir, e.name)
    const text = fs.readFileSync(p, 'utf8')
    // StitchPageShell 등 Page 래퍼는 export function이 없거나 Page만
    for (const n of extractExportedPageFunctions(text)) {
      if (n === 'Page') continue
      all.add(n)
    }
  }
  const chunksDir = path.join(stitchDir, 'chunks')
  if (fs.existsSync(chunksDir)) {
    for (const f of fs.readdirSync(chunksDir)) {
      if (!f.endsWith('.tsx')) continue
      const text = fs.readFileSync(path.join(chunksDir, f), 'utf8')
      for (const n of extractExportedPageFunctions(text)) {
        if (n === 'Page') continue
        all.add(n)
      }
    }
  }
  return all
}

const lazySrc = fs.readFileSync(stitchLazyPath, 'utf8')
const required = extractStitchLazyNames(lazySrc)
const exported = collectStitchExports()

const missing = [...required].filter((n) => !exported.has(n))
const orphan = [...exported].filter((n) => !required.has(n) && n.endsWith('Page'))

if (missing.length) {
  console.error('stitchLazy references missing from stitch exports:', missing.sort())
  process.exit(1)
}

if (orphan.length) {
  console.warn('Exported *Page components not referenced by stitchLazy (may be dead):', orphan.sort())
}

console.log('verify-stitch-exports: OK,', required.size, 'lazy names matched')
