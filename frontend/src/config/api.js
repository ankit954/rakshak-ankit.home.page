// Base URL for the public API. Empty means same origin: on therakshak.in,
// nginx forwards /api/ to the backend, so no build-time URL is needed.
const BACKEND_URL = (process.env.REACT_APP_BACKEND_URL || "").replace(/\/+$/, "");

export const API = `${BACKEND_URL}/api`;
