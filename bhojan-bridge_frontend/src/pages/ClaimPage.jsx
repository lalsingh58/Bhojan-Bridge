import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function ClaimPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchItem = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const res = await axios.get(`/api/surplus/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setItem(res.data);
    } catch (err) {
      console.error("Failed to fetch item", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = async () => {
    const token = localStorage.getItem("access_token");
    try {
      await axios.patch(
        `/api/surplus/${id}/`,
        { is_claimed: true },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Item claimed successfully!");
      navigate("/surplus");
    } catch (err) {
      alert("Failed to claim item.");
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!item)
    return <p className="text-center mt-10 text-red-500">Item not found.</p>;

  return (
    <div className="pt-24 min-h-screen px-6 pb-10 bg-lime-50">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-lg p-6">
        <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">
          Surplus Item Details
        </h2>

        <div className="space-y-3 text-gray-800">
          <p>
            <strong>Item:</strong> {item.item_name}
          </p>
          <p>
            <strong>Quantity:</strong> {item.quantity} {item.unit}
          </p>
          {item.description && (
            <p>
              <strong>Description:</strong> {item.description}
            </p>
          )}
          <p>
            <strong>Donated:</strong> {item.is_donated ? "Yes (Free)" : "No"}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {item.is_claimed ? (
              <span className="text-red-500">Already Claimed</span>
            ) : (
              <span className="text-green-600">Available</span>
            )}
          </p>
        </div>

        {/* User Info */}
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Shared By:
          </h3>
          <div className="flex items-center gap-4">
            <img
              src="https://api.dicebear.com/7.x/initials/svg?seed=User" // Dummy avatar
              alt="User"
              className="w-12 h-12 rounded-full border"
            />
            <div>
              <p className="font-medium">{item.user?.username}</p>
              <p className="text-sm text-gray-500">{item.user?.email}</p>
            </div>
          </div>
        </div>

        {/* Claim button */}
        {!item.is_claimed && (
          <button
            onClick={handleClaim}
            className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md transition"
          >
            Claim This Item
          </button>
        )}
      </div>
    </div>
  );
}
