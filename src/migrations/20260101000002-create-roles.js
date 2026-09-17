'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('roles', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      name: { type: Sequelize.ENUM('SUPER_ADMIN','ADMIN','SALES_MANAGER','SALES_EXECUTIVE'), allowNull: false, unique: true },
      permissions: { type: Sequelize.JSONB, defaultValue: {} },
      description: { type: Sequelize.STRING(255) },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('roles');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_roles_name";');
  }
};
