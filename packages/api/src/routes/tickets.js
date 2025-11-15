const express = require('express');
const Ticket = require('../models/Ticket');
const authenticateToken = require('../middleware/auth');
const { triggerN8nWorkflow } = require('../services/n8nService');
const router = express.Router();
router.use(authenticateToken);
router.get('/', async (req, res) => {
  try {
    let query = { customerId: req.user.customerId };
    if (req.user.role !== 'Admin') {
      query.createdBy = req.user.userId;
    }

    const tickets = await Ticket.find(query)
      .populate('createdBy', 'email firstName lastName')
      .sort({ createdAt: -1 }); 

    console.log(`Fetched ${tickets.length} tickets for ${req.user.email}`);
    res.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      _id: req.params.id,
      customerId: req.user.customerId 
    }).populate('createdBy', 'email');

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    if (!title || !description) {
      return res.status(400).json({ 
        error: 'Title and description are required' 
      });
    }
    const ticket = await Ticket.create({
      customerId: req.user.customerId,
      title,
      description,
      priority: priority || 'medium',
      createdBy: req.user.userId,
      status: 'pending'
    });

    console.log(`Ticket created: ${ticket._id} for ${req.user.customerId}`);
    triggerN8nWorkflow({
      ticketId: ticket._id.toString(),
      customerId: req.user.customerId,
      title: ticket.title,
      description: ticket.description
    }).catch(err => console.error('n8n trigger failed:', err));

    res.status(201).json(ticket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(400).json({ error: error.message });
  }
});
router.patch('/:id', async (req, res) => {
  try {
    const { status, priority } = req.body;

    const ticket = await Ticket.findOneAndUpdate(
      {
        _id: req.params.id,
        customerId: req.user.customerId 
      },
      { status, priority },
      { new: true, runValidators: true }
    );

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    console.log(`Ticket updated: ${ticket._id}`);
    res.json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findOneAndDelete({
      _id: req.params.id,
      customerId: req.user.customerId 
    });

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    console.log(`Ticket deleted: ${ticket._id}`);
    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;