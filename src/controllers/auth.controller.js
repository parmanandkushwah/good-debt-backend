const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User } = require('../models');
const { createAuditLog } = require('../utils/audit.utils');
const { AUDIT_ACTIONS } = require('../constants');

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password required' });
    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (!user || !user.isActive) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    await user.update({ lastLoginAt: new Date() });
    await createAuditLog({ userId: user.id, action: AUDIT_ACTIONS.LOGIN, entityType: 'User', entityId: user.id, req });
    const token = signToken(user.id);
    res.json({ success: true, token, user });
  } catch (err) { next(err); }
};

exports.logout = async (req, res, next) => {
  try {
    await createAuditLog({ userId: req.user.id, action: AUDIT_ACTIONS.LOGOUT, entityType: 'User', entityId: req.user.id, req });
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (err) { next(err); }
};

exports.getMe = async (req, res) => {
  res.json({ success: true, user: req.user });
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name?.trim() || !email?.trim()) {
      return res.status(400).json({ success: false, message: 'Name and email are required' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await User.findOne({ where: { email: normalizedEmail } });
    if (existing && existing.id !== req.user.id) {
      return res.status(409).json({ success: false, message: 'Email already exists' });
    }

    await req.user.update({ name: name.trim(), email: normalizedEmail, phone: phone?.trim() || null });
    await createAuditLog({ userId: req.user.id, action: AUDIT_ACTIONS.USER_UPDATED, entityType: 'User', entityId: req.user.id, newValues: { name: req.user.name, email: req.user.email, phone: req.user.phone }, req });
    res.json({ success: true, user: req.user, message: 'Profile updated successfully' });
  } catch (err) { next(err); }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Current and new password are required' });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, message: 'New password must be at least 8 characters' });
    }
    if (currentPassword === newPassword) {
      return res.status(400).json({ success: false, message: 'New password must be different' });
    }
    const isMatch = await req.user.comparePassword(currentPassword);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Current password is incorrect' });

    await req.user.update({ password: newPassword });
    await createAuditLog({ userId: req.user.id, action: AUDIT_ACTIONS.USER_UPDATED, entityType: 'User', entityId: req.user.id, newValues: { passwordChanged: true }, req });
    res.json({ success: true, message: 'Password changed successfully' });
  } catch (err) { next(err); }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email: email?.toLowerCase() } });
    if (!user) return res.json({ success: true, message: 'If that email exists, a reset link has been sent.' });
    const token = crypto.randomBytes(32).toString('hex');
    await user.update({ passwordResetToken: token, passwordResetExpires: new Date(Date.now() + 3600000) });
    res.json({ success: true, message: 'If that email exists, a reset link has been sent.', ...(process.env.NODE_ENV === 'development' && { devToken: token }) });
  } catch (err) { next(err); }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    const user = await User.findOne({ where: { passwordResetToken: token } });
    if (!user || !user.passwordResetExpires || user.passwordResetExpires < new Date()) {
      return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
    }
    await user.update({ password, passwordResetToken: null, passwordResetExpires: null });
    res.json({ success: true, message: 'Password reset successfully' });
  } catch (err) { next(err); }
};
