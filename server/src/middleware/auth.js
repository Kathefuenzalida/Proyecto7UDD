import jwt from "jsonwebtoken";

// Middleware para verificar token (proteger rutas)
export const protect = (req, res, next) => {
  try {
    let token;

    if (req.cookies?.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ msg: "Acceso denegado: No se proporcionó un token de autenticación." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error("❌ Error en protect:", error.message);
    res.status(401).json({ msg: "Acceso denegado: Token inválido o expirado." });
  }
};

// Middleware para verificar rol
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
