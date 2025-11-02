import axios from "axios";

// Instance of axios with base URL
const api = axios.create({
  baseURL: "http://localhost:8000",
});

export default api;
