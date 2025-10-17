import 'dotenv/config';
import express, { json } from 'express';
import { errorHandler } from './middlewares/errorHandler.js';
import authRouter from './routes/authRouter.js';

const app = express();
const PORT = process.env.PORT;
const HTTP_OK = 200;

app.use(json());
app.use(errorHandler);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.status(HTTP_OK).json({ message: 'API de autenticación funcionando correctamente.' });
});

app.listen(PORT, () => {});
