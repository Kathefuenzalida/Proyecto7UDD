import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/users/UserContext";

function Register() {
  const navigate = useNavigate();
  const { registerUser, authStatus, error: contextError } = useContext(UserContext);

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [localError, setLocalError] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setLocalError(""); // Limpiar error local al escribir
  };

  const sendData = (e) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (data.password.length < 6) {
      setLocalError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    
    if (!data.username.trim()) {
      setLocalError("El nombre de usuario es requerido");
      return;
    }

    registerUser(data);
  };

  // Redirigir después del registro exitoso
  useEffect(() => {
    if (authStatus) {
      navigate("/profile");
    }
  }, [authStatus, navigate]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Crear cuenta</h2>
              
              {(localError || contextError) && (
                <div className="alert alert-danger" role="alert">
                  {localError || contextError}
                </div>
              )}
              
              <form onSubmit={sendData}>
                <div className="mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    name="username" 
                    placeholder="Nombre de usuario" 
                    value={data.username}
                    onChange={handleChange} 
                    required 
                  />
                </div>
                
                <div className="mb-3">
                  <input 
                    type="email" 
                    className="form-control" 
                    name="email" 
                    placeholder="Correo electrónico" 
                    value={data.email}
                    onChange={handleChange} 
                    required 
                  />
                </div>
                
                <div className="mb-3">
                  <input 
                    type="password" 
                    className="form-control" 
                    name="password" 
                    placeholder="Contraseña (mínimo 6 caracteres)" 
                    value={data.password}
                    onChange={handleChange} 
                    minLength="6"
                    required 
                  />
                </div>
                
                <button type="submit" className="btn btn-primary w-100">
                  Registrarme
                </button>
              </form>
              
              <div className="text-center mt-3">
                <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
