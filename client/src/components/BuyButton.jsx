// client/src/components/BuyButton.jsx
import React, { useContext } from "react"; // Importar useContext
import { Button } from "react-bootstrap";
import CartContext from "../context/cart/CartContext"; // Importar CartContext

function BuyButton({ plant }) {
  const { addToCart } = useContext(CartContext); // Usar el contexto del carrito

  const handleAddToCart = () => { // Cambiar nombre de la función
    addToCart(plant); // Añadir el producto al carrito
    alert(`${plant.name} añadido al carrito!`); // Notificación simple
  };

  return (
    <Button variant="primary" onClick={handleAddToCart}> {/* Cambiar variante y onClick */}
      Añadir al Carrito
    </Button>
  );
}

export default BuyButton;
