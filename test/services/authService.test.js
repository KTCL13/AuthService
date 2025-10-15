import { jest } from '@jest/globals';

jest.unstable_mockModule('../../src/repositories/userRepository.js', () => ({
  findByEmail: jest.fn(),
}));

const userRepository = await import('../../src/repositories/userRepository.js');
const { login } = await import('../../src/services/authService.js');

describe('AuthService - login', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('debe lanzar error si el usuario no existe', async () => {
    userRepository.findByEmail.mockResolvedValue(null);

    await expect(login('test@example.com', '1234')).rejects.toThrow('Usuario no encontrado');
  });

  test('debe lanzar error si la contraseña es incorrecta', async () => {
    userRepository.findByEmail.mockResolvedValue({
      email: 'test@example.com',
      password: '1234',
    });

    await expect(login('test@example.com', '0000')).rejects.toThrow('Credenciales incorrectas');
  });

  test('debe devolver el usuario si las credenciales son correctas', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      password: '1234',
    };

    userRepository.findByEmail.mockResolvedValue(mockUser);

    const result = await login('test@example.com', '1234');

    expect(result).toEqual(mockUser);
    expect(userRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
  });
});
