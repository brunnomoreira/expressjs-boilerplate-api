const express = require('express');
const router = express.Router();
const auth = require('./auth.route');
const { NotFoundError } = require('../errors/types');

function bootstrap(app) {
  router.use(auth.prefix, auth.router);

  app.use('/api/v1', router);

  app.use(function(req, res, next) {
    throw new NotFoundError("Route not found.");
  });
}

module.exports = {
  bootstrap
}