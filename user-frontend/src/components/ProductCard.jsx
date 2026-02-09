import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  return (
    <motion.div
      className="product-card"
      whileHover={{ y: -6, boxShadow: "0 20px 30px rgba(0,0,0,0.12)" }}
      transition={{ duration: 0.2 }}
    >
      <img
        src={product.images?.[0] || "https://placehold.co/300x220"}
        alt={product.name}
      />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>${product.price.toFixed(2)}</p>
        <div className="product-actions">
          <button onClick={() => addItem({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.images?.[0] || ""
          })}>
            Add to cart
          </button>
          <Link to={`/products/${product._id}`} className="ghost">
            View details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
