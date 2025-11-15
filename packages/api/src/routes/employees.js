const express = require('express');
const User = require('../models/User');
const authenticateToken = require('../middleware/auth');
const requireRole = require('../middleware/rbac');
const { inviteEmployee, getAllEmployees, updateEmployee, deleteEmployee } = require('../services/employeeService');
const router = express.Router();

router.use(authenticateToken);
router.get('/', async (req, res) => {
  try {
    const employees = await User.find({ 
      customerId: req.user.customerId 
    }).select('-password').sort({ createdAt: -1 });

    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: error.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const employee = await User.findOne({
      _id: req.params.id,
      customerId: req.user.customerId
    }).select('-password');

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/invite', requireRole('Admin'), async (req, res) => {
  try {
    const result = await inviteEmployee(req.body, req.user);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    if (req.user.role !== 'Admin' && req.user.userId !== req.params.id) {
      return res.status(403).json({ error: 'Permission denied' });
    }

    const result = await updateEmployee(req.params.id, req.body, req.user);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.delete('/:id', requireRole('Admin'), async (req, res) => {
  try {
    const result = await deleteEmployee(req.params.id, req.user);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;