
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
  }, ((req, email, password, done) => {
      // checks if the email already exist
      User.findOne({'email': email}, ((err, user) => {
          if (err) {
              /**
               * the error here is different from the normal error of not finding the user for example, err here
               * may result from network connection etc
               */
                return done(err);
          }

          if (user) {
              // the user email already exist in the database
              return done(null, false, req.flash('error', 'User with email already exist'))
          } else {

              let newUser = new User();
              newUser.username = req.body.username;
              newUser.email = req.body.email;
              newUser.password = newUser.encryptPassword(req.body.password);

              newUser.save((err, newUser) => {
                 done(null, newUser)
              });
          }
      }))

  })));

  passport.use('local-login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
  }, (req, email, password, done) => {

      User.findOne({'email': email}, (err, user) => {
          if(err){
              return done(err);
          }

          const messages = [];
          if(!user || !user.validateUserPassword(password)){
              messages.push('Email Does Not Exist or Password is Invalid');
              return done(null, false, req.flash('error', messages));
          }

          return done(null, user);
      });
  }));
