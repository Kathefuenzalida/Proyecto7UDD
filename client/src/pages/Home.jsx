import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PlantCard from "../components/PlantCard";
import plants from "../data/plants";

function Home() {
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
        {plants.interior.map((plant) => (
          <Col md={4} sm={6} xs={12} key={plant.id}>
            <PlantCard plant={plant} />
          </Col>
        ))}
      </Row>

      {/* Exterior */}
      <h2 className="mt-5 mb-4">
        <span role="img" aria-label="sun">☀️</span> Plantas de Exterior
      </h2>
      <Row>
        {plants.exterior.map((plant) => (
          <Col md={4} sm={6} xs={12} key={plant.id}>
            <PlantCard plant={plant} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
