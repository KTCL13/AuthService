import 'dotenv/config';

export const development = {
  use_env_variable: 'DATABASE_URL',
  dialect: 'postgres',
};
export const test = {
  use_env_variable: 'DATABASE_URL',
  dialect: 'postgres',
};
export const production = {
  use_env_variable: 'DATABASE_URL',
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

export default { development, test, production };
