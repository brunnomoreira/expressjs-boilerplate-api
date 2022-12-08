require('dotenv').config();

module.exports = { 
  passwordSaltRounds: env('PASSWORD_SALT_ROUDNS', 10, Number)
};