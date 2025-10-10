import React from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";

function Blog() {
  // Datos de ejemplo para los posts del blog
  const blogPosts = [
    {
      id: 1,
      title: "5 Plantas Perfectas para Principiantes",
      excerpt: "Si eres nuevo en el mundo de las plantas, estas especies son ideales para comenzar tu jardín interior.",
      content: `
        Comenzar con plantas puede ser intimidante, pero estas 5 especies son perfectas para principiantes:

        **1. Sansevieria (Lengua de Suegra)**
        - Requiere muy poca agua
        - Tolera la poca luz
        - Purifica el aire

        **2. Pothos**
        - Crecimiento rápido
        - Fácil propagación
        - Se adapta a diferentes condiciones de luz

        **3. Suculentas**
        - Almacenan agua en sus hojas
        - Perfectas para espacios soleados
        - Variedad de formas y colores

        **4. Monstera Deliciosa**
        - Hojas espectaculares
        - Crecimiento vertical
        - Símbolo de la decoración moderna

        **5. Ficus Lyrata**
        - Elegante y escultural
        - Hojas grandes y brillantes
        - Perfecto como planta focal
      `,
      image: "/plants/sansevieria.png",
      category: "Principiantes",
      date: "2025-10-08",
      author: "Botanic Soul Team",
      readTime: "5 min"
    },
    {
      id: 2,
      title: "Cómo Crear un Jardín Vertical en Casa",
      excerpt: "Maximiza tu espacio verde con estas técnicas para crear un impresionante jardín vertical.",
      content: `
        Los jardines verticales son la solución perfecta para espacios pequeños:

        **Materiales necesarios:**
        - Estructura de soporte (madera o metal)
        - Macetas colgantes o sistema de bolsillos
        - Sustrato de calidad
        - Sistema de riego por goteo (opcional)

        **Plantas recomendadas:**
        - Helechos para zonas de sombra
        - Suculentas para sol directo
        - Plantas aromáticas (albahaca, menta)
        - Plantas colgantes (pothos, tradescantia)

        **Consejos de mantenimiento:**
        - Riego frecuente pero controlado
        - Fertilización mensual
        - Poda regular para mantener la forma
        - Rotación de plantas según la temporada
      `,
      image: "/plants/helecho.png",
      category: "Decoración",
      date: "2025-10-07",
      author: "María González",
      readTime: "8 min"
    },
    {
      id: 3,
      title: "Plantas de Interior que Purifican el Aire",
      excerpt: "Descubre qué plantas no solo embellecen tu hogar, sino que también mejoran la calidad del aire.",
      content: `
        La NASA ha identificado plantas que eliminan toxinas del aire interior:

        **Top 5 Purificadoras:**

        **1. Sansevieria**
        - Elimina formaldehído y benceno
        - Produce oxígeno por la noche
        - Perfecta para dormitorios

        **2. Ficus**
        - Absorbe formaldehído del mobiliario
        - Mejora la humedad del ambiente
        - Ideal para salas de estar

        **3. Helechos**
        - Eliminan xileno y tolueno
        - Aumentan la humedad
        - Perfectos para baños

        **4. Lavanda**
        - Propiedades relajantes
        - Repele insectos naturalmente
        - Aroma terapéutico

        **5. Monstera**
        - Absorbe grandes cantidades de CO2
        - Filtra contaminantes comunes
        - Declaración de estilo
      `,
      image: "/plants/ficus.png",
      category: "Salud",
      date: "2025-10-06",
      author: "Dr. Carlos Ruiz",
      readTime: "6 min"
    },
    {
      id: 4,
      title: "Calendario de Cuidados Estacionales",
      excerpt: "Aprende cuándo y cómo cuidar tus plantas según la época del año para mantenerlas saludables.",
      content: `
        Cada estación requiere cuidados específicos para tus plantas:

        **Primavera (Sept-Nov)**
        - Aumentar frecuencia de riego
        - Fertilizar cada 2 semanas
        - Trasplantar si es necesario
        - Comenzar propagación

        **Verano (Dic-Feb)**
        - Riego diario en plantas de exterior
        - Proteger del sol intenso del mediodía
        - Ventilación adecuada
        - Control de plagas

        **Otoño (Mar-May)**
        - Reducir frecuencia de riego
        - Últimas fertilizaciones del año
        - Preparar plantas para el invierno
        - Podar plantas que lo requieran

        **Invierno (Jun-Ago)**
        - Riego mínimo
        - No fertilizar
        - Proteger de heladas
        - Ubicar en lugares con más luz
      `,
      image: "/plants/lavanda.png",
      category: "Cuidados",
      date: "2025-10-05",
      author: "Ana Martínez",
      readTime: "7 min"
    }
  ];

  return (
    <Container className="my-5">
      {/* Header del Blog */}
      <Row className="mb-5">
        <Col lg={8} className="mx-auto text-center">
          <h1 className="display-4 fw-bold text-success mb-3">
            <i className="bi bi-leaf me-3"></i>
            Blog de Recomendaciones
          </h1>
          <p className="lead text-muted">
            Descubre consejos expertos, guías de cuidado y las mejores recomendaciones 
            para hacer crecer tu pasión por las plantas.
          </p>
        </Col>
      </Row>

      {/* Posts del Blog */}
      <Row>
        {blogPosts.map((post) => (
          <Col lg={6} className="mb-4" key={post.id}>
            <Card className="h-100 shadow-sm border-0 blog-card">
              <div className="position-relative">
                <Card.Img 
                  variant="top" 
                  src={post.image} 
                  style={{ height: '250px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = '/placeholders/no-image.png';
                  }}
                />
                <Badge 
                  bg={post.category === 'Principiantes' ? 'success' : 
                      post.category === 'Decoración' ? 'warning' :
                      post.category === 'Salud' ? 'info' : 'secondary'} 
                  className="position-absolute top-0 start-0 m-3"
                >
                  {post.category}
                </Badge>
              </div>
              
              <Card.Body className="d-flex flex-column">
                <div className="mb-3">
                  <small className="text-muted">
                    <i className="bi bi-person me-1"></i>
                    {post.author} • 
                    <i className="bi bi-calendar3 mx-1"></i>
                    {new Date(post.date).toLocaleDateString('es-CL')} • 
                    <i className="bi bi-clock mx-1"></i>
                    {post.readTime}
                  </small>
                </div>
                
                <Card.Title className="h5 mb-3">{post.title}</Card.Title>
                <Card.Text className="text-muted mb-3 flex-grow-1">
                  {post.excerpt}
                </Card.Text>
                
                <div className="mt-auto">
                  <button 
                    className="btn btn-outline-success"
                    data-bs-toggle="modal" 
                    data-bs-target={`#modal-${post.id}`}
                  >
                    Leer más <i className="bi bi-arrow-right ms-1"></i>
                  </button>
                </div>
              </Card.Body>
            </Card>

            {/* Modal para el contenido completo */}
            <div 
              className="modal fade" 
              id={`modal-${post.id}`} 
              tabIndex="-1" 
              aria-labelledby={`modalLabel-${post.id}`} 
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id={`modalLabel-${post.id}`}>
                      {post.title}
                    </h5>
                    <button 
                      type="button" 
                      className="btn-close" 
                      data-bs-dismiss="modal" 
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="img-fluid rounded mb-4"
                      onError={(e) => {
                        e.target.src = '/placeholders/no-image.png';
                      }}
                    />
                    <div className="mb-3">
                      <Badge bg="secondary" className="me-2">{post.category}</Badge>
                      <small className="text-muted">
                        Por {post.author} • {new Date(post.date).toLocaleDateString('es-CL')}
                      </small>
                    </div>
                    <div className="content">
                      {post.content.split('\n\n').map((paragraph, index) => {
                        if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                          return (
                            <h6 key={index} className="fw-bold text-success mt-4 mb-2">
                              {paragraph.replace(/\*\*/g, '')}
                            </h6>
                          );
                        }
                        return (
                          <p key={index} className="mb-3">
                            {paragraph.split('**').map((part, i) => 
                              i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                            )}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      data-bs-dismiss="modal"
                    >
                      Cerrar
                    </button>
                    <button type="button" className="btn btn-success">
                      <i className="bi bi-heart me-1"></i>
                      Me gusta
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Call to Action */}
      <Row className="mt-5">
        <Col lg={8} className="mx-auto text-center">
          <div className="p-5 bg-light rounded">
            <h3 className="mb-3">¿Tienes alguna pregunta sobre plantas?</h3>
            <p className="text-muted mb-4">
              Nuestro equipo de expertos está aquí para ayudarte. 
              ¡No dudes en contactarnos!
            </p>
            <button className="btn btn-success btn-lg">
              <i className="bi bi-chat-dots me-2"></i>
              Contactar Expertos
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Blog;