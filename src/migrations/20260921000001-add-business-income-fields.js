'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('leads', 'annualIncome', { type: Sequelize.DECIMAL(15, 2) });
    await queryInterface.addColumn('leads', 'hasGst', { type: Sequelize.STRING(3) });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('leads', 'hasGst');
    await queryInterface.removeColumn('leads', 'annualIncome');
  }
};