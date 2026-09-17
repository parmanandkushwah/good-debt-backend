const router = require('express').Router();
const ctrl = require('../controllers/followUp.controller');
const { authenticate, isStaff } = require('../middleware/auth.middleware');

router.use(authenticate, isStaff);
router.get('/', ctrl.getFollowUps);
router.patch('/:id', ctrl.updateFollowUp);
router.delete('/:id', ctrl.deleteFollowUp);

module.exports = router;
