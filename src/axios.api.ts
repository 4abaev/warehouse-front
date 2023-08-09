import axios from "axios";
export const api = axios.create({
  baseURL: process.env.REACT_APP_DOMAIN || "http://localhost:4000",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
