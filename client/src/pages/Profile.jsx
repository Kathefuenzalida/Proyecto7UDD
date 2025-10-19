import React, { useContext, useEffect } from "react";
import UserContext from "../context/users/UserContext";

function Profile() {
  const { user, verifyingToken, logout } = useContext(UserContext);

  useEffect(() => {
    verifyingToken();
  }, []);

  if (!user) return <p>Cargando perfil...</p>;

  return (
    <div className="container mt-5">
      <h2>Perfil de usuario</h2>
      <p><strong>Usuario:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}

export default Profile;