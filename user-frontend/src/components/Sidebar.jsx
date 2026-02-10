import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext.jsx";

const navItems = [
  { to: "/", icon: "🏠", label: "Home" },
  { to: "/categories", icon: "🗂️", label: "Categories" },
  { to: "/orders", icon: "📦", label: "Orders" },
  { to: "/cart", icon: "🛒", label: "Cart" },
  { to: "/profile", icon: "👤", label: "Profile" }
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(true);

  return (
    <motion.aside
      className={`sidebar ${open ? "open" : "collapsed"}`}
      initial={false}
      animate={{ width: open ? 240 : 84 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <button
        className="sidebar-toggle"
        onClick={() => setOpen((previous) => !previous)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <nav>
        {open && <span className="nav-label">Browse</span>}

        {navItems.map((item) => (
          <Link key={item.to + item.label} to={item.to} className="nav-item">
            <span className="nav-icon" aria-hidden="true">{item.icon}</span>
            {open && <span className="nav-text">{item.label}</span>}
          </Link>
        ))}

        {user?.role === "admin" && (
          <a
            href={import.meta.env.VITE_ADMIN_URL || "http://localhost:5174"}
            target="_blank"
            rel="noreferrer"
            className="nav-item"
          >
            <span className="nav-icon" aria-hidden="true">🛡️</span>
            {open && <span className="nav-text">Admin</span>}
          </a>
        )}

        {user && (
          <button className="ghost nav-item" onClick={logout}>
            <span className="nav-icon" aria-hidden="true">↪</span>
            {open && <span className="nav-text">Logout</span>}
          </button>
        )}
      </nav>
    </motion.aside>
  );
}
