require('../src/helpers');

module.exports = {
  username: env('DB_USER'),
  password: env('DB_PASS'),
  database: env('DB_NAME'),
  host: env('DB_HOST', '127.0.0.1'),
  port: env('DB_PORT', '3306'),
  dialect: env('DB_DIALECT', 'mysql'),
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  }
};