// Declaración de módulo para swagger-jsdoc.
// Esto permite importar swaggerJSDoc sin errores de tipado cuando no hay tipos disponibles en DefinitelyTyped.

declare module 'swagger-jsdoc' {
  const swaggerJSDoc: any;
  export default swaggerJSDoc;
}