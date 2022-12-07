const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const errorHandler = require('./errors');

const app = express();

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

// Setup error handler
errorHandler.bootstrap(app);

module.exports = app;
