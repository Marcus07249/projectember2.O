import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import api from "../utils/api.js";

export default function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [branding, setBranding] = useState({ storeName: "Ember Store", logoUrl: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const loadBranding = async () => {
      try {
        const { data } = await api.get("/admin/settings/branding");
        setBranding(data);
      } catch (error) {
        setBranding({ storeName: "Ember Store", logoUrl: "" });
      }
    };
    loadBranding();
  }, []);

  return (
    <header className="header">
      <div
        className="brand"
        onClick={() => navigate("/")}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => event.key === "Enter" && navigate("/")}
      >
        {branding.logoUrl ? (
          <img src={branding.logoUrl} alt="store logo" className="brand-logo" />
        ) : (
          <div className="brand-mark">E</div>
        )}
        <div className="brand-text">
          <span className="brand-name">{branding.storeName}</span>
          <span className="brand-tagline">Premium home & lifestyle store</span>
        </div>
      </div>
      <div className="header-actions">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "Dark" : "Light"} Mode
        </button>
        <div className="header-links">
          {user ? (
            <>
              <Link to="/cart">My Cart</Link>
              <Link to="/profile">Profile</Link>
              <button className="ghost" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign up</Link>
              <Link to="/cart">My Cart</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
