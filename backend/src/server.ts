import './config.js';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { apiRouter } from './router.js';
import session from 'express-session';
import passport from 'passport';
import { createProxyMiddleware } from 'http-proxy-middleware';
import conn from 'connect-mongodb-session';

const MongoDBStore = conn(session);

const app = express();
// Fallback to 5000 if PORT isn't defined in .env
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

if (!process.env.SESSION_SECRET) {
  throw new Error('Missing SESSION_SECRET in environment variables.');
}

if (!process.env.MONGO_URL) {
  throw new Error('Missing MONGO_URL in environment variables.');
}

var store = new MongoDBStore({
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
