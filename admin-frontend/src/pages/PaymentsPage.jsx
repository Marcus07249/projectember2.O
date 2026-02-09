import React, { useEffect, useState } from "react";
import api from "../utils/api.js";

export default function PaymentsPage() {
  const [settings, setSettings] = useState({
    upiEnabled: true,
    cardEnabled: true,
    codEnabled: true
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/admin/settings/payment").then((res) => setSettings(res.data));
  }, []);

  const handleSave = async () => {
    await api.put("/admin/settings/payment", settings);
    setMessage("Payment settings updated");
  };

  return (
    <div>
      <h1>Payment Settings</h1>
      {message && <p className="success">{message}</p>}
      <div className="card">
        <label>
          <input
            type="checkbox"
            checked={settings.upiEnabled}
            onChange={(event) => setSettings({ ...settings, upiEnabled: event.target.checked })}
          />
          Enable UPI
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.cardEnabled}
            onChange={(event) => setSettings({ ...settings, cardEnabled: event.target.checked })}
          />
          Enable Card
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.codEnabled}
            onChange={(event) => setSettings({ ...settings, codEnabled: event.target.checked })}
          />
          Enable Cash on Delivery
        </label>
        <button onClick={handleSave}>Save Settings</button>
      </div>
    </div>
  );
}
