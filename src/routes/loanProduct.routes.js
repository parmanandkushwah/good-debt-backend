const router = require('express').Router();
const ctrl = require('../controllers/loanProduct.controller');
const { authenticate, isAdmin } = require('../middleware/auth.middleware');

router.get('/', ctrl.getAll);
router.get('/slug/:slug', ctrl.getBySlug);
router.get('/:id', ctrl.getById);
router.post('/', authenticate, isAdmin, ctrl.create);
router.patch('/:id', authenticate, isAdmin, ctrl.update);
router.delete('/:id', authenticate, isAdmin, ctrl.remove);

module.exports = router;
