import axios from "axios";

// ✅ Usa variable de entorno según el entorno (local o producción)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  withCredentials: true,
});

// Interceptor para debugging
api.interceptors.request.use((request) => {
  console.log("🚀 Request:", request.method?.toUpperCase(), request.url);
  return request;
});

api.interceptors.response.use(
  (response) => {
    console.log("✅ Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    const isProfileCheck = error.config?.url?.includes("/auth/profile");
    const isUnauthorized = error.response?.status === 401;

    if (!(isProfileCheck && isUnauthorized)) {
      console.log("❌ Error Response:", error.response?.status, error.response?.data);
    }
    return Promise.reject(error);
  }
);

export default api;