import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { apiRouter } from './router.js';

dotenv.config();

const app = express();
// Fallback to 5000 if PORT isn't defined in .env
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app
  .get('/', (req, res) => {
    res.send('Backend is running');
  })
  .use('/api', apiRouter);

if (!process.env.MONGO_URL) {
  throw new Error('Missing MONGO_URL in environment variables.');
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected');
    // ONLY start the server once the DB is connected
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Could not connect to MongoDB', err);
    process.exit(1); // Stop the app if DB fails
  });
