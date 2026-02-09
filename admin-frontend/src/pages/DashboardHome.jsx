import React, { useEffect, useState } from "react";
import api from "../utils/api.js";

export default function DashboardHome() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    orders: 0,
    users: 0
  });

  useEffect(() => {
    const load = async () => {
      const [products, categories, orders, users] = await Promise.all([
        api.get("/products"),
        api.get("/categories"),
        api.get("/orders"),
        api.get("/admin/users")
      ]);
      setStats({
        products: products.data.length,
        categories: categories.data.length,
        orders: orders.data.length,
        users: users.data.length
      });
    };
    load();
  }, []);

  return (
    <div>
      <h1>Dashboard Overview</h1>
      <div className="admin-grid">
        <div className="card">
          <h3>Products</h3>
          <p>{stats.products}</p>
        </div>
        <div className="card">
          <h3>Categories</h3>
          <p>{stats.categories}</p>
        </div>
        <div className="card">
          <h3>Orders</h3>
          <p>{stats.orders}</p>
        </div>
        <div className="card">
          <h3>Users</h3>
          <p>{stats.users}</p>
        </div>
      </div>
    </div>
  );
}
