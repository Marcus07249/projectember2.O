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
    <div className="page">
      <div className="hero">
        <h1>Premium essentials, curated for modern living.</h1>
        <input
          className="search-input"
          placeholder="Search for products"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <section>
        <h2>Featured Products</h2>
        <div className="grid">
          {filtered.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
      <section>
        <h2>Categories</h2>
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
