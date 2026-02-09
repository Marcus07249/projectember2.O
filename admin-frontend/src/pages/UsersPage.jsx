import React, { useEffect, useState } from "react";
import api from "../utils/api.js";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  const load = async () => {
    const { data } = await api.get("/admin/users");
    setUsers(data);
  };

  useEffect(() => {
    load();
  }, []);

  const toggleBlock = async (user) => {
    await api.put(`/admin/users/${user._id}/block`, { isBlocked: !user.isBlocked });
    load();
  };

  return (
    <div>
      <h1>User Management</h1>
      <div className="admin-list">
        {users.map((user) => (
          <div className="card row" key={user._id}>
            <div>
              <strong>{user.name}</strong>
              <p>{user.email}</p>
            </div>
            <button className="ghost" onClick={() => toggleBlock(user)}>
              {user.isBlocked ? "Unblock" : "Block"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
