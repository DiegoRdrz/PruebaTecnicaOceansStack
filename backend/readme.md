# Backend – Oceans React Challenge

Este directorio contiene el código fuente del backend de la aplicación de gestión de órdenes de restaurante. Fue desarrollado con Node.js, Express y TypeScript, utilizando una arquitectura limpia, validaciones robustas, autenticación basada en JWT, y una documentación completa mediante Swagger.

---

## Tecnologias

- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma
- JWT
- Swagger
- Docker Compose

---

## Instalacion

Luego de clonar el repositorio, vamos a realizar la correcta instalacion del Back-End

1. Ahora navegamos a la carpeta raiz del Back-End con el siguiente comando:

cd PruebaTecnicaOceansStack/backend/

2. Instalar dependencias con el siguiente comando:

- npm install

3. Crear una base de datos en postgreSQL

4. Configurar las variables de entorno: 

Crea un archivo .env en la raíz del backend y define lo siguiente:

- PORT=4000
- DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_basedatos" Se debe cambiar Usuario - Contraseña - El Puerto - nombre_basedatos segun el caso
- JWT_SECRET="W9#l@5zB&c8X^Tk!Jr2P$eYq0VuM7hAo" (# Puedes modificar esta Clave por lo que quieras)

5. Configurar Prisma

Inicializa el cliente Prisma y genera el código necesario ejecutando los siguientes comnados:

- npx prisma generate
- npx prisma migrate dev --name init

6. Crear un usuario administrador

Para poder registrar otros usuarios y acceder a endpoints protegidos, es necesario contar con al menos un usuario con rol ADMIN. Ejecuta el siguiente script desde la raíz del backend:

- npx ts-node src/scripts/createAdmin.ts

Este script creará un usuario con credenciales predefinidas (admin@example.com / admin123, por ejemplo). Puedes editar el script para personalizar estos valores antes de ejecutarlo.

7. Iniciar el servidor con el comando:

- npm run dev

El servidor se ejecutará en http://localhost:4000.

---

# Estructura del backend
El backend sigue una arquitectura modular para facilitar el mantenimiento, la escalabilidad y la separación de responsabilidades. A continuación se describen los directorios y archivos principales:

- /controllers : Contiene la lógica de negocio de cada módulo (autenticación, productos, órdenes). Aquí se manejan las peticiones entrantes y se comunican con la base de datos mediante Prisma.

- /middlewares : Incluye funciones que se ejecutan antes de llegar a los controladores. Se encargan de validar la autenticación con JWT (authenticate) y verificar los permisos del usuario (authorize).

- /prisma : Contiene la configuración del cliente de Prisma y el archivo schema.prisma, que define el modelo de datos y permite la generación de migraciones y del cliente de base de datos.

- /routes : Define las rutas de la API y las asocia con los controladores correspondientes. Cada recurso (auth, products, orders) tiene su propio archivo de rutas ademas generamos la documentación para swagger.

- /scripts : Se pueden agregar aquí scripts auxiliares, por ejemplo en este caso hay un archivo para la creacion de un usuario admin, ya que para la creacion de mas usuarions se requiere almenos un administrador

- /types : Define tipos y estructuras personalizadas de TypeScript que se utilizan en distintas partes del proyecto para mejorar la robustez del código.

- /validators : Contiene los esquemas de validación construidos con Zod. Estos esquemas aseguran que los datos enviados por el cliente cumplan con las reglas esperadas antes de ser procesados.

- index.ts : Es el punto de entrada de la aplicación. Configura el servidor de Express, importa rutas, middlewares, carga variables de entorno y levanta el servidor en el puerto configurado.

- swagger.ts : Configura la documentación automática de la API con swagger-jsdoc y swagger-ui-express. Define los parámetros generales y carga los comentarios JSDoc para generar la interfaz Swagger.

---

## Autenticación y roles
El sistema utiliza autenticación con tokens JWT.

Después de iniciar sesión, se debe enviar el token en cada petición protegida usando el header:

- Authorization: Bearer TOKEN

*Roles disponibles:*

- ADMIN: puede registrar usuarios, gestionar productos y consultar órdenes.

- WAITER: puede crear órdenes y consultar productos.

---

## Validaciones y seguridad
- Todos los datos enviados al backend se validan usando Zod.

- Las contraseñas se almacenan de forma segura con bcrypt.

- Se implementaron middlewares de autenticación (authenticate) y autorización (authorize) para controlar el acceso a rutas protegidas.

---

# Endpoints principales
*Autenticación:*

- POST /api/auth/login: inicia sesión y devuelve un token JWT

- POST /api/auth/register: solo accesible por un usuario ADMIN

*Productos:*

- GET /api/products: lista productos activos

- POST /api/products: solo ADMIN

- PUT /api/products/:id: solo ADMIN

- DELETE /api/products/:id: solo ADMIN (desactivación lógica)

*Órdenes:*

- GET /api/orders: consulta todas las órdenes

- POST /api/orders: crea una nueva orden

*Documentación:*

- GET /api/doc:  Abre la interfaz con la documentacion creada con Swagger
