/**
 * @openapi
 * components:
 *   schemas:
 *     NotFoundMessage:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           enum:
 *             - Not Found
 */
const notFoundHandler = (request, response, next) => {
  const message = "Not Found";

  response.status(404).json({ message });
};

module.exports = {
  notFoundHandler,
};
