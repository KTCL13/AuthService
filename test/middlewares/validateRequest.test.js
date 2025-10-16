import { jest } from '@jest/globals';
import { STATUS_CODES } from '../../src/utils/httpStatusCodes.js';

const mockValidationResult = jest.fn();
jest.unstable_mockModule('express-validator', () => ({
  validationResult: mockValidationResult,
}));

const { validateRequest } = await import('../../src/middlewares/validateRequest.js');

describe('validateRequest middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  test('debe devolver 400 y los errores si hay errores de validación', () => {
    const mockErrors = [
      { path: 'email', msg: 'Email inválido' },
      { path: 'password', msg: 'Contraseña requerida' },
    ];

    mockValidationResult.mockReturnValue({
      isEmpty: () => false,
      array: () => mockErrors,
    });

    validateRequest(req, res, next);

    expect(res.status).toHaveBeenCalledWith(STATUS_CODES.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      errors: [
        { field: 'email', message: 'Email inválido' },
        { field: 'password', message: 'Contraseña requerida' },
      ],
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('debe llamar a next() si no hay errores de validación', () => {
    mockValidationResult.mockReturnValue({
      isEmpty: () => true,
      array: () => [],
    });

    validateRequest(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
