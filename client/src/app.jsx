import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Contextos
import CartState from "./context/cart/CartState";
import UserState from "./context/users/UserState";

// Componentes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Páginas
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Blog from "./pages/Blog";
import Success from "./pages/Success";
import Failure from "./pages/Failure";
import Pending from "./pages/Pending";
import Cart from "./pages/Cart"; // 🛒 nuevo

// Rutas protegidas
import PrivateRoute from "./components/Auth/PrivateRoute";
import AuthRoute from "./components/Auth/AuthRoute";

import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

function App() {
  return (
    <CartState>
      <UserState>
        <Router>
          <Navbar />

          <main className="container mt-4 mb-5">
            <Routes>
              {/* RUTAS PRIVADAS */}
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />

              {/* RUTAS DE AUTENTICACIÓN */}
              <Route
                path="/register"
                element={
                  <AuthRoute>
                    <Register />
                  </AuthRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <AuthRoute>
                    <Login />
                  </AuthRoute>
                }
              />

              {/* RUTAS DE PAGO (Mercado Pago) */}
              <Route path="/success" element={<Success />} />
              <Route path="/failure" element={<Failure />} />
              <Route path="/pending" element={<Pending />} />

              {/* RUTA NUEVA - CARRITO */}
              <Route path="/cart" element={<Cart />} />

              {/* RUTAS PÚBLICAS */}
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/recomendaciones" element={<Blog />} />
            </Routes>
          </main>

          <Footer />
        </Router>
      </UserState>
    </CartState>
  );
}

export default App;
