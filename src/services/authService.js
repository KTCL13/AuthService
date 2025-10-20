import { findByEmail, changeUserSesionState } from '../repositories/userRepository.js';
import { UnauthorizedError, NotFoundError } from '../utils/errors.js';
import { comparePasswords } from '../utils/passwordUtils.js';

export const login = async (email, password) => {
  const user = await findByEmail(email);
  if (!user) {
    throw new NotFoundError('Usuario no encontrado');
  }

  const isPasswordCorrect = comparePasswords(password, user.password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Credenciales incorrectas');
  }

  await updateSessionState(user.id, true);

  return user;
};

const updateSessionState = async (userId, isActive) => {
  await changeUserSesionState(userId, isActive);
};
