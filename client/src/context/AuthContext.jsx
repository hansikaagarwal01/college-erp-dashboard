import { useCallback, useEffect, useState } from "react";
import { AuthContext } from "./auth-context";
import api, { setUnauthorizedHandler } from "../services/api";

function getStoredToken() {
  try {
    return localStorage.getItem("token");
  } catch {
    return null;
  }
}

function getStoredUser() {
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const hasStoredToken = Boolean(getStoredToken());
  const [token, setToken] = useState(getStoredToken);
  const [user, setUser] = useState(getStoredUser);
  const [isInitializing, setIsInitializing] = useState(hasStoredToken);

  const resetAuth = useCallback(() => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch {
      /* localStorage unavailable */
    }
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(resetAuth);
    return () => setUnauthorizedHandler(null);
  }, [resetAuth]);

  useEffect(() => {
    if (!hasStoredToken) return;
    let active = true;
    api
      .get("/dashboard/stats")
      .catch(() => {})
      .finally(() => {
        if (active) setIsInitializing(false);
      });
    return () => {
      active = false;
    };
  }, [hasStoredToken]);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    if (!data?.success || !data?.token) {
      throw new Error(data?.message || "Login failed. Please try again.");
    }
    const nextUser = { role: data.role || "Admin" };
    try {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(nextUser));
    } catch {
      /* localStorage unavailable */
    }
    setToken(data.token);
    setUser(nextUser);
    return data;
  };

  const logout = () => {
    resetAuth();
  };

  const value = {
    token,
    user,
    isAuthenticated: Boolean(token),
    isInitializing,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}