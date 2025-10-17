// src/controllers/authController.js
import { login as _login } from '../services/authService.js';
import { STATUS_CODES } from '../utils/httpStatusCodes.js';

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await _login(email, password);
    res.status(STATUS_CODES.OK).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
