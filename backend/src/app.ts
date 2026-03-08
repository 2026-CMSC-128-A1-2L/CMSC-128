import cors from 'cors';
import express from 'express';
import { apiRouter } from './router.js';
import session from 'express-session';
import passport from 'passport';
import { createProxyMiddleware } from 'http-proxy-middleware';
import conn from 'connect-mongodb-session';

const MongoDBStore = conn(session);

export const getApp = (envOverride: Record<string, string>) => {
  process.env = { ...process.env, ...envOverride };

  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  if (!process.env.SESSION_SECRET) {
    throw new Error('Missing SESSION_SECRET in environment variables.');
  }

  if (!process.env.MONGO_URL) {
    throw new Error('Missing MONGO_URL in environment variables.');
  }

  const store = new MongoDBStore({
    uri: process.env.MONGO_URL,
    collection: 'sessions',
  });

  store.on('error', function (error) {
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

  // just proxy to simplify instead of figuring out how to have credentials work cross-site
  const proxy = createProxyMiddleware({
    target: {
      protocol: 'http',
      port: 5173,
      host: 'localhost',
    },
    changeOrigin: true,
    ws: true,
  });

  app.use('/', proxy);

  return app;
};
