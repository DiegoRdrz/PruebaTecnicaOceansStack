# PRUEBA TECNICA OCEANS STACK

Este proyecto consiste en el desarrollo de una aplicación web full stack orientada a la gestión de productos y órdenes en un restaurante. Fue implementado como parte de una prueba técnica, con el propósito de demostrar buenas prácticas de desarrollo, arquitectura escalable, autenticación basada en roles, validaciones robustas y documentación técnica integral.

---

## Estructura del Proyecto

El repositorio está organizado en dos carpetas principales:

- - backend/ # API REST construida con Node.js, TypeScript, Prisma ORM y PostgreSQL
- - frontend/ # Interfaz de usuario desarrollada en React, y tailwindCss
- - README.md # Documentación general del proyecto

Cada una de estas carpetas incluye su propia documentación específica con instrucciones detalladas para la instalación, configuración y puesta en marcha del componente correspondiente.

---

## Tecnologías Utilizadas

- **Frontend:** React, React Hook Form, Zod para validaciones, TailwindCSS para estilos.
- **Backend:** Node.js, TypeScript, Express, Prisma ORM, autenticación JWT, Bcrypt.
- **Documentación:** Swagger (swagger-jsdoc y swagger-ui-express).

---

## Instalación y Configuración

Para clonar el proyecto, utilice el siguiente comando:
git clone https://github.com/DiegoRdrz/PruebaTecnicaOceansStack

Las instrucciones completas para la instalación y configuración del backend, frontend y base de datos se encuentran detalladas en los archivos README dentro de cada carpeta correspondiente:

[Back-End](backend/)

[Front-End](frontend/)

## Documentación de la API
La API REST cuenta con documentación generada automáticamente mediante Swagger, a partir de los comentarios en el código fuente.

Esta documentación es accesible en la siguiente URL, una vez el servidor backend esté en ejecución:

http://localhost:3001/api/docs      # (Aqui cambiamos el puerto por el seleccionado al momento de la instalacion del Back-End)

Allí se pueden encontrar todos los endpoints disponibles, organizados por módulos funcionales (productos, órdenes, autenticación), con la descripción detallada de sus parámetros, respuestas esperadas, códigos HTTP y ejemplos interactivos para facilitar su consumo.

El uso de Swagger garantiza que la documentación se mantenga sincronizada con la implementación actual de la API, facilitando su mantenimiento y comprensión.

Autor

Desarrollado por Diego Rodríguez

Contacto: DiegoRdrz455@gmail.com
