require('./handler');

// handles productional error
const productionError = (err, res) => {
  // operational error: send message to client about the error
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      details: err.details
    });
  } else {
    // Sends a generic message to the client about the error
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

// Handles development errore
// sends back the error message, and additional information about the error
const developmentError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    details: err.details,
    stack: err.stack,
  });
};

function bootstrap(app) {
  app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (process.env.NODE_ENV === "development") {
      developmentError(err, res);
    }
    else {
      productionError(err, res);
    }
  })
}

module.exports = {
  bootstrap
}