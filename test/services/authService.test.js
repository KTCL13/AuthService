import { jest } from '@jest/globals';

const mockFindByEmail = jest.fn();
const mockChangeUserSesionState = jest.fn();
const mockComparePasswords = jest.fn();

class NotFoundError extends Error {}
class UnauthorizedError extends Error {}

await jest.unstable_mockModule('../../src/repositories/userRepository.js', () => ({
  findByEmail: mockFindByEmail,
  changeUserSesionState: mockChangeUserSesionState,
}));

await jest.unstable_mockModule('../../src/utils/passwordUtils.js', () => ({
  comparePasswords: mockComparePasswords,
}));

await jest.unstable_mockModule('../../src/utils/errors.js', () => ({
  NotFoundError,
  UnauthorizedError,
}));

const { login } = await import('../../src/services/authService.js');

describe('AuthService - login', () => {
  const email = 'test@example.com';
  const password = '1234';
  const userMock = { id: 1, email, password: 'hashed_password' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debe lanzar NotFoundError si el usuario no existe', async () => {
    mockFindByEmail.mockResolvedValue(null);

    await expect(login(email, password)).rejects.toThrow(NotFoundError);
    expect(mockFindByEmail).toHaveBeenCalledWith(email);
  });

  test('debe lanzar UnauthorizedError si la contraseña es incorrecta', async () => {
    mockFindByEmail.mockResolvedValue(userMock);
    mockComparePasswords.mockReturnValue(false);

    await expect(login(email, password)).rejects.toThrow(UnauthorizedError);
    expect(mockComparePasswords).toHaveBeenCalledWith(password, userMock.password);
  });

  test('debe devolver el usuario y actualizar sesión si las credenciales son correctas', async () => {
    mockFindByEmail.mockResolvedValue(userMock);
    mockComparePasswords.mockReturnValue(true);
    mockChangeUserSesionState.mockResolvedValue([1]);

    const result = await login(email, password);

    expect(result).toEqual(userMock);
    expect(mockFindByEmail).toHaveBeenCalledWith(email);
    expect(mockComparePasswords).toHaveBeenCalledWith(password, userMock.password);
    expect(mockChangeUserSesionState).toHaveBeenCalledWith(userMock.id, true);
  });
});
