'use strict';

module.exports = (sequelize, DataTypes) => {
  const FAQ = sequelize.define('FAQ', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    question: { type: DataTypes.TEXT, allowNull: false },
    answer: { type: DataTypes.TEXT, allowNull: false },
    category: { type: DataTypes.STRING(50), defaultValue: 'general' },
    loanType: { type: DataTypes.STRING(50) },
    isPublished: { type: DataTypes.BOOLEAN, defaultValue: true },
    displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, { tableName: 'faqs', timestamps: true });

  return FAQ;
};
