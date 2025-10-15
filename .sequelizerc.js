import { resolve } from 'path';

export default {
  config: resolve('src', 'config', 'config.js'),
  'models-path': resolve('src', 'models'),
  'migrations-path': resolve('migrations'),
  'seeders-path': resolve('seeders'),
};
