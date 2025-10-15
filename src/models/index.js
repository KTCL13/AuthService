'use strict';
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import process from 'process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
import configFile from '../config/config.js';
const config = configFile[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach((file) => {
    // Dynamic import for ESModules
    import(path.join(__dirname, file)).then((module) => {
      const model = module.default(sequelize, Sequelize.DataTypes);
      db[model.name] = model;

      // After all models are loaded, associate them
      if (
        Object.keys(db).length ===
        fs
          .readdirSync(__dirname)
          .filter(
            (f) =>
              f.indexOf('.') !== 0 &&
              f !== basename &&
              f.slice(-3) === '.js' &&
              f.indexOf('.test.js') === -1
          ).length
      ) {
        Object.keys(db).forEach((modelName) => {
          if (db[modelName].associate) {
            db[modelName].associate(db);
          }
        });
      }
    });
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
