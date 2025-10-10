import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../../context/users/UserContext";

export default function PrivateRoute({ children }) {
  const { authStatus, verifyingToken } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      await verifyingToken();
      setLoading(false);
    };
    verify();
  }, []);

  if (loading) return null;

  return authStatus ? children : <Navigate to="/login" />;
}
