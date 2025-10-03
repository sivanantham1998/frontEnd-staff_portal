// src/axios.js
import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "https://backend-staff-portal.onrender.com/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true, // if you’re using cookies
});

export default api;
