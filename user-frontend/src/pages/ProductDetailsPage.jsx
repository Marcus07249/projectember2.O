import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api.js";
import { useCart } from "../context/CartContext.jsx";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <div className="page">Loading...</div>;

  return (
    <div className="page details-page">
      <div className="details-card">
        <img
          src={product.images?.[0] || "https://placehold.co/500x400"}
          alt={product.name}
        />
        <div>
          <h2>{product.name}</h2>
          <p className="price">${product.price.toFixed(2)}</p>
          <p>{product.description}</p>
          <div className="product-actions">
            <button
              onClick={() =>
                addItem({
                  id: product._id,
                  name: product.name,
                  price: product.price,
                  image: product.images?.[0] || ""
                })
              }
            >
              Add to cart
            </button>
            <button
              className="ghost"
              onClick={() => {
                addItem({
                  id: product._id,
                  name: product.name,
                  price: product.price,
                  image: product.images?.[0] || ""
                });
                navigate("/checkout");
              }}
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
