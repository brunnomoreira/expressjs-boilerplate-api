class AppError extends Error {
  constructor(message, details, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.status = 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;