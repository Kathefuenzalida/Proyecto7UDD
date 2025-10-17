import React, { useReducer, useEffect } from "react";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import api from "../../config/axios";

const UserState = ({ children }) => {
  const initialState = {
    user: null,
    authStatus: false,
    loading: true,
    error: null,
  };

  const [globalState, dispatch] = useReducer(UserReducer, initialState);

  // 👉 Signup
  const registerUser = async (dataForm) => {
    dispatch({ type: "LOADING_START" });
    try {
      const res = await api.post("/auth/signup", dataForm);
      // ✅ Guarda el token en localStorage
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        console.log("🔐 Token guardado (registro):", res.data.token);
      } else {
        console.warn("⚠️ No se recibió token en la respuesta del backend (registro).");
      }
      dispatch({
        type: "REGISTRO_EXITOSO",
        payload: res.data.user,
      });
    } catch (error) {
      console.error("❌ Error registrando usuario:", error.response?.data || error);
      dispatch({
        type: "ERROR_REGISTRO",
        payload: error.response?.data?.msg || "Error al registrar usuario",
      });
    }
  };

  // 👉 Login
  const loginUser = async (dataForm) => {
    dispatch({ type: "LOADING_START" });
    try {
      const res = await api.post("/auth/login", dataForm);

    // ✅ Guarda el token en localStorage
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      console.log("🔐 Token guardado:", res.data.token);
    } else {
      console.warn("⚠️ No se recibió token en la respuesta del backend.");
    }

    dispatch({
      type: "LOGIN_EXITOSO",
      payload: res.data.user,
    });
  } catch (error) {
    console.error("❌ Error login:", error.response?.data || error);
    dispatch({
      type: "ERROR_LOGIN",
      payload: error.response?.data?.msg || "Error al iniciar sesión",
    });
  }
};

  // 👉 Verificar usuario
  const verifyingToken = async () => {
    try {
      const res = await api.get("/auth/profile");
      dispatch({
        type: "OBTENER_USUARIO",
        payload: res.data.user,
      });
    } catch (error) {
      // Solo mostrar error si NO es un 401 (no autorizado es normal cuando no está logueado)
      if (error.response?.status !== 401) {
        console.error("❌ Error verificando usuario:", error.response?.data || error);
      }
      // Si hay error, marcar loading como false
      dispatch({ type: "LOADING_FINISHED" });
    }
  };

  // 🔄 Verificar token al cargar la app solo si es necesario
  useEffect(() => {
    // Solo verificar si hay posibilidad de tener una sesión
    // (puedes personalizar esta lógica según tus necesidades)
    const shouldVerify = true; // Por ahora siempre verificamos, pero silenciosamente
    
    if (shouldVerify) {
      verifyingToken();
    } else {
      // Marcar como terminado el loading si no vamos a verificar
      dispatch({ type: "LOADING_FINISHED" });
    }
  }, []);

  // 👉 Logout
  const logout = async () => {
    try {
      await api.post("/auth/logout");
      dispatch({ type: "CERRAR_SESION" });
    } catch (error) {
      console.error("❌ Error cerrando sesión:", error.response?.data || error);
    }
  };

  // 👉 Limpiar errores
  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  return (
    <UserContext.Provider
      value={{
        user: globalState.user,
        authStatus: globalState.authStatus,
        loading: globalState.loading,
        error: globalState.error,
        registerUser,
        loginUser,
        verifyingToken,
        logout,
        clearError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
