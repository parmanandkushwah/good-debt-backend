'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('lead_notes', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      leadId: { type: Sequelize.UUID, allowNull: false, references: { model: 'leads', key: 'id' }, onDelete: 'CASCADE' },
      note: { type: Sequelize.TEXT, allowNull: false },
      createdBy: { type: Sequelize.UUID, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
      isInternal: { type: Sequelize.BOOLEAN, defaultValue: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
    await queryInterface.createTable('follow_ups', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      leadId: { type: Sequelize.UUID, allowNull: false, references: { model: 'leads', key: 'id' }, onDelete: 'CASCADE' },
      scheduledAt: { type: Sequelize.DATE, allowNull: false },
      notes: { type: Sequelize.TEXT },
      assignedTo: { type: Sequelize.UUID, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
      isCompleted: { type: Sequelize.BOOLEAN, defaultValue: false },
      completedAt: { type: Sequelize.DATE },
      outcome: { type: Sequelize.STRING(255) },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
    await queryInterface.createTable('lead_status_history', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      leadId: { type: Sequelize.UUID, allowNull: false, references: { model: 'leads', key: 'id' }, onDelete: 'CASCADE' },
      fromStatus: { type: Sequelize.ENUM('NEW','CONTACTED','QUALIFIED','DOCUMENTS_PENDING','APPLICATION_STARTED','SUBMITTED_TO_LENDER','UNDER_REVIEW','APPROVED','REJECTED','DISBURSED','CLOSED','NOT_INTERESTED') },
      toStatus: { type: Sequelize.ENUM('NEW','CONTACTED','QUALIFIED','DOCUMENTS_PENDING','APPLICATION_STARTED','SUBMITTED_TO_LENDER','UNDER_REVIEW','APPROVED','REJECTED','DISBURSED','CLOSED','NOT_INTERESTED'), allowNull: false },
      changedBy: { type: Sequelize.UUID, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
      note: { type: Sequelize.TEXT },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
    await queryInterface.createTable('lead_assignments', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      leadId: { type: Sequelize.UUID, allowNull: false, references: { model: 'leads', key: 'id' }, onDelete: 'CASCADE' },
      assignedTo: { type: Sequelize.UUID, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
      assignedBy: { type: Sequelize.UUID, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
      note: { type: Sequelize.TEXT },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('lead_assignments');
    await queryInterface.dropTable('lead_status_history');
    await queryInterface.dropTable('follow_ups');
    await queryInterface.dropTable('lead_notes');
  }
};
