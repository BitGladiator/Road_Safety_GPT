const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true 
  },
  customerId: { 
    type: String, 
    required: true, 
    index: true 
  },
  role: { 
    type: String, 
    enum: ['Admin', 'User'], 
    default: 'User' 
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  avatar: {
    type: String
  },
  active: { 
    type: Boolean, 
    default: true 
  },
  invitedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  lastLogin: {
    type: Date
  }
}, { 
  timestamps: true 
});

userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

userSchema.methods.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

module.exports = mongoose.model('User', userSchema);