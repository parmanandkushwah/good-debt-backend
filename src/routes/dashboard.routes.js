const router = require('express').Router();
const ctrl = require('../controllers/dashboard.controller');
const { authenticate, isStaff } = require('../middleware/auth.middleware');

router.use(authenticate, isStaff);
router.get('/stats', ctrl.getStats);
router.get('/lead-trends', ctrl.getLeadTrends);
router.get('/loan-distribution', ctrl.getLoanDistribution);
router.get('/status-distribution', ctrl.getStatusDistribution);
router.get('/source-performance', ctrl.getSourcePerformance);
router.get('/conversion', ctrl.getConversionFunnel);
router.get('/employee-performance', ctrl.getEmployeePerformance);

module.exports = router;
