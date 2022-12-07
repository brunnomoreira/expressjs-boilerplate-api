const AppError = require('./AppError');

class NotFoundError extends AppError {
  constructor(message = "Not found.", details = []) {
    super(message, details, 404);
  }
}
  
module.exports = NotFoundError;