import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const res = await axios.get("api/notifications/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data);
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-orange-50 px-6">
      <h2 className="text-3xl font-bold text-orange-500 text-center mb-6">
        Notifications
      </h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : notifications.length === 0 ? (
        <p className="text-center text-gray-500">No notifications.</p>
      ) : (
        <ul className="space-y-4 max-w-2xl mx-auto">
          {notifications.map((notif) => (
            <li
              key={notif.id}
              className="bg-white rounded-lg shadow p-4 border-l-4 border-orange-400"
            >
              <p className="text-gray-700">{notif.message}</p>
              <p className="text-sm text-gray-400 mt-1">
                {new Date(notif.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
