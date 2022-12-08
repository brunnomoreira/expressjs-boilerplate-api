require('dotenv').config();

module.exports = { 
  secret: env('JWT_SECRET'),
  expiresIn: env('JWT_EXPIRES_IN', 3600, Number)
};