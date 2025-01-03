const {
  InvalidTokenError,
  UnauthorizedError,
} = require("express-oauth2-jwt-bearer");

/**
 * @openapi
 * components:
 *   schemas:
 *     BadCredentialsMessage:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           enum:
 *             - Bad credentials
 * 
 *     RequiresAuthenticationMessage:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           enum:
 *             - Requires authentication
 * 
 *     InternalServerErrorMessage:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           enum:
 *             - Internal Server Error
 */
const errorHandler = (error, request, response, next) => {
  if (error instanceof InvalidTokenError) {
    const message = "Bad credentials";

    response.status(error.status).json({ message });

    return;
  }

  if (error instanceof UnauthorizedError) {
    const message = "Requires authentication";

    response.status(error.status).json({ message });

    return;
  }

  const status = 500;
  const message = "Internal Server Error";

  response.status(status).json({ message });
};

module.exports = {
  errorHandler,
};