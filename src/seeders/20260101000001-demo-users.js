'use strict';
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const password = await bcrypt.hash('Admin@123', 12);
    const users = [
      { id: uuidv4(), name: 'Super Admin', email: 'superadmin@gooddebt.in', password, role: 'SUPER_ADMIN', phone: '+919999999901', isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: 'Admin User', email: 'admin@gooddebt.in', password, role: 'ADMIN', phone: '+919999999902', isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: 'Sales Manager', email: 'manager@gooddebt.in', password, role: 'SALES_MANAGER', phone: '+919999999903', isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: 'Amit Sharma', email: 'amit@gooddebt.in', password, role: 'SALES_EXECUTIVE', phone: '+919999999904', isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: 'Priya Patel', email: 'priya@gooddebt.in', password, role: 'SALES_EXECUTIVE', phone: '+919999999905', isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: 'Rahul Verma', email: 'rahul@gooddebt.in', password, role: 'SALES_EXECUTIVE', phone: '+919999999906', isActive: true, createdAt: new Date(), updatedAt: new Date() }
    ];
    await queryInterface.bulkInsert('users', users);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
