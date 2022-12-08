
const express = require('express');
const loaders = require('./loaders');

const app = express();

loaders.bootstrap(app);

module.exports = app;
