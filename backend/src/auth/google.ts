import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../models/user/User';

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

      const searchQuery = {
        email: profile.emails[0].value,
      };

      const updates = {
        firstName: profile.name.givenName,
        middleName: profile.name.middleName,
        lastName: profile.name.familyName,
        userType: 'student',
        email: profile.emails[0].value,
        auth: {
          google: profile.id,
        },
        profilePicture: profile.profileUrl,
      };

      try {
        const userResult = await User.findOneAndUpdate(searchQuery, updates, {
          returnDocument: 'after',
          upsert: true,
          includeResultMetadata: true,
        });

        console.log(userResult);
        const user = userResult.value;

        if (!user) {
          throw new Error('User should not be null after upsert');
        }

        // upsert
        return done(null, {
          id: user._id.toHexString(),
          email: user.email,
          userType: user.userType,
        });
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  if (!user) {
    done('User not found');
  }

  done(null, user);
});

export default passport;
