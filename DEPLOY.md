# Voyager — Deploy to a free URL

Goal: get Voyager on a public URL so a client can run the Fast-Track flow
**pick airport → fill passengers → pay → receive Fast Track ID**.

> **2026-05-06 pivot:** site is now Fast-Track-only. New env vars are
> required for VNPay, Vietnamese bank transfer, and the USD/VND FX cache —
> see the section "Server env vars" below.

## Server env vars (server/.env or Render dashboard)

```
# Mongo + JWT (existing)
MONGODB_URI=mongodb+srv://...
JWT_SECRET=at-least-32-chars
PORT=3010
NODE_ENV=production
CORS_ORIGIN=https://your-vercel-domain.vercel.app
CLIENT_URL=https://your-vercel-domain.vercel.app

# VNPay (production credentials from VNPay merchant portal)
VNPAY_TMN_CODE=__from_vnpay__
VNPAY_HASH_SECRET=__from_vnpay__
VNPAY_PAY_URL=https://pay.vnpay.vn/vpcpay.html
VNPAY_RETURN_URL=https://your-vercel-domain.vercel.app/api/payments/vnpay/return

# Vietnamese bank transfer (display only — agent confirms manually)
BANK_NAME=Vietcombank
BANK_ACCOUNT_NAME=VIHAT TOUR CO., LTD
BANK_ACCOUNT_NO=__vihat_account__
BANK_BIN=970436

# USD→VND FX cache (Vietcombank reference rate)
FX_REFRESH_HOURS=6
FX_FALLBACK_USD_VND=25500

# SMS / OTP (existing)
SMS_PROVIDER=twilio  # or esms
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_FROM_NUMBER=+...
```

After changing any of these on Render, reseed once:

```bash
npm run seed:voyager
```

(Idempotent — wipes legacy pickup/hotel/tour products and inserts the
10 Fast-Track products with the Vihat 2024 USD prices.)

---

Architecture for this deploy:

| Piece | Host | Cost |
| --- | --- | --- |
| Web app (Next.js, `apps/web`) | Vercel | Free |
| API server (Fastify, `server/`) | Render (free web service) | Free (cold-starts after 15 min idle) |
| Database | MongoDB Atlas M0 | Free (512 MB) |

Plan on ~30 minutes end-to-end for a first-time run.

---

## 0. Prereqs

