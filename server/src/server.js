// server/src/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Rutas existentes
import authRoutes from "./routes/auth.routes.js";
import plantRoutes from "./routes/plants.routes.js";
import paymentRoutes from "./routes/payments.routes.js";

// Nueva ruta para administración de productos
import productRoutes from "./routes/product.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 🧩 Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// 🗄️ Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error al conectar MongoDB:", err));

// 🚏 Rutas principales
app.use("/api/auth", authRoutes);       // Login, registro, JWT
app.use("/api/plants", plantRoutes);    // Catálogo público de plantas
app.use("/api/payments", paymentRoutes);// Pasarela de pagos
app.use("/api/products", productRoutes);// CRUD del admin para productos

// 🟢 Servidor en marcha
app.listen(PORT, () => {
  console.log(`Server corriendo en http://localhost:${PORT}`);
});
