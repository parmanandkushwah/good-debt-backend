'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('leads', 'pincode', { type: Sequelize.STRING(6) });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('leads', 'pincode');
  }
};