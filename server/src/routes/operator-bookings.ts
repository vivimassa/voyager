import type { FastifyInstance } from 'fastify'
import { Booking, type BookingStatus } from '../models/Booking.js'
import { Inventory } from '../models/Inventory.js'
import { Product } from '../models/Product.js'
import { generateTicketId } from '../lib/ticket-id.js'

/**
 * Voyager OPERATOR bookings — agent-side list & detail.
 *
 * Auth: protected by the ops middleware. Every query is scoped by
 * request.operatorId from the JWT; a caller cannot see another tenant's
 * bookings even if they pass a different operatorId on the wire (the
 * preHandler in authenticate.ts already scrubs query/body).
 *
 * Endpoints:
 *   GET /operator/bookings            — paginated list with filters
 *   GET /operator/bookings/:number    — one booking by number
 */

const VALID_STATUSES: BookingStatus[] = [
  'pending',
  'confirmed',
  'fulfilled',
  'cancelled',
  'closed',
]
const VALID_PAYMENT_STATUSES = ['unpaid', 'paid', 'refunded', 'partial_refund', 'pending_transfer']
const VALID_AIRPORTS = ['HAN', 'SGN', 'DAD', 'CXR', 'PQC', 'HUI', 'THD', 'VII']
const VALID_SEGMENTS = ['domestic', 'international']

type ListQuery = {
  status?: string
  paymentStatus?: string
  airport?: string
  segment?: string
  q?: string
  dateFrom?: string
  dateTo?: string
  page?: string
  pageSize?: string
}

