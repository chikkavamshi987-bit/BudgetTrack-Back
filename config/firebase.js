import fs from 'fs';
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';

const serviceAccountPath = './serviceAccountKey.json';

if (getApps().length === 0) {
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

  initializeApp({
    credential: cert(serviceAccount),
  });
}

export async function getAccessToken() {
  return 'firebase-service-account-token-ready';
}

export async function sendFirebaseNotification({ token, title, body }) {
  if (!token) {
    throw new Error('FCM token is required');
  }

  const message = {
    notification: { title, body },
    token,
  };

  return getMessaging().send(message);
}
