const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const foundUser = await User.findById(id);
    done(null, foundUser);
  } catch (err) {
    console.log(err);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: `${keys.googleRedirectURI}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ googleId: profile.id });
        if (user) {
          done(null, user);
        } else {
          const newUser = await User.create({ googleId: profile.id });
          done(null, newUser);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);

module.exports = passport;
