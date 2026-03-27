/**
 * 고위험 이상 npm audit — 루트 워크스페이스 기준
 * exit 1 이면 CI/로컬에서 차단 가능
 */
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

console.error('security-check: npm audit --audit-level=high (root workspaces)\n')
try {
  execSync('npm audit --audit-level=high', { cwd: root, stdio: 'inherit' })
  console.error('\nsecurity-check: OK')
} catch {
  console.error('\nsecurity-check: FAIL — 취약점을 수정하거나 감사 예외를 문서화하세요.')
  process.exit(1)
}
