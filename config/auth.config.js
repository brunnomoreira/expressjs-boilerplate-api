require('../src/helpers');

module.exports = { 
  passwordSaltRounds: env('PASSWORD_SALT_ROUDNS', 10, Number)
};