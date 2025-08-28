import { useState } from "react";
import { register } from "../api";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "", role: "applicant" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert("Registration successful!");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Error registering user");
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-primary mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input placeholder="Username" 
        className="w-full border rounded-lg p-2"
        onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <input placeholder="Email" 
        className="w-full border rounded-lg p-2"
        onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" 
        className="w-full border rounded-lg p-2"
        onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <select 
        className="w-full border rounded-lg p-2"
        onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="applicant">Applicant</option>
          <option value="employer">Employer</option>
        </select>
        <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-900">
          Register
        </button>
      </form>
    </div>
  );
}
