import { type RequestHandler, Router } from 'express';
import passportGoogle from './google';
import { isDevelopment } from '../../middleware';
import { routeTestRegister, routeTestLogin } from './auth.controller';

const router = Router();

router.get(
  '/google',
  passportGoogle.authenticate('google', { scope: ['profile', 'email'] }) as RequestHandler,
);
router.get(
  '/google/callback',
  passportGoogle.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/',
  }) as RequestHandler,
);

// creation of fake accounts endpoints
router.post('/test/register', isDevelopment, routeTestRegister);
router.post('/test/login', isDevelopment, routeTestLogin);

export default router;
