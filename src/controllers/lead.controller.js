const { Op } = require('sequelize');
const { Lead, User, LeadNote, FollowUp, LeadStatusHistory, LeadAssignment, Notification, sequelize } = require('../models');
const { generateLeadNumber, detectSource } = require('../utils/lead.utils');
const { createAuditLog } = require('../utils/audit.utils');
const { AUDIT_ACTIONS, LEAD_STATUS } = require('../constants');

exports.createLead = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { fullName, mobile, email, loanType, loanAmount, employmentType, monthlyIncome, annualIncome, hasGst, existingEmi, cibilScore, city, state, pincode, utmSource, utmMedium, utmCampaign, utmTerm, utmContent, referrer, landingPage, additionalData } = req.body;
    const existing = await Lead.findOne({ where: { mobile, loanType }, order: [['createdAt', 'DESC']] });
    const source = detectSource(utmSource, referrer);
    const leadNumber = await generateLeadNumber();
    const lead = await Lead.create({
      leadNumber, fullName, mobile, email, loanType, loanAmount, employmentType, monthlyIncome, annualIncome, hasGst,
      existingEmi: existingEmi || 0, cibilScore, city, state, pincode, source,
      utmSource, utmMedium, utmCampaign, utmTerm, utmContent, referrer, landingPage,
      additionalData: additionalData || {}, isDuplicate: !!existing, parentLeadId: existing?.id || null
    }, { transaction: t });
    await LeadStatusHistory.create({ leadId: lead.id, toStatus: LEAD_STATUS.NEW, note: 'Lead created' }, { transaction: t });
    const admins = await User.findAll({ where: { role: { [Op.in]: ['SUPER_ADMIN', 'ADMIN'] }, isActive: true } });
    await Promise.all(admins.map(admin =>
      Notification.create({ userId: admin.id, title: 'New Lead', message: `New ${loanType} lead from ${fullName}`, type: 'lead', data: { leadId: lead.id, leadNumber: lead.leadNumber } }, { transaction: t })
    ));
    await createAuditLog({ action: AUDIT_ACTIONS.LEAD_CREATED, entityType: 'Lead', entityId: lead.id, newValues: { leadNumber, loanType, mobile } });
    await t.commit();
    res.status(201).json({ success: true, message: 'Lead submitted successfully', data: { leadNumber: lead.leadNumber, id: lead.id, loanType: lead.loanType, loanAmount: lead.loanAmount, createdAt: lead.createdAt, isDuplicate: lead.isDuplicate } });
  } catch (err) { await t.rollback(); next(err); }
};

exports.getLeads = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, loanType, priority, city, assignedTo, source, campaign, search, startDate, endDate, sortBy = 'createdAt', sortOrder = 'DESC' } = req.query;
    const where = {};
    if (status) where.status = status;
    if (loanType) where.loanType = loanType;
    if (priority) where.priority = priority;
    if (city) where.city = { [Op.iLike]: `%${city}%` };
    if (assignedTo) where.assignedTo = assignedTo;
    if (source) where.source = source;
    if (campaign) where.campaign = campaign;
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt[Op.gte] = new Date(startDate);
      if (endDate) where.createdAt[Op.lte] = new Date(endDate + 'T23:59:59');
    }
    if (search) {
      where[Op.or] = [
        { fullName: { [Op.iLike]: `%${search}%` } },
        { mobile: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
        { leadNumber: { [Op.iLike]: `%${search}%` } }
      ];
    }
    if (req.user.role === 'SALES_EXECUTIVE') where.assignedTo = req.user.id;
    const { count, rows } = await Lead.findAndCountAll({
      where,
      include: [{ model: User, as: 'assignedEmployee', attributes: ['id', 'name', 'email'] }],
      order: [[sortBy, sortOrder.toUpperCase()]],
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit)
    });
    res.json({ success: true, data: rows, pagination: { total: count, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(count / parseInt(limit)) } });
  } catch (err) { next(err); }
};

