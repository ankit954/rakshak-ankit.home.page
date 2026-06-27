# RAKSHAK Public Marketing Website — PRD

## Original Problem Statement
Build a public marketing website for RAKSHAK (separate from the app login).
NO login/OTP on these pages. Premium dark + gold theme (bg #0B0B0D, gold #D9A93D).
Mobile-responsive, SEO-friendly. Wired into the existing FastAPI + MongoDB project.

## User Personas
1. **Customer** — books a verified bodyguard.
2. **Aspiring Guard** — Ex-Army / Ex-Police / PSARA-trained — wants steady gigs.
3. **Press / Enterprise** — researches brand & company.
4. **Admin** — RAKSHAK ops, reviews leads.

## Architecture
- React (CRA + craco) + React Router v7 — multi-page SPA.
- FastAPI backend at `/api` with MongoDB.
- Fonts: Cabinet Grotesk + Satoshi via Fontshare.
- Icons: lucide-react.
- Static logo asset at `/app/frontend/public/rakshak-logo.png`.

## Pages
- `/` Home — hero, trust marquee, How-It-Works (4), Trust pillars (6),
  Use Cases bento (6), Categories (4), Reviews, FAQ, final CTA + waitlist,
  recruit cross-link.
- `/become-a-guard` — recruitment hero, eligibility, docs, benefits (6),
  join steps (5), standards, final CTA.
- `/about` — mission/vision/operate, timeline, values (4), presence, CTA.
- `/contact` — submission form → POST `/api/contact`, sidebar info.
- `/privacy`, `/terms`, `/dpdp` — DPDP-Act 2023-aligned legal pages.
- `/admin` — token-gated admin console (contacts + waitlist tabs).

## Backend endpoints
- Public:
  - `GET /api/`
  - `POST /api/status`, `GET /api/status`
  - `POST /api/contact` (Pydantic + EmailStr validated; persists to `contact_submissions`)
  - `POST /api/waitlist` (idempotent on email+role; persists to `waitlist_signups`)
- Admin (require `X-Admin-Token` header matching `ADMIN_TOKEN` env):
  - `GET /api/admin/check`
  - `GET /api/admin/contacts`
  - `GET /api/admin/waitlist`

## Env vars
- Backend: `MONGO_URL`, `DB_NAME`, `CORS_ORIGINS`, `ADMIN_TOKEN`.
- Frontend: `REACT_APP_BACKEND_URL`, `REACT_APP_PLAY_STORE_URL` (optional),
  `REACT_APP_APP_STORE_URL` (optional). When the latter two are non-empty,
  `DownloadButtons` switches from "Coming Soon" placeholders to real
  outbound store links automatically.

## What's Implemented (Dec 2025)
- All public pages, sticky header, footer, ScrollToTop, SEO meta+OG tags.
- Real RAKSHAK logo image swapped in (replaces SVG wordmark).
- Waitlist email-capture on hero + final CTA, stored in MongoDB.
- Token-gated admin console with contacts + waitlist tables + search.
- Privacy / Terms / DPDP content tailored to India DPDP Act 2023.
- Coverage of data-testid attributes for testing.

## Backlog / Next Action Items
- P1: Live Play Store / App Store URLs — drop into `REACT_APP_PLAY_STORE_URL`
  & `REACT_APP_APP_STORE_URL`. Restart frontend.
- P2: CSV export from admin console.
- P2: Lead notification email on new contact / waitlist (e.g. Resend / SES).
- P2: Cookie / consent banner (DPDP).
- P2: Structured data (Organization JSON-LD) on Home for better SEO.
