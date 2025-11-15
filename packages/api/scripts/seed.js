require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Customer = require('../src/models/Customer');
const User = require('../src/models/User');
const Ticket = require('../src/models/Ticket');

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/flowbit');
    console.log('Connected to MongoDB');
    console.log('Clearing existing data...');
    await Customer.deleteMany({});
    await User.deleteMany({});
    await Ticket.deleteMany({});
    console.log('Creating customers...');
    const customers = await Customer.create([
      {
        _id: 'LogisticsCo',
        name: 'Logistics Company Inc.',
        plan: 'enterprise'
      },
      {
        _id: 'RetailGmbH',
        name: 'Retail GmbH',
        plan: 'pro'
      }
    ]);
    console.log('Created 2 customers');
    console.log('Creating users...');
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const users = await User.create([
      {
        email: 'admin@logisticsco.com',
        password: hashedPassword,
        customerId: 'LogisticsCo',
        role: 'Admin',
        firstName: 'John',
        lastName: 'Doe'
      },
      {
        email: 'user@logisticsco.com',
        password: hashedPassword,
        customerId: 'LogisticsCo',
        role: 'User',
        firstName: 'Jane',
        lastName: 'Smith'
      },
      {
        email: 'admin@retailgmbh.com',
        password: hashedPassword,
        customerId: 'RetailGmbH',
        role: 'Admin',
        firstName: 'Michael',
        lastName: 'Brown'
      },
      {
        email: 'user@retailgmbh.com',
        password: hashedPassword,
        customerId: 'RetailGmbH',
        role: 'User',
        firstName: 'Sarah',
        lastName: 'Johnson'
      }
    ]);
    console.log('Created 4 users (2 per tenant)');
    console.log('Creating sample tickets...');
    const tickets = await Ticket.create([
      {
        customerId: 'LogisticsCo',
        title: 'Shipment tracking not updating',
        description: 'The tracking page shows old information',
        status: 'pending',
        createdBy: users[1]._id, 
        priority: 'high'
      },
      {
        customerId: 'LogisticsCo',
        title: 'Need help with API integration',
        description: 'How do I integrate with the shipping API?',
        status: 'resolved',
        createdBy: users[1]._id,
        priority: 'medium'
      },
      {
        customerId: 'RetailGmbH',
        title: 'Inventory sync failed',
        description: 'Products not syncing with warehouse system',
        status: 'processing',
        createdBy: users[3]._id,
        priority: 'high'
      },
      {
        customerId: 'RetailGmbH',
        title: 'Add new payment method',
        description: 'We need to accept cryptocurrency payments',
        status: 'pending',
        createdBy: users[3]._id,
        priority: 'low'
      }
    ]);
    console.log('Created 4 sample tickets (2 per tenant)');
    console.log('\nSeed Summary:');
    console.log('   Customers: 2 (LogisticsCo, RetailGmbH)');
    console.log('   Users: 4 (1 Admin + 1 User per customer)');
    console.log('   Tickets: 4 (2 per customer)');
    console.log('\nTest Credentials:');
    console.log('   LogisticsCo Admin: admin@logisticsco.com / password123');
    console.log('   LogisticsCo User:  user@logisticsco.com / password123');
    console.log('   RetailGmbH Admin:  admin@retailgmbh.com / password123');
    console.log('   RetailGmbH User:   user@retailgmbh.com / password123');

    console.log('\nDatabase seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed Error:', error);
    process.exit(1);
  }
}

seedDatabase();