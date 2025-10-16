import { jest, test } from '@jest/globals';

jest.unstable_mockModule('../../src/services/authService.js', () => ({
  login: jest.fn(),
}));

const authService = await import('../../src/services/authService.js');
const authController = (await import('../../src/controllers/authController.js')).default;
const { STATUS_CODES } = await import('../../src/utils/httpStatusCodes.js');

describe('AuthController - login', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { body: { email: 'test@example.com', password: '123456' } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  test('debe responder con 200 y el usuario cuando el login es exitoso', async () => {
    const mockUser = { id: 1, name: 'Test User' };
    authService.login.mockResolvedValue(mockUser);

    await authController.login(req, res);

    expect(authService.login).toHaveBeenCalledWith('test@example.com', '123456');
    expect(res.status).toHaveBeenCalledWith(STATUS_CODES.OK);
    expect(res.json).toHaveBeenCalledWith({ user: mockUser });
  });

  test('debe responder con 401 si el usuario no es encontrado', async () => {
    authService.login.mockRejectedValue(new Error('Usuario no encontrado'));

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(STATUS_CODES.UNAUTHORIZED);
    expect(res.json).toHaveBeenCalledWith({ message: 'Usuario no encontrado' });
  });

  test('debe responder con 401 si las contraseña son incorrectas', async () => {
    authService.login.mockRejectedValue(new Error('Credenciales incorrectas'));

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(STATUS_CODES.UNAUTHORIZED);
    expect(res.json).toHaveBeenCalledWith({ message: 'La contraseña es incorrecta' });
  });

  test('debe responder con 500 si ocurre un error interno', async () => {
    authService.login.mockRejectedValue(new Error('DB error'));

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(STATUS_CODES.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error interno del servidor' });
  });
});
