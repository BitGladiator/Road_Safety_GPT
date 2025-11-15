const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/tickets');
const userRoutes = require('./routes/users');
const webhookRoutes = require('./routes/webhooks');
const employeeRoutes = require('./routes/employees');
const app = express();
app.use(cors()); 
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/me', userRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/webhook', webhookRoutes);
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;