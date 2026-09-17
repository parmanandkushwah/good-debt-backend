const { LoanFormField } = require('../models');
const { createAuditLog } = require('../utils/audit.utils');
const { AUDIT_ACTIONS } = require('../constants');

exports.getByProduct = async (req, res, next) => {
  try {
    const fields = await LoanFormField.findAll({
      where: { loanProductId: req.params.productId, isActive: true },
      order: [['displayOrder', 'ASC']]
    });
    res.json({ success: true, data: fields });
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const field = await LoanFormField.create(req.body);
    await createAuditLog({ userId: req.user.id, action: AUDIT_ACTIONS.FORM_FIELD_CHANGED, entityType: 'LoanFormField', entityId: field.id, newValues: req.body, req });
    res.status(201).json({ success: true, data: field });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const field = await LoanFormField.findByPk(req.params.id);
    if (!field) return res.status(404).json({ success: false, message: 'Field not found' });
    await field.update(req.body);
    await createAuditLog({ userId: req.user.id, action: AUDIT_ACTIONS.FORM_FIELD_CHANGED, entityType: 'LoanFormField', entityId: field.id, newValues: req.body, req });
    res.json({ success: true, data: field });
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const field = await LoanFormField.findByPk(req.params.id);
    if (!field) return res.status(404).json({ success: false, message: 'Field not found' });
    await field.destroy();
    res.json({ success: true, message: 'Field deleted' });
  } catch (err) { next(err); }
};
