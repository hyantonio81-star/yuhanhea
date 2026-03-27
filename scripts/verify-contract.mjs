/**
 * OpenAPI paths 키와 BFF 라우트 manifest 정합성 검사.
 * OpenAPI: openapi-yuhan-suite.yaml 의 `paths:` 아래 키 (예: /campaigns/{campaignId}/briefs)
 */
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const openapiPath = join(root, 'docs/integration/openapi-yuhan-suite.yaml')
const manifestPath = join(root, 'scripts/bff-routes-manifest.json')

const openapiYaml = readFileSync(openapiPath, 'utf8')
const openapiPaths = new Set()
for (const line of openapiYaml.split('\n')) {
  const m = line.match(/^  (\/[^\s]+):$/ )
  if (m) openapiPaths.add(m[1])
}

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
const manifestRoutes = manifest.routes

function normalizeOpenApiPathToKey(p) {
  return p.replace(/\{[^}]+\}/g, ':param')
}

function manifestPathToOpenApiStyle(path) {
  return path.replace(/:([^/]+)/g, '{$1}')
}

const openapiNormalized = new Set([...openapiPaths].map(normalizeOpenApiPathToKey))

let errors = 0
for (const r of manifestRoutes) {
  const openapiStyle = manifestPathToOpenApiStyle(r.path)
  if (!openapiPaths.has(openapiStyle)) {
    const n = normalizeOpenApiPathToKey(openapiStyle)
    if (!openapiNormalized.has(n)) {
      console.error(`[manifest] OpenAPI에 없는 경로: ${r.method} ${r.path} (expected ${openapiStyle})`)
      errors++
    }
  }
}

for (const p of openapiPaths) {
  const has = manifestRoutes.some((r) => manifestPathToOpenApiStyle(r.path) === p)
  if (!has) {
    console.error(`[openapi] manifest에 없는 경로: ${p}`)
    errors++
  }
}

if (errors > 0) {
  console.error(`\nverify-contract: ${errors} mismatch(es). OpenAPI와 scripts/bff-routes-manifest.json 을 맞추세요.`)
  process.exit(1)
}

console.log('verify-contract: OK (OpenAPI paths ↔ BFF manifest)')
process.exit(0)
