'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const testimonials = [
      { id: uuidv4(), name: 'Rajesh K. [DEMO]', review: 'Good Debt helped me navigate the personal loan process smoothly. Their team was very helpful in explaining the requirements and guiding me through the documentation.', rating: 5, loanType: 'personal-loan', location: 'Mumbai', isPublished: true, displayOrder: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: 'Sunita M. [DEMO]', review: 'I was confused about which loan option to choose for my business. The Good Debt team patiently explained the options and helped me understand what would work best for my situation.', rating: 5, loanType: 'business-loan', location: 'Pune', isPublished: true, displayOrder: 2, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: 'Vikram S. [DEMO]', review: 'The home loan assistance from Good Debt was excellent. They helped me understand the process and kept me informed at every step. Very professional service.', rating: 4, loanType: 'home-loan', location: 'Bangalore', isPublished: true, displayOrder: 3, createdAt: new Date(), updatedAt: new Date() }
    ];
    await queryInterface.bulkInsert('testimonials', testimonials);

    const settings = [
      { id: uuidv4(), key: 'company_name', value: 'Good Debt', type: 'string', group: 'company', label: 'Company Name', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), key: 'company_phone', value: '+919999999999', type: 'string', group: 'company', label: 'Phone', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), key: 'company_email', value: 'info@gooddebt.in', type: 'string', group: 'company', label: 'Email', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), key: 'company_whatsapp', value: '+919999999999', type: 'string', group: 'company', label: 'WhatsApp', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), key: 'company_address', value: 'Mumbai, Maharashtra, India', type: 'string', group: 'company', label: 'Address', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), key: 'footer_disclaimer', value: 'Good Debt assists customers in exploring loan options and connecting with suitable lending partners. Loan approval, interest rates, tenure and final terms are subject to the respective lender\'s eligibility criteria, policies and approval.', type: 'text', group: 'legal', label: 'Footer Disclaimer', createdAt: new Date(), updatedAt: new Date() }
    ];
    await queryInterface.bulkInsert('settings', settings);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('testimonials', null, {});
    await queryInterface.bulkDelete('settings', null, {});
  }
};
