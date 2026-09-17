'use strict';
const { LOAN_TYPES } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  const LoanProduct = sequelize.define('LoanProduct', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    slug: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    loanType: { type: DataTypes.ENUM(...Object.values(LOAN_TYPES)), allowNull: false },
    description: { type: DataTypes.TEXT },
    shortDescription: { type: DataTypes.STRING(255) },
    icon: { type: DataTypes.STRING(50) },
    minAmount: { type: DataTypes.DECIMAL(15, 2) },
    maxAmount: { type: DataTypes.DECIMAL(15, 2) },
    interestRateText: { type: DataTypes.STRING(100) },
    tenureText: { type: DataTypes.STRING(100) },
    benefits: { type: DataTypes.JSONB, defaultValue: [] },
    eligibility: { type: DataTypes.JSONB, defaultValue: [] },
    documents: { type: DataTypes.JSONB, defaultValue: [] },
    faqs: { type: DataTypes.JSONB, defaultValue: [] },
    metaTitle: { type: DataTypes.STRING(160) },
    metaDescription: { type: DataTypes.STRING(320) },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, {
    tableName: 'loan_products',
    timestamps: true
  });

  LoanProduct.associate = (db) => {
    LoanProduct.hasMany(db.LoanFormField, { foreignKey: 'loanProductId', as: 'formFields' });
  };

  return LoanProduct;
};
