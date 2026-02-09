import React, { useEffect, useState } from "react";
import api from "../utils/api.js";

export default function CategoriesAdminPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const load = async () => {
    const { data } = await api.get("/categories");
    setCategories(data);
  };

  useEffect(() => {
    load();
  }, []);

  const addCategory = async (event) => {
    event.preventDefault();
    await api.post("/categories", { name });
    setName("");
    load();
  };

  const updateCategory = async (id) => {
    const newName = prompt("New category name?");
    if (!newName) return;
    await api.put(`/categories/${id}`, { name: newName });
    load();
  };

  const removeCategory = async (id) => {
    await api.delete(`/categories/${id}`);
    load();
  };

  return (
    <div>
      <h1>Category Management</h1>
      <form className="card" onSubmit={addCategory}>
        <label>
          Add Category
          <input value={name} onChange={(event) => setName(event.target.value)} required />
        </label>
        <button type="submit">Add</button>
      </form>
      <div className="admin-list">
        {categories.map((category) => (
          <div key={category._id} className="card row">
            <div>
              <strong>{category.name}</strong>
            </div>
            <div className="row-actions">
              <button className="ghost" onClick={() => updateCategory(category._id)}>
                Edit
              </button>
              <button onClick={() => removeCategory(category._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
