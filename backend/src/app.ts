import cors from 'cors';
import express from 'express';
import { apiRouter } from './router.js';
import session from 'express-session';
import passport from 'passport';
import conn from 'connect-mongodb-session'; // ← remove http-proxy-middleware import
const MongoDBStore = conn(session);

export const getApp = (envOverride: Record<string, string>) => {
  process.env = { ...process.env, ...envOverride };
  const app = express();

  app.set('trust proxy', 1);

  app.use(
    cors({
      origin: (origin, callback) => {
        const allowedOrigins = [
          'http://localhost:5173',
          'http://localhost:5001',
          process.env.FRONTEND_URL,
        ].filter(Boolean);

        if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
    }),
  );
  app.use(express.json());

  if (!process.env.SESSION_SECRET) {
    throw new Error('Missing SESSION_SECRET in environment variables.');
  }
  if (!process.env.MONGO_URL) {
    throw new Error('Missing MONGO_URL in environment variables.');
  }
  if (!process.env.PUSHER_APP_ID) {
    throw new Error('Missing PUSHER_APP_ID in environment variables.');
  }
  if (!process.env.PUSHER_KEY) {
    throw new Error('Missing PUSHER_KEY in environment variables.');
  }
  if (!process.env.PUSHER_SECRET) {
    throw new Error('Missing PUSHER_SECRET in environment variables.');
  }
  if (!process.env.PUSHER_CLUSTER) {
    throw new Error('Missing PUSHER_CLUSTER in environment variables.');
  }

  const store = new MongoDBStore({
    uri: process.env.MONGO_URL,
    collection: 'sessions',
  });
  store.on('error', (error) => {
    console.error(error);
  });

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: store,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use('/api', apiRouter);

  // ← proxy removed entirely, Vite handles this now

  return app;
};
