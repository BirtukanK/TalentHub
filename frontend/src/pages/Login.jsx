import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  function parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = decodeURIComponent(
        atob(base64Url)
          .split('')
          .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join('')
      );
      return JSON.parse(base64);
    } catch (e) {
      return null;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();

      // Extract user_id from token
      const tokenPayload = parseJwt(data.access);

      const userData = {
        id: tokenPayload?.user_id, // ✅ extracted from token
        username: data.username,
        role: data.role,
        access: data.access,
        refresh: data.refresh,
      };

      // Save to localStorage
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("user", JSON.stringify(userData));

      // Update context
      login(userData);

      // Redirect based on role
      if (userData.role === "employer") {
        navigate("/employer");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-primary mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          className="w-full border rounded-lg p-2"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          className="w-full border rounded-lg p-2"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-900">
          Login
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}
