import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom"; // Importar Link
import BuyButton from "./BuyButton";

function PlantCard({ plant }) {
  return (
    <Card className="mb-4 shadow-sm">
      <Link to={`/products/${plant._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Card.Img
          variant="top"
          src={plant.image}
          alt={plant.name}
          style={{ height: "280px", objectFit: "cover" }}
        />
        <Card.Body className="text-center">
          <Card.Title>{plant.name}</Card.Title>
          <Card.Text>{plant.price.toLocaleString("es-CL")} CLP</Card.Text>
        </Card.Body>
      </Link>
      <div className="p-3">
        <BuyButton plant={plant} />
      </div>
    </Card>
  );
}

export default PlantCard;
