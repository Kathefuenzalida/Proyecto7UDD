import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/users/UserContext";
import "./Auth.css"; // 👈 agregamos estilos personalizados

function Login() {
  const navigate = useNavigate();
  const { loginUser, authStatus, error: contextError, loading, clearError } = useContext(UserContext);

  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    if (contextError) {
      clearError();
    }
  };

  const sendData = (e) => {
    e.preventDefault();
    loginUser(data);
  };

  useEffect(() => {
    if (authStatus) {
      navigate("/profile");
    }
  }, [authStatus, navigate]);

  return (
    <div className="auth-container login-bg"> {/* 👈 aquí el fondo */}
      <div className="card auth-card"> {/* 👈 card con estilo limpio */}
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Iniciar sesión</h2>

          {contextError && (
            <div className="alert alert-danger d-flex align-items-center" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {contextError}
            </div>
          )}

          <form onSubmit={sendData}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Ingresa tu email"
                value={data.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                value={data.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar sesión"
              )}
            </button>
          </form>

          <div className="text-center mt-3">
            <p>
              ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
