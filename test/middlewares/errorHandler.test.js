import { errorHandler } from '../../src/middlewares/errorHandler.js';
import { AppError } from '../../src/utils/errors.js';
import { STATUS_CODES } from '../../src/utils/httpStatusCodes.js';
import { jest } from '@jest/globals';

describe('errorHandler middleware', () => {
  let res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('debe manejar un AppError operacional correctamente', () => {
    const err = new AppError('Recurso no encontrado', STATUS_CODES.NOT_FOUND, true);

    errorHandler(err, {}, res, {});

    expect(console.error).toHaveBeenCalledWith('[ERROR] Error: Recurso no encontrado');
    expect(res.status).toHaveBeenCalledWith(STATUS_CODES.NOT_FOUND);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Recurso no encontrado',
    });
  });

  test('debe manejar un error no operacional como error interno del servidor', () => {
    const err = new Error('Algo salió mal');

    errorHandler(err, {}, res, {});

    expect(console.error).toHaveBeenCalledWith('[ERROR] Error: Algo salió mal');
    expect(res.status).toHaveBeenCalledWith(STATUS_CODES.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Error interno del servidor',
    });
  });

  test('debe manejar un AppError no operacional como error interno del servidor', () => {
    const err = new AppError('Fallo crítico', STATUS_CODES.BAD_REQUEST, false);

    errorHandler(err, {}, res, {});

    expect(console.error).toHaveBeenCalledWith('[ERROR] Error: Fallo crítico');
    expect(res.status).toHaveBeenCalledWith(STATUS_CODES.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Error interno del servidor',
    });
  });
});
