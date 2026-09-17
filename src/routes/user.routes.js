const router = require('express').Router();
const ctrl = require('../controllers/user.controller');
const { authenticate, isAdmin, isSuperAdmin } = require('../middleware/auth.middleware');

router.use(authenticate);
router.get('/', isAdmin, ctrl.getUsers);
router.post('/', isAdmin, ctrl.createUser);
router.patch('/:id', isAdmin, ctrl.updateUser);
router.delete('/:id', isSuperAdmin, ctrl.deleteUser);

module.exports = router;
