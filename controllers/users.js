  // exports the user controller as a module
  module.exports = function (_, passport, userValidation) {

        return {
            setRoute: function (router) {
                router.get('/', this.indexPage);
                router.get('/signup', this.signUpPage);
                router.get('/home', this.homePage);

                router.post('/signup', userValidation.signUpValidation, userValidation.signUpErrorCheck, this.postSignUp);
            },
            indexPage: function (req, res) {
                res.render('index');
            },
            signUpPage: function (req, res) {
                const errors = req.flash('error');
                res.render('signup', {title: 'SoccerHub | SignUp', messages: errors, hasErrors: errors.length > 0});
            },
            homePage: function (req, res) {
                res.render('home') ;
            },
            postSignUp: passport.authenticate('local-signup', { //authenticates the signup submission
                successRedirect: '/home',
                failureRedirect: '/signup',
                failureFlash: true
            }),
        }
  };