const express = require("express");
const {
  getAdminMessage,
  getProtectedMessage,
  getPublicMessage,
} = require("./messages.service");
const { validateAccessToken } = require("../middleware/auth0.middleware.js");

const messagesRouter = express.Router();

/**
 * @openapi
 * /api/public:
 *   get:
 *     summary: Public endpoint.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                   $ref: "#/components/schemas/PublicMessage"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *                   $ref: "#/components/schemas/InternalServerErrorMessage"
 */
messagesRouter.get("/public", (req, res) => {
  const message = getPublicMessage();

  res.status(200).json(message);
});

/**
 * @openapi
 * /api/protected:
 *   get:
 *     summary: Protected endpoint.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                   $ref: "#/components/schemas/ProtectedMessage"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: "#/components/schemas/RequiresAuthenticationMessage"
 *                 - $ref: "#/components/schemas/BadCredentialsMessage"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *                   $ref: "#/components/schemas/InternalServerErrorMessage"
 */
messagesRouter.get("/protected", validateAccessToken, (req, res) => {
  const message = getProtectedMessage();

  res.status(200).json(message);
});

/**
 * @openapi
 * /api/admin:
 *   get:
 *     summary: Admin endpoint.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                   $ref: "#/components/schemas/AdminMessage"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: "#/components/schemas/RequiresAuthenticationMessage"
 *                 - $ref: "#/components/schemas/BadCredentialsMessage"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *                   $ref: "#/components/schemas/InternalServerErrorMessage"
 */
messagesRouter.get("/admin", validateAccessToken, (req, res) => {
  const message = getAdminMessage();

  res.status(200).json(message);
});

/**
 * @openapi
 * /api/error:
 *   get:
 *     summary: Error endpoint (only for testing).
 *     responses:
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *                   $ref: "#/components/schemas/InternalServerErrorMessage"
 */
messagesRouter.get("/error", (req, res) => {
  throw new Error("Miscellaneous");
});

module.exports = { messagesRouter };