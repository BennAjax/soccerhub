
  const express = require('express');
  const bodyParser = require('body-parser');
  const ejs = require('ejs');
  const http = require('http');
  const path = require('path');
  const cookieParser = require('cookie-parser');
  const validator = require('express-validator');
  const session = require('express-session');
  const mongoStore = require('connect-mongo')(session);
  const mongoose = require('mongoose');
  const flash = require('connect-flash');
  const injector =  require('./injector');


  injector.resolve(function (users) {
      // initialize mongodb connection with mongoose
      mongoose.Promise = global.Promise;
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

          // add router as a middleware
          app.use(router);
      }

      function expressConfig(app) {
          app.use(express.static('public'));
          app.use(cookieParser());
          // view engine setup
          app.set('views', path.join(__dirname, 'views'));
          app.set('view engine', 'ejs');
          // bodyParser setup
          app.use(bodyParser.json());
          app.use(bodyParser.urlencoded({ extended: false }));

          app.use(validator());
          app.use(session({
              secret: 'mysecret',
              resave: true,
              saveInitialized: true,
              store: new mongoStore({ mongooseConnection: mongoose.connection})
          }));

          app.use(flash());

      }
  });