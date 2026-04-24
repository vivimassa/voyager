import type { FastifyInstance } from 'fastify'
import crypto from 'node:crypto'
import bcrypt from 'bcryptjs'
import { Client } from '../models/Client.js'
import { OtpCode } from '../models/OtpCode.js'
import { sendSms } from '../lib/sms.js'
import { getServerEnv } from '@skyhub/env/server'

/**
 * Voyager CLIENT auth — traveller-facing auth flow, distinct from the
 * ops/admin User auth in `./auth.ts`. JWT payloads carry kind:'client' so
 * the two systems can't cross-impersonate.
 *
 * Flows implemented:
 *   • Phone OTP (primary for Vietnamese travellers)
 *   • Email + password (fallback)
 *
 * Flows stubbed with 501 Not Implemented — wire real providers later:
 *   • Google OAuth
 *   • Facebook OAuth
 *   • WebAuthn / biometric
 */

type ClientJwtPayload = {
  clientId: string
  operatorId: string
  kind: 'client'
}

type ClientRefreshPayload = ClientJwtPayload & { type: 'refresh' }

const VOYAGER_OPERATOR_ID = 'voyager'
const OTP_TTL_SECONDS = 5 * 60       // code valid for 5 minutes
const OTP_MAX_ATTEMPTS = 5
const OTP_RESEND_COOLDOWN_MS = 30_000 // 30s between sends for same phone

// Normalise phone to E.164 without leading '+'. Accepts e.g. '0912...' / '+84...' / '912...'.
function normalisePhone(phone: string, countryCode: string): string | null {
  const digits = phone.replace(/\D/g, '')
  const cc = countryCode.replace(/\D/g, '') || '84'
  if (!digits) return null
  // Strip leading 0 (Vietnamese local format), then prepend country code
  const local = digits.startsWith('0') ? digits.slice(1) : digits
  // If the user already pasted with country code, don't double up
  if (local.startsWith(cc)) return local
  return `${cc}${local}`
}

function generateOtpCode(): string {
  // Crypto-random 6-digit code, avoiding leading-zero losses from %1000000
  const n = crypto.randomInt(0, 1_000_000)
  return n.toString().padStart(6, '0')
}

function issueClientTokens(app: FastifyInstance, clientId: string) {
  const env = getServerEnv()
  const payload: ClientJwtPayload = {
    clientId,
    operatorId: VOYAGER_OPERATOR_ID,
    kind: 'client',
  }
  const accessToken = app.jwt.sign(payload, { expiresIn: env.JWT_ACCESS_EXPIRY })
  const refreshToken = app.jwt.sign(
    { ...payload, type: 'refresh' } satisfies ClientRefreshPayload,
    { expiresIn: env.JWT_REFRESH_EXPIRY },
  )
  return { accessToken, refreshToken }
}

function sanitiseClient(c: Record<string, unknown>) {
  const { security: _s, ...rest } = c
  return rest
}

