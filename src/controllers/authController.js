// src/controllers/authController.js
import { login as _login, validateSessionState, logout } from '../services/authService.js';
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

export const verifySessionStatus = async (req, res, next) => {
  const { email } = req.body;
  try {
    const sessionActive = await validateSessionState(email);
    res.status(STATUS_CODES.OK).json({ success: true, sessionActive });
  } catch (error) {
    next(error);
  }
};

export const logoutController = async (req, res, next) => {
  const { email } = req.body;
  try {
    await logout(email);
    res.status(STATUS_CODES.OK).json({ success: true });
  } catch (error) {
    next(error);
  }
};
