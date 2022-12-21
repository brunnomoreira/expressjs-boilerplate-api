const express = require('./express.loader');

function bootstrap(app) {
  express.bootstrap(app);
}

module.exports = {
  bootstrap
}