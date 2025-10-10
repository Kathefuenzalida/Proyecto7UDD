import React, { useContext } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../context/users/UserContext";

function CustomNavbar() {
  const userCtx = useContext(UserContext);
  const { user, logout, authStatus } = userCtx;

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="/logo.png"
            alt="Botanic Soul Logo"
            width="40"
            height="40"
            className="d-inline-block align-top me-2"
          />
          <span className="fw-bold">Botanic Soul</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto fw-bold fs-6">
            <Nav.Link as={Link} to="/#interior">Plantas de Interior</Nav.Link>
            <Nav.Link as={Link} to="/#exterior">Plantas de Exterior</Nav.Link>
            <Nav.Link as={Link} to="/recomendaciones">Recomendaciones</Nav.Link>

            {/* 🔑 Opciones dinámicas según login */}
            {authStatus ? (
              <>
                {/* Dropdown del usuario con avatar */}
                <NavDropdown 
                  title={
                    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                      <div 
                        className="d-flex align-items-center justify-content-center rounded-circle text-white me-2"
                        style={{ 
                          width: '32px', 
                          height: '32px', 
                          fontSize: '14px',
                          fontWeight: 'bold',
                          backgroundColor: '#28a745'
                        }}
                      >
                        {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <span>{user?.username || 'Usuario'}</span>
                    </div>
                  }
                  id="user-dropdown"
                  align="end"
                >
                  <NavDropdown.Header>
                    <div className="d-flex align-items-center">
                      <div 
                        className="d-flex align-items-center justify-content-center rounded-circle text-white me-2"
                        style={{ 
                          width: '40px', 
                          height: '40px', 
                          fontSize: '16px',
                          fontWeight: 'bold',
                          backgroundColor: '#28a745'
                        }}
                      >
                        {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div>
                        <div className="fw-bold">{user?.username}</div>
                        <small className="text-muted">{user?.email}</small>
                      </div>
                    </div>
                  </NavDropdown.Header>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/profile">
                    <i className="bi bi-person me-2"></i>Mi Perfil
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout} className="text-danger">
                    <i className="bi bi-box-arrow-right me-2"></i>Cerrar sesión
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/register">Registro</Nav.Link>
                <Nav.Link as={Link} to="/login">Iniciar sesión</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
