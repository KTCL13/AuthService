// src/middlewares/errorHandler.js
import { AppError } from '../utils/errors.js';
import { STATUS_CODES } from '../utils/httpStatusCodes.js';

export const errorHandler = (err, _req, res, _next) => {
  console.error(`[ERROR] ${err.name}: ${err.message}`);

  if (err instanceof AppError && err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: 'Error interno del servidor',
  });
};
