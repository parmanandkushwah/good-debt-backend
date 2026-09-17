'use strict';

module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, references: { model: 'users', key: 'id' } },
    title: { type: DataTypes.STRING(200), allowNull: false },
    message: { type: DataTypes.TEXT },
    type: { type: DataTypes.STRING(50), defaultValue: 'info' },
    isRead: { type: DataTypes.BOOLEAN, defaultValue: false },
    data: { type: DataTypes.JSONB, defaultValue: {} }
  }, { tableName: 'notifications', timestamps: true });

  Notification.associate = (db) => {
    Notification.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });
  };

  return Notification;
};
