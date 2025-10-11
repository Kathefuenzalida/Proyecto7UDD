import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Crear usuario (signup)
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "El usuario ya existe" });

    user = new User({ username, email, password });
    await user.save();

    const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { 
      httpOnly: true,
      secure: false, // false para desarrollo local (http)
      sameSite: 'lax' // permite envío de cookies cross-origin
    }).json({
      msg: "Usuario registrado",
      user: { username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ msg: "Credenciales inválidas" });
    }

    const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { 
      httpOnly: true,
      secure: false, // false para desarrollo local (http)
      sameSite: 'lax' // permite envío de cookies cross-origin
    }).json({
      msg: "Login exitoso",
      user: { username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Verificar usuario
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token").json({ msg: "Sesión cerrada" });
});

export default router;
