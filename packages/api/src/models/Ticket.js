const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  customerId: { 
    type: String, 
    required: true, 
    index: true  
  },
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  description: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'resolved'],
    default: 'pending'
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  }
}, { 
  timestamps: true 
});
ticketSchema.index({ customerId: 1, status: 1 });

module.exports = mongoose.model('Ticket', ticketSchema);