/**
 * @openapi
 * components:
 *   schemas:
 *     PublicMessage:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           enum:
 *             - This is a public message.
 */
const getPublicMessage = () => {
  return {
    text: "This is a public message.",
  };
};

/**
 * @openapi
 * components:
 *   schemas:
 *     ProtectedMessage:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           enum:
 *             - This is a protected message.
 */
const getProtectedMessage = () => {
  return {
    text: "This is a protected message.",
  };
};

/**
 * @openapi
 * components:
 *   schemas:
 *     AdminMessage:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           enum:
 *             - This is an admin message.
 */
const getAdminMessage = () => {
  return {
    text: "This is an admin message.",
  };
};

module.exports = {
  getPublicMessage,
  getProtectedMessage,
  getAdminMessage,
};
