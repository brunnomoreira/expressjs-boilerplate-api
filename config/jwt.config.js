require('../src/helpers');

module.exports = { 
  secret: env('JWT_SECRET'),
  expiresIn: env('JWT_EXPIRES_IN', 3600, Number)
};