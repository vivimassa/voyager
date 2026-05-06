import type { FastifyInstance } from 'fastify'
import crypto from 'node:crypto'
import { Booking, type BookingItem, type Direction, type IdType, type Passenger, type Tier } from '../models/Booking.js'
import { Product } from '../models/Product.js'
import { Inventory } from '../models/Inventory.js'
import { FxRate } from '../models/FxRate.js'
import { VOYAGER_OPERATOR_ID } from '../data/voyager-seed-data.js'

/**
 * Voyager CLIENT bookings — anonymous Fast-Track checkout.
 *
 * Flow:
 *   1. Browser submits cart line {productId, qty, direction, passengers[], travelDate, ...}.
 *   2. We re-read the Product server-side (untrusted client prices), map FIT/GIT
 *      from qty (≤5 = FIT, ≥6 = GIT), and decrement Inventory atomically.
 *   3. Booking is created with status='pending', payment.status='unpaid'.
 *   4. Caller follows up via /payments/vnpay/create or /payments/bank-transfer/start
 *      to advance the lifecycle and generate a ticket.
 *
 * Endpoints:
 *   POST  /clients/bookings            — create
 *   GET   /clients/bookings/:number    — fetch by booking number
 */

type IncomingPassenger = Partial<Passenger>

type IncomingItem = {
  productId: string
  qty?: number
  direction?: Direction
  travelDate?: string
  travelTime?: string
  flightNumber?: string
  passengers?: IncomingPassenger[]
}

type CreateBookingBody = {
  customerName?: string
  customerPhone?: string
  phoneCountryCode?: string
  contactEmail?: string
  paymentMethod?: 'vnpay' | 'bank_transfer'
  items: IncomingItem[]
  notes?: string
}

function normalisePhone(raw: string): string {
  const cleaned = raw.replace(/[\s\-().]/g, '')
  if (!cleaned) return ''
  if (cleaned.startsWith('+')) return cleaned
  if (cleaned.startsWith('84')) return `+${cleaned}`
  if (cleaned.startsWith('0')) return `+84${cleaned.slice(1)}`
  return cleaned
}

function isPlausiblePhone(phone: string): boolean {
  return /^\+?\d{8,15}$/.test(phone)
}

function generateBookingNumber(year: number): string {
  const noise = crypto.randomBytes(4).toString('hex').slice(0, 6).toUpperCase()
  return `VG-${year}-${noise}`
}

function tierForQty(qty: number): Tier {
  return qty >= 6 ? 'GIT' : 'FIT'
}

function sanitisePassenger(idType: IdType | undefined, p: IncomingPassenger): Passenger {
  return {
    firstName: (p.firstName ?? '').trim().slice(0, 80),
    lastName: (p.lastName ?? '').trim().slice(0, 80),
    dob: (p.dob ?? '').trim().slice(0, 10),
    nationality: (p.nationality ?? '').trim().toUpperCase().slice(0, 3),
    idType: (p.idType ?? idType ?? 'passport') as IdType,
    idNumber: (p.idNumber ?? '').trim().slice(0, 40),
  }
}

