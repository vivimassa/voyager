import mongoose, { Schema } from 'mongoose'

/**
 * Inventory — daily capacity per Fast-Track lane.
 * _id pattern: `${productId}|${YYYY-MM-DD}`, e.g. 'HAN-international-departure|2026-05-10'.
 *
 * Backoffice sets `capacity`. Booking flow `$inc`s `sold` atomically;
 * cancellation reverses. The route layer enforces `sold + qty <= capacity`
 * before insert when capacity > 0; capacity 0 means unlimited.
 */

export interface InventoryDoc {
  _id: string
  productId: string
  date: string             // YYYY-MM-DD
  capacity: number         // 0 = unlimited
  sold: number
  updatedAt: string
  createdAt: string
}

const InventorySchema = new Schema<InventoryDoc>(
  {
    _id: { type: String, required: true },
    productId: { type: String, required: true, index: true },
    date: { type: String, required: true, index: true },
    capacity: { type: Number, required: true, min: 0, default: 0 },
    sold: { type: Number, required: true, min: 0, default: 0 },
    updatedAt: { type: String, required: true },
    createdAt: { type: String, required: true },
  },
  { _id: false, timestamps: false, collection: 'inventory' },
)

InventorySchema.index({ productId: 1, date: 1 })

export const Inventory = mongoose.model<InventoryDoc>('Inventory', InventorySchema)
