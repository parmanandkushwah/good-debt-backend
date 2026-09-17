'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('loan_products', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      name: { type: Sequelize.STRING(100), allowNull: false },
      slug: { type: Sequelize.STRING(100), allowNull: false, unique: true },
      loanType: { type: Sequelize.ENUM('personal-loan','business-loan','home-loan','loan-against-property','car-loan','education-loan','gold-loan','debt-consolidation','other'), allowNull: false },
      description: { type: Sequelize.TEXT },
      shortDescription: { type: Sequelize.STRING(255) },
      icon: { type: Sequelize.STRING(50) },
      minAmount: { type: Sequelize.DECIMAL(15,2) },
      maxAmount: { type: Sequelize.DECIMAL(15,2) },
      interestRateText: { type: Sequelize.STRING(100) },
      tenureText: { type: Sequelize.STRING(100) },
      benefits: { type: Sequelize.JSONB, defaultValue: [] },
      eligibility: { type: Sequelize.JSONB, defaultValue: [] },
      documents: { type: Sequelize.JSONB, defaultValue: [] },
      faqs: { type: Sequelize.JSONB, defaultValue: [] },
      metaTitle: { type: Sequelize.STRING(160) },
      metaDescription: { type: Sequelize.STRING(320) },
      isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
      displayOrder: { type: Sequelize.INTEGER, defaultValue: 0 },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('loan_products');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_loan_products_loanType";');
  }
};
