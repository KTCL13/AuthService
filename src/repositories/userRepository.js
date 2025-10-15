import db from '../models/index.js';

export const findByEmail = async (email) => {
  return await db.User.findOne({ where: { email } });
};
