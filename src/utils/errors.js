// src/utils/errors.js
import { STATUS_CODES } from './httpStatusCodes.js';

export class AppError extends Error {
  constructor(message, statusCode, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Solicitud inválida') {
    super(message, STATUS_CODES.BAD_REQUEST);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'No autorizado') {
    super(message, STATUS_CODES.UNAUTHORIZED);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Acceso prohibido') {
    super(message, STATUS_CODES.FORBIDDEN);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Recurso no encontrado') {
    super(message, STATUS_CODES.NOT_FOUND);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Conflicto de datos') {
    super(message, STATUS_CODES.CONFLICT);
  }
}

export class InternalServerError extends AppError {
  constructor(message = 'Error interno del servidor') {
    super(message, STATUS_CODES.INTERNAL_SERVER_ERROR, false);
  }
}
