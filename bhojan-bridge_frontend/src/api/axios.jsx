import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // change if needed
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
