import mongoose from 'mongoose';
import { getApp } from '../backend/src/app.js';

let cachedApp: any = null;

export default async function handler(req: any, res: any) {
  if (!cachedApp) {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      console.error('Missing MONGO_URL in environment variables');
      return res.status(500).json({ error: 'Database configuration missing' });
    }

    try {
      if (mongoose.connection.readyState === 0) {
        await mongoose.connect(mongoUrl);
        console.log('MongoDB connected to', mongoUrl.split('@').pop());
      }
      cachedApp = getApp({});
    } catch (err) {
      console.error('Failed to connect to MongoDB:', err);
      return res.status(500).json({ error: 'Database connection failed' });
    }
  }

  return cachedApp(req, res);
}
