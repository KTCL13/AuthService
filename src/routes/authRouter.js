// src/routes/authRouter.js
import { Router } from 'express';
import { loginValidator, sessionStatusValidator } from '../utils/authValidator.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { login, verifySessionStatus, logoutController } from '../controllers/authController.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticación y control de sesión
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Auth]
 *     description: Verifica las credenciales del usuario y devuelve un token JWT si son válidas.
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
 *                 example: oscar@example.com
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
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Datos inválidos o incompletos.
 *       401:
 *         description: Credenciales incorrectas.
 */
router.post('/login', loginValidator, validateRequest, login);

/**
 * @swagger
 * /auth/session-status:
 *   post:
 *     summary: Verificar estado de sesión
 *     tags: [Auth]
 *     description: Valida si el token JWT del usuario sigue siendo válido o ha expirado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: Sesión activa o válida.
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
 *                   example: "Sesión válida"
 *       401:
 *         description: Token inválido o expirado.
 */
router.post('/session-status', sessionStatusValidator, validateRequest, verifySessionStatus);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Cerrar sesión del usuario
 *     tags: [Auth]
 *     description: Invalida el token actual o finaliza la sesión activa del usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
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
 *                   example: "Sesión cerrada correctamente"
 *       401:
 *         description: Token inválido o sesión no encontrada.
 */
router.post('/logout', sessionStatusValidator, validateRequest, logoutController);

export default router;
