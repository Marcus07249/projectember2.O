import React, { useEffect, useState } from "react";
import api from "../utils/api.js";

export default function BrandingPage() {
  const [form, setForm] = useState({ storeName: "", logoUrl: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/admin/settings/branding").then((res) => setForm(res.data));
  }, []);

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, logoUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await api.put("/admin/settings/branding", form);
    setMessage("Branding updated");
  };

  return (
    <div>
      <h1>Branding Control</h1>
      <form className="card" onSubmit={handleSubmit}>
        {message && <p className="success">{message}</p>}
        <label>
          Store Name
          <input
            value={form.storeName}
            onChange={(event) => setForm({ ...form, storeName: event.target.value })}
            required
          />
        </label>
        <label>
          Logo Upload
          <input type="file" accept="image/*" onChange={handleFile} />
        </label>
        {form.logoUrl && <img className="preview" src={form.logoUrl} alt="logo preview" />}
        <button type="submit">Save Branding</button>
      </form>
    </div>
  );
}
