import {
  findByEmail,
  changeUserSesionState,
  checkUserSessionState,
  createUser,
} from '../repositories/userRepository.js';
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

export const validateSessionState = async (userEmail) => {
  const userId = await getUserIdByEmail(userEmail);
  const isActive = await checkUserSessionState(userId);
  return isActive;
};

const getUserIdByEmail = async (email) => {
  const user = await findByEmail(email);
  if (!user) {
    throw new NotFoundError('Usuario no encontrado');
  }
  return user.id;
};

export const logout = async (email) => {
  const userId = await getUserIdByEmail(email);
  await updateSessionState(userId, false);
};

export const register = async (email, password) => {
  const existingUser = await findByEmail(email);
  if (existingUser) {
    throw new Error('El usuario ya existe');
  }

  const newUser = await createUser(email, password);
  return newUser;
};
