import { jest, test, describe, beforeEach, expect } from '@jest/globals';

jest.unstable_mockModule('../../src/services/authService.js', () => ({
  login: jest.fn(),
}));

const authService = await import('../../src/services/authService.js');
const authController = await import('../../src/controllers/authController.js');
const { STATUS_CODES } = await import('../../src/utils/httpStatusCodes.js');
const { NotFoundError, UnauthorizedError } = await import('../../src/utils/errors.js');

describe('AuthController - login', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { body: { email: 'test@example.com', password: '123456' } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  test('debe responder con 200 y el usuario cuando el login es exitoso', async () => {
    const mockUser = { id: 1, name: 'Test User' };
    authService.login.mockResolvedValue(mockUser);

    await authController.login(req, res, next);

    expect(authService.login).toHaveBeenCalledWith('test@example.com', '123456');
    expect(res.status).toHaveBeenCalledWith(STATUS_CODES.OK);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: mockUser });
    expect(next).not.toHaveBeenCalled();
  });

  test('debe llamar a next con NotFoundError si el usuario no es encontrado', async () => {
    const error = new NotFoundError('Usuario no encontrado');
    authService.login.mockRejectedValue(error);

    await authController.login(req, res, next);

    expect(authService.login).toHaveBeenCalledWith('test@example.com', '123456');
    expect(next).toHaveBeenCalledWith(error);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  test('debe llamar a next con UnauthorizedError si la contraseña es incorrecta', async () => {
    const error = new UnauthorizedError('Credenciales incorrectas');
    authService.login.mockRejectedValue(error);

    await authController.login(req, res, next);

    expect(authService.login).toHaveBeenCalledWith('test@example.com', '123456');
    expect(next).toHaveBeenCalledWith(error);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  test('debe llamar a next con error si ocurre un error interno', async () => {
    const error = new Error('DB error');
    authService.login.mockRejectedValue(error);

    await authController.login(req, res, next);

    expect(authService.login).toHaveBeenCalledWith('test@example.com', '123456');
    expect(next).toHaveBeenCalledWith(error);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
