function verifyWebhookSecret(req, res, next) {
  const secret = req.headers['x-webhook-secret'];
  
  if (!secret) {
    return res.status(401).json({ error: 'Missing webhook secret' });
  }

  if (secret !== process.env.WEBHOOK_SECRET) {
    console.error('Invalid webhook secret received');
    return res.status(403).json({ error: 'Invalid webhook secret' });
  }

  console.log('Webhook authenticated');
  next();
}

module.exports = verifyWebhookSecret;