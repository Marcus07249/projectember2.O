import React from "react";
import { Link } from "react-router-dom";

export default function OrderSuccessPage() {
  return (
    <div className="page success-page">
      <div className="card">
        <h2>Order Confirmed</h2>
        <p>Your order has been placed successfully. We are preparing it now.</p>
        <Link to="/orders" className="button">
          Track my order
        </Link>
      </div>
    </div>
  );
}
