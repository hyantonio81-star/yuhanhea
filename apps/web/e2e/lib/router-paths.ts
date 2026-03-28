import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * `router.tsx`의 `path: '/…'` 목록 (index 리다이렉트 제외).
 */
export function getRouterPaths(): string[] {
  const routerPath = path.join(__dirname, '../../src/app/router.tsx')
  const src = fs.readFileSync(routerPath, 'utf8')
  const paths = new Set<string>()
  const re = /\{\s*path:\s*'([^']+)'/g
  let m: RegExpExecArray | null
  while ((m = re.exec(src)) !== null) {
    paths.add(m[1])
  }
  return [...paths].sort()
}
