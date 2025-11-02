import axios from "axios";

// Instance of axios with base URL
const api = axios.create({
  baseURL: "http://https://safesite-ai-backend.onrender.com:8000",
});

export default api;