- A GitHub account (free).
- Node 22+ and npm 10+ installed locally (already true if you've been running the app).
- Git installed on Windows.

---

## 1. Push the Voyager repo to GitHub

We deliberately stripped the horizon `.git` folder, so this is a fresh repo.

Open PowerShell in `C:\Users\vivim\Voyager` and run:

```powershell
git init
git add .
git commit -m "Initial Voyager commit"
```

Now create the GitHub repo:

1. Go to https://github.com/new
2. Name it `voyager` (or whatever). **Private** is fine.
3. Do NOT initialize with README / .gitignore / license — the local repo already
   has those.
4. On the next screen, GitHub shows you a "…or push an existing repository from
   the command line" block. Copy those two commands (they look like):

   ```powershell
   git remote add origin https://github.com/<you>/voyager.git
   git branch -M main
   git push -u origin main
   ```

5. Run them in the same PowerShell window.

Safety check: confirm the remote is `voyager`, **not** `horizon-v2-mono`:

```powershell
git remote -v
```

---

## 2. Create a MongoDB Atlas cluster

You already use Atlas for SkyHub. We want a **separate** project/cluster for
Voyager so the two databases never collide.

1. Log into https://cloud.mongodb.com.
2. Top-left project dropdown → **+ New Project** → name it `Voyager` → Create.
3. Inside the Voyager project: **Create** → **M0 Free** cluster.
   - Provider/region: pick the region closest to your users (Singapore is good
     for Vietnam traffic).
   - Cluster name: `voyager-prod` (or anything).
   - Create.
4. **Database Access** → **Add New Database User**:
   - Username: `voyager-app`
   - Password: click **Autogenerate Secure Password** and copy it somewhere safe
     (you'll paste it into Render env vars in step 4).
   - Built-in Role: **Read and write to any database**.
   - Add User.
5. **Network Access** → **Add IP Address** → **Allow Access From Anywhere**
   (`0.0.0.0/0`). This is fine for a demo; lock down later.
6. Back on **Database** → **Connect** → **Drivers** → copy the connection
   string. It looks like:

   ```
   mongodb+srv://voyager-app:<password>@voyager-prod.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

   - Replace `<password>` with the password from step 4.
   - Add `voyager` as the database name before the `?`:

   ```
   mongodb+srv://voyager-app:REAL_PASSWORD@voyager-prod.xxxxx.mongodb.net/voyager?retryWrites=true&w=majority
   ```

   Keep this string. It's your `MONGODB_URI`.

---

## 3. Deploy the API server to Render

1. Sign up / log in at https://render.com (free, GitHub login works).
2. Top-right → **New** → **Blueprint**.
3. **Connect** your GitHub account if first time → select the `voyager` repo.
4. Render detects `render.yaml` at the repo root and shows `voyager-server`.
   Click **Apply**.
5. Render prompts for the env vars marked `sync: false`. Fill them in:
   - `MONGODB_URI` → the connection string from step 2.
   - `CORS_ORIGIN` → leave blank for now (we don't have the Vercel URL yet) or
     paste `*` temporarily. We'll tighten it after step 4.
   - `CLIENT_URL` → leave blank for now.
   - `JWT_SECRET` → Render auto-generates.
6. Click **Create Resources**. First build takes ~3–5 minutes.
7. When it goes green, copy the service URL from the top of the dashboard. It
   looks like `https://voyager-server.onrender.com`. Verify:

   ```
   https://voyager-server.onrender.com/health
   ```

   Should return `{"status":"ok"}`. If yes, server is live.

### Seed the database

Once the server is up, open Render → your service → **Shell** tab and run:

```
npm --workspace server run seed:voyager
```

This populates the 5 airports, destinations, and sample products. Without it,
the destination pages will be empty.

> If the Shell tab isn't available on the free plan, you can seed from your
> local machine instead: set `MONGODB_URI` in `server/.env` to the Atlas
> string and run `npm --workspace server run seed:voyager` locally.

---

## 4. Deploy the web app to Vercel

1. Sign up / log in at https://vercel.com (GitHub login).
2. **Add New → Project** → import the `voyager` repo.
3. Vercel will ask a few questions:
   - **Framework preset**: Next.js (auto-detected).
   - **Root Directory**: click **Edit** → pick `apps/web`.
   - **Build Command**: leave default (`next build`).
   - **Install Command**: override to
     `npm install --workspaces --include-workspace-root --prefix ../..`
     so workspace deps resolve. If the default works, leave it.
4. **Environment Variables** → add:
   - `NEXT_PUBLIC_API_URL` = `https://voyager-server.onrender.com`
     (from step 3's Render URL — no trailing slash)
   - `NEXT_PUBLIC_BRAND_NAME` = `Voyager`
   - `NEXT_PUBLIC_BRAND_MARK` = `V`
   - `NEXT_PUBLIC_BRAND_TAGLINE` = `Vietnam, sorted — airport to adventure.`
5. **Deploy**. First build ~2 minutes.
6. Vercel hands you a URL like `https://voyager-<hash>.vercel.app`. Open it —
   the home page with the destination carousel should load.

### Tighten CORS (recommended after first successful load)

Now that you know the Vercel URL, go back to Render → service →
**Environment** and set:

- `CORS_ORIGIN` = `https://voyager-<hash>.vercel.app` (your actual Vercel URL)
- `CLIENT_URL` = same value

Render will redeploy the server automatically.

---

## 5. Test the flow

On the live Vercel URL, walk through the target path:

1. Home → click a destination card (e.g. Ha Long).
2. On `/destinations/ha-long-bay`, click **Add to cart** on a service.
3. Top nav cart icon → **Checkout**.
4. Fill name + phone + travel date → **Submit**.
5. You should land on `/checkout/success/<booking-number>` showing the
   confirmation.
6. Verify the booking landed in Atlas: **Database** → **Browse Collections**
   → `voyager.bookings` — the new doc is there.

If steps 3–4 hang, it's usually Render's free-tier cold start (~30s on first
hit). Wait and retry.

---

## 6. Share with the client

Send them the Vercel URL only. Render's URL is internal.

For a short-lived demo link you can also pin a specific deployment via
Vercel → Deployments → click one → **Promote to Production**.

---

## Troubleshooting

**Render build fails with "Cannot find module @skyhub/env"** — the install
command isn't installing workspaces. Edit the service → Build Command →
ensure it's `npm install --workspaces --include-workspace-root`.

**Vercel build fails with "Module not found: Can't resolve '@skyhub/api'"** —
the install happened only inside `apps/web`. Use the install override from
step 4. Alternatively, switch Vercel's Root Directory to repo root and set
Build Command to `turbo build --filter=web` and Output Directory to
`apps/web/.next`.

**Checkout returns "Network error"** — `NEXT_PUBLIC_API_URL` is wrong or
CORS is blocking. Open devtools Network tab, check the `/clients/bookings`
POST. 403/CORS → fix `CORS_ORIGIN` on Render. 502/504 → Render is asleep,
wait 30s and retry.

**Empty destination pages** — the seed didn't run. Re-run
`npm --workspace server run seed:voyager` from Render's Shell tab or locally.
