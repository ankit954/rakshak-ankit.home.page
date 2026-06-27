# RAKSHAK Public Marketing Website — PRD

## Original Problem Statement
Build a public marketing website for RAKSHAK (separate from the app login). 
This is for visitors to learn about the service and download the app. NO login/OTP on these pages.
Premium dark + gold theme (bg #0B0B0D, gold #D9A93D). Mobile-responsive, SEO-friendly.

## User Personas
1. **Customer** — needs to book a verified bodyguard (events, women's safety, business, transit).
2. **Aspiring Guard** — Ex-Army, Ex-Police, PSARA-trained — wants steady gigs.
3. **Press / Enterprise** — researches the brand & company.

## Architecture
- React (CRA + craco) + React Router v7 — multi-page SPA.
- FastAPI backend at /api — adds /api/contact for the contact form.
- MongoDB — collection `contact_submissions`.
- Fonts: Cabinet Grotesk (display) + Satoshi (body) via Fontshare.
- Icons: lucide-react.

## Pages Implemented (Dec 2025)
- `/` Home (For Customers) — hero, trust marquee, How-It-Works (4 steps), Trust pillars (6), Use Cases bento (6), Categories (4), Reviews, FAQ accordion, final CTA, recruit cross-link.
- `/become-a-guard` — hero w/ live earnings card, eligibility (4), required docs, benefits (6), join steps (5), standards, final CTA.
- `/about` — mission/vision/operations, timeline, values (4), presence, CTA.
- `/contact` — submission form (POSTs `/api/contact`), direct contact card, channel desks, emergency notice.
- Shared Header (sticky, glass), Footer (links, cities, social, contact).
- SEO meta + OG tags in index.html.

## What's Implemented
- All 4 pages, header, footer, ScrollToTop, SEO meta, Sonner toasts.
- Contact form persisted in MongoDB via `/api/contact`.
- Mobile responsive (md/lg breakpoints), no login anywhere.
- data-testid on all interactive elements.

## Backlog / Next Action Items
- P0: Real RAKSHAK PNG logo (currently typographic gold wordmark + shield SVG).
- P1: Live Play Store / App Store URLs (currently `#` placeholders labelled "Coming Soon").
- P1: Privacy Policy, Terms, DPDP consent — content pages (currently `#`).
- P2: Newsletter signup, blog/press section, structured data (schema.org Organization).
- P2: Admin view of contact submissions (currently GET /api/contact returns all).
