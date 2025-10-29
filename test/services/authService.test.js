import { jest } from '@jest/globals';

const mockFindByEmail = jest.fn();
const mockChangeUserSesionState = jest.fn();
const mockComparePasswords = jest.fn();
const mockCheckUserSessionState = jest.fn();
const mockCreateUser = jest.fn();

class NotFoundError extends Error {}
class UnauthorizedError extends Error {}

await jest.unstable_mockModule('../../src/repositories/userRepository.js', () => ({
  findByEmail: mockFindByEmail,
  changeUserSesionState: mockChangeUserSesionState,
  checkUserSessionState: mockCheckUserSessionState,
  createUser: mockCreateUser,
}));

await jest.unstable_mockModule('../../src/utils/passwordUtils.js', () => ({
  comparePasswords: mockComparePasswords,
}));

await jest.unstable_mockModule('../../src/utils/errors.js', () => ({
  NotFoundError,
  UnauthorizedError,
}));

const { login, validateSessionState, register } = await import('../../src/services/authService.js');

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

  test('debe lanzar error si el usuario no existe', async () => {
    mockFindByEmail.mockResolvedValue(null);

    await expect(validateSessionState('notfound@example.com')).rejects.toThrow(NotFoundError);

    expect(mockFindByEmail).toHaveBeenCalledWith('notfound@example.com');
  });

  test('debe devolver el estado de sesión si el usuario existe', async () => {
    mockFindByEmail.mockResolvedValue(userMock);
    mockCheckUserSessionState.mockResolvedValue(true);

    const result = await validateSessionState('user@example.com');

    expect(mockFindByEmail).toHaveBeenCalledWith('user@example.com');
    expect(mockCheckUserSessionState).toHaveBeenCalledWith(1);
    expect(result).toBe(true);
  });
});

describe('AuthService - register', () => {
  const email = 'newuser@example.com';
  const password = 'password123';
  const newUserMock = { id: 1, email, password };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debe registrar un nuevo usuario si el email no existe', async () => {
    mockFindByEmail.mockResolvedValue(null);
    mockCreateUser.mockResolvedValue(newUserMock);

    const result = await register(email, password);

    expect(result).toEqual(newUserMock);
    expect(mockFindByEmail).toHaveBeenCalledWith(email);
    expect(mockCreateUser).toHaveBeenCalledWith(email, password);
  });

  test('debe lanzar error si el usuario ya existe', async () => {
    mockFindByEmail.mockResolvedValue(newUserMock);

    await expect(register(email, password)).rejects.toThrow('El usuario ya existe');
    expect(mockFindByEmail).toHaveBeenCalledWith(email);
    expect(mockCreateUser).not.toHaveBeenCalled();
  });
});
