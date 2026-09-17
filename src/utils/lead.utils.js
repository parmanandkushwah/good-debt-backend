const { Lead } = require('../models');
const { Op } = require('sequelize');

async function generateLeadNumber() {
  const year = new Date().getFullYear();
  const prefix = `GD-${year}-`;
  const lastLead = await Lead.findOne({
    where: { leadNumber: { [Op.like]: `${prefix}%` } },
    order: [['createdAt', 'DESC']]
  });
  let nextNum = 1;
  if (lastLead && lastLead.leadNumber) {
    const parts = lastLead.leadNumber.split('-');
    nextNum = parseInt(parts[2] || '0', 10) + 1;
  }
  return `${prefix}${String(nextNum).padStart(6, '0')}`;
}

function detectSource(utmSource, referrer) {
  if (utmSource) {
    if (utmSource.toLowerCase().includes('google')) return 'google_ads';
    if (utmSource.toLowerCase().includes('facebook') || utmSource.toLowerCase().includes('fb')) return 'facebook';
    if (utmSource.toLowerCase().includes('instagram') || utmSource.toLowerCase().includes('ig')) return 'instagram';
  }
  if (referrer) {
    if (referrer.includes('google')) return 'organic';
    if (referrer.includes('facebook')) return 'facebook';
    if (referrer.includes('instagram')) return 'instagram';
  }
  return 'direct';
}

function formatCurrency(amount) {
  if (!amount) return '₹0';
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

module.exports = { generateLeadNumber, detectSource, formatCurrency };
