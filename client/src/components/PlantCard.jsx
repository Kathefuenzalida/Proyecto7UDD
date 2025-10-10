import React from "react";
import { Card } from "react-bootstrap";
import BuyButton from "./BuyButton";

function PlantCard({ plant }) {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Img
        variant="top"
        src={plant.image}
        alt={plant.name}
        style={{ height: "280px", objectFit: "cover" }}
      />
      <Card.Body className="text-center">
        <Card.Title>{plant.name}</Card.Title>
        <Card.Text>{plant.price.toLocaleString("es-CL")} CLP</Card.Text>
        <BuyButton plant={plant} />
      </Card.Body>
    </Card>
  );
}

export default PlantCard;
