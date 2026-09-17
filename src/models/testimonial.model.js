'use strict';

module.exports = (sequelize, DataTypes) => {
  const Testimonial = sequelize.define('Testimonial', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    photo: { type: DataTypes.STRING(255) },
    review: { type: DataTypes.TEXT, allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue: 5, validate: { min: 1, max: 5 } },
    loanType: { type: DataTypes.STRING(50) },
    location: { type: DataTypes.STRING(100) },
    isPublished: { type: DataTypes.BOOLEAN, defaultValue: false },
    displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, { tableName: 'testimonials', timestamps: true });

  return Testimonial;
};
