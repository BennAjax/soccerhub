
  const express = require('express');
  const bodyParser = require('body-parser');
  const ejs = require('ejs');
  const http = require('http');
  const path = require('path');
  const injector =  require('./injector');

  injector.resolve(function () {

      const app = setupExpress()

      function setupExpress() {
          const app = express();
          const server = http.createServer(app);
          server.listen(3000, function () {
             console.log('listening on port 3000')
          });
      }

      function expressConfig(app) {
          app.use(express.static('public'));
          // view engine setup
          app.set('views', path.join(__dirname, 'views'));
          app.set('view engine', 'pug');
          // bodyParser setup
          app.use(bodyParser.json());
          app.use(bodyParser.urlencoded({ extended: false }));
      }
  });