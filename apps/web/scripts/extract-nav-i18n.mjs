import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const navPath = path.join(__dirname, '../src/app/nav.ts')
const text = fs.readFileSync(navPath, 'utf8')

function pathToKey(route) {
  return route
    .replace(/^\//, '')
    .replace(/\//g, '_')
    .replace(/-/g, '_')
}

const pairs = []
const re = /\{\s*to:\s*'([^']+)'\s*,\s*label:\s*'([^']*)'/g
let m
while ((m = re.exec(text)) !== null) {
  pairs.push({ to: m[1], label: m[2], key: pathToKey(m[1]) })
}

const out = { ko: { nav: {} }, es: { nav: {} } }
for (const { key, label } of pairs) {
  out.ko.nav[key] = label
  out.es.nav[key] = label
}

console.log(JSON.stringify(out, null, 2))
