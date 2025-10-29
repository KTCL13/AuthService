// src/config/swagger.js
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AuthService API',
      version: '1.0.0',
      description: 'Documentación del microservicio de autenticación',
      contact: {
        name: 'QuejasEntidadesBOy',
        email: 'quejas@admin.com',
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], // Swagger leerá las anotaciones en tus rutas
};

export const swaggerSpecs = swaggerJsDoc(options);
export const swaggerUiServe = swaggerUi.serve;
export const swaggerUiSetup = swaggerUi.setup(swaggerSpecs);
