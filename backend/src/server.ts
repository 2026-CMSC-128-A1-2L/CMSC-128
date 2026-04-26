import './config.js';
import mongoose from 'mongoose';
import { getApp } from './app.js'; 

// Connect to MongoDB
if (!process.env.MONGO_URL) {
  throw new Error('Missing MONGO_URL in environment variables.');
}

// It's safer to connect without top-level await if you run into Vercel execution issues, 
// but if this works locally, keep your try/catch logic.
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

const app = getApp({});

// LOCAL DEV ONLY: Listen on a port
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// VERCEL REQUIREMENT: You MUST export the app 
export default app;