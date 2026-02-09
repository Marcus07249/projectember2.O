import React, { useEffect, useState } from "react";
import api from "../utils/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [form, setForm] = useState({ name: "", password: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) setForm((prev) => ({ ...prev, name: user.name }));
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    await api.put("/auth/me", { name: form.name, password: form.password || undefined });
    setMessage("Profile updated");
  };

  return (
    <div className="page">
      <h2>Profile & Settings</h2>
      <form className="card" onSubmit={handleSubmit}>
        {message && <p className="success">{message}</p>}
        <label>
          Name
          <input
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            required
          />
        </label>
        <label>
          New Password
          <input
            type="password"
            minLength={6}
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            placeholder="Leave blank to keep current"
          />
        </label>
        <button type="submit">Update profile</button>
        <button type="button" className="ghost" onClick={logout}>
          Logout
        </button>
      </form>
    </div>
  );
}