export async function clientBookingsRoutes(app: FastifyInstance) {
  // ═══ POST /clients/bookings ═══
  app.post<{ Body: CreateBookingBody }>(
    '/clients/bookings',
    async (req, reply) => {
      const {
        customerName = '',
        customerPhone = '',
        phoneCountryCode = '+84',
        contactEmail = '',
        paymentMethod = 'vnpay',
        items = [],
        notes = '',
      } = req.body ?? {}

      const name = customerName.trim()
      const phone = normalisePhone(customerPhone.trim())
      const email = contactEmail.trim().toLowerCase()

      if (!name) return reply.code(400).send({ error: 'Please enter your name.' })
      if (name.length > 80) return reply.code(400).send({ error: 'Name is too long (max 80).' })
      if (!phone || !isPlausiblePhone(phone)) {
        return reply.code(400).send({ error: 'Please enter a valid phone number.' })
      }
      if (email && !/^.+@.+\..+$/.test(email)) {
        return reply.code(400).send({ error: 'Please enter a valid email address.' })
      }
      if (!Array.isArray(items) || items.length === 0) {
        return reply.code(400).send({ error: 'Cart is empty' })
      }
      if (items.length > 20) {
        return reply.code(400).send({ error: 'Too many items (max 20)' })
      }
      if (!['vnpay', 'bank_transfer'].includes(paymentMethod)) {
        return reply.code(400).send({ error: 'Unknown payment method' })
      }

      // Re-hydrate from Products (canonical pricing).
      const productIds = items.map((i) => i.productId).filter(Boolean)
      if (productIds.length !== items.length) {
        return reply.code(400).send({ error: 'Every item must have a productId' })
      }
      const products = await Product.find({ _id: { $in: productIds } }).lean()
      const productById = new Map(products.map((p) => [p._id, p]))
      const missing = productIds.filter((id) => !productById.has(id))
      if (missing.length > 0) {
        return reply.code(400).send({ error: `Unknown product(s): ${missing.join(', ')}` })
      }

      // Current FX rate (USD→VND). Snapshot onto the booking for receipt parity.
      const fx = await FxRate.findById('USD/VND').lean()
      const fxRateUsdVnd = fx?.rate ?? 25500

      const operatorId = VOYAGER_OPERATOR_ID
      const bookingItems: BookingItem[] = []
      let subtotalUsd = 0
      let subtotalVnd = 0

      // Reserve inventory per line atomically. We collect rollback handles in
      // case any later step fails.
      type Reservation = { productId: string; date: string; qty: number }
      const reservations: Reservation[] = []
      const rollback = async () => {
        for (const r of reservations) {
          await Inventory.updateOne(
            { _id: `${r.productId}|${r.date}` },
            { $inc: { sold: -r.qty }, $set: { updatedAt: new Date().toISOString() } },
          ).catch(() => {})
        }
      }

      for (const input of items) {
        const product = productById.get(input.productId)!
        if (!product.isActive) {
          await rollback()
          return reply.code(400).send({ error: `Product unavailable: ${product.title}` })
        }

        const qty = Number.isFinite(input.qty) && input.qty! > 0 ? Math.floor(input.qty!) : 1
        const tier = tierForQty(qty)

        // Direction can be fixed by the product (e.g. CXR arrival-only) or
        // chosen by the user (e.g. HAN both → arrival|departure).
        const requestedDir = input.direction
        let direction: Direction
        if (product.direction === 'both') {
          if (requestedDir !== 'arrival' && requestedDir !== 'departure') {
            await rollback()
            return reply.code(400).send({ error: 'Please choose arrival or departure' })
          }
          direction = requestedDir
        } else {
          direction = product.direction
        }

        const idType: IdType = product.segment === 'international' ? 'passport' : 'cccd'
        const incomingPax = Array.isArray(input.passengers) ? input.passengers : []
        const passengers: Passenger[] = incomingPax.length
          ? incomingPax.slice(0, qty).map((p) => sanitisePassenger(idType, p))
          : Array.from({ length: qty }, () => sanitisePassenger(idType, {}))

        const unitPriceUsd = tier === 'GIT' && product.gitPriceUsd > 0 ? product.gitPriceUsd : product.fitPriceUsd
        const unitPriceVnd = Math.round(unitPriceUsd * fxRateUsdVnd)
        if (unitPriceUsd <= 0) {
          await rollback()
          return reply.code(400).send({ error: `${tier} pricing not available for this lane` })
        }

        const lineTotalUsd = unitPriceUsd * qty
        const lineTotalVnd = unitPriceVnd * qty

        const travelDate = (input.travelDate ?? '').trim()
        if (!travelDate || !/^\d{4}-\d{2}-\d{2}$/.test(travelDate)) {
          await rollback()
          return reply.code(400).send({ error: 'Please pick a valid travel date' })
        }

        // Inventory reservation. Atomic: only succeed if capacity allows (or
        // capacity 0 = unlimited).
        const invId = `${product._id}|${travelDate}`
        const nowIso = new Date().toISOString()
        if (product.inventoryDailyCap > 0) {
          // Step 1 — ensure the inventory doc exists for this lane+date so the
          // conditional increment below has a numeric `sold` field to compare
          // against. Upsert is no-op once the row exists.
          await Inventory.updateOne(
            { _id: invId },
            {
              $setOnInsert: {
                _id: invId,
                productId: product._id,
                date: travelDate,
                capacity: product.inventoryDailyCap,
                sold: 0,
                createdAt: nowIso,
                updatedAt: nowIso,
              },
            },
            { upsert: true },
          )
          // Step 2 — atomic decrement guarded by remaining capacity.
          const reserved = await Inventory.findOneAndUpdate(
            { _id: invId, sold: { $lte: product.inventoryDailyCap - qty } },
            {
              $inc: { sold: qty },
              $set: { capacity: product.inventoryDailyCap, updatedAt: nowIso },
            },
            { new: true },
          ).catch(() => null)
          if (!reserved) {
            await rollback()
            return reply.code(409).send({ error: 'Sold out for the selected date' })
          }
        } else {
          await Inventory.updateOne(
            { _id: invId },
            {
              $inc: { sold: qty },
              $set: { productId: product._id, date: travelDate, capacity: 0, updatedAt: nowIso },
              $setOnInsert: { _id: invId, createdAt: nowIso },
            },
            { upsert: true },
          )
        }
        reservations.push({ productId: product._id, date: travelDate, qty })

        bookingItems.push({
          productId: product._id,
          destinationSlug: '',
          airportCode: product.airportCode,
          segment: product.segment,
          direction,
          tier,
          serviceType: 'fastTrack',
          title: product.title,
          icon: product.icon ?? '⚡',
          unitPriceUsd,
          unitPriceVnd,
          qty,
          lineTotalUsd,
          lineTotalVnd,
          travelDate,
          travelTime: (input.travelTime ?? '').trim(),
          flightNumber: (input.flightNumber ?? '').trim().toUpperCase(),
          passengers,
          adults: qty,
          children: 0,
          meta: {},
        })

        subtotalUsd += lineTotalUsd
        subtotalVnd += lineTotalVnd
      }

      const now = new Date().toISOString()
      const year = new Date().getFullYear()

      const initialPaymentStatus = paymentMethod === 'bank_transfer' ? 'pending_transfer' : 'unpaid'

      let saved: InstanceType<typeof Booking> | null = null
      for (let attempt = 0; attempt < 2 && !saved; attempt++) {
        try {
          const doc = new Booking({
            _id: crypto.randomUUID(),
            operatorId,
            bookingNumber: generateBookingNumber(year),
            ticketId: '',
            clientId: '',
            customerName: name,
            customerPhone: phone,
            phoneCountryCode: phoneCountryCode || '+84',
            contactEmail: email,
            items: bookingItems,
            currency: 'USD',
            subtotalUsd,
            subtotalVnd,
            discountVnd: 0,
            totalUsd: subtotalUsd,
            totalVnd: subtotalVnd,
            fxRateUsdVnd,
            status: 'pending',
            payment: { method: paymentMethod, status: initialPaymentStatus },
            notes: notes.slice(0, 1000),
            createdAt: now,
            updatedAt: now,
          })
          saved = await doc.save()
        } catch (err: unknown) {
          const e = err as { code?: number; keyPattern?: Record<string, unknown> }
          if (e.code === 11000 && e.keyPattern?.bookingNumber) continue
          await rollback()
          throw err
        }
      }

      if (!saved) {
        await rollback()
        return reply.code(500).send({ error: 'Failed to generate a unique booking number' })
      }

      return reply.code(201).send({ booking: saved.toObject() })
    },
  )

  // ═══ GET /clients/bookings/:bookingNumber ═══
  app.get<{ Params: { bookingNumber: string } }>(
    '/clients/bookings/:bookingNumber',
    async (req, reply) => {
      const { bookingNumber } = req.params
      const booking = await Booking.findOne({ bookingNumber }).lean()
      if (!booking) return reply.code(404).send({ error: 'Booking not found' })
      return reply.send({ booking })
    },
  )
}
