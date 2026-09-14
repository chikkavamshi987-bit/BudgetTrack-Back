import express from 'express';
import { getAccessToken, sendFirebaseNotification } from '../config/firebase.js';
import protectRoute from '../middleware/protectRoute.js';
import User from '../models/UserSchema.js';

const app = express.Router();

app.post('/save-fcm-token', protectRoute, async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ success: false, message: 'FCM token is required' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.fcmToken = token;
    await user.save();

    return res.json({
      success: true,
      message: 'FCM token saved for user',
      data: { userId: user._id, email: user.email }
    });
  } catch (error) {
    console.error('Error saving FCM token:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

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
    console.log('Notification sent successfully:', { token, title, body })
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default app;
