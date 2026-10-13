# RAKSHAK — Product Requirements & Architecture

## Original problem statement
Build a public marketing website for RAKSHAK with no web login, a premium dark-and-gold theme, and mobile-responsive Home, Become a Guard, About and Contact pages. Expand it with Pricing, Support, Refund, Service Delivery, Privacy, Terms and DPDP information for payment-gateway review. Policies must describe RAKSHAK as a facilitator. Connect the public forms to the existing mobile-app MongoDB Atlas database.

## Product constraints
- Use RAKSHAK throughout the site. The legal entity name is restricted to the Contact page.
- Header Log in buttons were removed from desktop and mobile on 2026-09-08. Do not restore them, the removed frontend admin panel, or any web authentication flow.
- Legal/policy pages must remain one click away from every footer.
- Preserve the established dark-and-gold visual language for incremental updates.
- Customer contact phone: 7070131111, centralized in company configuration.

## Current architecture
- React with react-router, Tailwind, reusable UI components and Sonner toasts.
- `/app/frontend/src/App.js`: public layout, Header/Footer and routes for `/`, `/about`, `/pricing`, `/become-a-guard`, `/support`, `/contact`, `/privacy`, `/terms`, `/refund-policy`, `/service-delivery`, `/dpdp`, `/login`.
- `/login` is only a public informational app-download page, not authentication. It is not linked from the header.
- `/app/frontend/src/components/DownloadButtons.jsx`: shared official Google Play and App Store artwork, with active or disabled behavior determined by store configuration.
- `/app/frontend/src/config/appLinks.js`: shared environment-based store URLs for badges, desktop/mobile header and footer CTAs.
- `/app/frontend/src/config/company.js`: centralized company/contact details used by informational and policy pages.
- `/app/frontend/src/components/WaitlistForm.jsx`: email + city capture, role/source attribution, validation and feedback; unchanged by the Android release update.
- `backend/server.py`: FastAPI public `/api/contact`, `/api/waitlist`, `/api/health` endpoints only.
- The legacy backend admin (`auth.py`, `admin_modules.py`) was removed on 2026-10-12; admin work happens in the RAKSHAK app's own admin console.
- MongoDB Atlas uses protected `MONGO_URL` and `DB_NAME` values in backend `.env`; forms write to contacts/waitlist collections. Do not change credentials, DB name or collections for UI work.
- Production: nginx serves the built frontend for therakshak.in and forwards `/api/` to the backend. Public API requests use `REACT_APP_BACKEND_URL` (empty = same origin) and the `/api` prefix, via `src/config/api.js`.

## Environment configuration
- `REACT_APP_BACKEND_URL`: optional; empty means same origin.
- `REACT_APP_PLAY_STORE_URL`: optional; defaults to `https://play.google.com/store/apps/details?id=com.therssoftware.therakshak`.
- `REACT_APP_APP_STORE_URL`: intentionally empty because iOS is unreleased. Empty means a non-interactive SOON badge.
- Existing backend and frontend configuration keys are preserved. No new dependencies or authentication credentials were introduced in this update.

## Completed before this continuation
- Public marketing MVP, pricing/support and payment-gateway policy page set.
- Central company details, official app-store badge artwork, revised facilitator/liability policies.
- Frontend admin removal and inert header Log in controls.
- Legal entity name restricted to Contact; updated support phone.
- Partial light-theme CSS exists in `index.css`, but theme toggle and performance work were not completed or verified.

## Completed 2026-09-07 — Android launch/download update
User requested:
1. Remove Google Play SOON; link every Google Play/Download App/Get the App CTA to the supplied live listing in a new tab.
2. Keep App Store SOON and non-clickable.
3. Hero status: `Now on Google Play · iOS coming soon`.
4. Hero heading: `GET LAUNCH UPDATES & OFFERS`; keep email + city form unchanged.
5. Mobile header download must also open Google Play; outbound download links must use `rel="noopener"`.

Implemented:
- Set Google Play environment URL and centralized shared store configuration. Verified public listing is RAKSHAK by The Rakshak, supporting customers and bodyguards.
- All shared Google Play badges now open the listing using `target="_blank" rel="noopener"`, without SOON.
- Unreleased App Store badge renders a non-focusable span with `role="link"`, `aria-disabled="true"`, no href or click handler, and retained SOON artwork label.
- Desktop/mobile header and new footer Download App quick-link share the same live URL. Removed previous hash-scroll interception.
- Made the direct header download button visible on small screens, retained the mobile-menu download CTA, and moved navigation collapse to xl to avoid crowded tablet layouts.
- Updated hero status and updates heading, plus final CTA/recruitment/informational-login status and support FAQ where old messaging contradicted Android availability.
- Added meaningful test IDs to new/changed controls and availability labels. Left forms, policies, authentication and backend logic unchanged.

