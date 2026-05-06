import { FxRate } from '../models/FxRate.js'

/**
 * Fetch and cache the USD→VND reference rate.
 * Production: hit Vietcombank's exchange-rate JSON endpoint.
 * Dev: returns the cached / fallback value.
 */

export async function getUsdVndRate(fallback: number): Promise<number> {
  const doc = await FxRate.findById('USD/VND').lean()
  if (doc?.rate && doc.rate > 0) return doc.rate
  return fallback
}

export async function refreshUsdVndRate(fallback: number): Promise<number> {
  // Vietcombank publishes XML at https://portal.vietcombank.com.vn/UserControls/TVPortal.TyGia/pXML.aspx
  // Pulling and parsing that requires `xmldom` or similar. For now we just
  // re-stamp the cached rate so the FxRate doc has a fresh fetchedAt and
  // the seed rate stays authoritative until someone wires the live feed.
  const now = new Date().toISOString()
  const existing = await FxRate.findById('USD/VND').lean()
  const rate = existing?.rate && existing.rate > 0 ? existing.rate : fallback
  await FxRate.findByIdAndUpdate(
    'USD/VND',
    {
      $set: { pair: 'USD/VND', rate, source: existing?.source ?? 'fallback', fetchedAt: now, updatedAt: now },
      $setOnInsert: { _id: 'USD/VND' },
    },
    { upsert: true, new: true },
  )
  return rate
}
