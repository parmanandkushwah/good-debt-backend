const { Op } = require('sequelize');
const { FollowUp, Lead, User } = require('../models');

exports.getFollowUps = async (req, res, next) => {
  try {
    const { filter, assignedTo } = req.query;
    const now = new Date();
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const where = {};
    if (req.user.role === 'SALES_EXECUTIVE') where.assignedTo = req.user.id;
    else if (assignedTo) where.assignedTo = assignedTo;
    if (filter === 'today') { where.scheduledAt = { [Op.between]: [todayStart, todayEnd] }; where.isCompleted = false; }
    else if (filter === 'overdue') { where.scheduledAt = { [Op.lt]: todayStart }; where.isCompleted = false; }
    else if (filter === 'upcoming') { where.scheduledAt = { [Op.gt]: todayEnd }; where.isCompleted = false; }
    else if (filter === 'completed') where.isCompleted = true;
    const followUps = await FollowUp.findAll({
      where,
      include: [
        { model: Lead, as: 'lead', attributes: ['id', 'leadNumber', 'fullName', 'mobile', 'loanType', 'status'] },
        { model: User, as: 'assignee', attributes: ['id', 'name'] }
      ],
      order: [['scheduledAt', 'ASC']]
    });
    res.json({ success: true, data: followUps });
  } catch (err) { next(err); }
};

exports.updateFollowUp = async (req, res, next) => {
  try {
    const followUp = await FollowUp.findByPk(req.params.id);
    if (!followUp) return res.status(404).json({ success: false, message: 'Follow-up not found' });
    if (req.body.isCompleted) req.body.completedAt = new Date();
    await followUp.update(req.body);
    res.json({ success: true, data: followUp });
  } catch (err) { next(err); }
};

exports.deleteFollowUp = async (req, res, next) => {
  try {
    const followUp = await FollowUp.findByPk(req.params.id);
    if (!followUp) return res.status(404).json({ success: false, message: 'Follow-up not found' });
    await followUp.destroy();
    res.json({ success: true, message: 'Follow-up deleted' });
  } catch (err) { next(err); }
};
