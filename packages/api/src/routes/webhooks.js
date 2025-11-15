const express = require('express');
const Ticket = require('../models/Ticket');
const verifyWebhookSecret = require('../middleware/webhookAuth');
const router = express.Router();
router.post('/ticket-done', verifyWebhookSecret, async (req, res) => {
  try {
    const { ticketId, status } = req.body;

    if (!ticketId) {
      return res.status(400).json({ error: 'ticketId is required' });
    }

    console.log(`Webhook received for ticket ${ticketId}`);
    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      { status: status || 'processing' },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    console.log(`Ticket ${ticketId} updated to status: ${ticket.status}`);
    res.json({ success: true, ticket });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;