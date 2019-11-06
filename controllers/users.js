  // exports the user controller as a module
  module.exports = function (_) {

        return {
            setRoute: function (router) {
                router.get('/', this.indexPage);
                router.get('/signup', this.signUpPage);
            },
            indexPage: function (req, res) {
                res.render('index');
            },
            signUpPage: function (req, res) {
                res.render('signup');
            }
        }
  };