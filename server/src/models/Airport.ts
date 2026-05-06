import mongoose, { Schema } from 'mongoose'

/**
 * Airport — reference lookup for the 5 Vietnamese airports Voyager serves.
 * _id is the lowercase IATA code (e.g. 'han', 'sgn').
 */

export type AirportIata = 'HAN' | 'SGN' | 'DAD' | 'CXR' | 'PQC' | 'HUI' | 'THD' | 'VII'

export interface AirportDoc {
  _id: string
  iataCode: AirportIata
  icaoCode: string
  name: string
  city: string
  country: string
  countryIso2: string
  timezone: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const AirportSchema = new Schema<AirportDoc>(
  {
    _id: { type: String, required: true },
    iataCode: { type: String, required: true, unique: true, enum: ['HAN', 'SGN', 'DAD', 'CXR', 'PQC', 'HUI', 'THD', 'VII'] },
    icaoCode: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true, default: 'Vietnam' },
    countryIso2: { type: String, required: true, default: 'VN' },
    timezone: { type: String, required: true, default: 'Asia/Ho_Chi_Minh' },
    isActive: { type: Boolean, required: true, default: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
  },
  { _id: false, timestamps: false, collection: 'airports' },
)

export const Airport = mongoose.model<AirportDoc>('Airport', AirportSchema)
