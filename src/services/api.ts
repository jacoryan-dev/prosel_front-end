import axios from "axios";
import { storage } from "../utils/storage";

const baseURL =
  import.meta.env.VITE_API_BASE || "https://api.homologation.cliqdrive.com.br";

export const api = axios.create({
  baseURL,
  headers: {
    Accept: "application/json;version=v1_web",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = storage.getAccessToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
