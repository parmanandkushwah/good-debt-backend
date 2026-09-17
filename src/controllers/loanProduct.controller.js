const { LoanProduct } = require('../models');
const { createAuditLog } = require('../utils/audit.utils');
const { AUDIT_ACTIONS } = require('../constants');

exports.getAll = async (req, res, next) => {
  try {
    const where = {};
    if (req.query.active === 'true') where.isActive = true;
    const products = await LoanProduct.findAll({ where, order: [['displayOrder', 'ASC'], ['name', 'ASC']] });
    res.json({ success: true, data: products });
  } catch (err) { next(err); }
};

exports.getBySlug = async (req, res, next) => {
  try {
    const product = await LoanProduct.findOne({ where: { slug: req.params.slug } });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: product });
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try {
    const product = await LoanProduct.findByPk(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: product });
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const product = await LoanProduct.create(req.body);
    await createAuditLog({ userId: req.user.id, action: AUDIT_ACTIONS.PRODUCT_CHANGED, entityType: 'LoanProduct', entityId: product.id, newValues: req.body, req });
    res.status(201).json({ success: true, data: product });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const product = await LoanProduct.findByPk(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    await product.update(req.body);
    await createAuditLog({ userId: req.user.id, action: AUDIT_ACTIONS.PRODUCT_CHANGED, entityType: 'LoanProduct', entityId: product.id, newValues: req.body, req });
    res.json({ success: true, data: product });
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const product = await LoanProduct.findByPk(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    await product.destroy();
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) { next(err); }
};
