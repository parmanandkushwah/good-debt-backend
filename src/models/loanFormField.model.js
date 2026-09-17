'use strict';

module.exports = (sequelize, DataTypes) => {
  const LoanFormField = sequelize.define('LoanFormField', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    loanProductId: { type: DataTypes.UUID, allowNull: false, references: { model: 'loan_products', key: 'id' } },
    label: { type: DataTypes.STRING(100), allowNull: false },
    name: { type: DataTypes.STRING(100), allowNull: false },
    type: { type: DataTypes.ENUM('text','number','currency','select','radio','checkbox','date','textarea'), defaultValue: 'text' },
    isRequired: { type: DataTypes.BOOLEAN, defaultValue: false },
    placeholder: { type: DataTypes.STRING(150) },
    options: { type: DataTypes.JSONB, defaultValue: [] },
    displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    validation: { type: DataTypes.JSONB, defaultValue: {} }
  }, { tableName: 'loan_form_fields', timestamps: true });

  LoanFormField.associate = (db) => {
    LoanFormField.belongsTo(db.LoanProduct, { foreignKey: 'loanProductId', as: 'loanProduct' });
  };

  return LoanFormField;
};
