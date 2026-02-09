import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api.js";
import ProductCard from "../components/ProductCard.jsx";

export default function CategoryProductsPage() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const load = async () => {
      const [productsRes, categoriesRes] = await Promise.all([
        api.get(`/products?category=${id}`),
        api.get("/categories")
      ]);
      setProducts(productsRes.data);
      setCategory(categoriesRes.data.find((item) => item._id === id));
    };
    load();
  }, [id]);

  return (
    <div className="page">
      <h2>{category?.name || "Category"}</h2>
      <div className="grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
