import 'dotenv/config'
import { validateServerEnv } from '@skyhub/env/server'
const env = validateServerEnv()
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import { connectDB } from './db/connection.js'
import { registerAuthMiddleware } from './middleware/authenticate.js'
import { authRoutes } from './routes/auth.js'
import { userRoutes } from './routes/users.js'
import { clientAuthRoutes } from './routes/client-auth.js'
import { clientBookingsRoutes } from './routes/client-bookings.js'
import { operatorBookingsRoutes } from './routes/operator-bookings.js'

const port = env.PORT

async function main(): Promise<void> {
  const app = Fastify({ logger: true, bodyLimit: 10 * 1024 * 1024 /* 10MB */ })

  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const uploadsDir = path.resolve(__dirname, '..', 'uploads')
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })

  await app.register(cors, { origin: env.CORS_ORIGIN === '*' ? true : env.CORS_ORIGIN })
  await app.register(jwt, { secret: env.JWT_SECRET })
  await app.register(multipart, { limits: { fileSize: 2 * 1024 * 1024 } })
  await app.register(fastifyStatic, {
    root: uploadsDir,
    prefix: '/uploads/',
    decorateReply: false,
  })

  registerAuthMiddleware(app)

  await connectDB(env.MONGODB_URI)

  app.get('/health', async () => ({ status: 'ok' }))

  await app.register(authRoutes)
  await app.register(userRoutes)
  await app.register(clientAuthRoutes)
  await app.register(clientBookingsRoutes)
  await app.register(operatorBookingsRoutes)

  await app.listen({ port, host: '0.0.0.0' })
  console.log(`\u2713 Server listening on port ${port}`)
}

main().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})
