// src/scripts/setWebhook.ts
const axios = require('axios');
const dotenv =require ('dotenv');

dotenv.config();

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const WEBHOOK_URL = process.env.BASE_URL;

async function setWebhook() {
  if (!BOT_TOKEN || !WEBHOOK_URL) {
    console.error('Error: BOT_TOKEN or WEBHOOK_URL not found in environment variables');
    process.exit(1);
  }

  try {
    const response = await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`, {
      url: WEBHOOK_URL,
      drop_pending_updates: true
    });

    console.log('Webhook set successfully:', response.data);
  } catch (error) {
    console.error('Error setting webhook:', error.response?.data || error.message);
  }
}

setWebhook();