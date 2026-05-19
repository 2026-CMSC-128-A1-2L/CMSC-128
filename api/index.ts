import '../backend/src/config.js';
import mongoose from 'mongoose';
import { getApp } from '../backend/src/app.js';

let connectPromise: Promise<typeof mongoose> | null = null;

const connectMongo = () => {
  if (!process.env.MONGO_URL) {
    throw new Error('Missing MONGO_URL in environment variables.');
  }

  if (!connectPromise) {
    connectPromise = mongoose.connect(process.env.MONGO_URL);
  }

  return connectPromise;
};

const app = getApp({});

export default async function handler(
  req: Parameters<typeof app>[0],
  res: Parameters<typeof app>[1],
) {
  await connectMongo();
  return app(req, res);
}
