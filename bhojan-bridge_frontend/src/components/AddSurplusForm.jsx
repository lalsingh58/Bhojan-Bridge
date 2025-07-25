import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import this
import axios from "../api/axios";

export default function AddSurplusForm() {
  const navigate = useNavigate(); // ✅ Initialize hook

  const [form, setForm] = useState({
    item_name: "",
    quantity: "",
    unit: "kg",
    description: "",
    is_donated: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const token = localStorage.getItem("access_token");
      await axios.post("api/surplus/", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ Navigate to surplus list after success
      navigate("/surplus");
    } catch (err) {
      alert("Error adding item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg space-y-5"
      >
        <h2 className="text-2xl font-bold text-orange-500 text-center">
          Share Surplus Item
        </h2>

        <input
          type="text"
          name="item_name"
          placeholder="Item Name"
          value={form.item_name}
          onChange={handleChange}
          className="w-full border px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
          required
        />

        <div className="flex space-x-4">
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            className="w-1/2 border px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
            required
          />
          <select
            name="unit"
            value={form.unit}
            onChange={handleChange}
            className="w-1/2 border px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="litre">litre</option>
            <option value="piece">piece</option>
          </select>
        </div>

        <textarea
          name="description"
          placeholder="Description (optional)"
          value={form.description}
          onChange={handleChange}
          rows="3"
          className="w-full border px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
        />

        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="is_donated"
            checked={form.is_donated}
            onChange={handleChange}
            className="mr-2"
          />
          Donate for free
        </label>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-transform transform hover:scale-105"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Item"}
        </button>

        {success && (
          <p className="text-green-600 text-center mt-2 font-medium">
            {success}
          </p>
        )}
      </form>
    </div>
  );
}
