import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios"; // Ensure this file exists and is correctly configured

export default function LoginForm({ setToken }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // React Router's hook

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/login/", form);
      const { access, refresh } = res.data;

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      if (setToken) setToken(access);

      setLoading(false);

      // ✅ Redirect to home page
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-orange-100 via-white to-yellow-100 px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 transition-all duration-700 animate-fade-in-down">
        <h2 className="text-3xl font-bold text-center mb-6 text-orange-500">
          Welcome Back 👋
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
            required
          />
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-transform transform hover:scale-105 duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-orange-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
