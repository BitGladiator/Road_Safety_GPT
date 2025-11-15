const fs = require('fs');
const path = require('path');
let registry = {};

try {
  const registryPath = path.join(__dirname, '../registry.json');
  const registryData = fs.readFileSync(registryPath, 'utf8');
  registry = JSON.parse(registryData);
  console.log('Registry loaded:', Object.keys(registry));
} catch (error) {
  console.warn('Failed to load registry.json:', error.message);
}

function getScreensForCustomer(customerId) {
  const screens = registry[customerId] || [];
  console.log(`Screens for ${customerId}:`, screens.length);
  return screens;
}

module.exports = { getScreensForCustomer };