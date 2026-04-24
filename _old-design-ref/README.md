# Voyager — Airport Travel Services Platform

> Land. Tap. Sorted.

Airport pickup, fast track, VIP lounge, hotels & tours across Vietnam's 5 major airports.

## Quick start

```bash
cd apps/web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page — hero, search, services, trending, airports, reviews |
| `/services` | All services overview |
| `/services/airport-pickup` | Vehicle selection + booking flow |
| `/services/fast-track` | VIP & fast track service selector |
| `/services/hotels` | Hotel listings with filters |
| `/services/tours` | Tour & activity catalog |
| `/booking` | 3-step checkout (details → payment → confirm) |
| `/bookings` | Booking history & tracking |
| `/login` | Unified auth (traveler / supplier / operator) |

## Tech stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS v4**
- **TypeScript**
- **Plus Jakarta Sans** + **Fraunces** fonts

## Brand

- Primary: `#0C9B6A` (emerald green)
- Navy: `#1E3A5F` (premium/VIP)
- Gold: `#F59E0B` (ratings)
- Coral: `#E8590C` (supplier accent)

## Deploy to Vercel

```bash
npx vercel --cwd apps/web
```

Or connect the repo to Vercel and set the root directory to `apps/web`.
