import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext.jsx";

export default function AdminLayout() {
  const { logout, admin } = useAdminAuth();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <h2>Ember Admin</h2>
        <nav>
          <NavLink to="/">Overview</NavLink>
          <NavLink to="/branding">Branding</NavLink>
          <NavLink to="/theme">Theme</NavLink>
          <NavLink to="/categories">Categories</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/orders">Orders</NavLink>
          <NavLink to="/payments">Payments</NavLink>
          <NavLink to="/users">Users</NavLink>
        </nav>
        <div className="admin-footer">
          <p>{admin?.name}</p>
          <button className="ghost" onClick={logout}>Logout</button>
        </div>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
