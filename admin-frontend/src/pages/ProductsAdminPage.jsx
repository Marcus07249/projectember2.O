import React, { useEffect, useState } from "react";
import api from "../utils/api.js";

export default function ProductsAdminPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    images: ""
  });

  const load = async () => {
    const [productsRes, categoriesRes] = await Promise.all([
      api.get("/products"),
      api.get("/categories")
    ]);
    setProducts(productsRes.data);
    setCategories(categoriesRes.data);
  };

  useEffect(() => {
    load();
  }, []);

  const addProduct = async (event) => {
    event.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      images: form.images.split(",").map((url) => url.trim()).filter(Boolean)
    };
    await api.post("/products", payload);
    setForm({ name: "", description: "", price: "", stock: "", category: "", images: "" });
    load();
  };

  const removeProduct = async (id) => {
    await api.delete(`/products/${id}`);
    load();
  };

  const editProduct = async (product) => {
    const name = prompt("Product name", product.name);
    if (!name) return;
    const price = prompt("Price", product.price);
    if (!price) return;
    const stock = prompt("Stock", product.stock);
    if (!stock) return;
    await api.put(`/products/${product._id}`, {
      name,
      price: Number(price),
      stock: Number(stock)
    });
    load();
  };

  return (
    <div>
      <h1>Product Management</h1>
      <form className="card" onSubmit={addProduct}>
        <div className="grid two">
          <label>
            Name
            <input
              required
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
            />
          </label>
          <label>
            Category
            <select
              value={form.category}
              onChange={(event) => setForm({ ...form, category: event.target.value })}
            >
              <option value="">Select</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label>
          Description
          <textarea
            required
            value={form.description}
            onChange={(event) => setForm({ ...form, description: event.target.value })}
          />
        </label>
        <div className="grid two">
          <label>
            Price
            <input
              type="number"
              required
              value={form.price}
              onChange={(event) => setForm({ ...form, price: event.target.value })}
            />
          </label>
          <label>
            Stock
            <input
              type="number"
              required
              value={form.stock}
              onChange={(event) => setForm({ ...form, stock: event.target.value })}
            />
          </label>
        </div>
        <label>
          Image URLs (comma separated)
          <input
            value={form.images}
            onChange={(event) => setForm({ ...form, images: event.target.value })}
          />
        </label>
        <button type="submit">Add Product</button>
      </form>
      <div className="admin-list">
        {products.map((product) => (
          <div key={product._id} className="card row">
            <div>
              <strong>{product.name}</strong>
              <p>${product.price.toFixed(2)}</p>
            </div>
            <div className="row-actions">
              <button className="ghost" onClick={() => editProduct(product)}>
                Edit
              </button>
              <button onClick={() => removeProduct(product._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
