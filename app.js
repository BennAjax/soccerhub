
  const express = require('express');
  const bodyParser = require('body-parser');
  const ejs = require('ejs');
  const http = require('http');
  const path = require('path');
  const cookieParser = require('cookie-parser');
  const validator = require('express-validator');
  const session = require('express-session');
  const MongoStore = require('connect-mongo')(session);
  const mongoose = require('mongoose');
  const flash = require('connect-flash');
  const passport = require('passport');

  const injector =  require('./injector');


  injector.resolve(function (users, _, admin) {
      // initialize mongodb connection with mongoose
      mongoose.Promise = global.Promise; // Not needed for mongoose v5 upwards
      mongoose.connect('mongodb://localhost:27017/soccerhub', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          autoIndex: false,
      }).then(() => { console.log('Successfully connected to MongoDb')})
          .catch(error => console.log('Could not connect to MongoDb'));


      // initialize express setup
      const app = setupExpress();

      function setupExpress() {
          const app = express();
          const server = http.createServer(app);
          server.listen(3000, function () {
             console.log('listening on port 3000')
          });

          // initialize express configuration
          expressConfig(app);

          // setup the application router
          const router = require('express-promise-router')();
          users.setRoute(router);
          admin.setRoute(router);

          // add router as a middleware
          app.use(router);
      }

      function expressConfig(app) {
          // require passport here for authentication
          require('./passport/passport-local');
          require('./passport/passport-facebook');
          require('./passport/passport-google');


          // statically render every file in the public directory
          app.use(express.static('public'));
          // cookieParser setup
          app.use(cookieParser());
          // view engine setup
          app.set('views', path.join(__dirname, 'views'));
          app.set('view engine', 'ejs');
          // bodyParser setup
          app.use(bodyParser.json());
          app.use(bodyParser.urlencoded({ extended: false }));

         // app.use(validator());
          app.use(session({
              secret: 'mysecret',
              resave: false,
              saveUninitialized: false,
              store: new MongoStore({ mongooseConnection: mongoose.connection})
          }));

          // middleware for flash messages
          app.use(flash());

          /**
           * Initialize passport, must be added after session for function properly because it makes use of the session
           */
          app.use(passport.initialize());
          app.use(passport.session());

          // sets lodash as a global variable in locals
          app.locals._ = _;
      }
  });