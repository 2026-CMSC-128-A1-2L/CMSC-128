import './config.js';
import mongoose from 'mongoose';
import { getApp } from './app';

// Connect to MongoDB
try {
  if (!process.env.MONGO_URL) {
    throw new Error('Missing MONGO_URL in environment variables.');
  }

  await mongoose.connect(process.env.MONGO_URL);
  console.log('MongoDB connected');

  const app = getApp({});

  // use 5000 as fallback
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (err) {
  console.error('Could not connect to MongoDB', err);
  process.exit(1); // Stop the app if DB fails
}
