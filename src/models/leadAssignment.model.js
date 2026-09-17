'use strict';

module.exports = (sequelize, DataTypes) => {
  const LeadAssignment = sequelize.define('LeadAssignment', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    leadId: { type: DataTypes.UUID, allowNull: false, references: { model: 'leads', key: 'id' } },
    assignedTo: { type: DataTypes.UUID, references: { model: 'users', key: 'id' } },
    assignedBy: { type: DataTypes.UUID, references: { model: 'users', key: 'id' } },
    note: { type: DataTypes.TEXT }
  }, { tableName: 'lead_assignments', timestamps: true });

  LeadAssignment.associate = (db) => {
    LeadAssignment.belongsTo(db.Lead, { foreignKey: 'leadId', as: 'lead' });
    LeadAssignment.belongsTo(db.User, { foreignKey: 'assignedTo', as: 'assignee' });
    LeadAssignment.belongsTo(db.User, { foreignKey: 'assignedBy', as: 'assigner' });
  };

  return LeadAssignment;
};
