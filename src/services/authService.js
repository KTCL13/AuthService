import { findByEmail } from '../repositories/userRepository.js';

export const login = async (email, password) => {
  const user = await findByEmail(email);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const isPasswordCorrect = password === user.password;

  if (!isPasswordCorrect) {
    throw new Error('Credenciales incorrectas');
  }

  return user;
};