### Verification
- `yarn build`: compiled successfully.
- External-preview screenshot smoke check: passed; current hero copy and Play Store href verified.
- `/app/test_reports/iteration_4.json`: frontend requested scope 100% passed, no UI/integration/design bugs.
- Tested badges and CTAs across Home, About, Pricing, Become a Guard and informational Login; header/footer/policy navigation across all remaining public routes.
- Desktop and mobile opening behavior, new-tab security attributes, disabled iOS behavior and inert Log in controls verified.
- Responsive checks at 320, 768, 1024 and 1440px passed with no horizontal overflow.
- Backend and real form submissions were deliberately not retested; no seeded data or mocked APIs. Earlier report recorded Atlas reachability issues, which are not resolved by this frontend-only change.
- Non-blocking preview analytics `cdn-cgi/rum` aborted requests occurred during rapid automated navigation; no application bug identified.
- Testing agent changed only its report, not application source.

## Completed 2026-09-08 — Become a Guard visual label edit
- User requested the payout-card button at `BecomeGuard.jsx` line 212 read `Deposited In Bank`.
- Replaced `Withdraw to Bank` with the exact requested label; added unique `data-testid="recruit-payout-bank-button"`.
- Preserved styling and existing illustrative behavior. The payout card remains MOCKED display data, not an actual payout action.
- Verified the external-preview Become a Guard page at 1920×800 with browser assertions and a screenshot: new label visible, old label absent.
- No backend, form, authentication, credential or dependency changes. No remaining work for this label edit; existing backlog unchanged.
- Optional enhancement: a small completed-payment checkmark beside the deposit label.

## Completed 2026-09-08 — Remove header login buttons
- Removed the top-right desktop Log in button and its mobile-menu equivalent from shared `Header.jsx`, plus the unused LogIn icon import.
- Preserved Google Play Download App links, all navigation items and the existing informational `/login` route. No authentication implementation was changed.
- Browser verification passed: desktop header contains no login control; mobile menu contains no login control; Download App remains visible/correctly linked; mobile About navigation works and closes the menu.
- Captured a desktop screenshot of the updated header. No remaining work for this request; prior backlog unchanged.
- Suggested enhancement remains measuring download CTA clicks; no analytics was added.

## Completed 2026-09-08 — Lady Bodyguard eligibility copy
- Updated the third Become a Guard eligibility card from `PSARA-Trained` to `Lady Bodyguard` and its description to exactly `Certified from a recognised agency`.
- Changed the individual ELIGIBILITY data entry rather than hardcoding the shared mapped heading/description, preserving the other three categories.
- Added unique numbered test IDs to eligibility headings and descriptions; styling, icons and document requirements remain unchanged.
- Browser verification passed: exact requested text, unchanged other categories, mobile visibility/no horizontal overflow at 375px, and desktop screenshot at 1920×800.
- No backend, auth, integration or credential changes; no pending work for this visual edit. Existing roadmap remains unchanged.
- Optional enhancement: a brief certification FAQ could clarify eligibility for applicants.

## Known limitations and placeholders
- iOS is intentionally unavailable, not a mocked download integration.
- Existing social links are placeholders; guard/booking visuals are illustrative, not live app data.
- Last backend test report (`iteration_3.json`) recorded database-dependent form failures due to Atlas connectivity. Current backend reachability is unverified; do not claim forms are fixed.
- The Android release changes were verified in the current preview/build, not on the custom production domain.

## Prioritized roadmap / next actions
### P0
- No remaining bugs in the requested Android download update.
- Separately confirm Atlas connectivity and real contact/waitlist submissions before relying on lead capture; previous connectivity issue remains unverified.

### P1
- Resume the previous light/dark toggle request: preference persistence, full cross-page contrast review, below-the-fold image lazy loading and slow-network improvements. CSS groundwork alone is not completion.
- Enable and test the App Store URL only once the iOS app is released and the user supplies its listing.

### P2 / future
- Terms placeholders were replaced on 2026-10-12 with the in-app Terms wording (no liability cap, no arbitration, courts at the registered office). Have a lawyer confirm.
- Done 2026-10-12: orphaned backend admin routes/auth removed.
- Fill in `COMPANY.social` in `src/config/company.js`; footer icons stay hidden until a URL is set.
- Any broader motion/art-direction refresh remains separate from this focused download update.

### Suggested enhancement
Measure Google Play CTA clicks by placement (hero/header/footer) to understand which section drives app downloads, subject to approved analytics/privacy requirements.