import db from '../../src/models/index.js';
const { sequelize } = db;

describe('Inicialización de Modelos (models/index.js)', () => {
  afterAll(async () => {
    await sequelize.close();
  });

  it('debería conectarse exitosamente a la base de datos de prueba', async () => {
    await expect(sequelize.authenticate()).resolves.toBeUndefined();
  });

  it('debería cargar el modelo User correctamente', () => {
    expect(db).toHaveProperty('User');
    expect(typeof db.User).toBe('function');
    expect(db.User.name).toBe('User');
  });
});
