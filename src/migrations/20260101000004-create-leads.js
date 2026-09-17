'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('leads', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      leadNumber: { type: Sequelize.STRING(20), unique: true },
      loanType: { type: Sequelize.ENUM('personal-loan','business-loan','home-loan','loan-against-property','car-loan','education-loan','gold-loan','debt-consolidation','other'), allowNull: false },
      loanAmount: { type: Sequelize.DECIMAL(15,2) },
      employmentType: { type: Sequelize.STRING(50) },
      monthlyIncome: { type: Sequelize.DECIMAL(15,2) },
      existingEmi: { type: Sequelize.DECIMAL(15,2), defaultValue: 0 },
      cibilScore: { type: Sequelize.STRING(20) },
      city: { type: Sequelize.STRING(100) },
      state: { type: Sequelize.STRING(100) },
      fullName: { type: Sequelize.STRING(100), allowNull: false },
      mobile: { type: Sequelize.STRING(15), allowNull: false },
      email: { type: Sequelize.STRING(150) },
      source: { type: Sequelize.ENUM('google_ads','facebook','instagram','organic','direct','referral','whatsapp','other'), defaultValue: 'direct' },
      campaign: { type: Sequelize.STRING(100) },
      utmSource: { type: Sequelize.STRING(100) },
      utmMedium: { type: Sequelize.STRING(100) },
      utmCampaign: { type: Sequelize.STRING(100) },
      utmTerm: { type: Sequelize.STRING(100) },
      utmContent: { type: Sequelize.STRING(100) },
      referrer: { type: Sequelize.TEXT },
      landingPage: { type: Sequelize.TEXT },
      status: { type: Sequelize.ENUM('NEW','CONTACTED','QUALIFIED','DOCUMENTS_PENDING','APPLICATION_STARTED','SUBMITTED_TO_LENDER','UNDER_REVIEW','APPROVED','REJECTED','DISBURSED','CLOSED','NOT_INTERESTED'), defaultValue: 'NEW' },
      priority: { type: Sequelize.ENUM('LOW','MEDIUM','HIGH','URGENT'), defaultValue: 'MEDIUM' },
      assignedTo: { type: Sequelize.UUID, references: { model: 'users', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'SET NULL' },
      lastContactedAt: { type: Sequelize.DATE },
      nextFollowUpAt: { type: Sequelize.DATE },
      additionalData: { type: Sequelize.JSONB, defaultValue: {} },
      isDuplicate: { type: Sequelize.BOOLEAN, defaultValue: false },
      parentLeadId: { type: Sequelize.UUID },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
    await queryInterface.addIndex('leads', ['mobile']);
    await queryInterface.addIndex('leads', ['email']);
    await queryInterface.addIndex('leads', ['leadNumber'], { unique: true });
    await queryInterface.addIndex('leads', ['status']);
    await queryInterface.addIndex('leads', ['loanType']);
    await queryInterface.addIndex('leads', ['createdAt']);
    await queryInterface.addIndex('leads', ['assignedTo']);
    await queryInterface.addIndex('leads', ['source']);
    await queryInterface.addIndex('leads', ['nextFollowUpAt']);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('leads');
    await queryInterface.sequelize.query(`
      DROP TYPE IF EXISTS "enum_leads_loanType";
      DROP TYPE IF EXISTS "enum_leads_source";
      DROP TYPE IF EXISTS "enum_leads_status";
      DROP TYPE IF EXISTS "enum_leads_priority";
    `);
  }
};
