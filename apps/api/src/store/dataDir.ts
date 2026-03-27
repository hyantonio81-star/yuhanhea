import { existsSync, mkdirSync } from 'fs'
import { join } from 'path'

export const DATA_DIR = process.env.DATA_DIR?.trim() || join(process.cwd(), 'data')

export function ensureDataDir(): void {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true })
}
