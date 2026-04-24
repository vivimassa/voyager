import mongoose, { Schema } from 'mongoose'

/**
 * OtpCode — one-time-passcodes issued for phone verification.
 * TTL-indexed: expired docs are auto-deleted by MongoDB within ~60s of expiry.
 * `used` is set true after successful verification — kept briefly so a replay
 * of the same code returns a distinct error than "not found".
 */

export type OtpPurpose = 'signin' | 'signup' | 'link'

export interface OtpCodeDoc {
  _id: string
  phone: string              // E.164 without leading '+', e.g. '84912345678'
  code: string               // 6 digits
  purpose: OtpPurpose
  used: boolean
  attempts: number           // how many verify attempts so far (cap at 5)
  expiresAt: Date            // TTL pivot
  createdAt: string
}

const OtpCodeSchema = new Schema<OtpCodeDoc>(
  {
    _id: { type: String, required: true },
    phone: { type: String, required: true, index: true },
    code: { type: String, required: true },
    purpose: { type: String, required: true, enum: ['signin', 'signup', 'link'] },
    used: { type: Boolean, required: true, default: false },
    attempts: { type: Number, required: true, default: 0, min: 0 },
    expiresAt: { type: Date, required: true },
    createdAt: { type: String, required: true },
  },
  { _id: false, timestamps: false, collection: 'otp_codes' },
)

// TTL: Mongo auto-deletes docs once expiresAt is reached.
OtpCodeSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

export const OtpCode = mongoose.model<OtpCodeDoc>('OtpCode', OtpCodeSchema)
