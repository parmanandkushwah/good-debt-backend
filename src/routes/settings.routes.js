const router = require('express').Router();
const ctrl = require('../controllers/settings.controller');
const { authenticate, isAdmin } = require('../middleware/auth.middleware');

router.get('/', ctrl.getAll);
router.patch('/', authenticate, isAdmin, ctrl.update);

module.exports = router;
