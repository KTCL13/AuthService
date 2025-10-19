import db from '../models/index.js';

export const findByEmail = async (email) => {
  return await db.User.findOne({ where: { email } });
};

export const changeUserSesionState = async (userId, isActive) => {
  return await db.User.update({ is_active_session: isActive }, { where: { id: userId } });
};
