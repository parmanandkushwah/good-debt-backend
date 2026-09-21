const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const router = require('express').Router();
const multer = require('multer');
const ctrl = require('../controllers/heroOffer.controller');
const { authenticate, isAdmin } = require('../middleware/auth.middleware');

const uploadDirectory = path.resolve(__dirname, '../../uploads/hero-offers');
fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDirectory,
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    callback(null, `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${extension}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)) {
      return callback(new Error('Only JPG, PNG, and WebP images are allowed'));
    }
    callback(null, true);
  },
});

router.get('/', ctrl.getAll);
router.post('/', authenticate, isAdmin, upload.single('image'), ctrl.create);
router.patch('/:id', authenticate, isAdmin, upload.single('image'), ctrl.update);
router.delete('/:id', authenticate, isAdmin, ctrl.remove);

module.exports = router;
