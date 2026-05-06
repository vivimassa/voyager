import mongoose, { Schema } from 'mongoose'

/**
 * FxRate — single-row USD→VND reference rate cache.
 * Refreshed periodically from Vietcombank (or whichever provider).
 * _id is fixed `'USD/VND'`; one document, upserted.
 */

export interface FxRateDoc {
  _id: string
  pair: 'USD/VND'
  rate: number
  source: string
  fetchedAt: string
  updatedAt: string
}

const FxRateSchema = new Schema<FxRateDoc>(
  {
    _id: { type: String, required: true },
    pair: { type: String, required: true, enum: ['USD/VND'] },
    rate: { type: Number, required: true, min: 0 },
    source: { type: String, default: 'vietcombank' },
    fetchedAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
  },
  { _id: false, timestamps: false, collection: 'fx_rates' },
)

export const FxRate = mongoose.model<FxRateDoc>('FxRate', FxRateSchema)
