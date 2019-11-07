
  const passport = require('passport');
  const User = require('../models/user');
  const FacebookStrategy = require('passport-facebook').Strategy;
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
  passport.use( new FacebookStrategy({
      clientID: secret.facebook.clientID,
      clientSecret: secret.facebook.clientSecret,
      profileFields: ['email', 'displayName', 'photos'],
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      passReqToCallback: true
  }, ((req, token, refreshToken, profile, done) => {
      // checks if the email already exist
      User.findOne({facebook: profile.id}, (err, user) => {
          if(err){
              return done(err);
          }

          if(user){
              return done(null, user);

          } else{
              const newUser = new User();
              newUser.facebook = profile.id;
              newUser.fullname = profile.displayName;
              newUser.username = profile.displayName;
              newUser.email = profile._json.email;
              newUser.userimage = 'https://graph.facebook.com/'+profile.id+'/picture?type=large';
              newUser.fbTokens.push({token:token});

              newUser.save((err) => {
                  return done(null, newUser);
              })
          }
      })
  })));

