import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../utils/api.js";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await api.get("/admin/settings/theme");
        setTheme(data.defaultTheme || "light");
      } catch (error) {
        setTheme("light");
      }
    };
    init();
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
