import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // 👈 el backend sirve todo con /api
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
