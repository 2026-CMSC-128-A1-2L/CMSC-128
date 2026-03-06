import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../models/user/User';
import { createUnverifiedStudent } from '../services/user';

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
      callbackURL: '/api/auth/google/student/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      if (!profile.emails || !profile.name) {
        return done('No email or name');
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

      try {
        return done(null, (await createUnverifiedStudent(params)) as any);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user._id.toHexString());
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  if (!user) {
    done('User not found');
  }

  done(null, user as any);
});

export default passport;
