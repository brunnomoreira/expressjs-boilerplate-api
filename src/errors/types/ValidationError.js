const AppError = require('./AppError');

class ValidationError extends AppError {
  constructor(message, details = []) {
    super(message, details, 422);
  }
}
  
module.exports = ValidationError;