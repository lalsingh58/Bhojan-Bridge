import { useState } from "react";
import axios from "../api/axios"; // Make sure this exists

export default function RegisterForm() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post("/register/", form);
      setMessage("✅ Account created! Redirecting to login...");
      setTimeout(() => (window.location.href = "/login"), 2000);
    } catch (err) {
      setMessage("❌ Registration failed. Try again.");
      console.error(err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-50 via-white to-orange-100 px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 transition-all duration-700 animate-fade-in-up">
        <h2 className="text-3xl font-bold text-center mb-6 text-orange-500">
          Create an Account 📝
        </h2>
        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="text"
            name="username"
            placeholder="Full Name"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          {message && (
            <p className="text-sm text-center text-red-600">{message}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-transform transform hover:scale-105 duration-300"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-orange-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
