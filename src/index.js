import 'dotenv/config';
import express, { json } from 'express';
import { errorHandler } from './middlewares/errorHandler.js';
import authRouter from './routes/authRouter.js';

// 👇 Import Swagger
import { swaggerUiServe, swaggerUiSetup } from './config/swagger.js';

const app = express();
const PORT = process.env.PORT || 3000;
const HTTP_OK = 200;

app.use(json());

// 👇 Rutas de documentación Swagger
app.use('/api/docs', swaggerUiServe, swaggerUiSetup);

// Rutas principales
app.use('/api/auth', authRouter);

// Ruta de prueba principal
app.get('/', (req, res) => {
  res.status(HTTP_OK).json({ message: 'API de autenticación funcionando correctamente.' });
});

// Middleware de manejo de errores
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación Swagger en http://localhost:${PORT}/api/docs`);
});
