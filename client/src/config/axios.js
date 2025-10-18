import axios from "axios";

// ✅ Usa variable de entorno según el entorno (local o producción)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Eliminar el prefijo /api de aquí
  withCredentials: true,
});

// ✅ Interceptor para agregar el token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Asegúrate de que el token se guarda con esta clave
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("🚀 Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Interceptor de respuesta (para debugging)
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
