import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { adminClient, TOKEN_KEY, formatApiDetail } from "@/admin/lib/client";

const Ctx = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [checking, setChecking] = useState(true);

  const refresh = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setAdmin(null);
      setChecking(false);
      return;
    }
    try {
      const { data } = await adminClient.get("/auth/me");
      setAdmin(data);
    } catch {
      setAdmin(null);
      localStorage.removeItem(TOKEN_KEY);
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback(async (email, password) => {
    try {
      const { data } = await adminClient.post("/auth/login", { email, password });
      localStorage.setItem(TOKEN_KEY, data.access_token);
      setAdmin(data.admin);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: formatApiDetail(err?.response?.data?.detail) || err.message };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await adminClient.post("/auth/logout");
    } catch {
      /* ignore */
    }
    localStorage.removeItem(TOKEN_KEY);
    setAdmin(null);
  }, []);

  return (
    <Ctx.Provider value={{ admin, checking, login, logout, refresh }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAdminAuth = () => useContext(Ctx);
