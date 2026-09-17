'use strict';
const { Sequelize } = require('sequelize');
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

let sequelize;
if (dbConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[dbConfig.use_env_variable], dbConfig);
} else {
  sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
}

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Import models
db.User = require('./user.model')(sequelize, Sequelize.DataTypes);
db.Role = require('./role.model')(sequelize, Sequelize.DataTypes);
db.Lead = require('./lead.model')(sequelize, Sequelize.DataTypes);
db.LoanProduct = require('./loanProduct.model')(sequelize, Sequelize.DataTypes);
db.LoanFormField = require('./loanFormField.model')(sequelize, Sequelize.DataTypes);
db.LeadNote = require('./leadNote.model')(sequelize, Sequelize.DataTypes);
db.FollowUp = require('./followUp.model')(sequelize, Sequelize.DataTypes);
db.LeadStatusHistory = require('./leadStatusHistory.model')(sequelize, Sequelize.DataTypes);
db.LeadAssignment = require('./leadAssignment.model')(sequelize, Sequelize.DataTypes);
db.Testimonial = require('./testimonial.model')(sequelize, Sequelize.DataTypes);
db.FAQ = require('./faq.model')(sequelize, Sequelize.DataTypes);
db.Notification = require('./notification.model')(sequelize, Sequelize.DataTypes);
db.AuditLog = require('./auditLog.model')(sequelize, Sequelize.DataTypes);
db.Setting = require('./setting.model')(sequelize, Sequelize.DataTypes);

// Associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) db[modelName].associate(db);
});

module.exports = db;
