import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import PlantCard from "../components/PlantCard";
import api from "../config/axios"; // Importar la instancia de axios

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products"); // Obtener productos de la API
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener productos:", err);
        setError("Error al cargar los productos. Intenta de nuevo más tarde.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const interiorPlants = products.filter(
    (plant) => plant.category === "interior"
  );
  const exteriorPlants = products.filter(
    (plant) => plant.category === "exterior"
  );

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando productos...</span>
        </Spinner>
        <p className="mt-2">Cargando productos...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <header className="text-center mb-5">
        <h1>Paz, armonía y diseño</h1>
        <p>Plantas de interior y exterior con maceteros únicos</p>
      </header>

      {/* Interior */}
      <h2 className="mb-4">
        <span role="img" aria-label="leaf">🌿</span> Plantas de Interior
      </h2>
      <Row>
        {interiorPlants.length > 0 ? (
          interiorPlants.map((plant) => (
            <Col md={4} sm={6} xs={12} key={plant._id}>
              <PlantCard plant={plant} />
            </Col>
          ))
        ) : (
          <Col>
            <Alert variant="info">No hay plantas de interior disponibles.</Alert>
          </Col>
        )}
      </Row>

      {/* Exterior */}
      <h2 className="mt-5 mb-4">
        <span role="img" aria-label="sun">☀️</span> Plantas de Exterior
      </h2>
      <Row>
        {exteriorPlants.length > 0 ? (
          exteriorPlants.map((plant) => (
            <Col md={4} sm={6} xs={12} key={plant._id}>
              <PlantCard plant={plant} />
            </Col>
          ))
        ) : (
          <Col>
            <Alert variant="info">No hay plantas de exterior disponibles.</Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default Home;
