import { ZodError } from 'zod';

const validate = (schema) => (req, res, next) => {
  try {
    // Validate request body against the provided schema
    schema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      // Format Zod errors for a cleaner response
      const errors = err.errors.map((error) => ({
        path: error.path.join('.'),
        message: error.message,
      }));
      // Pass a custom error object to the generic error handler
      next({
        statusCode: 400, // Bad Request
        message: 'Validation failed',
        errors: errors, // Include detailed errors
      });
    } else {
      // Pass other types of errors to the generic error handler
      next(err);
    }
  }
};

export default validate;
