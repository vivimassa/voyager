import type { FastifyInstance } from 'fastify'
import { Inventory } from '../models/Inventory.js'
import { Product } from '../models/Product.js'

/**
 * Public inventory probes — used by the booking funnel to check whether a
 * date+lane is sold out before redirecting to payment, and by the home page
 * to surface "Few left" badges.
 */

type GetQuery = {
  productId?: string
  date?: string
  airportCode?: string
  segment?: string
  direction?: string
}

export async function inventoryRoutes(app: FastifyInstance) {
  // ═══ GET /inventory ═══
  app.get<{ Querystring: GetQuery }>('/inventory', async (req, reply) => {
    const { productId, date, airportCode, segment, direction } = req.query ?? {}
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return reply.code(400).send({ error: 'date=YYYY-MM-DD is required' })
    }

    let resolvedProductId = productId
    if (!resolvedProductId) {
      if (!airportCode || !segment || !direction) {
        return reply.code(400).send({ error: 'Provide productId or (airportCode + segment + direction)' })
      }
      resolvedProductId = `${airportCode}-${segment}-${direction}`
    }

    const product = await Product.findById(resolvedProductId).lean()
    if (!product) return reply.code(404).send({ error: 'Product not found' })

    const inv = await Inventory.findById(`${resolvedProductId}|${date}`).lean()
    const capacity = product.inventoryDailyCap
    const sold = inv?.sold ?? 0
    const remaining = capacity > 0 ? Math.max(0, capacity - sold) : -1

    return reply.send({
      productId: resolvedProductId,
      date,
      capacity,
      sold,
      remaining,
      isUnlimited: capacity === 0,
    })
  })
}
