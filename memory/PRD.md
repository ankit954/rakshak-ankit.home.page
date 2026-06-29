# RAKSHAK — Architecture & PRD

## Layout (single React build, two surfaces)
- Public marketing site — served from the root domain (e.g. `therakshak.in`,
  `rakshak-landing.preview.emergentagent.com`).
- Admin console — served from `admin.therakshak.in`. Same React build
  detects `window.location.hostname.startsWith('admin.')` and renders the
  admin shell instead of the marketing site. In preview, append `?admin=1`
  (or visit any `/admin*` path) to load the admin shell.

## Backend (FastAPI + motor + MongoDB Atlas)
- Public endpoints under `/api/*` (status, contact, waitlist, health).
- Admin auth under `/api/admin/auth/*`:
  - `POST /login` (email + password → JWT + cookie)
  - `GET  /me`
  - `POST /logout`
- Admin module endpoints under `/api/admin/<module>`:
  - `GET  /api/admin/<module>` (paginated, search, status filter)
  - `GET  /api/admin/<module>/export.csv`
  - `GET  /api/admin/<module>/{id}`
  - `PATCH /api/admin/<module>/{id}`
  - `POST  /api/admin/<module>/{id}/status`
  - `GET  /api/admin/dashboard/kpis`
- Modules wired: users, guards, bookings, orders, transactions, categories,
  cities, pricing, coupons, tickets, kyc, sos, payouts, settlements,
  settings, audit_log, contacts (marketing), waitlist (marketing).
- Auth library: `auth.py` (bcrypt + PyJWT). Idempotent admin seed on
  startup as a fire-and-forget task — Atlas reachability does NOT block
  API readiness.
- Audit trail: every PATCH / status change writes to `audit_log` with
  `before`/`after`/`actor`.
- Legacy `X-Admin-Token` header still honoured for one release to avoid
  breaking older clients.

## Frontend (React + react-router 7)
- Public marketing (Home, Become a Guard, About, Contact, Privacy, Terms,
  DPDP, Login).
- Public `/login` → "RAKSHAK runs on the mobile app" → Play/App Store CTAs
  + waitlist. No customer/guard web auth.
- Admin SPA (`/app/frontend/src/admin/*`):
  - `AdminApp` — separate BrowserRouter with `AdminAuthProvider`.
  - `AdminAuthContext` — token in `localStorage.rk_admin_jwt` + httpOnly
    cookie; axios interceptor for `Authorization: Bearer …` and 401 redirect.
  - `AdminLayout` — grouped sidebar (Overview / Operations / People /
    Finance / Catalogue / Marketing / System), header with profile menu.
  - `Dashboard` — KPI cards across all 17 modules + revenue snapshot.
  - `ModulePage` — generic data table with search, status filter,
    pagination, CSV export, JSON detail drawer. Wired to all module slugs.

## Env vars
### Backend (`backend/.env`)
- `MONGO_URL`, `DB_NAME` — shared with mobile app (`rakshak`).
- `CORS_ORIGINS` — explicit list including therakshak.in and admin
  subdomain + preview host. Wildcard regex covers all subdomains.
- `JWT_SECRET` — HS256 signing key (rotate to invalidate all sessions).
- `ADMIN_EMAIL`, `ADMIN_PASSWORD` — seeded into `admin_users` on startup.
- `ADMIN_TOKEN` — legacy static-secret fallback.

### Frontend (`frontend/.env`)
- `REACT_APP_BACKEND_URL` — single backend for both surfaces.
- `REACT_APP_PLAY_STORE_URL`, `REACT_APP_APP_STORE_URL` — empty → "Coming
  Soon" placeholders; populate to enable real outbound store links.

## Known issue (handoff)
- Atlas Network Access does not include the preview environment egress IP.
  Every `/api/admin/*` call returns 503/401 cleanly until that's fixed.
  Recommended: whitelist `0.0.0.0/0` in Atlas (the egress IP rotates).

## Backlog
- P1: Module-specific actions (Approve KYC, Mark SOS resolved, Refund
  booking, Mark payout paid) — current build is read-only + generic patch.
  Add purpose-built action buttons once the real schemas are inspected.
- P1: 2FA on admin login (TOTP).
- P2: Excel export (XLSX) in addition to CSV.
- P2: Real-time SOS push via WebSocket or polling.
- P2: Reports module with charts (Recharts) once aggregations are decided.
