import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function SurplusList() {
  const [items, setItems] = useState([]); // ✅ Declare items
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const res = await axios.get("api/surplus/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching surplus items", err);
    } finally {
      setLoading(false);
    }
  };

  const claimItem = async (id) => {
    const token = localStorage.getItem("access_token");
    try {
      await axios.patch(
        `api/surplus/${id}/`,
        { is_claimed: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Item claimed successfully!");
      fetchItems(); // Refresh list
    } catch (err) {
      alert("Failed to claim item.");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="pt-24 min-h-screen bg-yellow-50 px-6 pb-10">
      <h2 className="text-3xl font-bold text-orange-500 text-center mb-6">
        Available Surplus Items
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No surplus items available.
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg p-6 rounded-xl space-y-2 border-t-4 border-orange-400"
            >
              <h3 className="text-xl font-semibold text-orange-600">
                {item.item_name}
              </h3>
              <p>
                <span className="font-medium">Quantity:</span> {item.quantity}{" "}
                {item.unit}
              </p>
              {item.description && (
                <p className="text-sm text-gray-600">{item.description}</p>
              )}
              <button
                onClick={() => claimItem(item.id)}
                className="mt-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-transform transform hover:scale-105"
              >
                Claim
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
