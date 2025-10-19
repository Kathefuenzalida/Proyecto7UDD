import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // apuntamos al backend
  withCredentials: true,                //  enviar cookies
});

export default api;
