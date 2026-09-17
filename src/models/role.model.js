'use strict';
const { USER_ROLES } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.ENUM(...Object.values(USER_ROLES)), allowNull: false, unique: true },
    permissions: { type: DataTypes.JSONB, defaultValue: {} },
    description: { type: DataTypes.STRING(255) }
  }, { tableName: 'roles', timestamps: true });

  return Role;
};
