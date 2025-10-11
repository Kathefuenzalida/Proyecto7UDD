import jwt from "jsonwebtoken";

// Middleware para verificar token (proteger rutas)
export const protect = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ msg: "No autorizado, falta token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error("❌ Error en protect:", error.message);
    res.status(401).json({ msg: "Token inválido o expirado" });
  }
};

// Middleware para verificar rol (solo admin, por ejemplo)
export const authorize = (role) => {
  return (req, res, next) => {
    try {
      if (!req.user || req.user.role !== role) {
        return res.status(403).json({ msg: "Acceso denegado. Solo administradores." });
      }
      next();
    } catch (error) {
      console.error("❌ Error en authorize:", error.message);
      res.status(500).json({ msg: "Error verificando permisos" });
    }
  };
};
