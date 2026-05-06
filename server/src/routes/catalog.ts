import type { FastifyInstance } from 'fastify'
import { Product } from '../models/Product.js'
import { Airport } from '../models/Airport.js'
import { FxRate } from '../models/FxRate.js'

/**
 * Public catalog endpoints — feed the storefront without exposing
 * server-side internals.
 *
 *   GET /catalog/airports   — list active airports with localized names
 *   GET /catalog/products   — list active Fast-Track products
 *   GET /catalog/fx         — current USD/VND reference rate
 */

export async function catalogRoutes(app: FastifyInstance) {
  app.get('/catalog/airports', async () => {
    const airports = await Airport.find({ isActive: true }).lean()
    return airports.map((a) => ({
      iataCode: a.iataCode,
      icaoCode: a.icaoCode,
      name: a.name,
      city: a.city,
      country: a.country,
      timezone: a.timezone,
    }))
  })

  app.get('/catalog/products', async () => {
    const products = await Product.find({ isActive: true }).lean()
    return products.map((p) => ({
      id: p._id,
      airportCode: p.airportCode,
      segment: p.segment,
      direction: p.direction,
      title: p.title,
      icon: p.icon,
      fitPriceUsd: p.fitPriceUsd,
      gitPriceUsd: p.gitPriceUsd,
      fitPriceVnd: p.fitPriceVnd,
      gitPriceVnd: p.gitPriceVnd,
      inclusions: p.inclusions,
      inventoryDailyCap: p.inventoryDailyCap,
    }))
  })

  app.get('/catalog/fx', async () => {
    const fx = await FxRate.findById('USD/VND').lean()
    return {
      pair: 'USD/VND',
      rate: fx?.rate ?? 0,
      fetchedAt: fx?.fetchedAt ?? '',
    }
  })
}
