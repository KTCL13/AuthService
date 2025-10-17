import { body } from 'express-validator';

export const loginValidator = [
  body('email').isEmail().withMessage('Por favor, ingrese un email válido'),
  body('password').notEmpty().withMessage('La contraseña es requerida'),
];
