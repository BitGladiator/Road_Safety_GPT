const bcrypt = require('bcrypt');
const User = require('../models/User');

async function inviteEmployee(data, inviter) {
  const { email, firstName, lastName, role, department, phone } = data;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already registered');
  }
  const tempPassword = Math.random().toString(36).slice(-8);
  const hashedPassword = await bcrypt.hash(tempPassword, 10);

  const employee = await User.create({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    customerId: inviter.customerId,
    role: role || 'User',
    department,
    phone,
    invitedBy: inviter.userId
  });

  console.log(`Employee invited: ${email} by ${inviter.email}`);
  return {
    employee: employee.toJSON(),
    tempPassword, 
    message: 'Employee invited successfully. Temporary password generated.'
  };
}

async function getAllEmployees(customerId) {
  return await User.find({ customerId }).select('-password').sort({ createdAt: -1 });
}

async function updateEmployee(employeeId, updates, updater) {
  const allowedUpdates = ['firstName', 'lastName', 'department', 'phone', 'avatar'];
  if (updater.role === 'Admin') {
    allowedUpdates.push('role', 'active');
  }

  const filteredUpdates = {};
  Object.keys(updates).forEach(key => {
    if (allowedUpdates.includes(key)) {
      filteredUpdates[key] = updates[key];
    }
  });

  const employee = await User.findOneAndUpdate(
    {
      _id: employeeId,
      customerId: updater.customerId
    },
    filteredUpdates,
    { new: true, runValidators: true }
  ).select('-password');

  if (!employee) {
    throw new Error('Employee not found');
  }

  console.log(`Employee updated: ${employee.email}`);
  return employee;
}

async function deleteEmployee(employeeId, deleter) {
  if (employeeId === deleter.userId) {
    throw new Error('Cannot delete your own account');
  }

  const employee = await User.findOneAndDelete({
    _id: employeeId,
    customerId: deleter.customerId
  });

  if (!employee) {
    throw new Error('Employee not found');
  }

  console.log(`Employee deleted: ${employee.email} by ${deleter.email}`);
  return { message: 'Employee deleted successfully' };
}

module.exports = {
  inviteEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee
};