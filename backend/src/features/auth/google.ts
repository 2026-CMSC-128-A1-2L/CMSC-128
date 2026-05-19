import '../../config.js';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../user/user.model.js';
import { createUser, type CreateUserParams } from '../user/user.service.js';

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error('Missing GOOGLE_CLIENT_ID in environment variables.');
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing GOOGLE_CLIENT_SECRET in environment variables.');
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.BACKEND_URL
        ? `${process.env.BACKEND_URL.replace(/\/$/, '')}/api/auth/google/callback`
        : '/api/auth/google/callback',
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      if (!profile.emails || profile.emails.length === 0 || !profile.name) {
        done('No email or name');
        return;
      }

      const params: CreateUserParams = {
        firstName: profile.name.givenName,
        middleName: profile.name.middleName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        auth: {
          google: profile.id,
        },
        profilePicture: profile.profileUrl,
      };

      createUser(params)
        .then((user) => done(null, user as Express.User))
        .catch((err) => done(err));
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user._id.toHexString());
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .lean()
    .then((user) => {
      if (!user) {
        done('User not found');
      } else {
        done(null, user as Express.User);
      }
    })
    .catch((e) => done(e));
});

export default passport;