export async function clientAuthRoutes(app: FastifyInstance) {
  // ═══ POST /clients/auth/send-otp ═══
  app.post<{
    Body: { phone?: string; countryCode?: string; purpose?: 'signin' | 'signup' }
  }>('/clients/auth/send-otp', async (req, reply) => {
    const { phone = '', countryCode = '+84', purpose = 'signin' } = req.body ?? {}

    const normalised = normalisePhone(phone, countryCode)
    if (!normalised || normalised.length < 9 || normalised.length > 15) {
      return reply.code(400).send({ error: 'Please enter a valid phone number.' })
    }

    // Rate-limit: don't let the same phone re-request a code within cooldown
    const mostRecent = await OtpCode.findOne({ phone: normalised })
      .sort({ createdAt: -1 })
      .lean()
    if (mostRecent) {
      const ageMs = Date.now() - new Date(mostRecent.createdAt).getTime()
      if (ageMs < OTP_RESEND_COOLDOWN_MS && !mostRecent.used) {
        const waitSec = Math.ceil((OTP_RESEND_COOLDOWN_MS - ageMs) / 1000)
        return reply.code(429).send({
          error: `Please wait ${waitSec}s before requesting another code.`,
          retryAfterSec: waitSec,
        })
      }
    }

    const code = generateOtpCode()
    const now = new Date()
    const otpId = crypto.randomUUID()

    await OtpCode.create({
      _id: otpId,
      phone: normalised,
      code,
      purpose,
      used: false,
      attempts: 0,
      expiresAt: new Date(now.getTime() + OTP_TTL_SECONDS * 1000),
      createdAt: now.toISOString(),
    })

    // Dispatch via the configured SMS provider (console / twilio / esms).
    // See server/src/lib/sms.ts and the SMS_PROVIDER env var. The OTP record
    // has already been persisted above — if SMS fails we mark it used so a
    // retry generates a fresh code, and surface a 502 to the client.
    //
    // The brand name is env-driven via BRAND_NAME so we can rebrand everywhere
    // by changing one env var (default "Voyager"). Keep the message short —
    // carriers truncate aggressively, and Vietnamese Unicode takes 2 chars per
    // glyph in GSM-7 encoding.
    const brandName = process.env.BRAND_NAME || 'Voyager'
    const smsResult = await sendSms(
      normalised,
      `Your ${brandName} code is ${code}. It expires in ${Math.round(OTP_TTL_SECONDS / 60)} min. Don't share it with anyone.`,
    )

    if (!smsResult.ok) {
      req.log.error(
        { err: smsResult.error, provider: smsResult.provider },
        'SMS OTP send failed',
      )
      // Burn the OTP so the user can request a fresh one immediately.
      await OtpCode.findByIdAndUpdate(otpId, { used: true }).catch(() => {})
      return reply.code(502).send({
        error:
          'We couldn\u2019t send the SMS right now. Please try again in a moment.',
      })
    }

    req.log.info(
      { provider: smsResult.provider, messageId: smsResult.messageId, phone: normalised },
      'OTP SMS dispatched',
    )

    return {
      ok: true,
      expiresInSec: OTP_TTL_SECONDS,
      // Echo the normalised phone back so the frontend shows it correctly on the OTP step
      phone: normalised,
    }
  })

  // ═══ POST /clients/auth/verify-otp ═══
  app.post<{ Body: { phone?: string; countryCode?: string; code?: string } }>(
    '/clients/auth/verify-otp',
    async (req, reply) => {
      const { phone = '', countryCode = '+84', code = '' } = req.body ?? {}

      const normalised = normalisePhone(phone, countryCode)
      if (!normalised || !/^\d{6}$/.test(code)) {
        return reply.code(400).send({ error: 'Phone and 6-digit code are required.' })
      }

      const otp = await OtpCode.findOne({
        phone: normalised,
        used: false,
        expiresAt: { $gt: new Date() },
      }).sort({ createdAt: -1 })

      if (!otp) {
        return reply.code(400).send({ error: 'Code expired — request a new one.' })
      }
      if (otp.attempts >= OTP_MAX_ATTEMPTS) {
        return reply.code(429).send({ error: 'Too many attempts. Request a new code.' })
      }

      if (otp.code !== code) {
        otp.attempts += 1
        await otp.save()
        return reply.code(400).send({ error: 'Incorrect code. Try again.' })
      }

      otp.used = true
      await otp.save()

      // Find or create the Client by phone
      let client = await Client.findOne({ 'profile.phone': normalised })
      const now = new Date().toISOString()

      if (!client) {
        const newId = `vg-client-${crypto.randomUUID()}`
        client = await Client.create({
          _id: newId,
          operatorId: VOYAGER_OPERATOR_ID,
          profile: {
            firstName: '',
            lastName: '',
            email: '',
            phone: normalised,
            countryCode: (countryCode.startsWith('+') ? countryCode : `+${countryCode}`),
            nationalId: '',
            avatarUrl: '',
          },
          security: {
            passwordHash: '',
            phoneVerified: true,
            emailVerified: false,
            biometricEnabled: false,
            authMethods: ['phone'],
            googleSub: '',
            facebookId: '',
            webauthnCredentialIds: [],
            lastPasswordChange: '',
          },
          preferences: { currency: 'VND', locale: 'en' },
          isActive: true,
          lastLoginUtc: now,
          createdAt: now,
          updatedAt: now,
        })
      } else {
        // Existing client — mark phone verified (idempotent) and bump lastLogin
        const methods = new Set(client.security.authMethods)
        methods.add('phone')
        await Client.updateOne(
          { _id: client._id },
          {
            $set: {
              'security.phoneVerified': true,
              'security.authMethods': Array.from(methods),
              lastLoginUtc: now,
              updatedAt: now,
            },
          },
        )
      }

      if (client.isActive === false) {
        return reply.code(403).send({ error: 'Account is deactivated.' })
      }

      const tokens = issueClientTokens(app, client._id)
      const raw = client.toObject() as unknown as Record<string, unknown>
      return { ...tokens, client: sanitiseClient(raw) }
    },
  )

  // ═══ POST /clients/auth/signup — email + password fallback ═══
  app.post<{
    Body: { email?: string; password?: string; firstName?: string; lastName?: string }
  }>('/clients/auth/signup', async (req, reply) => {
    const { email = '', password = '', firstName = '', lastName = '' } = req.body ?? {}

    const normalisedEmail = email.toLowerCase().trim()
    if (!normalisedEmail || !/^.+@.+\..+$/.test(normalisedEmail)) {
      return reply.code(400).send({ error: 'Please enter a valid email.' })
    }
    if (!password || password.length < 8) {
      return reply.code(400).send({ error: 'Password must be at least 8 characters.' })
    }

    const existing = await Client.findOne({ 'profile.email': normalisedEmail })
    if (existing) {
      return reply.code(409).send({ error: 'An account with that email already exists.' })
    }

    const now = new Date().toISOString()
    const newId = `vg-client-${crypto.randomUUID()}`
    const passwordHash = await bcrypt.hash(password, 12)

    const client = await Client.create({
      _id: newId,
      operatorId: VOYAGER_OPERATOR_ID,
      profile: {
        firstName,
        lastName,
        email: normalisedEmail,
        phone: '',
        countryCode: '+84',
        nationalId: '',
        avatarUrl: '',
      },
      security: {
        passwordHash,
        phoneVerified: false,
        emailVerified: false,
        biometricEnabled: false,
        authMethods: ['email'],
        googleSub: '',
        facebookId: '',
        webauthnCredentialIds: [],
        lastPasswordChange: now,
      },
      preferences: { currency: 'VND', locale: 'en' },
      isActive: true,
      lastLoginUtc: now,
      createdAt: now,
      updatedAt: now,
    })

    const tokens = issueClientTokens(app, client._id)
    const raw = client.toObject() as unknown as Record<string, unknown>
    return { ...tokens, client: sanitiseClient(raw) }
  })

  // ═══ POST /clients/auth/login — email + password ═══
  app.post<{ Body: { email?: string; password?: string } }>(
    '/clients/auth/login',
    async (req, reply) => {
      const { email = '', password = '' } = req.body ?? {}
      if (!email || !password) {
        return reply.code(400).send({ error: 'Email and password are required.' })
      }
      const normalisedEmail = email.toLowerCase().trim()
      const client = await Client.findOne({ 'profile.email': normalisedEmail })
      if (!client || !client.security.passwordHash) {
        return reply.code(401).send({ error: 'Invalid email or password.' })
      }
      const valid = await bcrypt.compare(password, client.security.passwordHash)
      if (!valid) {
        return reply.code(401).send({ error: 'Invalid email or password.' })
      }
      if (client.isActive === false) {
        return reply.code(403).send({ error: 'Account is deactivated.' })
      }

      const now = new Date().toISOString()
      await Client.updateOne(
        { _id: client._id },
        { $set: { lastLoginUtc: now, updatedAt: now } },
      )

      const tokens = issueClientTokens(app, client._id)
      const raw = client.toObject() as unknown as Record<string, unknown>
      return { ...tokens, client: sanitiseClient(raw) }
    },
  )

  // ═══ POST /clients/auth/refresh ═══
  app.post<{ Body: { refreshToken?: string } }>(
    '/clients/auth/refresh',
    async (req, reply) => {
      const { refreshToken } = req.body ?? {}
      if (!refreshToken) {
        return reply.code(400).send({ error: 'Refresh token is required.' })
      }
      try {
        const decoded = app.jwt.verify<ClientRefreshPayload>(refreshToken)
        if (decoded.type !== 'refresh' || decoded.kind !== 'client') {
          return reply.code(401).send({ error: 'Invalid token.' })
        }
        const client = await Client.findById(decoded.clientId)
        if (!client || client.isActive === false) {
          return reply.code(401).send({ error: 'Account not found.' })
        }
        const tokens = issueClientTokens(app, client._id)
        return tokens
      } catch {
        return reply.code(401).send({ error: 'Invalid or expired refresh token.' })
      }
    },
  )

  // ═══ GET /clients/auth/me ═══
  app.get('/clients/auth/me', async (req, reply) => {
    const header = req.headers.authorization ?? ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : ''
    if (!token) return reply.code(401).send({ error: 'Missing token.' })
    try {
      const decoded = app.jwt.verify<ClientJwtPayload>(token)
      if (decoded.kind !== 'client') {
        return reply.code(401).send({ error: 'Invalid token.' })
      }
      const client = await Client.findById(decoded.clientId).lean()
      if (!client) return reply.code(404).send({ error: 'Client not found.' })
      return sanitiseClient(client as Record<string, unknown>)
    } catch {
      return reply.code(401).send({ error: 'Invalid or expired token.' })
    }
  })

  // ═══ Stubs — wire real providers when credentials are available ═══
  app.post('/clients/auth/google', async (_req, reply) => {
    return reply.code(501).send({
      error: 'Google sign-in is not configured yet. Set GOOGLE_OAUTH_CLIENT_ID first.',
    })
  })
  app.post('/clients/auth/facebook', async (_req, reply) => {
    return reply.code(501).send({
      error: 'Facebook sign-in is not configured yet. Set FACEBOOK_APP_ID first.',
    })
  })
  app.post('/clients/auth/webauthn/register-begin', async (_req, reply) => {
    return reply.code(501).send({ error: 'Biometric sign-in is coming soon.' })
  })
  app.post('/clients/auth/webauthn/register-finish', async (_req, reply) => {
    return reply.code(501).send({ error: 'Biometric sign-in is coming soon.' })
  })
  app.post('/clients/auth/webauthn/authenticate-begin', async (_req, reply) => {
    return reply.code(501).send({ error: 'Biometric sign-in is coming soon.' })
  })
  app.post('/clients/auth/webauthn/authenticate-finish', async (_req, reply) => {
    return reply.code(501).send({ error: 'Biometric sign-in is coming soon.' })
  })
}
