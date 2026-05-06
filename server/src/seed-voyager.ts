import 'dotenv/config'
import { validateServerEnv } from '@skyhub/env/server'
const env = validateServerEnv()
import { connectDB } from './db/connection.js'
import { Airport } from './models/Airport.js'
import { Product } from './models/Product.js'
import { FxRate } from './models/FxRate.js'
import { Client } from './models/Client.js'
import {
  SEED_AIRPORTS,
  SEED_FAST_TRACK_PRODUCTS,
  VOYAGER_OPERATOR_ID,
  fastTrackProductId,
  fastTrackTitle,
} from './data/voyager-seed-data.js'

/**
 * Idempotent seed: safe to run repeatedly. Each entity is upserted by its
 * deterministic _id. Voyager pivoted to Fast-Track-only on 2026-05-06; this
 * seed deletes legacy destination/multi-service product docs so the new model
 * is the single source of truth.
 *
 * Run: npm run seed:voyager
 */

async function seedVoyager(): Promise<void> {
  await connectDB(env.MONGODB_URI)

  const now = new Date().toISOString()
  let airportCount = 0
  let productCount = 0

  // ═══ 0. FX rate (must exist before products so VND can derive) ═══
  const usdVnd = env.FX_FALLBACK_USD_VND
  await FxRate.findByIdAndUpdate(
    'USD/VND',
    {
      $set: { pair: 'USD/VND', rate: usdVnd, source: 'seed-fallback', fetchedAt: now, updatedAt: now },
      $setOnInsert: { _id: 'USD/VND' },
    },
    { upsert: true, new: true },
  )
  console.log(`✓ FX rate USD/VND seeded at ${usdVnd}`)

  // ═══ 1. Airports ═══
  for (const a of SEED_AIRPORTS) {
    const id = a.iataCode.toLowerCase()
    await Airport.findByIdAndUpdate(
      id,
      {
        $set: {
          iataCode: a.iataCode,
          icaoCode: a.icaoCode,
          name: a.name,
          city: a.city,
          country: 'Vietnam',
          countryIso2: 'VN',
          timezone: 'Asia/Ho_Chi_Minh',
          isActive: a.isActive,
          updatedAt: now,
        },
        $setOnInsert: { _id: id, createdAt: now },
      },
      { upsert: true, new: true },
    )
    airportCount += 1
  }

  // ═══ 2. Wipe legacy products (anything not in the Fast-Track-only set) ═══
  const liveIds = SEED_FAST_TRACK_PRODUCTS.map((p) => fastTrackProductId(p))
  const removed = await Product.deleteMany({ _id: { $nin: liveIds } })
  if (removed.deletedCount) console.log(`✓ Removed ${removed.deletedCount} legacy products`)

  // ═══ 3. Fast-Track products ═══
  for (const p of SEED_FAST_TRACK_PRODUCTS) {
    const id = fastTrackProductId(p)
    const fitPriceVnd = Math.round(p.fitPriceUsd * usdVnd)
    const gitPriceVnd = Math.round(p.gitPriceUsd * usdVnd)
    await Product.findByIdAndUpdate(
      id,
      {
        $set: {
          airportCode: p.airportCode,
          segment: p.segment,
          direction: p.direction,
          serviceType: 'fastTrack',
          title: fastTrackTitle(p),
          icon: '⚡',
          fitPriceUsd: p.fitPriceUsd,
          gitPriceUsd: p.gitPriceUsd,
          fitPriceVnd,
          gitPriceVnd,
          priceVnd: fitPriceVnd,
          description: '',
          inclusions: p.inclusions,
          inventoryDailyCap: p.inventoryDailyCap,
          isActive: true,
          destinationSlug: '',
          updatedAt: now,
        },
        $setOnInsert: { _id: id, createdAt: now },
      },
      { upsert: true, new: true },
    )
    productCount += 1
  }

  // ═══ 4. Demo client ═══
  const demoClientId = 'voyager-demo-client-001'
  const existingDemo = await Client.findById(demoClientId)
  if (!existingDemo) {
    await Client.create({
      _id: demoClientId,
      operatorId: VOYAGER_OPERATOR_ID,
      profile: {
        firstName: 'Demo',
        lastName: 'Traveller',
        email: 'demo@voyager.vn',
        phone: '912345678',
        countryCode: '+84',
        nationalId: '',
        avatarUrl: '',
      },
      security: {
        passwordHash: '',
        phoneVerified: true,
        emailVerified: true,
        biometricEnabled: false,
        authMethods: ['phone', 'email'],
        googleSub: '',
        facebookId: '',
        webauthnCredentialIds: [],
        lastPasswordChange: now,
      },
      preferences: { currency: 'VND', locale: 'en' },
      isActive: true,
      lastLoginUtc: '',
      createdAt: now,
      updatedAt: now,
    })
    console.log('✓ Created demo client: demo@voyager.vn')
  } else {
    console.log('✓ Demo client already exists, skipping')
  }

  console.log(`✓ Upserted ${airportCount} airports`)
  console.log(`✓ Upserted ${productCount} Fast-Track products`)
  console.log('✓ Voyager seed complete')
  process.exit(0)
}

seedVoyager().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
