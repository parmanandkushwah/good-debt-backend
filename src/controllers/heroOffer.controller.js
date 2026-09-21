const fs = require('fs/promises');
const path = require('path');
const { HeroOffer } = require('../models');

const uploadsRoot = path.resolve(__dirname, '../../uploads');

const removeUploadedFile = async (imageUrl) => {
  if (!imageUrl) return;
  const relativePath = imageUrl.replace(/^\/api\/uploads\//, '');
  if (relativePath === imageUrl || relativePath.includes('..')) return;
  await fs.unlink(path.join(uploadsRoot, relativePath)).catch(() => {});
};

exports.getAll = async (req, res, next) => {
  try {
    const where = req.query.published === 'true' ? { published: true } : {};
    const offers = await HeroOffer.findAll({ where, order: [['displayOrder', 'ASC'], ['createdAt', 'DESC']] });
    res.json({ success: true, data: offers });
  } catch (error) { next(error); }
};

exports.create = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'Offer image is required' });
    const offer = await HeroOffer.create({
      title: req.body.title?.trim() || 'Bank Offer',
      imageUrl: `/api/uploads/hero-offers/${req.file.filename}`,
      published: req.body.published !== 'false',
      displayOrder: Number(req.body.displayOrder) || 0,
    });
    res.status(201).json({ success: true, data: offer });
  } catch (error) { next(error); }
};

exports.update = async (req, res, next) => {
  try {
    const offer = await HeroOffer.findByPk(req.params.id);
    if (!offer) return res.status(404).json({ success: false, message: 'Hero offer not found' });
    const updates = {
      ...(req.body.title !== undefined && { title: req.body.title.trim() }),
      ...(req.body.published !== undefined && { published: req.body.published === true || req.body.published === 'true' }),
      ...(req.body.displayOrder !== undefined && { displayOrder: Number(req.body.displayOrder) || 0 }),
    };
    if (req.file) {
      await removeUploadedFile(offer.imageUrl);
      updates.imageUrl = `/api/uploads/hero-offers/${req.file.filename}`;
    }
    await offer.update(updates);
    res.json({ success: true, data: offer });
  } catch (error) { next(error); }
};

exports.remove = async (req, res, next) => {
  try {
    const offer = await HeroOffer.findByPk(req.params.id);
    if (!offer) return res.status(404).json({ success: false, message: 'Hero offer not found' });
    await removeUploadedFile(offer.imageUrl);
    await offer.destroy();
    res.json({ success: true, message: 'Hero offer deleted' });
  } catch (error) { next(error); }
};
