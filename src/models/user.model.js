'use strict';
const bcrypt = require('bcryptjs');
const { USER_ROLES } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false, validate: { notEmpty: true, len: [2, 100] } },
    email: { type: DataTypes.STRING(150), allowNull: false, unique: true, validate: { isEmail: true } },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM(...Object.values(USER_ROLES)), defaultValue: USER_ROLES.SALES_EXECUTIVE },
    phone: { type: DataTypes.STRING(15) },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    lastLoginAt: { type: DataTypes.DATE },
    passwordResetToken: { type: DataTypes.STRING },
    passwordResetExpires: { type: DataTypes.DATE }
  }, {
    tableName: 'users',
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => { if (user.password) user.password = await bcrypt.hash(user.password, 12); },
      beforeUpdate: async (user) => { if (user.changed('password')) user.password = await bcrypt.hash(user.password, 12); }
    }
  });

  User.prototype.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

  User.prototype.toJSON = function() {
    const values = { ...this.get() };
    delete values.password;
    delete values.passwordResetToken;
    delete values.passwordResetExpires;
    return values;
  };

  User.associate = (db) => {
    User.hasMany(db.Lead, { foreignKey: 'assignedTo', as: 'assignedLeads' });
    User.hasMany(db.LeadNote, { foreignKey: 'createdBy', as: 'notes' });
    User.hasMany(db.FollowUp, { foreignKey: 'assignedTo', as: 'followUps' });
    User.hasMany(db.AuditLog, { foreignKey: 'userId', as: 'auditLogs' });
    User.hasMany(db.LeadAssignment, { foreignKey: 'assignedTo', as: 'assignments' });
    User.hasMany(db.Notification, { foreignKey: 'userId', as: 'notifications' });
  };

  return User;
};
