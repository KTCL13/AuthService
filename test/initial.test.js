import request from 'supertest';
import express, { json } from 'express';
import { errorHandler } from '../src/middlewares/errorHandler.js';
import authRouter from '../src/routes/authRouter.js';
import { STATUS_CODES } from '../src/utils/httpStatusCodes.js';

const app = express();
app.use(json());
app.use(errorHandler);
app.use('/api/auth', authRouter);
app.get('/', (req, res) => {
  res.status(STATUS_CODES.OK).json({ message: 'API de autenticación funcionando correctamente.' });
});

describe('App - Rutas principales', () => {
  test('GET / debe responder correctamente', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(STATUS_CODES.OK);
    expect(response.body.message).toBe('API de autenticación funcionando correctamente.');
  });

  test('Rutas desconocidas deben devolver error 404', async () => {
    const response = await request(app).get('/ruta/inexistente');
    expect(response.status).toBe(STATUS_CODES.NOT_FOUND);
  });
});
