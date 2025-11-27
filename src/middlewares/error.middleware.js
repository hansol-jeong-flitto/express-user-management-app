// This is a standard Express error handling middleware, which always takes 4 arguments.
const errorMiddleware = (err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes

  // Determine the status code based on the error.
  // For now, we default to 500. Custom errors could set their own statusCode.
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const errors = err.errors || undefined; // Grab detailed errors from Zod validation

  res.status(statusCode).json({
    message: message,
    ...(errors && { errors }), // Conditionally add errors if they exist
    // error: process.env.NODE_ENV === 'production' ? {} : err,
  });
};

export default errorMiddleware;
