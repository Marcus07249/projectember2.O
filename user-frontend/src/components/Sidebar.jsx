import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext.jsx";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(true);

  return (
    <motion.aside
      className={`sidebar ${open ? "open" : ""}`}
      initial={false}
      animate={{ width: open ? 240 : 72 }}
      transition={{ duration: 0.25 }}
    >
      <button className="sidebar-toggle" onClick={() => setOpen(!open)}>
        {open ? "Collapse" : "Menu"}
      </button>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/orders">My Orders</Link>
        <Link to="/cart">My Cart</Link>
        <Link to="/profile">Settings</Link>
        <Link to="/profile">Profile</Link>
        {user?.role === "admin" && (
          <a
            href={import.meta.env.VITE_ADMIN_URL || "http://localhost:5174"}
            target="_blank"
            rel="noreferrer"
          >
            Admin Dashboard
          </a>
        )}
        {user && (
          <button className="ghost" onClick={logout}>
            Logout
          </button>
        )}
      </nav>
    </motion.aside>
  );
}
