
  const passport = require('passport');
  const User = require('../models/user');
  const GoogleStrategy = require('passport-google-oauth2').Strategy;
  const secret = require('../secret/credentials');


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
  passport.use( new GoogleStrategy({
      clientID: secret.google.clientID,
      clientSecret: secret.google.clientSecret,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      passReqToCallback: true
  }, ((req, accessToken, refreshToken, profile, done) => {
      // checks if the email already exist

      User.findOne({google:profile.id}, (err, user) => {
          if(err){
              return done(err);
          }

          if(user){
              return done(null, user);
          }else{
              const newUser = new User();
              newUser.google = profile.id;
              newUser.fullname = profile.displayName;
              newUser.username = profile.displayName;
              newUser.email = profile.emails[0].value;
              newUser.userimage = profile.photos[0].value;

              newUser.save((err) => {
                  if(err){
                      return done(err)
                  }
                  return done(null, newUser);
              })
          }
      })
  })));