exports.getLeadById = async (req, res, next) => {
  try {
    const lead = await Lead.findByPk(req.params.id, {
      include: [
        { model: User, as: 'assignedEmployee', attributes: ['id', 'name', 'email', 'phone'] },
        { model: LeadNote, as: 'notes', include: [{ model: User, as: 'author', attributes: ['id', 'name'] }] },
        { model: FollowUp, as: 'followUps', include: [{ model: User, as: 'assignee', attributes: ['id', 'name'] }] },
        { model: LeadStatusHistory, as: 'statusHistory', include: [{ model: User, as: 'changedByUser', attributes: ['id', 'name'] }] },
        { model: LeadAssignment, as: 'assignments', include: [{ model: User, as: 'assignee', attributes: ['id', 'name'] }, { model: User, as: 'assigner', attributes: ['id', 'name'] }] }
      ]
    });
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    if (req.user.role === 'SALES_EXECUTIVE' && lead.assignedTo !== req.user.id) return res.status(403).json({ success: false, message: 'Access denied' });
    res.json({ success: true, data: lead });
  } catch (err) { next(err); }
};

exports.updateLead = async (req, res, next) => {
  try {
    const lead = await Lead.findByPk(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    const oldValues = lead.toJSON();
    await lead.update(req.body);
    await createAuditLog({ userId: req.user.id, action: AUDIT_ACTIONS.LEAD_UPDATED, entityType: 'Lead', entityId: lead.id, oldValues, newValues: req.body, req });
    res.json({ success: true, data: lead });
  } catch (err) { next(err); }
};

exports.updateLeadStatus = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { status, note } = req.body;
    const lead = await Lead.findByPk(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    const fromStatus = lead.status;
    await lead.update({ status }, { transaction: t });
    await LeadStatusHistory.create({ leadId: lead.id, fromStatus, toStatus: status, changedBy: req.user.id, note }, { transaction: t });
    await createAuditLog({ userId: req.user.id, action: AUDIT_ACTIONS.STATUS_CHANGED, entityType: 'Lead', entityId: lead.id, oldValues: { status: fromStatus }, newValues: { status }, req });
    await t.commit();
    res.json({ success: true, data: lead });
  } catch (err) { await t.rollback(); next(err); }
};

exports.assignLead = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { assignedTo, note } = req.body;
    const lead = await Lead.findByPk(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    await lead.update({ assignedTo }, { transaction: t });
    await LeadAssignment.create({ leadId: lead.id, assignedTo, assignedBy: req.user.id, note }, { transaction: t });
    await createAuditLog({ userId: req.user.id, action: AUDIT_ACTIONS.LEAD_ASSIGNED, entityType: 'Lead', entityId: lead.id, newValues: { assignedTo }, req });
    await t.commit();
    res.json({ success: true, data: lead });
  } catch (err) { await t.rollback(); next(err); }
};

exports.addNote = async (req, res, next) => {
  try {
    const { note, isInternal = true } = req.body;
    const lead = await Lead.findByPk(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    const leadNote = await LeadNote.create({ leadId: lead.id, note, createdBy: req.user.id, isInternal });
    await createAuditLog({ userId: req.user.id, action: AUDIT_ACTIONS.NOTE_ADDED, entityType: 'Lead', entityId: lead.id, newValues: { note }, req });
    res.status(201).json({ success: true, data: leadNote });
  } catch (err) { next(err); }
};

exports.addFollowUp = async (req, res, next) => {
  try {
    const { scheduledAt, notes, assignedTo } = req.body;
    const lead = await Lead.findByPk(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    const followUp = await FollowUp.create({ leadId: lead.id, scheduledAt, notes, assignedTo: assignedTo || req.user.id });
    await lead.update({ nextFollowUpAt: scheduledAt });
    await createAuditLog({ userId: req.user.id, action: AUDIT_ACTIONS.FOLLOWUP_CREATED, entityType: 'Lead', entityId: lead.id, newValues: { scheduledAt }, req });
    res.status(201).json({ success: true, data: followUp });
  } catch (err) { next(err); }
};

exports.deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findByPk(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    await lead.destroy();
    res.json({ success: true, message: 'Lead deleted' });
  } catch (err) { next(err); }
};
