import 'dotenv/config'
import { validateServerEnv } from '@skyhub/env/server'
const env = validateServerEnv()
import { connectDB } from './db/connection.js'
import { Airport } from './models/Airport.js'
import { Destination } from './models/Destination.js'
import { Product } from './models/Product.js'
import { Client } from './models/Client.js'
import {
  SEED_AIRPORTS,
  SEED_DESTINATIONS,
  VOYAGER_OPERATOR_ID,
} from './data/voyager-seed-data.js'

/**
 * Idempotent seed: safe to run repeatedly. Each entity is upserted by its
 * deterministic _id, so running this again will update existing docs with the
 * latest seed content rather than duplicating.
 *
 * Run: npm run seed:voyager
 */

async function seedVoyager(): Promise<void> {
  await connectDB(env.MONGODB_URI)

  const now = new Date().toISOString()
  let airportCount = 0
  let destinationCount = 0
  let productCount = 0

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
          isActive: true,
          updatedAt: now,
        },
        $setOnInsert: { _id: id, createdAt: now },
      },
      { upsert: true, new: true },
    )
    airportCount += 1
  }

  // ═══ 2. Destinations ═══
  for (const d of SEED_DESTINATIONS) {
    await Destination.findByIdAndUpdate(
      d.slug,
      {
        $set: {
          slug: d.slug,
          name: d.name,
          airportCode: d.airportCode,
          airportName: d.airportName,
          description: d.description,
          headlinePriceVnd: d.headlinePriceVnd,
          stars: d.stars,
          photo: d.photo,
          isActive: true,
          updatedAt: now,
        },
        $setOnInsert: { _id: d.slug, createdAt: now },
      },
      { upsert: true, new: true },
    )
    destinationCount += 1

    // ═══ 3. Products (4 per destination) ═══
    for (const s of d.services) {
      const productId = `${d.slug}:${s.serviceType}`
      await Product.findByIdAndUpdate(
        productId,
        {
          $set: {
            destinationSlug: d.slug,
            airportCode: d.airportCode,
            serviceType: s.serviceType,
            title: s.title,
            icon: s.icon,
            priceVnd: s.priceVnd,
            description: '',
            isActive: true,
            updatedAt: now,
          },
          $setOnInsert: { _id: productId, createdAt: now },
        },
        { upsert: true, new: true },
      )
      productCount += 1
    }
  }

  // ═══ 4. Demo client (only on first run — not updated on reseed) ═══
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
    console.log('\u2713 Created demo client: demo@voyager.vn')
  } else {
    console.log('\u2713 Demo client already exists, skipping')
  }

  console.log(`\u2713 Upserted ${airportCount} airports`)
  console.log(`\u2713 Upserted ${destinationCount} destinations`)
  console.log(`\u2713 Upserted ${productCount} products`)
  console.log('\u2713 Voyager seed complete')
  process.exit(0)
}

seedVoyager().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