export async function operatorBookingsRoutes(app: FastifyInstance) {
  // ═══ GET /operator/bookings ═══
  app.get<{ Querystring: ListQuery }>('/operator/bookings', async (req, reply) => {
    if (!req.operatorId) {
      return reply.code(401).send({ error: 'Missing operator context' })
    }

    const { status, paymentStatus, airport, segment, q, dateFrom, dateTo, page, pageSize } = req.query ?? {}

    const pageNum = Math.max(1, parseInt(page ?? '1', 10) || 1)
    const size = Math.min(100, Math.max(1, parseInt(pageSize ?? '25', 10) || 25))

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = { operatorId: req.operatorId }

    if (status && (VALID_STATUSES as string[]).includes(status)) filter.status = status
    if (paymentStatus && VALID_PAYMENT_STATUSES.includes(paymentStatus)) filter['payment.status'] = paymentStatus
    if (airport && VALID_AIRPORTS.includes(airport)) filter['items.airportCode'] = airport
    if (segment && VALID_SEGMENTS.includes(segment)) filter['items.segment'] = segment

    if (dateFrom || dateTo) {
      filter.createdAt = {}
      if (dateFrom) filter.createdAt.$gte = new Date(dateFrom).toISOString()
      if (dateTo) {
        const end = new Date(dateTo)
        end.setUTCHours(23, 59, 59, 999)
        filter.createdAt.$lte = end.toISOString()
      }
    }

    if (q && q.trim()) {
      const needle = q.trim()
      const safe = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const rx = new RegExp(safe, 'i')
      filter.$or = [
        { bookingNumber: rx },
        { ticketId: rx },
        { customerName: rx },
        { customerPhone: rx },
        { contactEmail: rx },
      ]
    }

    const [items, total] = await Promise.all([
      Booking.find(filter)
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * size)
        .limit(size)
        .lean(),
      Booking.countDocuments(filter),
    ])

    return reply.send({ items, total, page: pageNum, pageSize: size })
  })

  // ═══ GET /operator/bookings/:bookingNumber ═══
  app.get<{ Params: { bookingNumber: string } }>(
    '/operator/bookings/:bookingNumber',
    async (req, reply) => {
      if (!req.operatorId) return reply.code(401).send({ error: 'Missing operator context' })

      const { bookingNumber } = req.params
      const booking = await Booking.findOne({
        bookingNumber,
        operatorId: req.operatorId,
      }).lean()

      if (!booking) return reply.code(404).send({ error: 'Booking not found' })
      return reply.send({ booking })
    },
  )

  // ═══ POST /operator/bookings/:bookingNumber/mark-paid ═══
  app.post<{ Params: { bookingNumber: string }; Body: { transactionId?: string } }>(
    '/operator/bookings/:bookingNumber/mark-paid',
    async (req, reply) => {
      if (!req.operatorId) return reply.code(401).send({ error: 'Missing operator context' })
      const booking = await Booking.findOne({ bookingNumber: req.params.bookingNumber, operatorId: req.operatorId })
      if (!booking) return reply.code(404).send({ error: 'Booking not found' })
      if (booking.payment.status === 'paid') return reply.send({ booking: booking.toObject() })

      const now = new Date().toISOString()
      if (!booking.ticketId) booking.ticketId = await generateTicketId()
      booking.status = 'confirmed'
      booking.payment.status = 'paid'
      booking.payment.paidAt = now
      const txId = (req.body?.transactionId ?? '').trim()
      if (txId) booking.payment.transactionId = txId
      booking.updatedAt = now
      await booking.save()
      return reply.send({ booking: booking.toObject() })
    },
  )

  // ═══ POST /operator/bookings/:bookingNumber/cancel ═══
  app.post<{ Params: { bookingNumber: string } }>(
    '/operator/bookings/:bookingNumber/cancel',
    async (req, reply) => {
      if (!req.operatorId) return reply.code(401).send({ error: 'Missing operator context' })
      const booking = await Booking.findOne({ bookingNumber: req.params.bookingNumber, operatorId: req.operatorId })
      if (!booking) return reply.code(404).send({ error: 'Booking not found' })
      if (booking.status === 'cancelled') return reply.send({ booking: booking.toObject() })

      const now = new Date().toISOString()
      booking.status = 'cancelled'
      booking.payment.status = booking.payment.status === 'paid' ? 'refunded' : 'unpaid'
      if (booking.payment.status === 'refunded') booking.payment.refundedAt = now
      booking.updatedAt = now
      await booking.save()

      // Roll back inventory.
      for (const it of booking.items) {
        if (!it.travelDate) continue
        await Inventory.updateOne(
          { _id: `${it.productId}|${it.travelDate}` },
          { $inc: { sold: -it.qty }, $set: { updatedAt: now } },
        ).catch(() => {})
      }
      return reply.send({ booking: booking.toObject() })
    },
  )

  // ═══ GET /operator/dashboard/stats ═══
  app.get('/operator/dashboard/stats', async (req, reply) => {
    if (!req.operatorId) return reply.code(401).send({ error: 'Missing operator context' })

    const now = new Date()
    const startOfDay = new Date(now); startOfDay.setUTCHours(0, 0, 0, 0)
    const startOfWeek = new Date(startOfDay); startOfWeek.setUTCDate(startOfWeek.getUTCDate() - 7)
    const startOfMonth = new Date(startOfDay); startOfMonth.setUTCMonth(startOfMonth.getUTCMonth() - 1)

    const baseFilter = { operatorId: req.operatorId }
    const [day, week, month, byAirport, paidLifetime] = await Promise.all([
      Booking.countDocuments({ ...baseFilter, createdAt: { $gte: startOfDay.toISOString() } }),
      Booking.countDocuments({ ...baseFilter, createdAt: { $gte: startOfWeek.toISOString() } }),
      Booking.countDocuments({ ...baseFilter, createdAt: { $gte: startOfMonth.toISOString() } }),
      Booking.aggregate([
        { $match: { ...baseFilter, status: { $ne: 'cancelled' } } },
        { $unwind: '$items' },
        {
          $group: {
            _id: '$items.airportCode',
            sales: { $sum: '$items.qty' },
            revenueUsd: { $sum: '$items.lineTotalUsd' },
          },
        },
        { $sort: { sales: -1 } },
      ]),
      Booking.aggregate([
        { $match: { ...baseFilter, 'payment.status': 'paid' } },
        { $group: { _id: null, totalUsd: { $sum: '$totalUsd' }, totalVnd: { $sum: '$totalVnd' }, count: { $sum: 1 } } },
      ]),
    ])

    const lifetime = paidLifetime[0] ?? { totalUsd: 0, totalVnd: 0, count: 0 }
    return reply.send({
      bookings: { day, week, month },
      revenue: { totalUsd: lifetime.totalUsd ?? 0, totalVnd: lifetime.totalVnd ?? 0, count: lifetime.count ?? 0 },
      byAirport,
    })
  })

  // ═══ GET /operator/inventory ═══ (calendar view)
  app.get<{ Querystring: { dateFrom?: string; dateTo?: string } }>(
    '/operator/inventory',
    async (req, reply) => {
      if (!req.operatorId) return reply.code(401).send({ error: 'Missing operator context' })
      const { dateFrom, dateTo } = req.query ?? {}
      if (!dateFrom || !dateTo || !/^\d{4}-\d{2}-\d{2}$/.test(dateFrom) || !/^\d{4}-\d{2}-\d{2}$/.test(dateTo)) {
        return reply.code(400).send({ error: 'dateFrom and dateTo (YYYY-MM-DD) are required' })
      }

      const products = await Product.find({ isActive: true }).lean()
      const inventory = await Inventory.find({ date: { $gte: dateFrom, $lte: dateTo } }).lean()
      const invByKey = new Map(inventory.map((i) => [`${i.productId}|${i.date}`, i]))
      return reply.send({
        dateFrom,
        dateTo,
        products: products.map((p) => ({
          id: p._id,
          airportCode: p.airportCode,
          segment: p.segment,
          direction: p.direction,
          title: p.title,
          capacity: p.inventoryDailyCap,
        })),
        cells: inventory.map((i) => {
          void invByKey
          return { productId: i.productId, date: i.date, capacity: i.capacity, sold: i.sold }
        }),
      })
    },
  )

  // ═══ POST /operator/inventory/cap ═══ (set product daily cap)
  app.post<{ Body: { productId?: string; cap?: number } }>(
    '/operator/inventory/cap',
    async (req, reply) => {
      if (!req.operatorId) return reply.code(401).send({ error: 'Missing operator context' })
      const productId = (req.body?.productId ?? '').trim()
      const cap = Math.max(0, Math.floor(req.body?.cap ?? 0))
      if (!productId) return reply.code(400).send({ error: 'productId is required' })
      const result = await Product.updateOne(
        { _id: productId },
        { $set: { inventoryDailyCap: cap, updatedAt: new Date().toISOString() } },
      )
      if (result.matchedCount === 0) return reply.code(404).send({ error: 'Product not found' })
      return reply.send({ ok: true })
    },
  )
}
