import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api.js";
import { useCart } from "../context/CartContext.jsx";

export default function PaymentPage() {
  const navigate = useNavigate();
  const { items, total, clear } = useCart();
  const [methods, setMethods] = useState({
    upiEnabled: true,
    cardEnabled: true,
    codEnabled: true
  });
  const [method, setMethod] = useState("upi");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/admin/settings/payment")
      .then((res) => setMethods(res.data))
      .catch(() => setMethods(methods));
  }, []);

  const handlePayment = async () => {
    setError("");
    try {
      setLoading(true);
      const shippingAddress = JSON.parse(
        localStorage.getItem("ember-checkout") || "{}"
      );
      const payload = {
        items: items.map((item) => ({
          product: item.id,
          name: item.name,
          price: item.price,
          qty: item.qty,
          image: item.image
        })),
        shippingAddress,
        paymentMethod: method,
        totalPrice: total
      };
      await api.post("/orders", payload);
      clear();
      navigate("/order-success");
    } catch (err) {
      setError(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h2>Payment</h2>
      {error && <p className="error">{error}</p>}
      <div className="payment-methods">
        {methods.upiEnabled && (
          <label className="payment-card">
            <input
              type="radio"
              name="payment"
              value="upi"
              checked={method === "upi"}
              onChange={() => setMethod("upi")}
            />
            UPI
          </label>
        )}
        {methods.cardEnabled && (
          <label className="payment-card">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={method === "card"}
              onChange={() => setMethod("card")}
            />
            Card
          </label>
        )}
        {methods.codEnabled && (
          <label className="payment-card">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={method === "cod"}
              onChange={() => setMethod("cod")}
            />
            Cash on delivery
          </label>
        )}
      </div>
      <button onClick={handlePayment} disabled={loading || items.length === 0}>
        {loading ? "Processing..." : `Pay $${total.toFixed(2)}`}
      </button>
    </div>
  );
}
