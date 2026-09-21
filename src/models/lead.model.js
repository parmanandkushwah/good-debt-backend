'use strict';
const { LEAD_STATUS, LOAN_TYPES, LEAD_PRIORITY, LEAD_SOURCE } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  const Lead = sequelize.define('Lead', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    leadNumber: { type: DataTypes.STRING(20), unique: true },
    loanType: { type: DataTypes.ENUM(...Object.values(LOAN_TYPES)), allowNull: false },
    loanAmount: { type: DataTypes.DECIMAL(15, 2) },
    employmentType: { type: DataTypes.STRING(50) },
    monthlyIncome: { type: DataTypes.DECIMAL(15, 2) },
    annualIncome: { type: DataTypes.DECIMAL(15, 2) },
    hasGst: { type: DataTypes.STRING(3) },
    existingEmi: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0 },
    cibilScore: { type: DataTypes.STRING(20) },
    city: { type: DataTypes.STRING(100) },
    state: { type: DataTypes.STRING(100) },
    pincode: { type: DataTypes.STRING(6) },
    fullName: { type: DataTypes.STRING(100), allowNull: false },
    mobile: { type: DataTypes.STRING(15), allowNull: false },
    email: { type: DataTypes.STRING(150) },
    source: { type: DataTypes.ENUM(...Object.values(LEAD_SOURCE)), defaultValue: LEAD_SOURCE.DIRECT },
    campaign: { type: DataTypes.STRING(100) },
    utmSource: { type: DataTypes.STRING(100) },
    utmMedium: { type: DataTypes.STRING(100) },
    utmCampaign: { type: DataTypes.STRING(100) },
    utmTerm: { type: DataTypes.STRING(100) },
    utmContent: { type: DataTypes.STRING(100) },
    referrer: { type: DataTypes.TEXT },
    landingPage: { type: DataTypes.TEXT },
    status: { type: DataTypes.ENUM(...Object.values(LEAD_STATUS)), defaultValue: LEAD_STATUS.NEW },
    priority: { type: DataTypes.ENUM(...Object.values(LEAD_PRIORITY)), defaultValue: LEAD_PRIORITY.MEDIUM },
    assignedTo: { type: DataTypes.UUID, references: { model: 'users', key: 'id' } },
    lastContactedAt: { type: DataTypes.DATE },
    nextFollowUpAt: { type: DataTypes.DATE },
    additionalData: { type: DataTypes.JSONB, defaultValue: {} },
    isDuplicate: { type: DataTypes.BOOLEAN, defaultValue: false },
    parentLeadId: { type: DataTypes.UUID }
  }, {
    tableName: 'leads',
    timestamps: true,
    indexes: [
      { fields: ['mobile'] },
      { fields: ['email'] },
      { fields: ['leadNumber'], unique: true },
      { fields: ['status'] },
      { fields: ['loanType'] },
      { fields: ['createdAt'] },
      { fields: ['assignedTo'] },
      { fields: ['source'] },
      { fields: ['campaign'] },
      { fields: ['nextFollowUpAt'] }
    ]
  });

  Lead.associate = (db) => {
    Lead.belongsTo(db.User, { foreignKey: 'assignedTo', as: 'assignedEmployee' });
    Lead.hasMany(db.LeadNote, { foreignKey: 'leadId', as: 'notes' });
    Lead.hasMany(db.FollowUp, { foreignKey: 'leadId', as: 'followUps' });
    Lead.hasMany(db.LeadStatusHistory, { foreignKey: 'leadId', as: 'statusHistory' });
    Lead.hasMany(db.LeadAssignment, { foreignKey: 'leadId', as: 'assignments' });
  };

  return Lead;
};
