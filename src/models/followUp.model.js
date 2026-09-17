'use strict';

module.exports = (sequelize, DataTypes) => {
  const FollowUp = sequelize.define('FollowUp', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    leadId: { type: DataTypes.UUID, allowNull: false, references: { model: 'leads', key: 'id' } },
    scheduledAt: { type: DataTypes.DATE, allowNull: false },
    notes: { type: DataTypes.TEXT },
    assignedTo: { type: DataTypes.UUID, references: { model: 'users', key: 'id' } },
    isCompleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    completedAt: { type: DataTypes.DATE },
    outcome: { type: DataTypes.STRING(255) }
  }, {
    tableName: 'follow_ups',
    timestamps: true,
    indexes: [{ fields: ['scheduledAt'] }, { fields: ['isCompleted'] }, { fields: ['assignedTo'] }]
  });

  FollowUp.associate = (db) => {
    FollowUp.belongsTo(db.Lead, { foreignKey: 'leadId', as: 'lead' });
    FollowUp.belongsTo(db.User, { foreignKey: 'assignedTo', as: 'assignee' });
  };

  return FollowUp;
};
