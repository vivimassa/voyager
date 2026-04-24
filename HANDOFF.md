# Voyager fork handoff

**Read this file first.** This is a hand-off from a previous Claude session whose
sandbox shell deadlocked mid-copy. You are resuming a SkyHub/Horizon fork strip
into this folder.

## What Voyager is

Vihat Tour — an **airport travel services platform** for Vietnam's 5 major
airports (HAN, SGN, DAD, CXR, PQC). Three portals planned:

- **Client** — consumers booking airport pickup, fast-track, hotels, tours
- **Supplier** — partners (drivers, hotels, tour operators) accepting bookings
- **Ops** — Vihat Tour internal staff running operations

The infra is being forked from the user's existing **SkyHub/Horizon** repo
(`vivimassa/horizon-v2-mono`), which is a Turborepo monorepo:

- `apps/web` — Next.js 16 App Router, React 19, Tailwind v4
- `server/` — Fastify 5 + Mongoose 8 + MongoDB Atlas, JWT auth, multi-tenant (operatorId)
- `packages/api` — typed API client
- `packages/constants` — shared constants (airports, countries)
- `packages/env` — Zod-validated env vars
- `packages/logic` — utility helpers (color, timezone, uom)
- `packages/ui` — design tokens (colors, typography, spacing)
- `packages/types` — **DELETED** in the strip

Domain mapping Horizon → Voyager:
FlightInstance → Booking, AircraftRegistration → Supplier, ScheduledFlight → Product.

## What's already in C:\Users\vivim\Voyager

Do NOT touch these — they're already stripped and clean:

- `_old-design-ref/` — the original Voyager static Next.js shell, preserved for visual
  reference (airport pickup, fast-track, hotels, tours page designs live here). Keep.
- `apps/web/` — **stripped and in place**. Includes `node_modules/` and `.next/`
  from the verification build. The airline module dashboard was replaced with a
  minimal Voyager placeholder page. `src/components/app-shell.tsx` and
  `theme-provider.tsx` were rewritten to remove `@skyhub/constants` module-theme
  and `@skyhub/ui/theme` dark-accent dependencies. Uses `vg-theme` localStorage key.
- `node_modules/` — installed at root
- `.claude/`, `.github/`, `.husky/`, `.vscode/`, `.gitignore`, `.editorconfig`,
  `.nvmrc` — copied from horizon, fine as-is
- `.git/` — **deleted** by the user (no horizon remote, safe)

## What's MISSING and needs to be put in place

The previous session's `cp -r /tmp/horizon/. /mnt/Voyager/` froze before these
were copied:

- Root `package.json` (name: `voyager-mono`, no `dev:mobile` script, no
  `react-native-svg` dep)
- `turbo.json`
- `tsconfig.json`, `tsconfig.base.json`
- `prettier.config.js`
- `scripts/` directory
- `server/` — the stripped Fastify server
- `packages/api`, `packages/constants`, `packages/env`, `packages/logic`,
  `packages/ui` — the 5 stripped packages (types was DELETED, not kept)

## The strip recipe (to re-apply from a fresh horizon clone)

Clone `https://github.com/vivimassa/horizon-v2-mono.git` into the sandbox at
`/tmp/horizon`, then apply these changes:

### Root
- Rename `package.json` name → `voyager-mono`
- Remove `react-native-svg` dep
- Remove `dev:mobile` script
- Delete `package-lock.json`
- Delete `apps/mobile/` entirely
- Delete `services/` (airline docs)

### server/
Keep ONLY these models: `User.ts`, `Operator.ts`. Delete the other ~40 airline
models (flight, aircraft, crew, airport, etc.).

Keep ONLY these routes: `auth.ts`, `users.ts`. Delete the other 17 airline routes
AND `reference.ts`.

Rewrite `server/src/index.ts` to register only `authRoutes`, `userRoutes`, CORS,
JWT, multipart, static, and a `/health` endpoint. Drop all airline route
registrations and OOOI simulation.

`server/package.json`: keep `fastify`, `mongoose`, `bcryptjs`, `zod`, `dotenv`,
`@skyhub/env`. Drop `@supabase/supabase-js`, `exceljs`. Keep only `seed:user` script.

### apps/web/
- `src/app/layout.tsx` — drop `./mapbox-fix.css` import, title `'Voyager'`,
  description `'Airport travel services platform — Vietnam'`
- `src/app/page.tsx` — replace airline dashboard with minimal placeholder:
  ```tsx
  export default function HomePage() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Voyager</h1>
        <p className="text-lg text-hz-text-secondary max-w-lg">
          Airport travel services platform. Forked scaffold ready — ops / client / supplier
          portals coming soon.
        </p>
      </div>
    )
  }
  ```
