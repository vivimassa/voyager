import mongoose, { Schema } from 'mongoose'

/**
 * Destination — a Vietnam travel destination served by Voyager.
 * _id is the url slug (e.g. 'ha-long').
 * Mirrors the shape of apps/web/src/data/destinations.ts — keep in sync.
 */

export interface DestinationDoc {
  _id: string
  slug: string
  name: string
  airportCode: 'HAN' | 'SGN' | 'DAD' | 'CXR' | 'PQC'
  airportName: string
  description: string
  headlinePriceVnd: number
  stars: 3 | 4 | 5
  photo: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const DestinationSchema = new Schema<DestinationDoc>(
  {
    _id: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    airportCode: {
      type: String,
      required: true,
      enum: ['HAN', 'SGN', 'DAD', 'CXR', 'PQC'],
      index: true,
    },
    airportName: { type: String, required: true },
    description: { type: String, required: true },
    headlinePriceVnd: { type: Number, required: true, min: 0 },
    stars: { type: Number, required: true, enum: [3, 4, 5] },
    photo: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
  },
  { _id: false, timestamps: false, collection: 'destinations' },
)

export const Destination = mongoose.model<DestinationDoc>('Destination', DestinationSchema)
