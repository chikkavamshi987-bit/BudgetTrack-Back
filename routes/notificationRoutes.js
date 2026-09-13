import express from 'express';
import { getAccessToken, sendFirebaseNotification } from '../config/firebase.js';

const app = express.Router();

app.post('/send-notification', async (req, res) => {
  try {
    const { token, title, body } = req.body;
    const result = await getAccessToken();

    await sendFirebaseNotification({ token, title, body });

    res.json({
      success: true,
      message: 'Notification sent',
      result
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default app;
