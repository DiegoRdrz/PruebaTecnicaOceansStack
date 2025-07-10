# Frontend – Oceans React Challenge

Este directorio contiene el código fuente del frontend de la aplicación de gestión de órdenes de restaurante. Fue desarrollado con React 18 + TypeScript, utilizando herramientas modernas como Vite, TailwindCSS, React Router DOM, Zod, y Axios, para crear una experiencia de usuario fluida, responsiva y mantenible.

---

## Tecnologías utilizadas
- React 18
- TypeScript
- Vite
- Tailwind CSS v3
- React Router DOM
- Axios
- React Hook Form + Zod
- Context API (o Zustand si se configuró)
- Autenticación JWT (almacenado en localStorage)


---

## Instalación

Luego de clonar el repositorio, vamos a realizar la correcta instalacion del Front-End

1. Ahora navegamos a la carpeta raiz del Front-ENd con el siguiente comando:

cd PruebaTecnicaOceansStack/frontend/

2. Instalar dependencias con el siguiente comando:

- npm install

4. Ejecutar el servidor de desarrollo

npm run dev

Esto levantará la aplicación en:

http://localhost:5173


## Estructura del frontend

El frontend sigue una arquitectura basada en componentes y modularidad, diseñada para escalar, reutilizar código y mantener una separación clara de responsabilidades. A continuación se describen los directorios y archivos principales:

- /api: Contiene la configuración personalizada de Axios para hacer peticiones HTTP al backend. Aquí se define la base URL y los interceptores que añaden el token JWT automáticamente a cada solicitud protegida.

- /components: Contiene componentes reutilizables en toda la aplicación, como inputs, botones, formularios, tablas, gráficas o filtros. También se organizan subcarpetas específicas por funcionalidad, como dashboard, login, etc.

- /context: Define contextos globales de React para manejar estados compartidos, como la autenticación del usuario o el carrito de compras, utilizando Context API.

- /hooks: Aquí se almacenan custom hooks reutilizables como useAuth, useOrders, useDashboard, etc., para separar la lógica de negocio del componente visual.

- /pages: Contiene las páginas principales de la aplicación que corresponden a rutas específicas, como LoginPage, DashboardPage, OrdersPage, etc.

- /routes: Se encarga de definir y proteger las rutas de la aplicación usando React Router DOM. Incluye rutas públicas y protegidas según el rol del usuario.

- /validators: Contiene los esquemas de validación hechos con Zod para validar formularios antes de enviar datos al backend (por ejemplo: login, creación de productos, etc.).

- /types: Define tipos personalizados de TypeScript que se comparten entre distintos componentes y hooks. Por ejemplo: User, Order, Product, etc.

- main.tsx: Punto de entrada de la aplicación. Aquí se monta la app de React, se cargan los providers y se renderiza todo el árbol de componentes.

- vite.config.ts: Archivo de configuración de Vite, donde se pueden agregar alias de importación, plugins y otras optimizaciones.

- index.html: Documento base HTML que carga el script de React en producción o desarrollo.


 Endpoints principales
El frontend se comunica con el backend mediante peticiones HTTP utilizando Axios. A continuación se describen los principales endpoints utilizados en la aplicación:

*Autenticación: *

- POST /auth/login: Inicia sesión de usuario y devuelve un token JWT junto con los datos del usuario autenticado.

- POST /auth/register: Registra un nuevo usuario. Solo accesible por un usuario con rol ADMIN.

*Productos:*

- POST /products: Crea un nuevo producto. Solo accesible por ADMIN.

- PUT /products/:id: Actualiza los datos de un producto existente. Solo accesible por ADMIN.

- DELETE /products/:id: Elimina lógicamente un producto (lo marca como inactivo). Solo accesible por ADMIN.

*Órdenes:*  

- GET /orders: Obtiene la lista de órdenes.

  - WAITER: solo ve sus propias órdenes.

  - ADMIN: ve todas las órdenes.

- POST /orders: Crea una nueva orden con los productos y cantidades seleccionadas.


*Analíticas:*

- GET /analytics/quantity-by-month Devuelve la cantidad total de órdenes atendidas por cada trabajador durante el último mes.

- GET /analytics/revenue-by-month: Devuelve el total de dinero generado por cada trabajador durante el último mes.

- GET /analytics/top-products: Retorna una lista de los 5 productos más vendidos durante el último mes.

- GET /analytics/quantity-by-day: Retorna una gráfica lineal con la cantidad de órdenes atendidas por cada trabajador por día en el último mes.

- GET /analytics/last-orders: Muestra las últimas 5 órdenes realizadas, junto con el nombre del trabajador que las registró.




