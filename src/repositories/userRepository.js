import db from '../models/index.js';

export const findByEmail = async (email) => {
  return await db.User.findOne({ where: { email } });
};

export const changeUserSesionState = async (userId, isActive) => {
  return await db.User.update({ is_active_session: isActive }, { where: { id: userId } });
};

export const checkUserSessionState = async (userId) => {
  const user = await db.User.findByPk(userId);
  return user ? user.is_active_session : null;
};

export const createUser = async (email, password) => {
  return await db.User.create({ email, password });
};
