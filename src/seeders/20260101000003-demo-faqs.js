'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const faqs = [
      { id: uuidv4(), question: 'How does Good Debt help with loans?', answer: 'Good Debt is a loan assistance service (DSA) that helps you explore suitable loan options from various lenders. We guide you through the enquiry process, help you understand requirements, and connect you with appropriate lending partners. We do not directly lend money.', category: 'general', isPublished: true, displayOrder: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), question: 'Does submitting an enquiry guarantee loan approval?', answer: 'No. Submitting an enquiry through Good Debt does not guarantee loan approval. Final approval, loan amount, interest rate, and terms are determined by the respective lender based on their eligibility criteria, policies, and credit assessment.', category: 'general', isPublished: true, displayOrder: 2, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), question: 'What documents may be required for a loan?', answer: 'Document requirements vary by loan type and lender. Generally, you may need identity proof, address proof, income documents (salary slips or ITR), bank statements, and loan-specific documents. Our team will guide you on exact requirements based on your loan type.', category: 'general', isPublished: true, displayOrder: 3, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), question: 'Can self-employed individuals enquire for loans?', answer: 'Yes, self-employed individuals and business owners can submit loan enquiries. Eligibility criteria and documentation requirements may differ from salaried applicants. Our team will guide you based on your specific situation.', category: 'general', isPublished: true, displayOrder: 4, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), question: "Can I enquire if I don't know my CIBIL score?", answer: "Yes, you can still submit an enquiry even if you don't know your CIBIL score. Select 'Don't Know' in the form. Our team will guide you on next steps. However, a good credit score generally improves loan eligibility.", category: 'general', isPublished: true, displayOrder: 5, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), question: 'How much loan can I apply for?', answer: 'Loan amounts vary by loan type and lender. Eligibility depends on your income, existing obligations, credit score, and other factors assessed by the lender. Our team can provide indicative guidance after reviewing your requirements.', category: 'general', isPublished: true, displayOrder: 6, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), question: 'How does the loan process work through Good Debt?', answer: 'The process involves: 1) Submit your loan enquiry, 2) Our team reviews your requirement, 3) We contact you to understand your needs, 4) We guide you on suitable options and documentation, 5) We assist with the application process, 6) The lender processes and decides on your application.', category: 'general', isPublished: true, displayOrder: 7, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), question: 'Is my personal information safe?', answer: 'Yes, we take data privacy seriously. Your information is used only for processing your loan enquiry and connecting you with suitable lenders. We do not sell your data to third parties. Please refer to our Privacy Policy for complete details.', category: 'general', isPublished: true, displayOrder: 8, createdAt: new Date(), updatedAt: new Date() }
    ];
    await queryInterface.bulkInsert('faqs', faqs);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('faqs', null, {});
  }
};
