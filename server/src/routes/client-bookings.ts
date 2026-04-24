import type { FastifyInstance } from 'fastify'
import crypto from 'node:crypto'
import { Booking, type BookingItem } from '../models/Booking.js'
import { Product } from '../models/Product.js'
import { VOYAGER_OPERATOR_ID } from '../data/voyager-seed-data.js'

/**
 * Voyager CLIENT bookings — anonymous checkout flow.
 *
 * Flow (post-auth-pivot):
 *   1. User selects services, fills cart, opens /checkout.
 *   2. User types name + phone + per-line trip details.
 *   3. POST /clients/bookings creates a booking with status:'pending' and
 *      payment.status:'unpaid'. No account, no JWT, no OTP.
 *   4. An agent picks it up on the operator side and phones the customer back
 *      to confirm details and quote payment.
 *
 * Endpoints:
 *   POST  /clients/bookings            — create a booking (public)
 *   GET   /clients/bookings/:number    — fetch one booking by number (public,
 *                                        security-by-obscurity: the number is
 *                                        6 base36 chars of crypto noise)
 *
 * Pricing: single flat priceVnd per Product. At booking time we re-read the
 * price from the Products collection — NEVER trust what the browser submits.
 * The browser cart is purely a UI convenience.
 *
 * Re-adding accounts later: this whole file, plus the auth-overlay UI and
 * client-auth routes, can be gated again behind `requireClient`. The Booking
 * schema still carries `clientId` (default '') so both modes coexist.
 */

type IncomingItem = {
  productId: string
  qty?: number
  travelDate?: string
  travelTime?: string
  adults?: number
  children?: number
  flightNumber?: string
}

type CreateBookingBody = {
  customerName?: string
  customerPhone?: string
  items: IncomingItem[]
  notes?: string
}

/** VN phone numbers can be written as +84xxxxxxxxx, 84xxxxxxxxx, or 0xxxxxxxxx.
 *  This normaliser strips spaces/dashes and stores a canonical +84 form so the
 *  agent UI can dedupe regardless of how the customer typed it. */
function normalisePhone(raw: string): string {
  const cleaned = raw.replace(/[\s\-().]/g, '')
  if (!cleaned) return ''
  if (cleaned.startsWith('+')) return cleaned
  if (cleaned.startsWith('84')) return `+${cleaned}`
  if (cleaned.startsWith('0')) return `+84${cleaned.slice(1)}`
  return cleaned
}

function isPlausiblePhone(phone: string): boolean {
  // Between 8 and 15 digits after the optional '+'. Lax on purpose — we accept
  // tourists with foreign numbers too. The agent can always clarify on the call.
  return /^\+?\d{8,15}$/.test(phone)
}

/**
 * Human-readable booking number. Pattern: VG-YYYY-XXXXXX where XXXXXX is
 * base36-uppercase noise from 4 random bytes (~1 in 1.7B collision within a
 * single year). DB has a unique index on bookingNumber, so we retry on the
 * vanishingly rare duplicate.
 */
function generateBookingNumber(year: number): string {
  const noise = crypto.randomBytes(4).toString('hex').slice(0, 6).toUpperCase()
  return `VG-${year}-${noise}`
}

