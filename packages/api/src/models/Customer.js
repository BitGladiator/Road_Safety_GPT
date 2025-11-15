const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  _id: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  plan: { 
    type: String, 
    enum: ['free', 'pro', 'enterprise'], 
    default: 'free' 
  },
  active: { 
    type: Boolean, 
    default: true 
  }
}, { 
  timestamps: true  
});

module.exports = mongoose.model('Customer', customerSchema);