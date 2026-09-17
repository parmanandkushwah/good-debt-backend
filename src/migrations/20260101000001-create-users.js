'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      name: { type: Sequelize.STRING(100), allowNull: false },
      email: { type: Sequelize.STRING(150), allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
      role: { type: Sequelize.ENUM('SUPER_ADMIN','ADMIN','SALES_MANAGER','SALES_EXECUTIVE'), defaultValue: 'SALES_EXECUTIVE' },
      phone: { type: Sequelize.STRING(15) },
      isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
      lastLoginAt: { type: Sequelize.DATE },
      passwordResetToken: { type: Sequelize.STRING },
      passwordResetExpires: { type: Sequelize.DATE },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
    await queryInterface.addIndex('users', ['email']);
    await queryInterface.addIndex('users', ['role']);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_users_role";');
  }
};
