'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const products = [
      {
        id: uuidv4(), name: 'Personal Loan', slug: 'personal-loan', loanType: 'personal-loan',
        shortDescription: 'Quick personal loans for your immediate financial needs',
        description: 'Get assistance with personal loan enquiries for medical expenses, weddings, travel, education, and more.',
        icon: 'User', minAmount: 50000, maxAmount: 5000000,
        interestRateText: 'Starting from 10.5% p.a.*', tenureText: 'Up to 60 months',
        benefits: JSON.stringify(['Quick processing assistance','Minimal documentation guidance','Flexible tenure options','Multiple lender options']),
        eligibility: JSON.stringify(['Age 21-60 years','Salaried or self-employed','Minimum income as per lender norms','Good credit history preferred']),
        documents: JSON.stringify(['Identity proof','Address proof','Income proof','Bank statements (3-6 months)','Photographs']),
        metaTitle: 'Personal Loan Assistance | Good Debt', metaDescription: 'Explore personal loan options with Good Debt. Get expert assistance for your personal loan requirements.',
        isActive: true, displayOrder: 1, createdAt: new Date(), updatedAt: new Date()
      },
      {
        id: uuidv4(), name: 'Business Loan', slug: 'business-loan', loanType: 'business-loan',
        shortDescription: 'Fuel your business growth with the right financing',
        description: 'Get assistance with business loan enquiries for working capital, expansion, equipment, and more.',
        icon: 'Briefcase', minAmount: 100000, maxAmount: 50000000,
        interestRateText: 'Starting from 12% p.a.*', tenureText: 'Up to 84 months',
        benefits: JSON.stringify(['Working capital support','Business expansion financing','Equipment financing','Inventory funding']),
        eligibility: JSON.stringify(['Business vintage 1+ years','GST registered preferred','Minimum turnover as per lender norms','Good credit history']),
        documents: JSON.stringify(['Business registration','GST certificate','ITR (2-3 years)','Bank statements (6-12 months)','Financial statements']),
        metaTitle: 'Business Loan Assistance | Good Debt', metaDescription: 'Explore business loan options with Good Debt for working capital, expansion and more.',
        isActive: true, displayOrder: 2, createdAt: new Date(), updatedAt: new Date()
      },
      {
        id: uuidv4(), name: 'Home Loan', slug: 'home-loan', loanType: 'home-loan',
        shortDescription: 'Make your dream home a reality',
        description: 'Get assistance with home loan enquiries for purchase, construction, and balance transfer.',
        icon: 'Home', minAmount: 500000, maxAmount: 100000000,
        interestRateText: 'Starting from 8.5% p.a.*', tenureText: 'Up to 30 years',
        benefits: JSON.stringify(['Long tenure options','Tax benefit guidance','Balance transfer assistance','Multiple lender options']),
        eligibility: JSON.stringify(['Age 21-65 years','Salaried or self-employed','Stable income source','Property documents in order']),
        documents: JSON.stringify(['Identity & address proof','Income documents','Property documents','Bank statements','Photographs']),
        metaTitle: 'Home Loan Assistance | Good Debt', metaDescription: 'Explore home loan options with Good Debt. Expert assistance for home purchase and construction loans.',
        isActive: true, displayOrder: 3, createdAt: new Date(), updatedAt: new Date()
      },
      {
        id: uuidv4(), name: 'Loan Against Property', slug: 'loan-against-property', loanType: 'loan-against-property',
        shortDescription: 'Unlock the value of your property',
        description: 'Get assistance with loan against property enquiries for business or personal needs.',
        icon: 'Building', minAmount: 500000, maxAmount: 100000000,
        interestRateText: 'Starting from 9% p.a.*', tenureText: 'Up to 20 years',
        benefits: JSON.stringify(['Higher loan amounts','Lower interest rates','Flexible end use','Long repayment tenure']),
        eligibility: JSON.stringify(['Property ownership','Age 21-65 years','Stable income','Clear property title']),
        documents: JSON.stringify(['Property documents','Identity & address proof','Income documents','Bank statements']),
        metaTitle: 'Loan Against Property | Good Debt', metaDescription: 'Explore loan against property options with Good Debt. Unlock your property value.',
        isActive: true, displayOrder: 4, createdAt: new Date(), updatedAt: new Date()
      },
      {
        id: uuidv4(), name: 'Car Loan', slug: 'car-loan', loanType: 'car-loan',
        shortDescription: 'Drive your dream car today',
        description: 'Get assistance with car loan enquiries for new and used vehicles.',
        icon: 'Car', minAmount: 100000, maxAmount: 10000000,
        interestRateText: 'Starting from 8.75% p.a.*', tenureText: 'Up to 84 months',
        benefits: JSON.stringify(['New and used car financing','Quick processing','Competitive rates','Flexible tenure']),
        eligibility: JSON.stringify(['Age 21-65 years','Salaried or self-employed','Minimum income as per lender','Good credit score preferred']),
        documents: JSON.stringify(['Identity & address proof','Income documents','Bank statements','Vehicle quotation/RC']),
        metaTitle: 'Car Loan Assistance | Good Debt', metaDescription: 'Explore car loan options with Good Debt for new and used vehicles.',
        isActive: true, displayOrder: 5, createdAt: new Date(), updatedAt: new Date()
      },
      {
        id: uuidv4(), name: 'Education Loan', slug: 'education-loan', loanType: 'education-loan',
        shortDescription: 'Invest in your future with education financing',
        description: 'Get assistance with education loan enquiries for domestic and international studies.',
        icon: 'GraduationCap', minAmount: 100000, maxAmount: 15000000,
        interestRateText: 'Starting from 9% p.a.*', tenureText: 'Up to 15 years',
        benefits: JSON.stringify(['Domestic and international courses','Moratorium period options','Tax benefit guidance','Multiple lender options']),
        eligibility: JSON.stringify(['Indian citizen','Admission to recognized institution','Co-applicant required','Academic merit considered']),
        documents: JSON.stringify(['Admission letter','Fee structure','Academic records','Co-applicant income documents','Identity proof']),
        metaTitle: 'Education Loan Assistance | Good Debt', metaDescription: 'Explore education loan options with Good Debt for domestic and international studies.',
        isActive: true, displayOrder: 6, createdAt: new Date(), updatedAt: new Date()
      },
      {
        id: uuidv4(), name: 'Gold Loan', slug: 'gold-loan', loanType: 'gold-loan',
        shortDescription: 'Quick funds against your gold assets',
        description: 'Get assistance with gold loan enquiries for quick access to funds.',
        icon: 'Gem', minAmount: 10000, maxAmount: 5000000,
        interestRateText: 'Starting from 9.5% p.a.*', tenureText: 'Up to 36 months',
        benefits: JSON.stringify(['Quick disbursement','Minimal documentation','No income proof required','Flexible repayment']),
        eligibility: JSON.stringify(['Age 18+ years','Gold ornaments/coins','Minimum gold purity as per lender']),
        documents: JSON.stringify(['Identity proof','Address proof','Gold ornaments for valuation']),
        metaTitle: 'Gold Loan Assistance | Good Debt', metaDescription: 'Explore gold loan options with Good Debt. Quick funds against your gold assets.',
        isActive: true, displayOrder: 7, createdAt: new Date(), updatedAt: new Date()
      },
      {
        id: uuidv4(), name: 'Debt Consolidation', slug: 'debt-consolidation', loanType: 'debt-consolidation',
        shortDescription: 'Simplify multiple loans into one manageable payment',
        description: 'Get assistance with debt consolidation loan enquiries to manage multiple existing loans.',
        icon: 'RefreshCw', minAmount: 100000, maxAmount: 10000000,
        interestRateText: 'Starting from 11% p.a.*', tenureText: 'Up to 60 months',
        benefits: JSON.stringify(['Single EMI management','Potentially lower overall interest','Simplified finances','Stress reduction']),
        eligibility: JSON.stringify(['Existing loan obligations','Stable income','Good repayment history','Age 21-60 years']),
        documents: JSON.stringify(['Existing loan statements','Identity & address proof','Income documents','Bank statements']),
        metaTitle: 'Debt Consolidation Assistance | Good Debt', metaDescription: 'Explore debt consolidation options with Good Debt. Simplify your multiple loan payments.',
        isActive: true, displayOrder: 8, createdAt: new Date(), updatedAt: new Date()
      }
    ];
    await queryInterface.bulkInsert('loan_products', products);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('loan_products', null, {});
  }
};
