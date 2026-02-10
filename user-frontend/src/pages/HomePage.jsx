import React, { useEffect, useState } from "react";
import api from "../utils/api.js";
import ProductCard from "../components/ProductCard.jsx";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      const [productsRes, categoriesRes] = await Promise.all([
        api.get("/products"),
        api.get("/categories")
      ]);
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
    };
    load();
  }, []);

  const featured = products.slice(0, 6);
  const filtered = featured.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page page-home">
      <div className="hero hero-shop">
        <div className="hero-copy">
          <p className="eyebrow">Shopify-grade essentials</p>
          <h1>Premium essentials, curated for modern living.</h1>
          <p className="hero-subtitle">
            Discover minimalist, functional pieces with soft finishes and thoughtful
            details. Designed to feel calm, elevated, and timeless.
          </p>
          <div className="search-wrap">
            <input
              className="search-input"
              placeholder="Search for products, brands, or categories"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>
        <div className="hero-panel">
          <div className="hero-stat">
            <span className="stat-label">Curated drops</span>
            <strong>150+ products</strong>
          </div>
          <div className="hero-stat">
            <span className="stat-label">Delivery</span>
            <strong>Pan-India</strong>
          </div>
          <div className="hero-stat">
            <span className="stat-label">Support</span>
            <strong>24/7 premium care</strong>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <p>Hand-picked pieces that define our premium edit.</p>
        </div>
        <div className="grid grid-products">
          {filtered.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
      <section className="section">
        <div className="section-header">
          <h2>Categories</h2>
          <p>Explore what you need, grouped for everyday clarity.</p>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <div className="category-card" key={category._id}>
              <h3>{category.name}</h3>
              <p>{category.description || "Explore curated picks"}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
