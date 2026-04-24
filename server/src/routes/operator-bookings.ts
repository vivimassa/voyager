import type { FastifyInstance } from 'fastify'
import { Booking, type BookingStatus } from '../models/Booking.js'
import type { ProductServiceType } from '../models/Product.js'

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
const VALID_SERVICES: ProductServiceType[] = ['pickup', 'fastTrack', 'hotel', 'tour']

type ListQuery = {
  status?: string
  q?: string
  serviceType?: string
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

    const { status, q, serviceType, dateFrom, dateTo, page, pageSize } = req.query ?? {}

    const pageNum = Math.max(1, parseInt(page ?? '1', 10) || 1)
    const size = Math.min(100, Math.max(1, parseInt(pageSize ?? '25', 10) || 25))

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = { operatorId: req.operatorId }

    if (status && (VALID_STATUSES as string[]).includes(status)) {
      filter.status = status
    }

    if (serviceType && (VALID_SERVICES as string[]).includes(serviceType)) {
      filter['items.serviceType'] = serviceType
    }

    if (dateFrom || dateTo) {
      filter.createdAt = {}
      if (dateFrom) filter.createdAt.$gte = new Date(dateFrom).toISOString()
      if (dateTo) {
        // inclusive end-of-day
        const end = new Date(dateTo)
        end.setUTCHours(23, 59, 59, 999)
        filter.createdAt.$lte = end.toISOString()
      }
    }

    if (q && q.trim()) {
      const needle = q.trim()
      // Escape regex metachars so a customer-typed "+" in a phone doesn't blow up.
      const safe = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const rx = new RegExp(safe, 'i')
      filter.$or = [
        { bookingNumber: rx },
        { customerName: rx },
        { customerPhone: rx },
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
      if (!req.operatorId) {
        return reply.code(401).send({ error: 'Missing operator context' })
      }

      const { bookingNumber } = req.params
      const booking = await Booking.findOne({
        bookingNumber,
        operatorId: req.operatorId,
      }).lean()

      if (!booking) {
        return reply.code(404).send({ error: 'Booking not found' })
      }
      return reply.send({ booking })
    },
  )
}
