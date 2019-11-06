  // exports the user controller as a module
  module.exports = function (_) {

        return {
            setRoute: function (router) {
                router.get('/', this.indexPage);
            },
            indexPage: function (req, res) {
                res.render('index',{test: "Just"})
            }
        }
  };