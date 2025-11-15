const express = require('express');
const authenticateToken = require('../middleware/auth');
const { getScreensForCustomer } = require('../services/screenService');
const router = express.Router();
router.use(authenticateToken);
router.get('/screens', (req, res) => {
  try {
    const screens = getScreensForCustomer(req.user.customerId);
    res.json(screens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/profile', (req, res) => {
  res.json({
    userId: req.user.userId,
    email: req.user.email,
    customerId: req.user.customerId,
    role: req.user.role
  });
});

module.exports = router;