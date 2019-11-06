
  const passport = require('passport');
  const User = require('../models/user');
  const LocalStrategy = require('passport-local').Strategy;

  /**
   * Determines which user data would be saved in the session and this case we use the userId
   */
  passport.serializeUser((user, done) => {
      done(null, user.id); // done - callback
  });

  /**
   * Uses the userId saved in the session to retrieve the user from the database
   */
  passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => {
          done(err, user);
      });
  });

  /**
   * Adds passport middleware that allows the user signup
   */
  passport.use('local-signup', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
  }, ((req, username, password, done) => {
      // checks if the email already exist

  })));
