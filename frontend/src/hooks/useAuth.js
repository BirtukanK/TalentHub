import { useState } from "react";
import api from "../api";

export function useAuth() {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  async function login(username, password) {
    const { data } = await api.post("/auth/login", { username, password });
    localStorage.setItem("token", data.access);
    const payload = JSON.parse(atob(data.access.split(".")[1]));
    const u = { id: payload.user_id, name: payload.name, role: payload.role, username };
    localStorage.setItem("user", JSON.stringify(u));
    setUser(u);
    return u;
  }

  async function register(payload) {
    await api.post("/auth/register", payload);
    return login(payload.username, payload.password);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  return { user, login, register, logout };
}
