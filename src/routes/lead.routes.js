const router = require('express').Router();
const ctrl = require('../controllers/lead.controller');
const { authenticate, isStaff, isManager, isAdmin } = require('../middleware/auth.middleware');

// Public - lead submission
router.post('/', ctrl.createLead);

// Protected
router.use(authenticate);
router.get('/', isStaff, ctrl.getLeads);
router.get('/:id', isStaff, ctrl.getLeadById);
router.patch('/:id', isStaff, ctrl.updateLead);
router.delete('/:id', isAdmin, ctrl.deleteLead);
router.patch('/:id/status', isStaff, ctrl.updateLeadStatus);
router.patch('/:id/assign', isManager, ctrl.assignLead);
router.post('/:id/notes', isStaff, ctrl.addNote);
router.post('/:id/followups', isStaff, ctrl.addFollowUp);

module.exports = router;
