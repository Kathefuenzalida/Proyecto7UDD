// server/src/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import plantRoutes from "./routes/plants.routes.js";
import paymentRoutes from "./routes/payments.routes.js"; // 👈 ya exporta default, ahora sí funciona

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error al conectar MongoDB:", err));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/plants", plantRoutes);
app.use("/api/payments", paymentRoutes); // 👈 ya está bien enlazado

// Server ON
app.listen(PORT, () => {
  console.log(`🚀 Server corriendo en http://localhost:${PORT}`);
});
