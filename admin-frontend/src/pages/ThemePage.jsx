import React, { useEffect, useState } from "react";
import api from "../utils/api.js";

export default function ThemePage() {
  const [theme, setTheme] = useState("light");
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/admin/settings/theme").then((res) => setTheme(res.data.defaultTheme));
  }, []);

  const handleSave = async () => {
    await api.put("/admin/settings/theme", { defaultTheme: theme });
    setMessage("Theme updated");
  };

  return (
    <div>
      <h1>Theme Control</h1>
      {message && <p className="success">{message}</p>}
      <div className="card">
        <label>
          Default Theme
          <select value={theme} onChange={(event) => setTheme(event.target.value)}>
            <option value="light">Classic Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}
