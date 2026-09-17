'use strict';

module.exports = (sequelize, DataTypes) => {
  const Setting = sequelize.define('Setting', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    key: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    value: { type: DataTypes.TEXT },
    type: { type: DataTypes.STRING(20), defaultValue: 'string' },
    group: { type: DataTypes.STRING(50), defaultValue: 'general' },
    label: { type: DataTypes.STRING(100) }
  }, { tableName: 'settings', timestamps: true });

  return Setting;
};
