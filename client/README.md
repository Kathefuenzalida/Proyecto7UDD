# 🌿 Botanic Soul — Proyecto 7: Aplicación Fullstack de Comercio Electrónico

**Bootcamp Fullstack UDD | Módulo 7**

---

## Descripción General

**Botanic Soul** es una aplicación de comercio electrónico desarrollada como parte del **Proyecto 7 del Bootcamp Fullstack UDD**.  
El objetivo es ofrecer una experiencia de compra de plantas decorativas únicas, donde cada planta se combina con maceteros artísticos que destacan por su valor estético y natural.

El proyecto cuenta con **autenticación de usuarios**, **panel de administración**, **carrito de compras**, y **pasarela de pago con Mercado Pago**, además de un diseño limpio, armónico y en línea con la identidad visual de la marca.

---

## Tecnologías Utilizadas

### 🔹 Frontend
- React + Vite
- React Router DOM
- Context API + useReducer
- Bootstrap
- Axios
- CSS personalizado (con estilo armónico natural)

### 🔹 Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT (autenticación segura)
- dotenv
- cors
- bcryptjs
- MercadoPago SDK

---

## Despliegue

- **Frontend:** [https://botanicsoul.netlify.app](https://botanicsoul.netlify.app)  
- **Backend (Render):** [https://botanicsoul-backend.onrender.com](https://botanicsoul-backend.onrender.com)

> El backend puede demorar unos segundos en activarse la primera vez (modo gratuito de Render).

---

## Funcionalidades

### Autenticación de Usuarios
- Registro (`/register`) y Login (`/login`) con validación de credenciales.
- Uso de **JWT Tokens** para autenticación segura.
- Vista de perfil del usuario (`/profile`).

### Carrito de Compras
- Los usuarios pueden agregar o eliminar productos al carrito.
- Visualización del carrito y redirección a la pasarela de pago.
- Integración con **Mercado Pago** en modo sandbox para pagos de prueba.

### Panel de Administración
- Vista privada solo para administradores.
- CRUD completo de productos:
  - Crear nuevos productos.
  - Consultar listado completo.
  - Actualizar información.
  - Eliminar artículos del catálogo.
- Validación con middleware `isAdmin`.

### Pasarela de Pago (Mercado Pago)
- Integración segura mediante SDK oficial.
- Pruebas habilitadas con tarjeta de test:
4242 4242 4242 4242
Fecha: 12/34 | CVC: 123


---

## Estructura de Carpetas


p7-main/
├── client/ # Frontend React
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ ├── models/ # Modelos del cliente
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── README.md
│
└── server/ # Backend Express
├── src/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ └── server.js
├── .env
└── package.json


---

## Prototipado

El prototipo simple del diseño se encuentra en la carpeta:

/p7-main/Prototipo_BotanicSoul.docx

Este documento muestra la estructura visual base del proyecto antes del desarrollo.

---

## Variables de Entorno (.env)

### 🔹 Backend (`server/.env`)
```env
# Puerto del backend
PORT=3000

# Base de datos MongoDB
MONGO_URI=mongodb+srv://admin:admin@bootcampudd.hb2vj1c.mongodb.net/?retryWrites=true&w=majority&appName=BootcampUDD

# Mercado Pago - Pruebas
MP_ACCESS_TOKEN=APP_USR-5826577791068400-092812-66a2d102b62eb627ce270cd00718d1f4-2719153496
PUBLIC_KEY=APP_USR-05cde40d-4cd8-488b-ada1-5d9edb0067c1

# URL del frontend (Vite)
FRONTEND_URL=http://localhost:5173

# JWT secret (para firmar los tokens de login)
JWT_SECRET=supersecreto123

🔹 Frontend (client/.env)
VITE_API_URL=https://botanicsoul-backend.onrender.com/api

Instalación Local
🔹 Clonar el repositorio
git clone https://github.com/Kathefuenzalida/Proyecto7UDD
cd p7-main

🔹 Backend
cd server
npm install
npm run start

🔹 Frontend
cd client
npm install
npm run dev

Credenciales de Prueba (Administrador)

Para acceder al panel de administración, inicia sesión con:

usuario: admin@botanicsoul.com
contraseña: admin123


Una vez autenticada, podrás acceder a la ruta protegida:

https://botanicsoul.netlify.app/admin


Ahí podrás crear, editar y eliminar productos.

✨ Autor

Katherine Fuenzalida Rojas
Ingeniera Civil Industrial | Product Owner | Desarrolladora Fullstack en formación
📍 Curicó, Chile
LinkedIn: https://www.linkedin.com/in/katherine-f-232420135/


Este proyecto fue desarrollado como parte del programa Bootcamp Fullstack UDD 2025
para fines educativos y demostrativos.


---

## 🧭 PARTE 2 — Cómo ver el **perfil admin y CRUD**

### 1️⃣ Inicia sesión con el usuario administrador
Usa:


email: admin@botanicsoul.com

password: admin123


⚠️ Si no existe en tu base de datos, puedes **crear ese usuario manualmente** en MongoDB Atlas:
- Colección: `users`
- Campos:
  ```json
  {
    "username": "Admin",
    "email": "admin@botanicsoul.com",
    "password": "<hash generado por bcrypt>",
    "role": "admin"
  }


O más fácil: puedo pasarte un endpoint POST temporal que te crea ese admin automáticamente (solo debes llamarlo una vez).
¿Quieres que te deje ese código en auth.routes.js para crear el admin inicial?

2️⃣ Accede al panel

Luego ve a:

https://botanicsoul.netlify.app/admin


Ahí verás el panel CRUD (crear, editar, eliminar productos).

🛍️ PARTE 3 — Carrito de compras

El carrito ya está conectado, pero su ícono aún no se muestra en el Navbar.
Puedo agregarte el botón 🛒 al lado derecho del navbar con un contador de productos,
que te lleve a /cart (donde se muestran los productos seleccionados).

¿Quieres que te deje el código completo para agregar ese ícono al Navbar también?
Así tendrás el flujo completo funcionando (Home → agregar al carrito → pagar).