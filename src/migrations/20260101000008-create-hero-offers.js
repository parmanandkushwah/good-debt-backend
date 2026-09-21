'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('hero_offers', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      title: { type: Sequelize.STRING(150), allowNull: false },
      imageUrl: { type: Sequelize.STRING(500), allowNull: false },
      published: { type: Sequelize.BOOLEAN, defaultValue: true },
      displayOrder: { type: Sequelize.INTEGER, defaultValue: 0 },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.addIndex('hero_offers', ['published', 'displayOrder']);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('hero_offers');
  },
};
