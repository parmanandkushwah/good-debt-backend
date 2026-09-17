'use strict';
const { LEAD_STATUS } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  const LeadStatusHistory = sequelize.define('LeadStatusHistory', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    leadId: { type: DataTypes.UUID, allowNull: false, references: { model: 'leads', key: 'id' } },
    fromStatus: { type: DataTypes.ENUM(...Object.values(LEAD_STATUS)) },
    toStatus: { type: DataTypes.ENUM(...Object.values(LEAD_STATUS)), allowNull: false },
    changedBy: { type: DataTypes.UUID, references: { model: 'users', key: 'id' } },
    note: { type: DataTypes.TEXT }
  }, { tableName: 'lead_status_history', timestamps: true });

  LeadStatusHistory.associate = (db) => {
    LeadStatusHistory.belongsTo(db.Lead, { foreignKey: 'leadId', as: 'lead' });
    LeadStatusHistory.belongsTo(db.User, { foreignKey: 'changedBy', as: 'changedByUser' });
  };

  return LeadStatusHistory;
};
