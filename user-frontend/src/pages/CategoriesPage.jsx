import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api.js";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data));
  }, []);

  return (
    <div className="page">
      <h2>Categories</h2>
      <div className="category-grid">
        {categories.map((category) => (
          <Link
            key={category._id}
            to={`/categories/${category._id}`}
            className="category-card"
          >
            <h3>{category.name}</h3>
            <p>{category.description || "Shop this collection"}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
