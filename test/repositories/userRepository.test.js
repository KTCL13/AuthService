import db from '../../src/models/index.js';
import { findByEmail } from '../../src/repositories/userRepository.js';

describe('UserRepository', () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  beforeEach(async () => {
    await db.User.destroy({ truncate: true });
    await db.User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      isActive: false,
    });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  it('debería devolver un usuario si se encuentra por su email', async () => {
    const foundUser = await findByEmail('test@example.com');
    expect(foundUser).not.toBeNull();
    expect(foundUser.email).toBe('test@example.com');
  });

  it('debería devolver null si el email no existe', async () => {
    const foundUser = await findByEmail('notfound@example.com');
    expect(foundUser).toBeNull();
  });

  it('debería actualizar el estado de sesión del usuario', async () => {
    const user = await findByEmail('test@example.com');
    expect(user.is_active_session).toBe(false);

    await db.User.update({ is_active_session: true }, { where: { id: user.id } });
    const updatedUser = await findByEmail('test@example.com');
    expect(updatedUser.is_active_session).toBe(true);
  });
});
