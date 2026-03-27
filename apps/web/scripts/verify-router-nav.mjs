import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const navTs = fs.readFileSync(path.join(root, 'src/app/nav.ts'), 'utf8')
const navTos = new Set()
const reNav = /\{\s*to:\s*'([^']+)'/g
let m
while ((m = reNav.exec(navTs)) !== null) navTos.add(m[1])

const routerTs = fs.readFileSync(path.join(root, 'src/app/router.tsx'), 'utf8')
const routerPaths = new Set()
const rePath = /\{\s*path:\s*'([^']+)'/g
while ((m = rePath.exec(routerTs)) !== null) routerPaths.add(m[1])

const missingInRouter = [...navTos].filter((p) => !routerPaths.has(p))
const extraInRouter = [...routerPaths].filter(
  (p) => !navTos.has(p) && p !== '*' && !p.includes(':'),
)

// index redirect and nested routes — only flat paths
const onlyNav = missingInRouter.filter(Boolean)
if (onlyNav.length) {
  console.error('nav.ts routes missing in router:', onlyNav)
  process.exit(1)
}
if (extraInRouter.length) {
  console.warn('router paths not in nav (may be intentional):', extraInRouter)
}
console.log('router/nav parity: OK,', navTos.size, 'nav routes')
