import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: ""
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("ember-checkout", JSON.stringify(form));
    navigate("/payment");
  };

  return (
    <div className="page">
      <h2>Checkout</h2>
      <form className="card" onSubmit={handleSubmit}>
        <div className="grid two">
          <label>
            Full Name
            <input
              required
              value={form.fullName}
              onChange={(event) => setForm({ ...form, fullName: event.target.value })}
            />
          </label>
          <label>
            Phone
            <input
              required
              value={form.phone}
              onChange={(event) => setForm({ ...form, phone: event.target.value })}
            />
          </label>
        </div>
        <label>
          Address
          <input
            required
            value={form.address}
            onChange={(event) => setForm({ ...form, address: event.target.value })}
          />
        </label>
        <div className="grid two">
          <label>
            City
            <input
              required
              value={form.city}
              onChange={(event) => setForm({ ...form, city: event.target.value })}
            />
          </label>
          <label>
            State
            <input
              required
              value={form.state}
              onChange={(event) => setForm({ ...form, state: event.target.value })}
            />
          </label>
        </div>
        <div className="grid two">
          <label>
            Postal Code
            <input
              required
              value={form.postalCode}
              onChange={(event) => setForm({ ...form, postalCode: event.target.value })}
            />
          </label>
          <label>
            Country
            <input
              required
              value={form.country}
              onChange={(event) => setForm({ ...form, country: event.target.value })}
            />
          </label>
        </div>
        <button type="submit">Continue to payment</button>
      </form>
    </div>
  );
}
