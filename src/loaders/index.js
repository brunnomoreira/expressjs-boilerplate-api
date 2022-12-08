const express = require('./express');

function bootstrap(app) {
    express.bootstrap(app);
}

module.exports = {
    bootstrap
}