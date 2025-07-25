// In backend/middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging

  // Default error status and message
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong on the server.';

  // Handle specific types of errors for more informative responses
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    // Mongoose CastError (e.g., invalid ID format)
    statusCode = 400;
    message = `Invalid ID: ${err.value}`;
  } else if (err.code === 11000) {
    // MongoDB duplicate key error (e.g., trying to register with existing email)
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate field value: '${err.keyValue[field]}'. Please use another ${field}.`;
  } else if (err.name === 'ValidationError') {
    // Mongoose validation errors (e.g., required field missing, invalid format)
    statusCode = 400;
    message = Object.values(err.errors).map(val => val.message).join('. ');
  } else if (statusCode === 500 && process.env.NODE_ENV === 'production') {
    // In production, generic message for unhandled 500 errors
    message = 'Server error. Please try again later.';
  }

  res.status(statusCode).json({
    status: 'error',
    message: message,
    // Include error details only in development for debugging
    ...(process.env.NODE_ENV === 'development' && { error: err }),
  });
};

module.exports = errorHandler;

