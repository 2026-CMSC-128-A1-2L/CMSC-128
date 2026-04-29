import { type RequestHandler, Router } from 'express';
import passportGoogle from './google';
import { isDevelopment } from '../../middleware';
import { routeTestRegister, routeTestLogin } from './auth.controller';

const router = Router();

router.get(
  '/google',
  passportGoogle.authenticate('google', { scope: ['profile', 'email'] }) as RequestHandler,
);

router.get('/google/callback', (req, res, next) => {
  passportGoogle.authenticate('google', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect('/');
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      if (user.status === 'setup') {
        return res.redirect('/registration');
      } else {
        return res.redirect('/home');
      }
    });
  })(req, res, next);
});

// creation of fake accounts endpoints
router.post('/test/register', isDevelopment, routeTestRegister);
router.post('/test/login', isDevelopment, routeTestLogin);

export default router;
