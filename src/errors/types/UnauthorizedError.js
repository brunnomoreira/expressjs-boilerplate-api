const AppError = require('./AppError');

class UnauthorizedError extends AppError {
  constructor(message = "Access Denied.", details = []) {
    super(message, details, 401);
  }
}
  
module.exports = UnauthorizedError;