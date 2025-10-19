import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, Button, Spinner, Alert } from "react-bootstrap";
import api from "../config/axios";
import BuyButton from "../components/BuyButton"; // Importar BuyButton

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener el producto:", err);
        setError("Error al cargar el producto. Intenta de nuevo más tarde.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando producto...</span>
        </Spinner>
        <p className="mt-2">Cargando producto...</p>
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

  if (!product) {
    return (
      <Container className="mt-5">
        <Alert variant="info">Producto no encontrado.</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid rounded />
        </Col>
        <Col md={6}>
          <h1>{product.name}</h1>
          <p className="lead">{product.price.toLocaleString("es-CL")} CLP</p>
          <p>{product.description}</p>
          <p>
            **Categoría:** {product.category}
          </p>
          <p>
            **Stock disponible:** {product.stock}
          </p>
          <div className="mt-4">
            <BuyButton plant={product} /> {/* Usar BuyButton para añadir al carrito */}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;
