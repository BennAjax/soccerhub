  // exports the user controller as a module
  module.exports = function (_, passport, userValidation) {

        return {
            setRoute: function (router) {
                router.get('/', this.indexPage);
                router.get('/signup', this.signUpPage);
                router.get('/home', this.homePage);
                router.get('/auth/facebook', this.getFacebookLogin);
                router.get('/auth/facebook/callback', this.facebookLogin);
                router.get('/auth/google', this.getGoogleLogin);
                router.get('/auth/google/callback', this.googleLogin);

                router.post('/',userValidation.loginValidation, userValidation.loginErrorCheck, this.postLogin);
                router.post('/signup', userValidation.signUpValidation, userValidation.signUpErrorCheck, this.postSignUp);
            },

            indexPage: function (req, res) {
                const errors = req.flash('error');
                res.render('index', {title: 'SoccerHub | SignUp', messages: errors, hasErrors: errors.length > 0});
            },

            signUpPage: function (req, res) {
                const errors = req.flash('error');
                res.render('signup', {title: 'SoccerHub | SignUp', messages: errors, hasErrors: errors.length > 0});
            },

            homePage: function (req, res) {
                res.render('home') ;
            },

            postLogin: passport.authenticate('local-login', {
                successRedirect: '/home',
                failureRedirect: '/',
                failureFlash: true
            }),

            postSignUp: passport.authenticate('local-signup', { //authenticates the signup submission
                successRedirect: '/home',
                failureRedirect: '/signup',
                failureFlash: true
            }),

            getFacebookLogin: passport.authenticate('facebook', {
                scope: 'email'
            }),

            getGoogleLogin: passport.authenticate('google', {
                scope: [ 'https://www.googleapis.com/auth/userinfo.profile',
                    'https://www.googleapis.com/auth/userinfo.email' ]
            }),

            googleLogin: passport.authenticate('google', {
                successRedirect: '/home',
                failureRedirect: '/signup',
                failureFlash: true
            }),

            facebookLogin: passport.authenticate('facebook', {
                successRedirect: '/home',
                failureRedirect: '/signup',
                failureFlash: true
            })
        }
  };