import 'dotenv/config'
import { validateServerEnv } from '@skyhub/env/server'
const env = validateServerEnv()
import bcrypt from 'bcryptjs'
import { connectDB } from './db/connection.js'
import { User } from './models/User.js'
import { VOYAGER_OPERATOR_ID } from './data/voyager-seed-data.js'

/**
 * Voyager agent seed — creates a default operator user that can log in to
 * the agent dashboard at /agent. Idempotent.
 *
 *   email:    agent@voyager.vn
 *   password: voyager123
 *   operator: voyager (matches VOYAGER_OPERATOR_ID so they see all customer bookings)
 *
 * Run: npm run seed:voyager-agent
 */
async function seedVoyagerAgent() {
  await connectDB(env.MONGODB_URI)

  const userId = 'voyager-agent-001'
  const email = 'agent@voyager.vn'
  const password = 'voyager123'
  const now = new Date().toISOString()
  const passwordHash = await bcrypt.hash(password, 12)

  await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        operatorId: VOYAGER_OPERATOR_ID,
        'profile.firstName': 'Voyager',
        'profile.lastName': 'Agent',
        'profile.email': email,
        'profile.phone': '+84 0000000000',
        'profile.department': 'Concierge',
        'profile.location': 'HAN — Noi Bai International',
        'security.passwordHash': passwordHash,
        'security.lastPasswordChange': now,
        'preferences.language': 'en',
        'preferences.timezone': 'Asia/Ho_Chi_Minh',
        role: 'operator',
        isActive: true,
        lastLoginUtc: now,
        updatedAt: now,
      },
      $setOnInsert: { _id: userId, createdAt: now },
    },
    { upsert: true, new: true },
  )

  console.log(`✓ Seeded Voyager agent — ${email} / ${password}`)
  process.exit(0)
}

seedVoyagerAgent().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