- `src/components/app-shell.tsx` — minimal shell, no AnimatedBodyBg/Breadcrumb/SpotlightDock
- `src/components/theme-provider.tsx` — remove `@skyhub/constants` resolveModule+MODULE_THEMES
  and `@skyhub/ui/theme` darkAccent. Use `vg-theme` localStorage key.
- `package.json` — prune to: `@skyhub/api`, `@skyhub/constants`, `@skyhub/env`,
  `tailwind`, `@tanstack/react-query`, `clsx`, `framer-motion`, `lucide-react`,
  `next`, `react`, `react-dom`, `tailwind-merge`, `zustand`. Drop: `mapbox-gl`,
  `react-map-gl`, `solito`, `exceljs`, `xlsx`, `jspdf`, `@tanstack/react-virtual`,
  `@types/mapbox-gl`.
- `next.config.ts` — `transpilePackages: ['@skyhub/api', '@skyhub/constants', '@skyhub/ui']`

### packages/api/
Rewrite `src/client.ts` (was 2624 lines) down to ~90 lines: keep only
`setApiBaseUrl`, `getApiBaseUrl`, `setAuthCallbacks`, and `api` object with
`login`, `refresh`, `forgotPassword`, `resetPassword`, `setPassword`.

`src/index.ts`:
```ts
export { api, setApiBaseUrl, getApiBaseUrl, setAuthCallbacks } from './client'
export type { LoginResponse, RefreshResponse } from './client'
```

### packages/constants/
`src/index.ts`:
```ts
export * from './airport-countries'
export * from './country-flags'
```

### packages/logic/
`src/index.ts`:
```ts
export * from './utils/color-helpers'
export * from './utils/timezone'
export * from './utils/uom'
```

### packages/ui/
Keep only `colors`, `typography`, `spacing` exports in `src/theme/index.ts` and
`web-safe.ts`. Delete `icons.ts` (uses lucide-react-native) and `shadows.ts`
(uses Platform from react-native).

### packages/env/
Add `CLIENT_URL: z.string().default('http://localhost:3000')` to serverEnvSchema
in `src/server.ts` (fixes auth.ts typecheck error).

### packages/types/
**DELETE ENTIRELY.**

### tsconfig cross-refs
Remove `"references": [{ "path": "../types" }]` from tsconfigs in
`packages/logic`, `packages/api`, `packages/ui`.

## Verification target

After the strip, `npm install` + `npx turbo build --filter=web` must pass. All 6
packages + server must typecheck with zero errors. This was already verified in
the previous session.

## What to copy to C:\Users\vivim\Voyager

From the newly stripped `/tmp/horizon/`, copy ONLY these paths into the
Windows Voyager folder (apps/web is already done, don't overwrite its
node_modules/.next):

- `package.json`
- `turbo.json`
- `tsconfig.json`
- `tsconfig.base.json`
- `prettier.config.js`
- `scripts/`
- `server/`
- `packages/`

Then `cd C:\Users\vivim\Voyager` on the user's Windows machine and run:
`npm install` to link the workspace packages.

## Day-2 tasks (Voyager-specific work, not yet started)

These are the actual Voyager features to build AFTER the fork lands cleanly:

1. **New Mongoose models**: Booking, Client, Supplier, Product, SupplierProduct,
   Passenger, WalletTransaction (all with `operatorId` tenant field)
2. **New Fastify routes**: `/bookings`, `/clients`, `/suppliers`, `/products`,
   `/wallet`
3. **New web route groups**: `apps/web/src/app/(ops)/`, `(client)/`, `(supplier)/`
4. **Booking-engine state machine** (pending → confirmed → fulfilled → closed)
5. **Supplier-matcher** (by service type, airport, availability)
6. **Wallet ledger** (operator/supplier balances with transaction log)
7. **i18n en/vi** (Vietnamese + English)
8. **Seed script** (5 airports, sample operators, demo data)
9. **Global package rename** `@skyhub/*` → `@voyager/*` (deferred; currently
   everything still uses `@skyhub/` namespace — works fine, just cosmetic)

## Safety note

SkyHub/Horizon is the user's active production project. The fork strip was
performed in `/tmp/horizon` inside a Linux sandbox with NO github credentials,
and the `.git` directory pointing to `vivimassa/horizon-v2-mono` has been
deleted from `C:\Users\vivim\Voyager`. There is zero risk of a stray push to
SkyHub's repo. Do not re-clone horizon into the Voyager folder — re-clone it
into `/tmp/horizon` in the sandbox.
