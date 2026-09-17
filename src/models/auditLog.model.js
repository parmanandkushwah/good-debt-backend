'use strict';
const { AUDIT_ACTIONS } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  const AuditLog = sequelize.define('AuditLog', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, references: { model: 'users', key: 'id' } },
    action: { type: DataTypes.ENUM(...Object.values(AUDIT_ACTIONS)), allowNull: false },
    entityType: { type: DataTypes.STRING(50) },
    entityId: { type: DataTypes.UUID },
    oldValues: { type: DataTypes.JSONB },
    newValues: { type: DataTypes.JSONB },
    ipAddress: { type: DataTypes.STRING(45) },
    userAgent: { type: DataTypes.TEXT }
  }, { tableName: 'audit_logs', timestamps: true, updatedAt: false });

  AuditLog.associate = (db) => {
    AuditLog.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });
  };

  return AuditLog;
};
