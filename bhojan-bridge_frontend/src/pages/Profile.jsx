import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Profile() {
  const [shared, setShared] = useState([]);
  const [claimed, setClaimed] = useState([]);
  const [userName, setUserName] = useState("User");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const profileRes = await axios.get("/auth/users/me/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserName(profileRes.data.first_name || profileRes.data.email);

        const surplusRes = await axios.get("api/surplus/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setShared(surplusRes.data.shared);
        setClaimed(surplusRes.data.claimed);
      } catch (err) {
        console.error("Failed to load profile data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen bg-orange-50 pt-24 px-6 pb-10">
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <div className="flex flex-col items-center">
          <img
            src="https://i.pravatar.cc/100?u=dummy" // dummy pic generator
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4 shadow-md"
          />
          <h2 className="text-2xl font-bold text-orange-600">
            Welcome, {userName} 👋
          </h2>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Shared Items */}
        <div>
          <h3 className="text-xl font-semibold text-green-600 mb-4">
            🧺 Shared Items
          </h3>
          {shared.length === 0 ? (
            <p className="text-gray-500">No items shared yet.</p>
          ) : (
            shared.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-lg p-4 mb-4"
              >
                <h4 className="font-bold text-orange-500">{item.item_name}</h4>
                <p>
                  {item.quantity} {item.unit}
                </p>
                {item.description && (
                  <p className="text-sm text-gray-600">{item.description}</p>
                )}
                <p className="text-sm mt-1">
                  Status:{" "}
                  {item.is_claimed ? (
                    <span className="text-green-600">Claimed</span>
                  ) : (
                    <span className="text-yellow-600">Unclaimed</span>
                  )}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Claimed Items */}
        <div>
          <h3 className="text-xl font-semibold text-green-600 mb-4">
            🛒 Claimed Items
          </h3>
          {claimed.length === 0 ? (
            <p className="text-gray-500">No items claimed yet.</p>
          ) : (
            claimed.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-lg p-4 mb-4"
              >
                <h4 className="font-bold text-orange-500">{item.item_name}</h4>
                <p>
                  {item.quantity} {item.unit}
                </p>
                {item.description && (
                  <p className="text-sm text-gray-600">{item.description}</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
