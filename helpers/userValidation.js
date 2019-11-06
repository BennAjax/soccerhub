
  const { check, validationResult } = require('express-validator');
  
  module.exports = function () {
      return {
          signUpValidation: [
              check('username', 'Username is Required').not().isEmpty(),
              check('username', 'Username Must Not Be Less Than 5').isLength({min: 5}),
              check('email', 'Email is Required').not().isEmpty(),
              check('email', 'Email is Invalid').isEmail(),
              check('password', 'Password is Required').not().isEmpty(),
              check('password', 'Password Must Not Be Less Than 5').isLength({min: 5})
          ],
          signUpErrorCheck: function (req, res, next) {

              let errors = validationResult(req);
              if (!errors.isEmpty()) {
                  //return res.status(422).json({ errors: errors.array() });
                  const arrayErrors = errors.array();
                  const messages = [];
                  arrayErrors.forEach((error) => {
                      messages.push(error.msg);
                  });

                  req.flash('error', messages);
                  res.redirect('/signup');
              } else {
                  return next();
              }
          },

          loginValidation : [
              check('email', 'Email is Required').not().isEmpty(),
              check('email', 'Email is Invalid').isEmail(),
              check('password', 'Password is Required').not().isEmpty(),
              check('password', 'Password Must Not Be Less Than 5').isLength({min: 5})
          ],

          loginErrorCheck: function (req, res, next) {

              let errors = validationResult(req);
              if (!errors.isEmpty()) {
                  //return res.status(422).json({ errors: errors.array() });
                  const arrayErrors = errors.array();
                  const messages = [];
                  arrayErrors.forEach((error) => {
                      messages.push(error.msg);
                  });

                  req.flash('error', messages);
                  res.redirect('/');
              } else {
                  return next();
              }
          }
      }
  };