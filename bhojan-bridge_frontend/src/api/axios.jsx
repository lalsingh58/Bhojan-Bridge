import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // ✅ Change this to your actual backend base URL if deployed
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Automatically attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
