const { FAQ } = require('../models');

exports.getAll = async (req, res, next) => {
  try {
    const where = {};
    if (req.query.published === 'true') where.isPublished = true;
    if (req.query.category) where.category = req.query.category;
    if (req.query.loanType) where.loanType = req.query.loanType;
    const faqs = await FAQ.findAll({ where, order: [['displayOrder', 'ASC'], ['createdAt', 'ASC']] });
    res.json({ success: true, data: faqs });
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const faq = await FAQ.create(req.body);
    res.status(201).json({ success: true, data: faq });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const faq = await FAQ.findByPk(req.params.id);
    if (!faq) return res.status(404).json({ success: false, message: 'FAQ not found' });
    await faq.update(req.body);
    res.json({ success: true, data: faq });
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const faq = await FAQ.findByPk(req.params.id);
    if (!faq) return res.status(404).json({ success: false, message: 'FAQ not found' });
    await faq.destroy();
    res.json({ success: true, message: 'FAQ deleted' });
  } catch (err) { next(err); }
};
