// src/routes/authRouter.js
import { Router } from 'express';
import {
  loginValidator,
  sessionStatusValidator,
  registerValidator,
} from '../utils/authValidator.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import {
  login,
  verifySessionStatus,
  logoutController,
  register,
} from '../controllers/authController.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticación y control de sesión
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     description: Crea un nuevo usuario en el sistema con su correo y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: nuevo@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: nuevo@example.com
 *       400:
 *         description: Datos inválidos o usuario ya existe.
 */
router.post('/register', registerValidator, validateRequest, register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Auth]
 *     description: Verifica las credenciales del usuario y permite acceder al sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: nuevo@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Inicio de sesión exitoso"
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 2
 *                     email:
 *                       type: string
 *                       example: nuevo@example.com
 *       401:
 *         description: Credenciales incorrectas.
 *       400:
 *         description: Datos incompletos o inválidos.
 */
router.post('/login', loginValidator, validateRequest, login);

/**
 * @swagger
 * /auth/session-status:
 *   get:
 *     summary: Verificar estado de sesión
 *     tags: [Auth]
 *     description: Retorna un estado simulado de sesión activa o inactiva.
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *           example: nuevo@example.com
 *         required: true
 *         description: Correo electrónico del usuario para verificar su sesión.
 *     responses:
 *       200:
 *         description: Estado de sesión del usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Sesión activa para nuevo@example.com"
 */
router.get('/session-status', sessionStatusValidator, validateRequest, verifySessionStatus);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Cerrar sesión del usuario
 *     tags: [Auth]
 *     description: Simula el cierre de sesión del usuario usando su correo electrónico.
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *           example: nuevo@example.com
 *         required: true
 *         description: Correo electrónico del usuario que desea cerrar sesión.
 *     responses:
 *       200:
 *         description: Sesión cerrada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sesión cerrada correctamente para nuevo@example.com"
 */
router.post('/logout', sessionStatusValidator, validateRequest, logoutController);

export default router;
