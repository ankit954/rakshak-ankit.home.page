# RAKSHAK website

Public marketing site for RAKSHAK at https://therakshak.in: home, pricing, become a guard, support, contact and the policy pages.

## Frontend (`frontend/`)
React (Create React App + craco), Tailwind, react-router.

```bash
cd frontend
yarn install
yarn start        # dev server on http://localhost:3000
yarn build        # production build in frontend/build
```

Optional build-time settings (in `frontend/.env`):

| Variable | Default | Purpose |
| --- | --- | --- |
| `REACT_APP_BACKEND_URL` | empty (same origin) | Where `/api/contact` and `/api/waitlist` are sent. On therakshak.in nginx forwards `/api/` to the backend, so leave it empty in production. |
| `REACT_APP_PLAY_STORE_URL` | the RAKSHAK Google Play listing | Google Play badge and Download App buttons. |
| `REACT_APP_APP_STORE_URL` | empty | App Store badge. Empty shows a non-clickable SOON badge. |

Company, contact and social-profile details live in `frontend/src/config/company.js`. A social icon appears in the footer only once its URL is filled in.

## Backend (`backend/`)
A small FastAPI app with the public `POST /api/contact`, `POST /api/waitlist` and `GET /api/health` endpoints. It needs `MONGO_URL` and `DB_NAME` in `backend/.env`; `CORS_ORIGINS` is optional (comma-separated, defaults to the therakshak.in origins).

```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --port 8001
pytest            # in-memory tests, no database needed
```

## Deploying
Copy the contents of `frontend/build` to the server's web root for therakshak.in (`/var/www/landing`).
