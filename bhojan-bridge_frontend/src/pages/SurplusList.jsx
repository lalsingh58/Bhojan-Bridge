import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function SurplusList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();

  const fetchItems = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const profileRes = await axios.get("/auth/users/me/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentUserId(profileRes.data.id);

      const res = await axios.get("/api/surplus/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching surplus items", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirm) return;

    const token = localStorage.getItem("access_token");
    try {
      await axios.delete(`/api/surplus/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Item deleted.");
      fetchItems();
    } catch (err) {
      alert("Failed to delete item.");
    }
  };

  const editItem = (id) => {
    navigate(`/surplus/edit/${id}`);
  };

  const claimPage = (id) => {
    navigate(`/surplus/claim/${id}`);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="pt-24 min-h-screen bg-yellow-50 px-6 pb-10">
      <h2 className="text-3xl font-bold text-orange-500 text-center mb-8">
        Available Surplus Items
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No surplus items available.
          </p>
        ) : (
          items
            .filter((item) => !item.is_claimed)
            .map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md border-t-4 border-orange-400 p-6 space-y-3"
              >
                <h3 className="text-xl font-bold text-orange-600">
                  {item.item_name}
                </h3>

                <p className="text-gray-700">
                  <strong>Quantity:</strong> {item.quantity} {item.unit}
                </p>

                <p className="text-gray-700">
                  <strong>Price:</strong>{" "}
                  {item.price ? `₹${item.price}` : "Free"}
                </p>

                {item.description && (
                  <p className="text-sm text-gray-600 italic">
                    {item.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mt-3">
                  {item.is_donated && (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                      Donated
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {item.user?.id === currentUserId ? (
                    <>
                      <button
                        onClick={() => editItem(item.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => claimPage(item.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm"
                    >
                      Claim
                    </button>
                  )}
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
