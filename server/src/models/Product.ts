import mongoose, { Schema } from 'mongoose'

/**
 * Product — a bookable Fast-Track package at a Vietnamese airport.
 * Voyager pivoted to Fast-Track-only on 2026-05-06; legacy pickup/hotel/tour
 * documents are migrated out by the seed script.
 *
 * _id pattern: `${airportCode}-${segment}-${direction}` lowercase,
 *   e.g. 'HAN-international-departure', 'CXR-international-arrival'.
 *
 * Pricing: USD is canonical (Vihat 2024 guide). VND is cached and refreshed
 * from the FxRate doc. FIT applies to groups ≤5 pax, GIT to ≥6.
 */

export type ProductServiceType = 'fastTrack'
export type ProductSegment = 'domestic' | 'international'
export type ProductDirection = 'arrival' | 'departure' | 'both'

export interface ProductInclusion {
  key: 'checkin' | 'baggage' | 'security' | 'immigration'
  label: string
}

export interface ProductDoc {
  _id: string
  airportCode: 'HAN' | 'SGN' | 'DAD' | 'CXR' | 'PQC' | 'HUI' | 'THD' | 'VII'
  segment: ProductSegment
  direction: ProductDirection
  serviceType: ProductServiceType
  title: string
  icon: string
  fitPriceUsd: number
  gitPriceUsd: number          // 0 when not offered for this lane (e.g. CXR arrival)
  fitPriceVnd: number
  gitPriceVnd: number
  description: string
  inclusions: ProductInclusion[]
  inventoryDailyCap: number    // soft cap surfaced to backoffice; 0 = unlimited
  isActive: boolean
  // Legacy fields kept so old booking documents still validate against the
  // schema if anyone reads/writes them — new code should ignore.
  destinationSlug: string
  priceVnd: number             // mirror of fitPriceVnd for back-compat
  createdAt: string
  updatedAt: string
}

const InclusionSchema = new Schema<ProductInclusion>(
  {
    key: { type: String, required: true, enum: ['checkin', 'baggage', 'security', 'immigration'] },
    label: { type: String, required: true },
  },
  { _id: false },
)

const ProductSchema = new Schema<ProductDoc>(
  {
    _id: { type: String, required: true },
    airportCode: {
      type: String,
      required: true,
      enum: ['HAN', 'SGN', 'DAD', 'CXR', 'PQC', 'HUI', 'THD', 'VII'],
      index: true,
    },
    segment: { type: String, required: true, enum: ['domestic', 'international'], index: true },
    direction: { type: String, required: true, enum: ['arrival', 'departure', 'both'], index: true },
    serviceType: { type: String, required: true, enum: ['fastTrack'], default: 'fastTrack' },
    title: { type: String, required: true },
    icon: { type: String, default: '' },
    fitPriceUsd: { type: Number, required: true, min: 0 },
    gitPriceUsd: { type: Number, required: true, min: 0, default: 0 },
    fitPriceVnd: { type: Number, required: true, min: 0 },
    gitPriceVnd: { type: Number, required: true, min: 0, default: 0 },
    description: { type: String, default: '' },
    inclusions: { type: [InclusionSchema], default: [] },
    inventoryDailyCap: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, required: true, default: true },
    destinationSlug: { type: String, default: '' },
    priceVnd: { type: Number, required: true, min: 0, default: 0 },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
  },
  { _id: false, timestamps: false, collection: 'products' },
)

ProductSchema.index({ airportCode: 1, segment: 1, direction: 1 })

export const Product = mongoose.model<ProductDoc>('Product', ProductSchema)
