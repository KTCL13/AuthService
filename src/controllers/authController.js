// src/controllers/authController.js
import { login as _login } from '../services/authService';
import { STATUS_CODES } from '../utils/httpStatusCodes.js';

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await _login(email, password);
    return res.status(STATUS_CODES.OK).json({ user });
  } catch (error) {
    if (error.message === 'Usuario no encontrado') {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: 'Usuario no encontrado' });
    } else if (error.message === 'Credenciales incorrectas') {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: 'La contraseña es incorrecta' });
    }
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error interno del servidor' });
  }
};

export default {
  login,
};
