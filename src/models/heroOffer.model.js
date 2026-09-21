'use strict';

module.exports = (sequelize, DataTypes) => {
  const HeroOffer = sequelize.define('HeroOffer', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING(150), allowNull: false },
    imageUrl: { type: DataTypes.STRING(500), allowNull: false },
    published: { type: DataTypes.BOOLEAN, defaultValue: true },
    displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 },
  }, { tableName: 'hero_offers', timestamps: true });

  return HeroOffer;
};