export async function clientBookingsRoutes(app: FastifyInstance) {
  // ═══ POST /clients/bookings ═══ (public)
  app.post<{ Body: CreateBookingBody }>(
    '/clients/bookings',
    async (req, reply) => {
      const {
        customerName = '',
        customerPhone = '',
        items = [],
        notes = '',
      } = req.body ?? {}

      const name = customerName.trim()
      const phone = normalisePhone(customerPhone.trim())

      if (!name) {
        return reply.code(400).send({ error: 'Please enter your name.' })
      }
      if (name.length > 80) {
        return reply.code(400).send({ error: 'Name is too long (max 80).' })
      }
      if (!phone || !isPlausiblePhone(phone)) {
        return reply
          .code(400)
          .send({ error: 'Please enter a valid phone number we can call back on.' })
      }

      if (!Array.isArray(items) || items.length === 0) {
        return reply.code(400).send({ error: 'Cart is empty' })
      }
      if (items.length > 20) {
        return reply.code(400).send({ error: 'Too many items (max 20)' })
      }

      // Re-hydrate each line from Products. The browser cart is untrusted —
      // we copy title/icon/price off the server-side doc.
      const productIds = items.map((i) => i.productId).filter(Boolean)
      if (productIds.length !== items.length) {
        return reply.code(400).send({ error: 'Every item must have a productId' })
      }

      const products = await Product.find({ _id: { $in: productIds } }).lean()
      const productById = new Map(products.map((p) => [p._id, p]))

      const missing = productIds.filter((id) => !productById.has(id))
      if (missing.length > 0) {
        return reply
          .code(400)
          .send({ error: `Unknown product(s): ${missing.join(', ')}` })
      }

      // Single-tenant for now — every Voyager booking belongs to the same
      // operator (same as the OTP auth path). When we multi-tenant this,
      // we'll infer operatorId from the destination's subdomain or a header.
      const operatorId = VOYAGER_OPERATOR_ID

      const bookingItems: BookingItem[] = []
      let subtotalVnd = 0

      for (const input of items) {
        const product = productById.get(input.productId)!
        if (!product.isActive) {
          return reply
            .code(400)
            .send({ error: `Product unavailable: ${product.title}` })
        }

        const qty = Number.isFinite(input.qty) && input.qty! > 0 ? Math.floor(input.qty!) : 1
        const adults = Number.isFinite(input.adults) && input.adults! >= 0
          ? Math.floor(input.adults!)
          : 1
        const children = Number.isFinite(input.children) && input.children! >= 0
          ? Math.floor(input.children!)
          : 0

        const unitPriceVnd = product.priceVnd
        const lineTotalVnd = unitPriceVnd * qty

        bookingItems.push({
          productId: product._id,
          destinationSlug: product.destinationSlug,
          airportCode: product.airportCode,
          serviceType: product.serviceType,
          title: product.title,
          icon: product.icon ?? '',
          unitPriceVnd,
          qty,
          lineTotalVnd,
          travelDate: (input.travelDate ?? '').trim(),
          travelTime: (input.travelTime ?? '').trim(),
          adults,
          children,
          flightNumber: (input.flightNumber ?? '').trim().toUpperCase(),
          meta: {},
        })

        subtotalVnd += lineTotalVnd
      }

      const now = new Date().toISOString()
      const year = new Date().getFullYear()

      // Retry-once-on-dup: bookingNumber is unique-indexed. Noise space is big
      // enough that one retry is overkill, but cheap insurance.
      let saved: Awaited<ReturnType<typeof Booking.create>> | null = null
      for (let attempt = 0; attempt < 2 && !saved; attempt++) {
        try {
          saved = await Booking.create({
            _id: crypto.randomUUID(),
            operatorId,
            bookingNumber: generateBookingNumber(year),
            clientId: '', // anonymous
            customerName: name,
            customerPhone: phone,
            items: bookingItems,
            currency: 'VND',
            subtotalVnd,
            discountVnd: 0,
            totalVnd: subtotalVnd,
            status: 'pending',
            payment: { status: 'unpaid' },
            notes: notes.slice(0, 1000),
            createdAt: now,
            updatedAt: now,
          })
        } catch (err: unknown) {
          const e = err as { code?: number; keyPattern?: Record<string, unknown> }
          if (e.code === 11000 && e.keyPattern?.bookingNumber) continue
          throw err
        }
      }

      if (!saved) {
        return reply.code(500).send({ error: 'Failed to generate a unique booking number' })
      }

      return reply.code(201).send({
        booking: saved.toObject(),
      })
    },
  )

  // ═══ GET /clients/bookings/:bookingNumber ═══ (public)
  // The booking number is unguessable in practice (~2B possibilities per year),
  // so we rely on it as a shared secret for the success page. Not intended as
  // a durable privacy boundary — an agent-side endpoint with proper auth is
  // the right place to look up by customer.
  app.get<{ Params: { bookingNumber: string } }>(
    '/clients/bookings/:bookingNumber',
    async (req, reply) => {
      const { bookingNumber } = req.params
      const booking = await Booking.findOne({ bookingNumber }).lean()
      if (!booking) {
        return reply.code(404).send({ error: 'Booking not found' })
      }
      return reply.send({ booking })
    },
  )
}
