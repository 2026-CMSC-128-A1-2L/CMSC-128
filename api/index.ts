import '../backend/src/config.js';
import mongoose from 'mongoose';
import { getApp } from '../backend/src/app';

if (!process.env.MONGO_URL) {
  throw new Error('Missing MONGO_URL in environment variables.');
}

await mongoose.connect(process.env.MONGO_URL);
console.log('MongoDB connected');

const app = getApp({});
export default app;
