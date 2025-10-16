// src/middlewares/validateRequest.js
import { validationResult } from 'express-validator';
import { STATUS_CODES } from '../utils/httpStatusCodes';

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};
