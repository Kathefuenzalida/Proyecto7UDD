# Proyecto 7: Botanic Soul - Aplicación Fullstack de Comercio Electrónico

Este proyecto es una aplicación Fullstack de comercio electrónico para la venta de plantas, desarrollada como parte del Proyecto 7. Incluye funcionalidades esenciales para gestionar un negocio en línea, como un catálogo de productos, carrito de compras, pasarela de pago (Mercado Pago), autenticación y autorización de usuarios.

## Tecnologías Utilizadas

**Frontend:**
*   **React (con Vite):** Librería principal para la interfaz de usuario.
*   **Context API y useReducer:** Para el manejo de estados locales y globales.
*   **React Router DOM:** Para la gestión de rutas en el cliente.
*   **React-Bootstrap:** Componentes UI.
*   **Axios:** Para realizar peticiones HTTP al backend.

**Backend:**
*   **Node.js y Express.js:** Framework principal para el servidor.
*   **MongoDB y Mongoose:** Base de datos y ODM para la interacción con la base de datos.
*   **JWT (JSON Web Tokens):** Para autenticación de usuarios.
*   **Bcryptjs:** Para el hash de contraseñas.
*   **CORS:** Para permitir solicitudes de diferentes orígenes.
*   **Dotenv:** Para la gestión de variables de entorno.
*   **Mercado Pago:** Integración de pasarela de pagos (en modo de pruebas).
*   **Nodemon:** Para el reinicio automático del servidor durante el desarrollo.

## Funcionalidades Implementadas

*   **Catálogo de Productos:** Visualización de plantas de interior y exterior.
*   **Página de Detalle de Producto:** Vista individual para cada planta.
*   **Carrito de Compras:** Añadir, eliminar y ajustar la cantidad de productos.
*   **Pasarela de Pago:** Integración con Mercado Pago para procesar pagos.
*   **Autenticación de Usuarios:** Registro, inicio de sesión y cierre de sesión con JWT.
*   **Autorización:** Panel de administración restringido para usuarios con rol "admin".
*   **Gestión de Productos (CRUD):** Creación, lectura, actualización y eliminación de productos desde el panel de administración.
*   **Perfil de Usuario:** Visualización de la información del usuario autenticado.

## Cómo Ejecutar el Proyecto Localmente

**Requisitos Previos:**
*   Node.js (versión 14 o superior)
*   MongoDB Atlas (o una instancia local de MongoDB)
*   Credenciales de Mercado Pago (para pruebas)

**Pasos:**

1.  **Clonar el Repositorio:**
    ```bash
    git clone [URL_DEL_REPOSITORIO]
    cd p7-main
    ```

2.  **Configuración del Backend:**
    *   Navega al directorio `server`: `cd server`
    *   Instala las dependencias: `npm install`
    *   Crea un archivo `.env` en el directorio `server` con las siguientes variables (ejemplo):
        ```
        PORT=3000
        MONGO_URI=mongodb+srv://[USUARIO]:[CONTRASEÑA]@[CLUSTER].mongodb.net/?retryWrites=true&w=majority&appName=[APP_NAME]
        MP_ACCESS_TOKEN=TU_MP_ACCESS_TOKEN
        PUBLIC_KEY=TU_MP_PUBLIC_KEY
        FRONTEND_URL=http://localhost:5173
        JWT_SECRET=supersecreto123
        ```
        **Importante:** Asegúrate de que tu `MONGO_URI` sea correcta y que tu dirección IP esté en la lista de acceso de IP de tu clúster de MongoDB Atlas.

3.  **Poblar la Base de Datos (Seeding):**
    *   Desde el directorio `server`, ejecuta el script de siembra para cargar productos de ejemplo:
        ```bash
        node src/seed.js
        ```
        Deberías ver mensajes de conexión y de inserción de productos.

4.  **Iniciar el Servidor Backend:**
    *   Desde el directorio `server`, inicia el servidor:
        ```bash
        npm start
        ```
        Verifica que el servidor se inicie correctamente y muestre "✅ Conectado a MongoDB" y "Server corriendo en http://localhost:3000".

5.  **Configuración del Frontend:**
    *   Abre una **nueva terminal** y navega al directorio `client`: `cd client`
    *   Instala las dependencias: `npm install`
    *   Crea un archivo `.env` en el directorio `client` con la siguiente variable:
        ```
        VITE_BACKEND_URL=http://localhost:3000/api
        ```

6.  **Iniciar el Servidor Frontend:**
    *   Desde el directorio `client`, inicia el servidor de desarrollo:
        ```bash
        npm run dev
        ```
        El frontend se ejecutará en `http://localhost:5173`.

7.  **Acceder a la Aplicación:**
    *   Abre tu navegador y visita `http://localhost:5173`.

## Cuentas de Prueba (si aplica)

*   **Admin:**
    *   Usuario: `admin`
    *   Contraseña: `admin123`
*   **Usuario Normal:**
    *   Usuario: `user`
    *   Contraseña: `user123`

(Estas cuentas se crean si ejecutas el script `seed.js` y si tu `seed.js` incluye la creación de usuarios de prueba).

## Despliegue

*   **Frontend:** [URL de Netlify/Vercel/etc.]
*   **Backend:** [URL de Railway/Render/etc.]
*   **Base de Datos:** MongoDB Atlas
