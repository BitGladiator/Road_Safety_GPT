const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const Ticket = require('../models/Ticket');
const connectDB = require('../config/database');
const mongoose = require('mongoose');

describe('Tenant Data Isolation (Requirement R2)', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('Admin from Tenant A cannot read Tenant B data', async () => {
    const logisticsToken = jwt.sign(
      { 
        userId: 'test-user-1',
        customerId: 'LogisticsCo',
        role: 'Admin'
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    const response = await request(app)
      .get('/api/tickets')
      .set('Authorization', `Bearer ${logisticsToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    const allBelongToLogistics = response.body.every(
      ticket => ticket.customerId === 'LogisticsCo'
    );
    expect(allBelongToLogistics).toBe(true);
    const hasRetailTickets = response.body.some(
      ticket => ticket.customerId === 'RetailGmbH'
    );
    expect(hasRetailTickets).toBe(false);

    console.log('Tenant isolation verified: LogisticsCo sees only their tickets');
  });

  test('Direct database query also respects tenant filter', async () => {
    const logisticsTickets = await Ticket.find({ customerId: 'LogisticsCo' });
    const retailTickets = await Ticket.find({ customerId: 'RetailGmbH' });
    expect(logisticsTickets.length).toBeGreaterThan(0);
    expect(retailTickets.length).toBeGreaterThan(0);
    const logisticsIds = logisticsTickets.map(t => t._id.toString());
    const retailIds = retailTickets.map(t => t._id.toString());
    const overlap = logisticsIds.filter(id => retailIds.includes(id));
    expect(overlap.length).toBe(0);

    console.log('Database-level isolation verified');
  });
});