import { type RequestHandler, Router } from 'express';
import passportGoogle from './google.js';
import { isDevelopment } from '../../middleware.js';
import { routeLogout, routeTestRegister, routeTestLogin } from './auth.controller.js';

const router = Router();

const getFrontendUrl = (path: string) => {
  const frontendOrigin = process.env.FRONTEND_URL ?? 'http://localhost:5173';
  return new URL(path, frontendOrigin).toString();
};

router.get(
  '/google',
  passportGoogle.authenticate('google', { scope: ['profile', 'email'] }) as RequestHandler,
);

router.get('/google/callback', (req, res, next) => {
  // biome-ignore lint/suspicious/noExplicitAny: idk the type of this
  passportGoogle.authenticate('google', (err: any, user: any, _info: any) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect(getFrontendUrl('/'));
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      if (user.status === 'setup') {
        return res.redirect(getFrontendUrl('/registration'));
      } else {
        return res.redirect(getFrontendUrl('/home'));
      }
    });
  })(req, res, next);
});

router.post('/logout', routeLogout);

// creation of fake accounts endpoints
router.post('/test/register', isDevelopment, routeTestRegister);
router.post('/test/login', isDevelopment, routeTestLogin);

export default router;
