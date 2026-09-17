const { AuditLog } = require('../models');
const { AUDIT_ACTIONS } = require('../constants');

async function createAuditLog({ userId, action, entityType, entityId, oldValues, newValues, req }) {
  try {
    await AuditLog.create({
      userId,
      action,
      entityType,
      entityId,
      oldValues,
      newValues,
      ipAddress: req?.ip || req?.connection?.remoteAddress,
      userAgent: req?.headers?.['user-agent']
    });
  } catch (err) {
    console.error('Audit log error:', err.message);
  }
}

module.exports = { createAuditLog, AUDIT_ACTIONS };
