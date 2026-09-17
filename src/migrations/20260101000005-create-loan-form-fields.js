'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('loan_form_fields', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      loanProductId: { type: Sequelize.UUID, allowNull: false, references: { model: 'loan_products', key: 'id' }, onDelete: 'CASCADE' },
      label: { type: Sequelize.STRING(100), allowNull: false },
      name: { type: Sequelize.STRING(100), allowNull: false },
      type: { type: Sequelize.ENUM('text','number','currency','select','radio','checkbox','date','textarea'), defaultValue: 'text' },
      isRequired: { type: Sequelize.BOOLEAN, defaultValue: false },
      placeholder: { type: Sequelize.STRING(150) },
      options: { type: Sequelize.JSONB, defaultValue: [] },
      displayOrder: { type: Sequelize.INTEGER, defaultValue: 0 },
      isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
      validation: { type: Sequelize.JSONB, defaultValue: {} },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('loan_form_fields');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_loan_form_fields_type";');
  }
};
