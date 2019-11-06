  // exports the user controller as a module
  module.exports = function (_, passport) {

        return {
            setRoute: function (router) {
                router.get('/', this.indexPage);
                router.get('/signup', this.signUpPage);
                router.get('/home', this.homePage);

                router.post('/signup', this.postSignUp);
            },
            indexPage: function (req, res) {
                res.render('index');
            },
            signUpPage: function (req, res) {
                res.render('signup');
            },
            homepage: function (req, res) {
                res.render('home') ;
            },
            postSignUp: passport.authenticate('local-signup', { //authenticates the signup submission
                successRedirect: '/home',
                failureRedirect: '/signup',
                failureFlash: true
            }),
        }
  };