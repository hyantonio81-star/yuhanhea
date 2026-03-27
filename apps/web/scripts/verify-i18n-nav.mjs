/**
 * Ensures every nav route has nav.ko.json / nav.es.json keys (pathToNavKey convention).
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

function pathToKey(route) {
  return route.replace(/^\//, '').replace(/\//g, '_').replace(/-/g, '_')
}

const navTs = fs.readFileSync(path.join(root, 'src/app/nav.ts'), 'utf8')
const keys = []
const re = /\{\s*to:\s*'([^']+)'/g
let m
while ((m = re.exec(navTs)) !== null) keys.push(pathToKey(m[1]))

const navKo = JSON.parse(fs.readFileSync(path.join(root, 'src/locales/nav.ko.json'), 'utf8'))
const navEs = JSON.parse(fs.readFileSync(path.join(root, 'src/locales/nav.es.json'), 'utf8'))

const missingKo = keys.filter((k) => navKo[k] == null)
const missingEs = keys.filter((k) => navEs[k] == null)
const extraKo = Object.keys(navKo).filter((k) => !keys.includes(k))
const extraEs = Object.keys(navEs).filter((k) => !keys.includes(k))

let exit = 0
if (missingKo.length || missingEs.length) {
  console.error('Missing translation keys:', { missingKo, missingEs })
  exit = 1
}
if (extraKo.length || extraEs.length) {
  console.warn('Orphan keys in locale files (safe but unused):', { extraKo, extraEs })
}

if (exit === 0 && !missingKo.length) console.log('i18n nav: OK,', keys.length, 'routes')
process.exit(exit)
