'use strict';

module.exports = (sequelize, DataTypes) => {
  const LeadNote = sequelize.define('LeadNote', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    leadId: { type: DataTypes.UUID, allowNull: false, references: { model: 'leads', key: 'id' } },
    note: { type: DataTypes.TEXT, allowNull: false },
    createdBy: { type: DataTypes.UUID, references: { model: 'users', key: 'id' } },
    isInternal: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, { tableName: 'lead_notes', timestamps: true });

  LeadNote.associate = (db) => {
    LeadNote.belongsTo(db.Lead, { foreignKey: 'leadId', as: 'lead' });
    LeadNote.belongsTo(db.User, { foreignKey: 'createdBy', as: 'author' });
  };

  return LeadNote;
};
