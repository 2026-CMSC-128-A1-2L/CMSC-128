import { type RequestHandler, Router } from 'express';
import passportGoogle from './google';
import { isDevelopment } from '../../middleware';
import { routeTestRegister, routeTestLogin } from './auth.controller';

const router = Router();

router.get(
  '/google/student',
  passportGoogle.authenticate('google', { scope: ['profile', 'email'] }) as RequestHandler,
);
router.get(
  '/google/student/callback',
  passportGoogle.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/',
  }) as RequestHandler,
);

// creation of fake accounts endpoints
router.post('/test/register', isDevelopment, routeTestRegister);
router.post('/test/login', isDevelopment, routeTestLogin);

export default router;
