const { Testimonial } = require('../models');

exports.getAll = async (req, res, next) => {
  try {
    const where = {};
    if (req.query.published === 'true') where.isPublished = true;
    const testimonials = await Testimonial.findAll({ where, order: [['displayOrder', 'ASC'], ['createdAt', 'DESC']] });
    res.json({ success: true, data: testimonials });
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, data: testimonial });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' });
    await testimonial.update(req.body);
    res.json({ success: true, data: testimonial });
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' });
    await testimonial.destroy();
    res.json({ success: true, message: 'Testimonial deleted' });
  } catch (err) { next(err); }
};
