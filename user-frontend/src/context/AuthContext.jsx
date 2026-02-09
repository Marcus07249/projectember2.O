import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../utils/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("ember-auth");
    if (stored) {
      const data = JSON.parse(stored);
      setUser(data.user);
      setToken(data.token);
    }
    setLoading(false);
  }, []);

  const login = async (payload) => {
    const { data } = await api.post("/auth/login", payload);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("ember-auth", JSON.stringify(data));
  };

  const signup = async (payload) => {
    const { data } = await api.post("/auth/signup", payload);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("ember-auth", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("ember-auth");
  };

  const value = useMemo(
    () => ({ user, token, login, signup, logout, loading }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
