const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function login(email, password) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }
    if (!user.active) {
      throw new Error('Account is inactive');
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }
    const token = jwt.sign(
      { 
        userId: user._id.toString(),
        customerId: user.customerId,
        role: user.role,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log(`User logged in: ${email} (${user.customerId})`);

    return { 
      token,
      user: {
        id: user._id,
        email: user.email,
        customerId: user.customerId,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName
      }
    };
  } catch (error) {
    console.error('Login error:', error.message);
    throw error;
  }
}

async function register(email, password, customerId, role = 'User', firstName, lastName) {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      email,
      password: hashedPassword,
      customerId,
      role,
      firstName: firstName || 'User',
      lastName: lastName || 'Name'
    });

    console.log(`User registered: ${email} (${customerId})`);

    return {
      id: user._id,
      email: user.email,
      customerId: user.customerId,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName
    };
  } catch (error) {
    console.error('Registration error:', error.message);
    throw error;
  }
}

module.exports = { login, register };