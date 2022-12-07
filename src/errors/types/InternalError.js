const AppError = require('./AppError');

class InternalError extends AppError {
  constructor(message = "Internal Server Error.", details = []) {
    super(message, details, 500);
  }
}
  
module.exports = InternalError;