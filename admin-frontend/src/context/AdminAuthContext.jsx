import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../utils/api.js";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("ember-admin");
    if (stored) {
      const data = JSON.parse(stored);
      setAdmin(data.user);
      setToken(data.token);
    }
  }, []);

  const login = async (payload) => {
    const { data } = await api.post("/admin/login", payload);
    setAdmin(data.user);
    setToken(data.token);
    localStorage.setItem("ember-admin", JSON.stringify(data));
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem("ember-admin");
  };

  const value = useMemo(() => ({ admin, token, login, logout }), [admin, token]);

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = () => useContext(AdminAuthContext);
