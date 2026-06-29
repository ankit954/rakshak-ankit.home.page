import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const ADMIN_API = `${BACKEND_URL}/api/admin`;
export const TOKEN_KEY = "rk_admin_jwt";

export const adminClient = axios.create({
  baseURL: ADMIN_API,
  withCredentials: true,
});

adminClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

adminClient.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err?.response?.status === 401) {
      const path = window.location.pathname;
      if (!path.endsWith("/login")) {
        localStorage.removeItem(TOKEN_KEY);
        // hard redirect to admin login while preserving subdomain
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  },
);

export function formatApiDetail(detail) {
  if (detail == null) return "Something went wrong.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail))
    return detail
      .map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e)))
      .filter(Boolean)
      .join(" ");
  if (detail && typeof detail.msg === "string") return detail.msg;
  return String(detail);
}
