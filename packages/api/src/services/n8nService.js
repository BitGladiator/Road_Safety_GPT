const axios = require('axios');

async function triggerN8nWorkflow(data) {
  try {
    const n8nUrl = process.env.N8N_WEBHOOK_URL;
    
    if (!n8nUrl) {
      console.warn('N8N_WEBHOOK_URL not configured');
      return { success: false, message: 'n8n not configured' };
    }

    console.log(`Triggering n8n workflow for ticket ${data.ticketId}`);

    const response = await axios.post(n8nUrl, data, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 5000
    });

    console.log('n8n workflow triggered successfully');
    return { success: true, data: response.data };
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.warn('n8n service not available (this is OK for now)');
    } else {
      console.error('Failed to trigger n8n workflow:', error.message);
    }
    return { success: false, error: error.message };
  }
}

module.exports = { triggerN8nWorkflow };