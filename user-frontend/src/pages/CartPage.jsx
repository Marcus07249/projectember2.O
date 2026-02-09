import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function CartPage() {
  const { items, updateQty, removeItem, total } = useCart();
  const navigate = useNavigate();

  return (
    <div className="page">
      <h2>My Cart</h2>
      <div className="cart-list">
        {items.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image || "https://placehold.co/120"} alt={item.name} />
            <div>
              <h3>{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
              <div className="qty-controls">
                <button onClick={() => updateQty(item.id, Math.max(item.qty - 1, 1))}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
              </div>
            </div>
            <button className="ghost" onClick={() => removeItem(item.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: ${total.toFixed(2)}</h3>
        <button onClick={() => navigate("/checkout")} disabled={items.length === 0}>
          Checkout
        </button>
      </div>
    </div>
  );
}
