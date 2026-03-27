import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const navPath = path.join(__dirname, '../src/app/nav.ts')
let s = fs.readFileSync(navPath, 'utf8')
s = s.replace(/  label: string\n/, '')
s = s.replace(/, label: '[^']*'/g, '')
fs.writeFileSync(navPath, s)
console.log('Stripped labels from nav.ts')
