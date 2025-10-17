// src/routes/authRouter.js
import { Router } from 'express';
import { loginValidator } from '../utils/authValidator.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { login } from '../controllers/authController.js';

const router = Router();

router.post('/login', loginValidator, validateRequest, login);

export default router;
