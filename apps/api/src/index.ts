import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import type { SuiteVariables } from './auth.js'
import { authMiddleware } from './auth.js'
import { suiteCorsMiddleware } from './corsConfig.js'
import { tenantIsolationMiddleware } from './tenantIsolation.js'
import { traceMiddleware } from './traceMiddleware.js'
import { ensureDataDir } from './store/dataDir.js'
import { getDb } from './store/sqlite.js'
import { startOutboxWorker } from './outboxWorker.js'
import { healthHandler } from './health.js'
import { v1 } from './routes/v1.js'

const PORT = Number(process.env.PORT ?? 8787)

ensureDataDir()
getDb()

const app = new Hono<{ Variables: SuiteVariables }>()

app.use('*', suiteCorsMiddleware())
app.use('*', async (c, next) => traceMiddleware(c, next))
app.use('*', async (c, next) => authMiddleware(c, next))
app.use('*', async (c, next) => tenantIsolationMiddleware(c, next))

app.get('/health', (c) => healthHandler(c))

app.route('/api/v1', v1)

serve({ fetch: app.fetch, port: PORT }, (info) => {
  console.log(`BFF listening on http://127.0.0.1:${info.port}`)
  startOutboxWorker()
})
