'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('testimonials', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      name: { type: Sequelize.STRING(100), allowNull: false },
      photo: { type: Sequelize.STRING(255) },
      review: { type: Sequelize.TEXT, allowNull: false },
      rating: { type: Sequelize.INTEGER, defaultValue: 5 },
      loanType: { type: Sequelize.STRING(50) },
      location: { type: Sequelize.STRING(100) },
      isPublished: { type: Sequelize.BOOLEAN, defaultValue: false },
      displayOrder: { type: Sequelize.INTEGER, defaultValue: 0 },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
    await queryInterface.createTable('faqs', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      question: { type: Sequelize.TEXT, allowNull: false },
      answer: { type: Sequelize.TEXT, allowNull: false },
      category: { type: Sequelize.STRING(50), defaultValue: 'general' },
      loanType: { type: Sequelize.STRING(50) },
      isPublished: { type: Sequelize.BOOLEAN, defaultValue: true },
      displayOrder: { type: Sequelize.INTEGER, defaultValue: 0 },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
    await queryInterface.createTable('notifications', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      userId: { type: Sequelize.UUID, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      title: { type: Sequelize.STRING(200), allowNull: false },
      message: { type: Sequelize.TEXT },
      type: { type: Sequelize.STRING(50), defaultValue: 'info' },
      isRead: { type: Sequelize.BOOLEAN, defaultValue: false },
      data: { type: Sequelize.JSONB, defaultValue: {} },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
    await queryInterface.createTable('audit_logs', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      userId: { type: Sequelize.UUID, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
      action: { type: Sequelize.ENUM('LOGIN','LOGOUT','LEAD_CREATED','LEAD_UPDATED','LEAD_ASSIGNED','STATUS_CHANGED','NOTE_ADDED','FOLLOWUP_CREATED','PRODUCT_CHANGED','FORM_FIELD_CHANGED','USER_CREATED','USER_UPDATED'), allowNull: false },
      entityType: { type: Sequelize.STRING(50) },
      entityId: { type: Sequelize.UUID },
      oldValues: { type: Sequelize.JSONB },
      newValues: { type: Sequelize.JSONB },
      ipAddress: { type: Sequelize.STRING(45) },
      userAgent: { type: Sequelize.TEXT },
      createdAt: { type: Sequelize.DATE, allowNull: false }
    });
    await queryInterface.createTable('settings', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      key: { type: Sequelize.STRING(100), allowNull: false, unique: true },
      value: { type: Sequelize.TEXT },
      type: { type: Sequelize.STRING(20), defaultValue: 'string' },
      group: { type: Sequelize.STRING(50), defaultValue: 'general' },
      label: { type: Sequelize.STRING(100) },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('settings');
    await queryInterface.dropTable('audit_logs');
    await queryInterface.dropTable('notifications');
    await queryInterface.dropTable('faqs');
    await queryInterface.dropTable('testimonials');
  }
};
