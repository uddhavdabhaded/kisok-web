# DMH Patient Kiosk – React (Vite)

Deenanath Mangeshkar Hospital & Research Center – touch-screen patient kiosk (1920×1080, auto-scales to any screen).
Screens: Welcome → Language → Home → Book Appointment (speciality → doctor → date/time → OTP verify → confirmed → pay),
Self Check-in, Find a Doctor, Way-finding, Pay Bills, Reports, Insurance/TPA, New Registration.

> All data (doctors, slots, bill, OTP `123456`, payments, QR) is **sample/demo**. Swap `src/data.js` and `src/utils.js (slotsFor)` for your HIS / API.

## Run locally
```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # outputs ./dist
npm run preview
```
Node 18+ required.

## Deploy to Cloudflare Pages

### Option A – Git (recommended, auto-deploys on every push)
1. Push this folder to GitHub/GitLab.
2. Cloudflare Dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Build settings: **Framework preset** `Vite` (or None) · **Build command** `npm run build` · **Build output directory** `dist`.
4. Environment variable (only if the build fails on Node version): `NODE_VERSION = 20`.
5. **Save and Deploy.** You get `https://<project>.pages.dev`; add a custom domain under *Custom domains*.

### Option B – CLI (direct upload)
```bash
npm install
npx wrangler login
npm run deploy        # = vite build + wrangler pages deploy dist --project-name=dmh-kiosk
```
First run asks to create the project `dmh-kiosk` (production branch `main`).

`public/_headers` already sets security headers and long caching for hashed assets.

## Run on the kiosk PC (fullscreen)
```bash
chrome.exe --kiosk --kiosk-printing --autoplay-policy=no-user-gesture-required https://<your-site>.pages.dev
```
`--kiosk-printing` prints silently to the default printer (receipts / reports).

## Project layout
```
src/App.jsx       navigation (back/forward), OTP gate, footer Next, read-aloud, clock, idle reset
src/screens.jsx   all screens + Keypad
src/data.js       sample hospital data         src/i18n.js   en / mr / hi labels (others fall back to English)
src/utils.js      slots, formatting            src/styles.css
```

## Not ported yet (exist in the single-file demo)
Split-bill, A4 invoice / 80 mm receipt templates, full translations for the other 8 languages, staff dashboards,
real OTP / UPI / printer / HIS integration (needs a backend – e.g. Cloudflare Workers + D1/KV).
