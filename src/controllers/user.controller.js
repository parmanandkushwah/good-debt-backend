const { User } = require('../models');
const { createAuditLog } = require('../utils/audit.utils');
const { AUDIT_ACTIONS } = require('../constants');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: users });
  } catch (err) { next(err); }
};

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, role, phone } = req.body;
    const existing = await User.findOne({ where: { email: email.toLowerCase() } });
    if (existing) return res.status(409).json({ success: false, message: 'Email already exists' });
    const user = await User.create({ name, email: email.toLowerCase(), password, role, phone });
    await createAuditLog({ userId: req.user.id, action: AUDIT_ACTIONS.USER_CREATED, entityType: 'User', entityId: user.id, newValues: { name, email, role }, req });
    res.status(201).json({ success: true, data: user });
  } catch (err) { next(err); }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    const { password, ...updateData } = req.body;
    if (password) updateData.password = password;
    await user.update(updateData);
    await createAuditLog({ userId: req.user.id, action: AUDIT_ACTIONS.USER_UPDATED, entityType: 'User', entityId: user.id, newValues: updateData, req });
    res.json({ success: true, data: user });
  } catch (err) { next(err); }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    if (user.id === req.user.id) return res.status(400).json({ success: false, message: 'Cannot delete yourself' });
    await user.update({ isActive: false });
    res.json({ success: true, message: 'User deactivated' });
  } catch (err) { next(err); }
};
