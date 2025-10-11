# 🌿 Botanic Soul — Proyecto 7: Aplicación Fullstack de Comercio Electrónico

**Bootcamp Fullstack UDD | Módulo 7**

---

## 🪴 Descripción General

**Botanic Soul** es una aplicación de comercio electrónico desarrollada como parte del **Proyecto 7 del Bootcamp Fullstack UDD**.  
El objetivo es ofrecer una experiencia de compra de plantas decorativas únicas, donde cada planta se combina con maceteros artísticos que destacan por su valor estético y natural.

El proyecto cuenta con **autenticación de usuarios**, **panel de administración**, **carrito de compras**, y **pasarela de pago con Mercado Pago**, además de un diseño limpio, armónico y en línea con la identidad visual de la marca.

---

## 🚀 Tecnologías Utilizadas

### 🔹 Frontend
- React + Vite
- React Router DOM
- Context API + useReducer
- Bootstrap 5
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

## 🌐 Despliegue

- **Frontend:** [https://botanicsoul.netlify.app](https://botanicsoul.netlify.app)  
- **Backend (Render):** [https://botanicsoul-backend.onrender.com](https://botanicsoul-backend.onrender.com)

> 🔒 El backend puede demorar unos segundos en activarse la primera vez (modo gratuito de Render).

---

## 🧩 Funcionalidades

### 👥 Autenticación de Usuarios
- Registro (`/register`) y Login (`/login`) con validación de credenciales.
- Uso de **JWT Tokens** para autenticación segura.
- Vista de perfil del usuario (`/profile`).

### 🛒 Carrito de Compras
- Los usuarios pueden agregar o eliminar productos al carrito.
- Visualización del carrito y redirección a la pasarela de pago.
- Integración con **Mercado Pago** en modo sandbox para pagos de prueba.

### 👩‍💼 Panel de Administración
- Vista privada solo para administradores.
- CRUD completo de productos:
  - Crear nuevos productos.
  - Consultar listado completo.
  - Actualizar información.
  - Eliminar artículos del catálogo.
- Validación con middleware `isAdmin`.

### 💳 Pasarela de Pago (Mercado Pago)
- Integración segura mediante SDK oficial.
- Pruebas habilitadas con tarjeta de test:
