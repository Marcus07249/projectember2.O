import React, { useEffect, useState } from "react";
import api from "../utils/api.js";

const STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

export default function OrdersAdminPage() {
  const [orders, setOrders] = useState([]);

  const load = async () => {
    const { data } = await api.get("/orders");
    setOrders(data);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/orders/${id}/status`, { status });
    load();
  };

  const removeOrder = async (id) => {
    await api.delete(`/orders/${id}`);
    load();
  };

  return (
    <div>
      <h1>Orders & Delivery Monitoring</h1>
      <div className="admin-list">
        {orders.map((order) => (
          <div key={order._id} className="card">
            <div className="row space">
              <strong>{order.user?.name}</strong>
              <span>${order.totalPrice.toFixed(2)}</span>
            </div>
            <p>{order.shippingAddress?.address}</p>
            <div className="row space">
              <select
                value={order.status}
                onChange={(event) => updateStatus(order._id, event.target.value)}
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <button className="ghost" onClick={() => removeOrder(order._id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
