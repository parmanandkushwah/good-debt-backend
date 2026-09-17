const { Op, fn, col, literal } = require('sequelize');
const { Lead, User, FollowUp, sequelize } = require('../models');

exports.getStats = async (req, res, next) => {
  try {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now); weekStart.setDate(now.getDate() - 7);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [total, newLeads, today, thisWeek, thisMonth, qualified, approved, disbursed] = await Promise.all([
      Lead.count(),
      Lead.count({ where: { status: 'NEW' } }),
      Lead.count({ where: { createdAt: { [Op.gte]: todayStart } } }),
      Lead.count({ where: { createdAt: { [Op.gte]: weekStart } } }),
      Lead.count({ where: { createdAt: { [Op.gte]: monthStart } } }),
      Lead.count({ where: { status: 'QUALIFIED' } }),
      Lead.count({ where: { status: 'APPROVED' } }),
      Lead.count({ where: { status: 'DISBURSED' } })
    ]);

    res.json({ success: true, data: { total, newLeads, today, thisWeek, thisMonth, qualified, approved, disbursed } });
  } catch (err) { next(err); }
};

exports.getLeadTrends = async (req, res, next) => {
  try {
    const { days = 30 } = req.query;
    const startDate = new Date(); startDate.setDate(startDate.getDate() - parseInt(days));
    const trends = await Lead.findAll({
      where: { createdAt: { [Op.gte]: startDate } },
      attributes: [[fn('DATE', col('createdAt')), 'date'], [fn('COUNT', col('id')), 'count']],
      group: [fn('DATE', col('createdAt'))],
      order: [[fn('DATE', col('createdAt')), 'ASC']],
      raw: true
    });
    res.json({ success: true, data: trends });
  } catch (err) { next(err); }
};

exports.getLoanDistribution = async (req, res, next) => {
  try {
    const data = await Lead.findAll({
      attributes: ['loanType', [fn('COUNT', col('id')), 'count']],
      group: ['loanType'],
      order: [[fn('COUNT', col('id')), 'DESC']],
      raw: true
    });
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

exports.getStatusDistribution = async (req, res, next) => {
  try {
    const data = await Lead.findAll({
      attributes: ['status', [fn('COUNT', col('id')), 'count']],
      group: ['status'],
      raw: true
    });
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

exports.getSourcePerformance = async (req, res, next) => {
  try {
    const data = await Lead.findAll({
      attributes: ['source', [fn('COUNT', col('id')), 'total'],
        [fn('SUM', literal(`CASE WHEN status IN ('APPROVED','DISBURSED') THEN 1 ELSE 0 END`)), 'converted']
      ],
      group: ['source'],
      raw: true
    });
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

exports.getConversionFunnel = async (req, res, next) => {
  try {
    const statuses = ['NEW','CONTACTED','QUALIFIED','DOCUMENTS_PENDING','APPLICATION_STARTED','SUBMITTED_TO_LENDER','APPROVED','DISBURSED'];
    const data = await Promise.all(statuses.map(async (status) => ({
      status,
      count: await Lead.count({ where: { status } })
    })));
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

exports.getEmployeePerformance = async (req, res, next) => {
  try {
    const data = await Lead.findAll({
      where: { assignedTo: { [Op.ne]: null } },
      attributes: ['assignedTo', [fn('COUNT', col('Lead.id')), 'total'],
        [fn('SUM', literal(`CASE WHEN "Lead"."status" IN ('APPROVED','DISBURSED') THEN 1 ELSE 0 END`)), 'converted']
      ],
      include: [{ model: User, as: 'assignedEmployee', attributes: ['name'] }],
      group: ['assignedTo', 'assignedEmployee.id'],
      raw: true
    });
    res.json({ success: true, data });
  } catch (err) { next(err); }
};
