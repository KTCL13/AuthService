// src/routes/authRouter.js
import { Router } from 'express';
import { loginValidator, sessionStatusValidator } from '../utils/authValidator.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { login, verifySessionStatus } from '../controllers/authController.js';

const router = Router();

router.post('/login', loginValidator, validateRequest, login);

router.post('/session-status', sessionStatusValidator, validateRequest, verifySessionStatus);

export default router;
