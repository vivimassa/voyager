import mongoose, { Schema } from 'mongoose'

/**
 * Product — a bookable service tied to a destination.
 * Four products per destination: airport pickup, fast-track, hotel, tour.
 * _id pattern: `${destinationSlug}:${serviceType}` (e.g. 'ha-long:pickup').
 */

export type ProductServiceType = 'pickup' | 'fastTrack' | 'hotel' | 'tour'

export interface ProductDoc {
  _id: string
  destinationSlug: string
  airportCode: 'HAN' | 'SGN' | 'DAD' | 'CXR' | 'PQC'
  serviceType: ProductServiceType
  title: string
  icon: string
  priceVnd: number
  description: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const ProductSchema = new Schema<ProductDoc>(
  {
    _id: { type: String, required: true },
    destinationSlug: { type: String, required: true, index: true },
    airportCode: {
      type: String,
      required: true,
      enum: ['HAN', 'SGN', 'DAD', 'CXR', 'PQC'],
      index: true,
    },
    serviceType: {
      type: String,
      required: true,
      enum: ['pickup', 'fastTrack', 'hotel', 'tour'],
      index: true,
    },
    title: { type: String, required: true },
    // Same Mongoose quirk as in Client.ts — `required` rejects empty strings,
    // so omit it on fields that default to ''.
    icon: { type: String, default: '' },
    priceVnd: { type: Number, required: true, min: 0 },
    description: { type: String, default: '' },
    isActive: { type: Boolean, required: true, default: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
  },
  { _id: false, timestamps: false, collection: 'products' },
)

// Compound index for "list all products for a destination ordered by service type"
ProductSchema.index({ destinationSlug: 1, serviceType: 1 })

export const Product = mongoose.model<ProductDoc>('Product', ProductSchema)
