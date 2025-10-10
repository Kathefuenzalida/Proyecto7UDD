// client/src/components/BuyButton.jsx
import React from "react";
import { Button } from "react-bootstrap";
import api from "../config/axios";

function BuyButton({ plant }) {
  const handleBuy = async () => {
    try {
      console.log("🪴 Enviando al backend:", plant);

      const response = await api.post("/payments", {
        title: plant.name,
        unit_price: plant.price,
        quantity: 1,
      });

      const preferenceId = response.data.id;
      window.location.href = `https://www.mercadopago.cl/checkout/v1/redirect?pref_id=${preferenceId}`;
    } catch (error) {
      console.error("❌ Error al crear preferencia:", error);
      alert("No se pudo iniciar el pago. Revisa la consola.");
    }
  };

  return (
    <Button variant="success" onClick={handleBuy}>
      Comprar{" "}
      <img
        src="/mercadopago.jpg"
        alt="Mercado Pago"
        style={{ width: "24px", marginLeft: "8px" }}
      />
    </Button>
  );
}

export default BuyButton;
