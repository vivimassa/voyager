import mongoose, { Schema } from 'mongoose'

/**
 * Client — an end customer of Voyager (traveller booking pickup/hotel/tour).
 * Distinct from `User`, which is the ops/admin user with role-based perms.
 *
 * Auth methods supported at model level: phone OTP, email password, Google,
 * Facebook, WebAuthn/biometric. The `authMethods` array records which
 * credentials the client has linked.
 */

export type ClientAuthMethod = 'phone' | 'email' | 'google' | 'facebook' | 'webauthn'

export interface ClientProfile {
  firstName: string
  lastName: string
  email: string
  phone: string
  countryCode: string // e.g. '+84'
  nationalId: string
  avatarUrl: string
}

export interface ClientSecurity {
  passwordHash: string
  phoneVerified: boolean
  emailVerified: boolean
  biometricEnabled: boolean
  authMethods: ClientAuthMethod[]
  googleSub: string
  facebookId: string
  webauthnCredentialIds: string[]
  lastPasswordChange: string
}

export interface ClientPreferences {
  currency: 'VND' | 'USD'
  locale: 'en' | 'vi'
}

export interface ClientDoc {
  _id: string
  operatorId: string
  profile: ClientProfile
  security: ClientSecurity
  preferences: ClientPreferences
  isActive: boolean
  lastLoginUtc: string
  createdAt: string
  updatedAt: string
}

const ClientSchema = new Schema<ClientDoc>(
  {
    _id: { type: String, required: true },
    operatorId: { type: String, required: true, index: true },
    profile: {
      // NOTE: `required: true` is omitted on String fields that default to ''.
      // Mongoose's `required` validator rejects empty strings, so combining the
      // two produces a validation error on every create. Keeping `default: ''`
      // still ensures the field is always present on the document.
      firstName: { type: String, default: '' },
      lastName: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      countryCode: { type: String, default: '+84' },
      nationalId: { type: String, default: '' },
      avatarUrl: { type: String, default: '' },
    },
    security: {
      passwordHash: { type: String, default: '' },
      phoneVerified: { type: Boolean, required: true, default: false },
      emailVerified: { type: Boolean, required: true, default: false },
      biometricEnabled: { type: Boolean, required: true, default: false },
      authMethods: {
        type: [String],
        required: true,
        default: [],
        enum: ['phone', 'email', 'google', 'facebook', 'webauthn'],
      },
      googleSub: { type: String, default: '' },
      facebookId: { type: String, default: '' },
      webauthnCredentialIds: { type: [String], required: true, default: [] },
      lastPasswordChange: { type: String, default: '' },
    },
    preferences: {
      currency: { type: String, required: true, enum: ['VND', 'USD'], default: 'VND' },
      locale: { type: String, required: true, enum: ['en', 'vi'], default: 'en' },
    },
    isActive: { type: Boolean, required: true, default: true },
    lastLoginUtc: { type: String, default: '' },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
  },
  { _id: false, timestamps: false, collection: 'clients' },
)

// Partial unique indices — only enforce uniqueness when the field is non-empty,
// because clients may sign up with only phone OR only email initially.
ClientSchema.index(
  { 'profile.email': 1 },
  { unique: true, partialFilterExpression: { 'profile.email': { $gt: '' } } },
)
ClientSchema.index(
  { 'profile.phone': 1 },
  { unique: true, partialFilterExpression: { 'profile.phone': { $gt: '' } } },
)

export const Client = mongoose.model<ClientDoc>('Client', ClientSchema)
