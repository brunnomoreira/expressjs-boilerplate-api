require('../helpers');

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require("helmet");
const path = require('path');
const cors = require('cors');

const errorHandler = require('../errors');
const routes = require('../routes');

function bootstrap(app) {
  // Add HTTP security headers
  app.use(helmet());

  // Enable CORS
  app.use(cors());

  // HTTP request logger middleware for node.js
  app.use(logger('dev'));

  // parse requests of content-type - application/json
  app.use(express.json());

  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: false }));

  // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
  app.use(cookieParser());

  // Configure public folder
  app.use(express.static(path.join(__dirname, 'public')));

  // Register routes
  routes.bootstrap(app);

  // Setup error handler
  errorHandler.bootstrap(app);
}

module.exports = {
  bootstrap
}
