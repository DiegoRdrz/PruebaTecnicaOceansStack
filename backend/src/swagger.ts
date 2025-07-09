import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'OceansStaack Challenge API',
    version: '1.0.0',
    description: 'Documentación de la API para gestión de productos y órdenes',
  },
  servers: [
    {
      url: 'http://localhost:3001/api',
      description: 'Servidor local',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts'], // Aquí lee todos los archivos de rutas para documentar
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
