import React, { useEffect, useState } from "react";
import api from "../utils/api.js";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders/my").then((res) => setOrders(res.data));
  }, []);

  return (
    <div className="page">
      <h2>My Orders</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="card">
            <div className="order-row">
              <strong>Order</strong>
              <span>{order._id.slice(-6).toUpperCase()}</span>
            </div>
            <div className="order-row">
              <strong>Status</strong>
              <span className={`status ${order.status}`}>{order.status}</span>
            </div>
            <div className="order-row">
              <strong>Total</strong>
              <span>${order.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
