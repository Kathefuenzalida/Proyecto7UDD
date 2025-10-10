import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    // 1. Leer el token desde la cookie
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ msg: "No autorizado, falta token" });
    }

    // 2. Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Guardar el user en el request
    req.user = decoded.user;

    next();
  } catch (error) {
    console.error("❌ Error en authMiddleware:", error.message);
    res.status(401).json({ msg: "Token inválido o expirado" });
  }
};
